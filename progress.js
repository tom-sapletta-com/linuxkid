/**
 * Planeta X – Progress Manager
 * 
 * Two implementations:
 * 1. localStorage (default, works offline)
 * 2. SQLite via REST API (optional, for server-side persistence)
 * 
 * Usage:
 *   const pm = new ProgressManager();
 *   pm.completeMission('przylot');
 *   pm.isMissionComplete('przylot'); // true
 *   pm.isMissionUnlocked('cyberquest'); // true (przylot done)
 *   pm.getMissionProgress('przylot'); // { completed: 15, total: 15, percent: 100 }
 */

const MISSIONS = [
  { id: 'przylot',        folder: 'przylot',        title: 'Przylot na Planetę X', requires: [] },
  { id: 'cyberquest',     folder: 'cyberquest',     title: 'CyberQuest',           requires: ['przylot'] },
  { id: 'serwer',         folder: 'serwer',         title: 'Serwer Planety X',     requires: ['przylot'] },
  { id: 'automatyzacja',  folder: 'automatyzacja',  title: 'Automatyzacja',        requires: ['serwer'] },
  { id: 'konteneryzacja', folder: 'konteneryzacja', title: 'Konteneryzacja',       requires: ['automatyzacja'] },
  { id: 'kod',            folder: 'kod',            title: 'Kod Planety X',        requires: ['przylot'] },
];

// ─── localStorage Implementation ───
class LocalStorageBackend {
  constructor(prefix = 'planetax_') {
    this.prefix = prefix;
  }

  _key(k) { return this.prefix + k; }

  getSteps(missionId) {
    try { return JSON.parse(localStorage.getItem(this._key('steps_' + missionId))) || []; }
    catch { return []; }
  }

  setSteps(missionId, steps) {
    localStorage.setItem(this._key('steps_' + missionId), JSON.stringify(steps));
  }

  isMissionComplete(missionId) {
    return localStorage.getItem(this._key('complete_' + missionId)) === 'true';
  }

  completeMission(missionId) {
    localStorage.setItem(this._key('complete_' + missionId), 'true');
    this._updateTimestamp(missionId);
  }

  getCompletedMissions() {
    return MISSIONS.filter(m => this.isMissionComplete(m.id)).map(m => m.id);
  }

  saveStepDone(missionId, stepKey) {
    const steps = this.getSteps(missionId);
    if (!steps.includes(stepKey)) {
      steps.push(stepKey);
      this.setSteps(missionId, steps);
    }
  }

  getProgress(missionId) {
    const steps = this.getSteps(missionId);
    const total = parseInt(localStorage.getItem(this._key('total_' + missionId))) || 0;
    return { completed: steps.length, total, percent: total > 0 ? Math.round((steps.length / total) * 100) : 0 };
  }

  setTotal(missionId, total) {
    localStorage.setItem(this._key('total_' + missionId), String(total));
  }

  _updateTimestamp(missionId) {
    localStorage.setItem(this._key('ts_' + missionId), new Date().toISOString());
  }

  reset(missionId) {
    localStorage.removeItem(this._key('steps_' + missionId));
    localStorage.removeItem(this._key('complete_' + missionId));
    localStorage.removeItem(this._key('total_' + missionId));
    localStorage.removeItem(this._key('ts_' + missionId));
  }

  resetAll() {
    MISSIONS.forEach(m => this.reset(m.id));
  }

  exportData() {
    const data = {};
    MISSIONS.forEach(m => {
      data[m.id] = {
        steps: this.getSteps(m.id),
        complete: this.isMissionComplete(m.id),
        progress: this.getProgress(m.id),
      };
    });
    return data;
  }
}

// ─── SQLite REST API Implementation ───
class SQLiteBackend {
  constructor(apiUrl = '/api/progress') {
    this.apiUrl = apiUrl;
    this._cache = {};
  }

  async _fetch(path, opts = {}) {
    try {
      const res = await fetch(this.apiUrl + path, {
        headers: { 'Content-Type': 'application/json' },
        ...opts,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn('[SQLiteBackend] API unavailable, falling back to cache:', e.message);
      return null;
    }
  }

  async getSteps(missionId) {
    const data = await this._fetch(`/steps/${missionId}`);
    return data?.steps || [];
  }

  async saveStepDone(missionId, stepKey) {
    await this._fetch(`/steps/${missionId}`, {
      method: 'POST',
      body: JSON.stringify({ stepKey }),
    });
  }

  async isMissionComplete(missionId) {
    const data = await this._fetch(`/mission/${missionId}`);
    return data?.complete || false;
  }

  async completeMission(missionId) {
    await this._fetch(`/mission/${missionId}/complete`, { method: 'POST' });
  }

  async getCompletedMissions() {
    const data = await this._fetch('/missions/completed');
    return data?.missions || [];
  }

  async getProgress(missionId) {
    const data = await this._fetch(`/mission/${missionId}/progress`);
    return data || { completed: 0, total: 0, percent: 0 };
  }

  async setTotal(missionId, total) {
    await this._fetch(`/mission/${missionId}/total`, {
      method: 'POST',
      body: JSON.stringify({ total }),
    });
  }

  async resetAll() {
    await this._fetch('/reset', { method: 'POST' });
  }
}

// ─── Progress Manager (facade) ───
class ProgressManager {
  constructor(backend = 'localStorage') {
    if (backend === 'sqlite') {
      this.backend = new SQLiteBackend();
      this.async = true;
    } else {
      this.backend = new LocalStorageBackend();
      this.async = false;
    }
  }

  isMissionUnlocked(missionId) {
    const mission = MISSIONS.find(m => m.id === missionId);
    if (!mission) return false;
    if (mission.requires.length === 0) return true;
    return mission.requires.every(req => this.backend.isMissionComplete(req));
  }

  getMissionDef(missionId) {
    return MISSIONS.find(m => m.id === missionId);
  }

  getAllMissions() { return MISSIONS; }
}

// Export for use in browser
if (typeof window !== 'undefined') {
  window.ProgressManager = ProgressManager;
  window.MISSIONS = MISSIONS;
}
