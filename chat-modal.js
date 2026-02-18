/**
 * Planeta X – AI Chat Modal
 * 
 * Context-aware LLM chat for every mission step.
 * Sends current lesson/layer/step context as preprompt to the PHP API.
 * 
 * Usage: included via <script src="../chat-modal.js"></script>
 * Then call: PlanetaChat.init(getContextFn)
 * where getContextFn() returns the current lesson context object.
 */

(function () {
  'use strict';

  const API_URL = (function () {
    const loc = window.location;
    // Works for both local dev and production
    const base = loc.origin + loc.pathname.replace(/\/[^/]*$/, '');
    return base + '/../api/chat.php';
  })();

  const CHAT_KEY = 'planetax_chat_history';
  const MAX_HISTORY = 20;

  let _getContext = () => ({});
  let _history = [];
  let _open = false;

  // ─── CSS ───
  const CSS = `
#px-chat-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9000;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7aa2f7, #73daca);
  border: none;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0 4px 20px #7aa2f755;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0b10;
}
#px-chat-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px #7aa2f788; }
#px-chat-btn .px-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #f7768e;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  border-radius: 10px;
  padding: 2px 5px;
  display: none;
}

#px-chat-overlay {
  position: fixed;
  inset: 0;
  background: #0a0b1088;
  z-index: 9001;
  display: none;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
}
#px-chat-overlay.open { display: flex; }

#px-chat-modal {
  width: 420px;
  max-width: calc(100vw - 48px);
  height: 560px;
  max-height: calc(100vh - 80px);
  background: #12141e;
  border: 2px solid #1e2030;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-family: 'Nunito', system-ui, sans-serif;
  box-shadow: 0 20px 60px #00000088;
  overflow: hidden;
  animation: px-slide-up 0.2s ease;
}
@keyframes px-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

#px-chat-header {
  background: #0f1019;
  border-bottom: 2px solid #1e2030;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}
#px-chat-header .px-avatar {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, #7aa2f7, #73daca);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
}
#px-chat-header .px-title { flex: 1; }
#px-chat-header .px-title h3 { font-size: 14px; font-weight: 800; color: #c0caf5; margin: 0; }
#px-chat-header .px-title p { font-size: 11px; color: #7982a9; margin: 0; }
#px-chat-close {
  background: transparent; border: none; color: #7982a9;
  cursor: pointer; font-size: 20px; padding: 4px; line-height: 1;
}
#px-chat-close:hover { color: #c0caf5; }

#px-chat-ctx {
  background: #0a0b1088;
  border-bottom: 1px solid #1e2030;
  padding: 8px 14px;
  font-size: 11px;
  color: #7982a9;
  display: flex;
  align-items: center;
  gap: 6px;
}
#px-chat-ctx .px-ctx-tag {
  background: #7aa2f722;
  color: #7aa2f7;
  border: 1px solid #7aa2f733;
  border-radius: 6px;
  padding: 2px 8px;
  font-weight: 700;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

#px-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
}
#px-chat-messages::-webkit-scrollbar { width: 4px; }
#px-chat-messages::-webkit-scrollbar-track { background: transparent; }
#px-chat-messages::-webkit-scrollbar-thumb { background: #1e2030; border-radius: 4px; }

.px-msg {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  animation: px-msg-in 0.15s ease;
}
@keyframes px-msg-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
.px-msg.user { flex-direction: row-reverse; }
.px-msg-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0;
}
.px-msg.user .px-msg-avatar { background: #7aa2f733; }
.px-msg.assistant .px-msg-avatar { background: linear-gradient(135deg,#7aa2f7,#73daca); }
.px-msg-bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}
.px-msg.user .px-msg-bubble {
  background: #7aa2f722;
  color: #c0caf5;
  border: 1px solid #7aa2f733;
  border-top-right-radius: 4px;
}
.px-msg.assistant .px-msg-bubble {
  background: #1e2030;
  color: #a9b1d6;
  border: 1px solid #2a2e44;
  border-top-left-radius: 4px;
}
.px-msg-bubble code {
  background: #0c0e14;
  color: #73daca;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}

.px-typing {
  display: flex; gap: 4px; align-items: center; padding: 4px 0;
}
.px-typing span {
  width: 6px; height: 6px; border-radius: 50%;
  background: #7aa2f7; animation: px-bounce 1.2s infinite;
}
.px-typing span:nth-child(2) { animation-delay: 0.2s; }
.px-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes px-bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }

#px-chat-footer {
  border-top: 2px solid #1e2030;
  padding: 12px 14px;
  display: flex;
  gap: 8px;
  align-items: flex-end;
  background: #0f1019;
}
#px-chat-input {
  flex: 1;
  background: #1e2030;
  border: 1px solid #2a2e44;
  border-radius: 12px;
  padding: 10px 14px;
  color: #c0caf5;
  font-family: inherit;
  font-size: 13px;
  resize: none;
  outline: none;
  min-height: 40px;
  max-height: 100px;
  line-height: 1.5;
}
#px-chat-input:focus { border-color: #7aa2f755; }
#px-chat-input::placeholder { color: #5a6082; }
#px-chat-send {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, #7aa2f7, #73daca);
  border: none; border-radius: 10px;
  cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: opacity 0.2s;
  color: #0a0b10;
}
#px-chat-send:disabled { opacity: 0.4; cursor: default; }
#px-chat-send:not(:disabled):hover { opacity: 0.85; }

#px-chat-clear {
  background: transparent; border: none;
  color: #5a6082; cursor: pointer; font-size: 11px;
  padding: 4px 8px; border-radius: 6px; font-family: inherit;
  transition: color 0.2s;
}
#px-chat-clear:hover { color: #f7768e; }

.px-error-msg {
  background: #f7768e18;
  border: 1px solid #f7768e33;
  color: #f7768e;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 12px;
  text-align: center;
}

@media (max-width: 500px) {
  #px-chat-overlay { padding: 0; align-items: flex-end; }
  #px-chat-modal { width: 100vw; max-width: 100vw; border-radius: 20px 20px 0 0; height: 70vh; }
}
`;

  // ─── HTML ───
  function buildHTML() {
    return `
<button id="px-chat-btn" title="Zapytaj AI o tę lekcję" aria-label="Otwórz czat z AI">
  🤖
  <span class="px-badge" id="px-chat-badge"></span>
</button>

<div id="px-chat-overlay" role="dialog" aria-modal="true" aria-label="Czat z asystentem AI">
  <div id="px-chat-modal">
    <div id="px-chat-header">
      <div class="px-avatar">🤖</div>
      <div class="px-title">
        <h3>Asystent Planety X</h3>
        <p id="px-chat-model-label">Pytaj o tę lekcję!</p>
      </div>
      <button id="px-chat-close" aria-label="Zamknij czat">✕</button>
    </div>
    <div id="px-chat-ctx">
      <span>📍 Kontekst:</span>
      <span class="px-ctx-tag" id="px-ctx-tag">Ładowanie...</span>
    </div>
    <div id="px-chat-messages" role="log" aria-live="polite"></div>
    <div id="px-chat-footer">
      <textarea id="px-chat-input" placeholder="Zapytaj o tę lekcję..." rows="1" maxlength="500"></textarea>
      <button id="px-chat-send" aria-label="Wyślij">➤</button>
    </div>
    <div style="text-align:center;padding:4px 0 8px;">
      <button id="px-chat-clear">🗑️ Wyczyść historię</button>
    </div>
  </div>
</div>
`;
  }

  // ─── Render message ───
  function renderMessage(role, content, isTyping = false) {
    const el = document.createElement('div');
    el.className = `px-msg ${role}`;
    const avatar = role === 'user' ? '🧑‍🚀' : '🤖';
    if (isTyping) {
      el.innerHTML = `
        <div class="px-msg-avatar">${avatar}</div>
        <div class="px-msg-bubble"><div class="px-typing"><span></span><span></span><span></span></div></div>`;
    } else {
      // Simple markdown: `code` and **bold**
      const html = content
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      el.innerHTML = `<div class="px-msg-avatar">${avatar}</div><div class="px-msg-bubble">${html}</div>`;
    }
    return el;
  }

  function scrollBottom() {
    const msgs = document.getElementById('px-chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function updateContextTag() {
    const ctx = _getContext();
    const tag = document.getElementById('px-ctx-tag');
    if (!tag) return;
    const label = [ctx.missionTitle, ctx.layerTitle].filter(Boolean).join(' › ');
    tag.textContent = label || 'Brak kontekstu';
    tag.title = ctx.stepInstruction || '';
  }

  // ─── Send message ───
  async function sendMessage() {
    const input = document.getElementById('px-chat-input');
    const sendBtn = document.getElementById('px-chat-send');
    const msgs = document.getElementById('px-chat-messages');
    if (!input || !sendBtn || !msgs) return;

    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;

    // Add user message
    msgs.appendChild(renderMessage('user', text));
    scrollBottom();

    // Add typing indicator
    const typingEl = renderMessage('assistant', '', true);
    typingEl.id = 'px-typing-indicator';
    msgs.appendChild(typingEl);
    scrollBottom();

    // Add to history
    _history.push({ role: 'user', content: text });

    try {
      const ctx = _getContext();
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: ctx,
          history: _history.slice(-12),
        }),
      });

      const data = await res.json();

      // Remove typing
      const typing = document.getElementById('px-typing-indicator');
      if (typing) typing.remove();

      if (!res.ok || data.error) {
        const errEl = document.createElement('div');
        errEl.className = 'px-error-msg';
        errEl.textContent = '⚠️ ' + (data.error || 'Błąd połączenia z AI. Sprawdź konfigurację .env');
        msgs.appendChild(errEl);
      } else {
        const reply = data.reply || '';
        msgs.appendChild(renderMessage('assistant', reply));
        _history.push({ role: 'assistant', content: reply });

        // Update model label
        const modelLabel = document.getElementById('px-chat-model-label');
        if (modelLabel && data.model) {
          modelLabel.textContent = data.model.split('/').pop();
        }

        // Trim history
        if (_history.length > MAX_HISTORY) {
          _history = _history.slice(-MAX_HISTORY);
        }

        // Update badge
        updateBadge();
      }
    } catch (e) {
      const typing = document.getElementById('px-typing-indicator');
      if (typing) typing.remove();
      const errEl = document.createElement('div');
      errEl.className = 'px-error-msg';
      errEl.textContent = '⚠️ Brak połączenia z serwerem API. Uruchom serwer PHP.';
      msgs.appendChild(errEl);
    }

    sendBtn.disabled = false;
    scrollBottom();
    input.focus();
  }

  function updateBadge() {
    const badge = document.getElementById('px-chat-badge');
    if (!badge) return;
    if (!_open && _history.length > 0) {
      badge.style.display = 'block';
      badge.textContent = Math.floor(_history.length / 2);
    } else {
      badge.style.display = 'none';
    }
  }

  function clearHistory() {
    if (!confirm('Wyczyścić historię rozmowy?')) return;
    _history = [];
    const msgs = document.getElementById('px-chat-messages');
    if (msgs) msgs.innerHTML = '';
    updateBadge();
    showWelcome();
  }

  function showWelcome() {
    const msgs = document.getElementById('px-chat-messages');
    if (!msgs) return;
    const ctx = _getContext();
    const step = ctx.stepInstruction ? `\n\nAktualne zadanie: "${ctx.stepInstruction}"` : '';
    const welcome = renderMessage('assistant',
      `Cześć! 👋 Jestem asystentem Planety X.\n\nMogę pomóc Ci zrozumieć tę lekcję, wyjaśnić komendy lub odpowiedzieć na pytania dotyczące aktualnego zadania.${step}\n\nO co chcesz zapytać?`
    );
    msgs.appendChild(welcome);
  }

  function open() {
    _open = true;
    const overlay = document.getElementById('px-chat-overlay');
    if (overlay) overlay.classList.add('open');
    updateContextTag();
    updateBadge();
    const msgs = document.getElementById('px-chat-messages');
    if (msgs && msgs.children.length === 0) showWelcome();
    setTimeout(() => {
      const input = document.getElementById('px-chat-input');
      if (input) input.focus();
      scrollBottom();
    }, 100);
  }

  function close() {
    _open = false;
    const overlay = document.getElementById('px-chat-overlay');
    if (overlay) overlay.classList.remove('open');
    updateBadge();
  }

  // ─── Init ───
  function init(getContextFn) {
    if (typeof getContextFn === 'function') _getContext = getContextFn;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inject HTML
    const container = document.createElement('div');
    container.innerHTML = buildHTML();
    document.body.appendChild(container);

    // Events
    document.getElementById('px-chat-btn').addEventListener('click', open);
    document.getElementById('px-chat-close').addEventListener('click', close);
    document.getElementById('px-chat-clear').addEventListener('click', clearHistory);
    document.getElementById('px-chat-send').addEventListener('click', sendMessage);

    // Close on overlay click
    document.getElementById('px-chat-overlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('px-chat-overlay')) close();
    });

    // Textarea auto-resize + Enter to send
    const input = document.getElementById('px-chat-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    // Keyboard shortcut: Ctrl+/ or Cmd+/ to toggle
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        _open ? close() : open();
      }
      if (e.key === 'Escape' && _open) close();
    });
  }

  // ─── Public API ───
  window.PlanetaChat = { init, open, close, clearHistory };
})();
