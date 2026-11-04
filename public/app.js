* {
  box-sizing: border-box;
}

:root {
  --bg: #050b08;
  --surface: rgba(10, 14, 12, 0.92);
  --surface-strong: #0c1c14;
  --panel: #111b18;
  --panel-alt: #17231e;
  --border: rgba(68, 255, 144, 0.32);
  --primary: #5efc9d;
  --primary-soft: rgba(94, 252, 157, 0.16);
  --text: #eafef2;
  --muted: #96b4a0;
  --shadow: 0 0 28px rgba(94, 252, 157, 0.25);
}

html, body {
  margin: 0;
  min-height: 100%;
  background: linear-gradient(180deg, #020504 0%, #08110d 100%);
  color: var(--text);
  font-family: 'Inter', sans-serif;
}

body {
  min-height: 100vh;
  background-image: radial-gradient(circle at top, rgba(94, 252, 157, 0.12), transparent 35%);
}

button, input, textarea, select {
  font: inherit;
}

button {
  cursor: pointer;
  border: none;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background: rgba(7, 13, 10, 0.96);
  border-right: 1px solid var(--border);
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 8px 20px;
  border-bottom: 1px solid rgba(94, 252, 157, 0.18);
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #143822, #0f2d1e);
  color: var(--primary);
  font-weight: 900;
  box-shadow: var(--shadow);
}

.brand-name {
  font-weight: 800;
  font-size: 1.05rem;
}

.brand-subtitle {
  color: var(--muted);
  font-size: 0.76rem;
}

.nav-section, .control-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-title {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
  margin: 6px 8px;
}

.nav-item,
.secondary-btn,
.ghost-btn,
.primary-btn {
  border-radius: 12px;
  padding: 12px 14px;
  color: var(--text);
  transition: 0.2s ease;
}

.nav-item {
  background: transparent;
  border: 1px solid transparent;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(94, 252, 157, 0.14), rgba(94, 252, 157, 0.02));
  border-color: var(--border);
  box-shadow: inset 0 0 18px rgba(94, 252, 157, 0.08);
}

.control-panel {
  margin-top: auto;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  background: rgba(17, 27, 24, 0.86);
  border: 1px solid rgba(94, 252, 157, 0.15);
  border-radius: 12px;
  padding: 10px 12px;
}

.setting-row select {
  background: #08140d;
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 8px;
  padding: 6px 9px;
}

.primary-btn {
  background: linear-gradient(135deg, #43e891, #0fd773);
  color: #022714;
  font-weight: 800;
  box-shadow: 0 0 18px rgba(58, 246, 144, 0.45);
}

.primary-btn:hover, .secondary-btn:hover, .ghost-btn:hover, .nav-item:hover {
  transform: translateY(-1px);
}

.secondary-btn {
  background: rgba(94, 252, 157, 0.12);
  border: 1px solid rgba(94, 252, 157, 0.32);
  color: var(--primary);
}

.ghost-btn {
  background: transparent;
  border: 1px solid rgba(94, 252, 157, 0.2);
  color: var(--text);
}

.small-btn {
  padding: 10px 12px;
  font-size: 0.82rem;
}

.content-panel {
  flex: 1;
  padding: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.68rem;
}

.topbar h1, .section-header h2, .results-header h2 {
  margin: 0;
  font-size: clamp(1.8rem, 2vw, 2.4rem);
}

.status-wrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid rgba(94, 252, 157, 0.2);
  background: rgba(94, 252, 157, 0.04);
  border-radius: 999px;
  color: var(--muted);
}

.status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 12px rgba(94, 252, 157, 0.9);
}

.panel {
  display: block;
}

.hidden {
  display: none !important;
}

.chat-window {
  background: rgba(10, 16, 13, 0.86);
  border: 1px solid rgba(94, 252, 157, 0.18);
  border-radius: 24px;
  min-height: 440px;
  max-height: 58vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: inset 0 0 16px rgba(94, 252, 157, 0.05);
}

.message-row {
  display: flex;
  margin-bottom: 14px;
}

.message-row.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: min(78%, 620px);
  border-radius: 18px;
  padding: 14px 16px;
  line-height: 1.6;
  font-size: 0.96rem;
}

.message-row.ai .message-bubble {
  background: rgba(17, 27, 24, 0.92);
  border: 1px solid rgba(94, 252, 157, 0.16);
}

.message-row.user .message-bubble {
  background: linear-gradient(135deg, rgba(94, 252, 157, 0.2), rgba(24, 72, 47, 0.6));
  border: 1px solid rgba(94, 252, 157, 0.22);
}

.typing-indicator {
  display: inline-flex;
  gap: 7px;
  padding: 12px 14px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  animation: bounce 0.8s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.15s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 80%, 100% { opacity: 0.35; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-4px); }
}

.chat-input-wrap {
  margin-top: 18px;
}

.composer {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  background: rgba(9, 16, 14, 0.8);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 12px;
}

#messageInput {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  outline: none;
  min-height: 44px;
  resize: none;
  font-size: 1rem;
}

.composer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}

.saved-grid, .history-list {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}

.saved-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.profile-card, .history-card {
  background: rgba(16, 25, 21, 0.9);
  border: 1px solid rgba(94, 252, 157, 0.18);
  border-radius: 18px;
  padding: 16px;
}

.profile-card .profile-header, .history-card .history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.profile-meta, .history-meta {
  color: var(--muted);
  font-size: 0.82rem;
}

.metric-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(94, 252, 157, 0.14);
  color: var(--primary);
  font-size: 0.8rem;
}

.dashboard-panel {
  background: rgba(6, 10, 9, 0.84);
  border: 1px solid rgba(94, 252, 157, 0.18);
  border-radius: 24px;
  padding: 20px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.action-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.sensi-card {
  background: linear-gradient(180deg, rgba(15, 21, 18, 0.95), rgba(7, 12, 10, 0.96));
  border: 1px solid rgba(94, 252, 157, 0.18);
  border-radius: 18px;
  padding: 16px 14px;
}

.sensi-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--muted);
  font-size: 0.8rem;
  margin-bottom: 12px;
}

.sensi-value {
  font-weight: 900;
  font-size: clamp(1.8rem, 2vw, 2.5rem);
  color: var(--primary);
  text-shadow: 0 0 16px rgba(94, 252, 157, 0.45);
}

.progress-track {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 12px;
}

.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #3be38f 0%, #7afab0 100%);
  box-shadow: 0 0 10px rgba(94, 252, 157, 0.35);
}

.copy-btn {
  margin-top: 12px;
  width: 100%;
  border-radius: 10px;
  background: rgba(94, 252, 157, 0.08);
  border: 1px solid rgba(94, 252, 157, 0.2);
  color: var(--primary);
  padding: 8px 10px;
}

.analysis-box {
  margin-top: 24px;
  border: 1px solid rgba(94, 252, 157, 0.16);
  background: rgba(94, 252, 157, 0.04);
  border-radius: 18px;
  padding: 18px 20px;
}

.analysis-box h3 {
  margin-top: 0;
}

.split-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 22px;
}

.mini-card {
  background: rgba(14, 23, 19, 0.9);
  border: 1px solid rgba(94, 252, 157, 0.14);
  border-radius: 16px;
  padding: 16px;
}

.mini-card h4 {
  margin-top: 0;
  margin-bottom: 8px;
}

.results-actions {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 900px) {
  .app-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .content-panel {
    padding: 18px;
  }

  .results-header, .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 560px) {
  .composer {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-btn, .secondary-btn, .ghost-btn {
    width: 100%;
  }

  .message-bubble {
    max-width: 90%;
  }
}
