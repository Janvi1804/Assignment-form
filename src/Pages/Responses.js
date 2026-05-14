import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg: #0e0e12;
    --surface: #16161e;
    --surface2: #1e1e2a;
    --border: rgba(255,255,255,0.07);
    --accent: #7c6cfc;
    --text: #f0f0f5;
    --muted: #8888a8;
    --success: #34d399;
    --warning: #fbbf24;
    --code-bg: #0b0b0f;
    --radius: 14px;
    --font-head: 'Sora', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    min-height: 100vh;
  }

  .fb-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
  }

  .fb-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.5rem;
    padding-bottom: 1.75rem;
    border-bottom: 1px solid var(--border);
  }

  .fb-heading {
    font-family: var(--font-head);
    font-size: clamp(1.35rem, 4vw, 1.9rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #fff 40%, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .fb-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 1.1rem;
    border-radius: 8px;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    text-decoration: none;
    transition: opacity 0.15s, transform 0.15s;
    white-space: nowrap;
  }
  .fb-btn:hover { opacity: 0.85; transform: translateY(-1px); }
  .fb-btn-dark    { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
  .fb-btn-warning { background: var(--warning); color: #0e0e12; }

  /* Badge */
  .fb-badge {
    display: inline-flex;
    align-items: center;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.78rem;
    color: var(--muted);
    gap: 0.35rem;
  }
  .fb-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }

  /* Response cards */
  .fb-responses { display: flex; flex-direction: column; gap: 1.25rem; }

  .fb-response-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .fb-response-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.35); }

  .fb-response-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.2rem;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
  }
  .fb-response-num {
    font-family: var(--font-head);
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Structured field list */
  .fb-field-list { padding: 1.1rem 1.2rem; display: flex; flex-direction: column; gap: 0.75rem; }

  .fb-field-row {
    display: grid;
    grid-template-columns: minmax(120px, 35%) 1fr;
    gap: 0.75rem;
    align-items: start;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    background: var(--code-bg);
    border: 1px solid var(--border);
  }
  .fb-field-key {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent);
    font-family: var(--font-mono);
    overflow-wrap: break-word;
  }
  .fb-field-val {
    font-size: 0.85rem;
    color: var(--text);
    font-family: var(--font-mono);
    overflow-wrap: break-word;
  }

  /* Raw JSON toggle */
  .fb-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: none;
    border: none;
    color: var(--muted);
    font-size: 0.78rem;
    font-family: var(--font-body);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    transition: color 0.15s, background 0.15s;
  }
  .fb-toggle-btn:hover { color: var(--text); background: var(--border); }

  .fb-pre {
    margin: 0 1.2rem 1.2rem;
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    line-height: 1.6;
    color: var(--success);
    overflow-x: auto;
    white-space: pre;
  }

  /* Empty */
  .fb-empty {
    text-align: center;
    padding: 5rem 1rem;
    color: var(--muted);
  }
  .fb-empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.35; }

  @media (max-width: 520px) {
    .fb-wrap { padding: 1.25rem 1rem; }
    .fb-field-row { grid-template-columns: 1fr; gap: 0.25rem; }
    .fb-field-key::after { content: ':'; }
  }
`;

function ResponseCard({ response, index }) {
  const [showRaw, setShowRaw] = useState(false);
  const data = JSON.parse(response.ResponseData);
  const entries = Object.entries(data);

  return (
    <div className="fb-response-card">
      <div className="fb-response-top">
        <span className="fb-response-num">Response #{index + 1}</span>
        <button className="fb-toggle-btn" onClick={() => setShowRaw(v => !v)}>
          {showRaw ? '⊟ Fields' : '{ } Raw JSON'}
        </button>
      </div>

      {showRaw ? (
        <pre className="fb-pre">{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div className="fb-field-list">
          {entries.map(([key, val]) => (
            <div className="fb-field-row" key={key}>
              <span className="fb-field-key">{key}</span>
              <span className="fb-field-val">{String(val)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Responses() {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => { fetchResponses(); }, []);

  const fetchResponses = async () => {
    const res = await axios.get(`http://assignment-form.onrender.com/responses/${id}`);
    setResponses(res.data);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fb-wrap">

        <header className="fb-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 className="fb-heading">Responses</h2>
            <span className="fb-badge">
              <span className="fb-badge-dot" />
              {responses.length} total
            </span>
          </div>
          <Link to="/" className="fb-btn fb-btn-dark">← Dashboard</Link>
        </header>

        {responses.length === 0 ? (
          <div className="fb-empty">
            <div className="fb-empty-icon">◌</div>
            <p>No responses yet</p>
          </div>
        ) : (
          <div className="fb-responses">
            {responses.map((r, i) => (
              <ResponseCard key={r.Id} response={r} index={i} />
            ))}
          </div>
        )}

      </div>
    </>
  );
}

export default Responses;
