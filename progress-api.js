/**
 * Planeta X – SQLite Progress API
 * 
 * A lightweight Express server that stores progress in SQLite.
 * This is the server-side alternative to the localStorage implementation.
 * 
 * Usage:
 *   node progress-api.js
 *   # Server starts on http://localhost:3001
 * 
 * Endpoints:
 *   GET  /api/progress/steps/:missionId        – get completed steps
 *   POST /api/progress/steps/:missionId         – save a step { stepKey }
 *   GET  /api/progress/mission/:missionId       – get mission status
 *   POST /api/progress/mission/:missionId/complete – mark mission complete
 *   GET  /api/progress/missions/completed       – list completed missions
 *   POST /api/progress/mission/:missionId/total – set total steps { total }
 *   GET  /api/progress/mission/:missionId/progress – get progress %
 *   POST /api/progress/reset                    – reset all progress
 *   GET  /api/progress/export                   – export all data
 * 
 * Dependencies:
 *   npm install express better-sqlite3 cors
 */

const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'progress.db');

app.use(cors());
app.use(express.json());

// ─── Database Setup ───
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS missions (
    id TEXT PRIMARY KEY,
    complete INTEGER DEFAULT 0,
    total_steps INTEGER DEFAULT 0,
    completed_at TEXT
  );

  CREATE TABLE IF NOT EXISTS steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mission_id TEXT NOT NULL,
    step_key TEXT NOT NULL,
    completed_at TEXT DEFAULT (datetime('now')),
    UNIQUE(mission_id, step_key)
  );

  CREATE INDEX IF NOT EXISTS idx_steps_mission ON steps(mission_id);
`);

// Ensure all missions exist
const MISSION_IDS = ['przylot', 'cyberquest', 'serwer', 'automatyzacja', 'konteneryzacja', 'kod'];
const insertMission = db.prepare('INSERT OR IGNORE INTO missions (id) VALUES (?)');
MISSION_IDS.forEach(id => insertMission.run(id));

// ─── Prepared Statements ───
const stmts = {
  getSteps: db.prepare('SELECT step_key FROM steps WHERE mission_id = ?'),
  insertStep: db.prepare('INSERT OR IGNORE INTO steps (mission_id, step_key) VALUES (?, ?)'),
  getMission: db.prepare('SELECT * FROM missions WHERE id = ?'),
  completeMission: db.prepare("UPDATE missions SET complete = 1, completed_at = datetime('now') WHERE id = ?"),
  getCompleted: db.prepare('SELECT id FROM missions WHERE complete = 1'),
  setTotal: db.prepare('UPDATE missions SET total_steps = ? WHERE id = ?'),
  countSteps: db.prepare('SELECT COUNT(*) as cnt FROM steps WHERE mission_id = ?'),
  deleteSteps: db.prepare('DELETE FROM steps'),
  resetMissions: db.prepare('UPDATE missions SET complete = 0, total_steps = 0, completed_at = NULL'),
};

// ─── Routes ───

// Get completed steps for a mission
app.get('/api/progress/steps/:missionId', (req, res) => {
  const rows = stmts.getSteps.all(req.params.missionId);
  res.json({ steps: rows.map(r => r.step_key) });
});

// Save a completed step
app.post('/api/progress/steps/:missionId', (req, res) => {
  const { stepKey } = req.body;
  if (!stepKey) return res.status(400).json({ error: 'stepKey required' });
  stmts.insertStep.run(req.params.missionId, stepKey);
  res.json({ ok: true });
});

// Get mission status
app.get('/api/progress/mission/:missionId', (req, res) => {
  const row = stmts.getMission.get(req.params.missionId);
  if (!row) return res.status(404).json({ error: 'Mission not found' });
  res.json({ id: row.id, complete: !!row.complete, totalSteps: row.total_steps, completedAt: row.completed_at });
});

// Mark mission as complete
app.post('/api/progress/mission/:missionId/complete', (req, res) => {
  stmts.completeMission.run(req.params.missionId);
  res.json({ ok: true });
});

// List completed missions
app.get('/api/progress/missions/completed', (req, res) => {
  const rows = stmts.getCompleted.all();
  res.json({ missions: rows.map(r => r.id) });
});

// Set total steps for a mission
app.post('/api/progress/mission/:missionId/total', (req, res) => {
  const { total } = req.body;
  if (typeof total !== 'number') return res.status(400).json({ error: 'total (number) required' });
  stmts.setTotal.run(total, req.params.missionId);
  res.json({ ok: true });
});

// Get progress for a mission
app.get('/api/progress/mission/:missionId/progress', (req, res) => {
  const mission = stmts.getMission.get(req.params.missionId);
  const { cnt } = stmts.countSteps.get(req.params.missionId);
  const total = mission?.total_steps || 0;
  res.json({ completed: cnt, total, percent: total > 0 ? Math.round((cnt / total) * 100) : 0 });
});

// Reset all progress
app.post('/api/progress/reset', (req, res) => {
  stmts.deleteSteps.run();
  stmts.resetMissions.run();
  res.json({ ok: true });
});

// Export all data
app.get('/api/progress/export', (req, res) => {
  const data = {};
  MISSION_IDS.forEach(id => {
    const mission = stmts.getMission.get(id);
    const steps = stmts.getSteps.all(id).map(r => r.step_key);
    const { cnt } = stmts.countSteps.get(id);
    data[id] = {
      complete: !!mission?.complete,
      totalSteps: mission?.total_steps || 0,
      completedSteps: cnt,
      steps,
    };
  });
  res.json(data);
});

// ─── Start ───
app.listen(PORT, () => {
  console.log(`🪐 Planeta X Progress API running on http://localhost:${PORT}`);
  console.log(`📁 Database: ${DB_PATH}`);
});
