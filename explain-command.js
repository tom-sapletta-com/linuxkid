/* ───── ExplainCommand – interactive command explainer modal ───── */
/* Shared across all missions. Include via <script> before mission JSX. */

(function () {
  const AREA_COLORS = {
    shell:      { bg: "#bb9af722", border: "#bb9af7", label: "🐚 Powłoka (Shell)", color: "#bb9af7" },
    filesystem: { bg: "#9ece6a22", border: "#9ece6a", label: "📁 System plików",   color: "#9ece6a" },
    network:    { bg: "#7aa2f722", border: "#7aa2f7", label: "🌐 Sieć",            color: "#7aa2f7" },
    process:    { bg: "#f7768e22", border: "#f7768e", label: "⚙️ Procesy",          color: "#f7768e" },
    security:   { bg: "#ff9e6422", border: "#ff9e64", label: "🔒 Bezpieczeństwo",  color: "#ff9e64" },
    package:    { bg: "#73daca22", border: "#73daca", label: "📦 Pakiety",          color: "#73daca" },
    docker:     { bg: "#e0af6822", border: "#e0af68", label: "🐳 Docker",          color: "#e0af68" },
    python:     { bg: "#f7768e22", border: "#f7768e", label: "🐍 Python",          color: "#f7768e" },
    git:        { bg: "#73daca22", border: "#73daca", label: "📸 Git",             color: "#73daca" },
    cron:       { bg: "#73daca22", border: "#73daca", label: "⏰ Harmonogram",      color: "#73daca" },
    editor:     { bg: "#e0af6822", border: "#e0af68", label: "📝 Edytor",          color: "#e0af68" },
  };

  const TOKEN_COLORS = {
    command:  "#bb9af7",
    path:     "#9ece6a",
    flag:     "#ff9e64",
    argument: "#7aa2f7",
    operator: "#f7768e",
    string:   "#e0af68",
    variable: "#73daca",
    keyword:  "#f7768e",
    comment:  "#5a6082",
  };

  const TOKEN_LABELS = {
    command:  "komenda",
    path:     "ścieżka",
    flag:     "flaga/opcja",
    argument: "argument",
    operator: "operator",
    string:   "tekst",
    variable: "zmienna",
    keyword:  "słowo kluczowe",
    comment:  "komentarz",
  };

  /* ── Render a single token with color ── */
  function renderToken(token) {
    if (typeof token === "string") return token;
    var color = TOKEN_COLORS[token.type] || "#c0caf5";
    return '<span style="color:' + color + ';font-weight:600" title="' +
      (TOKEN_LABELS[token.type] || token.type) + '">' + escHtml(token.text) + '</span>';
  }

  function escHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ── Build modal HTML ── */
  function buildModal(explain, command) {
    var html = '';
    html += '<div class="ecm-overlay" onclick="window.__ecmClose()">';
    html += '<div class="ecm-modal" onclick="event.stopPropagation()">';
    html += '<div class="ecm-header">';
    html += '<span class="ecm-title">🔍 Wyjaśnienie komendy</span>';
    html += '<button class="ecm-close" onclick="window.__ecmClose()">✕</button>';
    html += '</div>';

    /* Full command preview */
    html += '<div class="ecm-command-preview"><pre>' + escHtml(command) + '</pre></div>';

    /* Legend */
    html += '<div class="ecm-legend">';
    Object.keys(TOKEN_COLORS).forEach(function (type) {
      html += '<span class="ecm-legend-item">';
      html += '<span class="ecm-legend-dot" style="background:' + TOKEN_COLORS[type] + '"></span>';
      html += '<span class="ecm-legend-label">' + (TOKEN_LABELS[type] || type) + '</span>';
      html += '</span>';
    });
    html += '</div>';

    /* Lines */
    html += '<div class="ecm-lines">';
    explain.forEach(function (line, i) {
      var area = AREA_COLORS[line.area] || AREA_COLORS.shell;
      html += '<div class="ecm-line" style="border-left:4px solid ' + area.border + '">';

      /* Line number + area badge */
      html += '<div class="ecm-line-head">';
      html += '<span class="ecm-line-num">' + (i + 1) + '</span>';
      html += '<span class="ecm-area-badge" style="background:' + area.bg + ';color:' + area.color + '">' + area.label + '</span>';
      html += '</div>';

      /* Code with colored tokens */
      html += '<div class="ecm-line-code"><code>';
      if (line.tokens) {
        line.tokens.forEach(function (t) { html += renderToken(t); });
      } else {
        html += escHtml(line.code || '');
      }
      html += '</code></div>';

      /* Explanation */
      html += '<div class="ecm-line-explain">' + escHtml(line.explain) + '</div>';

      /* What changes in the system */
      if (line.effect) {
        html += '<div class="ecm-line-effect">💡 ' + escHtml(line.effect) + '</div>';
      }

      /* Link to learn more */
      if (line.link) {
        html += '<div class="ecm-line-link"><a href="' + escHtml(line.link.url) + '" target="_blank" rel="noopener">📚 ' + escHtml(line.link.label) + '</a></div>';
      }

      html += '</div>';
    });
    html += '</div>';

    /* System diagram */
    html += '<div class="ecm-diagram">';
    html += '<div class="ecm-diagram-title">🗺️ Gdzie to działa w systemie Linux?</div>';
    var usedAreas = {};
    explain.forEach(function (line) { if (line.area) usedAreas[line.area] = true; });
    var allAreas = ["shell", "filesystem", "network", "process", "security", "package", "docker", "python", "git", "cron"];
    html += '<div class="ecm-diagram-grid">';
    allAreas.forEach(function (key) {
      var a = AREA_COLORS[key];
      if (!a) return;
      var active = usedAreas[key];
      html += '<div class="ecm-diagram-cell' + (active ? ' active' : '') + '" style="' +
        (active ? 'background:' + a.bg + ';border-color:' + a.border : '') + '">';
      html += '<span class="ecm-diagram-icon">' + a.label.split(' ')[0] + '</span>';
      html += '<span class="ecm-diagram-name">' + a.label.split(' ').slice(1).join(' ') + '</span>';
      html += '</div>';
    });
    html += '</div></div>';

    html += '</div></div>';
    return html;
  }

  /* ── Inject styles once ── */
  var styleInjected = false;
  function injectStyles() {
    if (styleInjected) return;
    styleInjected = true;
    var css = `
.ecm-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.75); z-index:9999; display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(4px); }
.ecm-modal { background:#12141e; border:2px solid #1e2030; border-radius:18px; max-width:720px; width:100%; max-height:90vh; overflow-y:auto; color:#c0caf5; font-family:'Nunito',system-ui,sans-serif; }
.ecm-header { display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:2px solid #1e2030; position:sticky; top:0; background:#12141e; border-radius:18px 18px 0 0; z-index:1; }
.ecm-title { font-size:18px; font-weight:800; }
.ecm-close { background:none; border:none; color:#7982a9; font-size:20px; cursor:pointer; padding:4px 8px; border-radius:8px; }
.ecm-close:hover { background:#1e2030; color:#c0caf5; }
.ecm-command-preview { padding:12px 20px; }
.ecm-command-preview pre { background:#0a0b10; border:2px solid #1e2030; border-radius:12px; padding:12px 16px; font-family:'JetBrains Mono',monospace; font-size:13px; color:#bb9af7; white-space:pre-wrap; word-break:break-all; overflow-x:auto; margin:0; }
.ecm-legend { display:flex; flex-wrap:wrap; gap:8px; padding:0 20px 12px; }
.ecm-legend-item { display:flex; align-items:center; gap:4px; font-size:11px; color:#7982a9; }
.ecm-legend-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.ecm-lines { padding:0 20px 16px; display:flex; flex-direction:column; gap:10px; }
.ecm-line { background:#0a0b10; border-radius:12px; padding:12px 14px; }
.ecm-line-head { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
.ecm-line-num { background:#1e2030; color:#5a6082; font-size:12px; font-weight:700; width:24px; height:24px; display:flex; align-items:center; justify-content:center; border-radius:6px; flex-shrink:0; }
.ecm-area-badge { font-size:11px; font-weight:700; padding:2px 8px; border-radius:6px; }
.ecm-line-code { margin-bottom:6px; }
.ecm-line-code code { font-family:'JetBrains Mono',monospace; font-size:14px; white-space:pre-wrap; word-break:break-all; }
.ecm-line-explain { font-size:14px; color:#a9b1d6; line-height:1.6; }
.ecm-line-effect { font-size:13px; color:#73daca; margin-top:4px; padding:4px 8px; background:#73daca08; border-radius:6px; }
.ecm-line-link { margin-top:4px; }
.ecm-line-link a { font-size:13px; color:#7aa2f7; text-decoration:none; }
.ecm-line-link a:hover { text-decoration:underline; }
.ecm-diagram { padding:0 20px 20px; }
.ecm-diagram-title { font-size:14px; font-weight:700; color:#7982a9; margin-bottom:8px; }
.ecm-diagram-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(120px, 1fr)); gap:6px; }
.ecm-diagram-cell { background:#0a0b10; border:2px solid #1e2030; border-radius:10px; padding:8px; text-align:center; opacity:0.4; transition:all 0.2s; }
.ecm-diagram-cell.active { opacity:1; }
.ecm-diagram-icon { display:block; font-size:20px; }
.ecm-diagram-name { display:block; font-size:11px; color:#7982a9; margin-top:2px; }
.ecm-diagram-cell.active .ecm-diagram-name { color:#c0caf5; }
@media (max-width:600px) {
  .ecm-modal { max-height:95vh; border-radius:14px; }
  .ecm-header { padding:12px 14px; border-radius:14px 14px 0 0; }
  .ecm-command-preview, .ecm-legend, .ecm-lines, .ecm-diagram { padding-left:14px; padding-right:14px; }
  .ecm-line-code code { font-size:12px; }
}
`;
    var el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* ── Public API ── */
  var container = null;

  window.__ecmClose = function () {
    if (container) { container.remove(); container = null; }
  };

  window.ExplainCommand = {
    open: function (explain, command) {
      injectStyles();
      window.__ecmClose();
      container = document.createElement("div");
      container.innerHTML = buildModal(explain, command);
      document.body.appendChild(container);
    }
  };

  /* ── React component factory ── */
  window.ExplainButton = function ExplainButton(props) {
    if (!props.explain || !props.explain.length) return null;
    var onClick = function () {
      window.ExplainCommand.open(props.explain, props.command || "");
    };
    return React.createElement("button", {
      className: "explain-btn",
      onClick: onClick,
      title: "Wyjaśnij komendę krok po kroku"
    }, "🔍");
  };
})();
