// import { useEffect, useState } from 'react';

// import axios from 'axios';

// import { Link } from 'react-router-dom';

// function Dashboard() {

//     const [forms, setForms] = useState([]);

//     useEffect(() => {
//         fetchForms();
//     }, []);

//     const fetchForms = async () => {

//         const res = await axios.get(
//             'http://localhost:5000/forms'
//         );

//         setForms(res.data);
//     };

//     const deleteForm = async (id) => {

//         await axios.delete(
//             `http://localhost:5000/delete-form/${id}`
//         );

//         fetchForms();
//     };

//     return (

//         <div className="container mt-4">

//             <div className="d-flex justify-content-between align-items-center mb-4">

//                 <h1 className="fw-bold">
//                     Dynamic Form Builder
//                 </h1>

//                 <Link
//                     to="/create"
//                     className="btn btn-primary btn-lg"
//                 >
//                     Create Form
//                 </Link>

//             </div>

//             <div className="row">

//                 {
//                     forms.map((form) => (

//                         <div
//                             className="col-md-4 mb-4"
//                             key={form.Id}
//                         >

//                             <div className="card shadow border-0 h-100">

//                                 <div
//                                     className="card-header text-white"
//                                     style={{
//                                         backgroundColor: form.ThemeColor
//                                     }}
//                                 >

//                                     <h5>
//                                         {form.Title}
//                                     </h5>

//                                 </div>

//                                 <div className="card-body">

//                                     <p>
//                                         Created dynamic form
//                                     </p>

//                                     <Link
//                                         to={`/form/${form.Id}`}
//                                         className="btn btn-success me-2"
//                                     >
//                                         Open
//                                     </Link>

//                                     <Link
//                                         to={`/responses/${form.Id}`}
//                                         className="btn btn-warning me-2"
//                                     >
//                                         Responses
//                                     </Link>

//                                     <button
//                                         className="btn btn-danger"
//                                         onClick={() =>
//                                             deleteForm(form.Id)
//                                         }
//                                     >
//                                         Delete
//                                     </button>

//                                 </div>

//                             </div>

//                         </div>
//                     ))
//                 }

//             </div>

//         </div>
//     );
// }

// export default Dashboard;




import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');

  :root {
    --bg: #0e0e12;
    --surface: #16161e;
    --surface2: #1e1e2a;
    --border: rgba(255,255,255,0.07);
    --accent: #7c6cfc;
    --accent-glow: rgba(124,108,252,0.35);
    --text: #f0f0f5;
    --muted: #8888a8;
    --success: #34d399;
    --warning: #fbbf24;
    --danger: #f87171;
    --radius: 14px;
    --font-head: 'Sora', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    min-height: 100vh;
  }

  .fb-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
  }

  /* ── Header ── */
  .fb-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border);
  }

  .fb-title {
    font-family: var(--font-head);
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #fff 40%, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Buttons ── */
  .fb-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.25rem;
    border-radius: 8px;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    text-decoration: none;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    white-space: nowrap;
  }
  .fb-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .fb-btn:active { transform: translateY(0); }

  .fb-btn-primary {
    background: var(--accent);
    color: #fff;
    box-shadow: 0 0 20px var(--accent-glow);
  }
  .fb-btn-primary:hover { box-shadow: 0 0 28px var(--accent-glow); }

  .fb-btn-success { background: var(--success); color: #0e0e12; }
  .fb-btn-warning { background: var(--warning); color: #0e0e12; }
  .fb-btn-danger  { background: transparent; color: var(--danger); border: 1px solid var(--danger); }
  .fb-btn-danger:hover { background: rgba(248,113,113,0.1); }

  /* ── Grid ── */
  .fb-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: 1.5rem;
  }

  /* ── Card ── */
  .fb-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .fb-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }

  .fb-card-header {
    padding: 1.1rem 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .fb-card-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    flex-shrink: 0;
  }
  .fb-card-title {
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.01em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fb-card-body {
    padding: 1.25rem 1.4rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .fb-card-meta {
    font-size: 0.8rem;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .fb-card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
  }

  /* ── Empty state ── */
  .fb-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 5rem 1rem;
    color: var(--muted);
  }
  .fb-empty-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.4; }
  .fb-empty-text { font-size: 1rem; }

  @media (max-width: 480px) {
    .fb-wrap { padding: 1.25rem 1rem; }
    .fb-header { margin-bottom: 2rem; }
    .fb-card-actions { gap: 0.4rem; }
    .fb-btn { padding: 0.55rem 1rem; font-size: 0.82rem; }
  }
`;

function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => { fetchForms(); }, []);

  const fetchForms = async () => {
    const res = await axios.get('http://localhost:5000/forms');
    setForms(res.data);
  };

  const deleteForm = async (id) => {
    await axios.delete(`http://localhost:5000/delete-form/${id}`);
    fetchForms();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fb-wrap">

        <header className="fb-header">
          <h1 className="fb-title">Dynamic Form Builder</h1>
          <Link to="/create" className="fb-btn fb-btn-primary">
            + Create Form
          </Link>
        </header>

        <div className="fb-grid">
          {forms.length === 0 ? (
            <div className="fb-empty">
              <div className="fb-empty-icon">⬡</div>
              <p className="fb-empty-text">No forms yet — create your first one!</p>
            </div>
          ) : (
            forms.map((form) => (
              <div className="fb-card" key={form.Id}>
                <div className="fb-card-header" style={{ backgroundColor: form.ThemeColor }}>
                  <span className="fb-card-dot" />
                  <span className="fb-card-title">{form.Title}</span>
                </div>
                <div className="fb-card-body">
                  <p className="fb-card-meta">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 13h4"/></svg>
                    Dynamic form
                  </p>
                  <div className="fb-card-actions">
                    <Link to={`/form/${form.Id}`}       className="fb-btn fb-btn-success">Open</Link>
                    <Link to={`/responses/${form.Id}`}  className="fb-btn fb-btn-warning">Responses</Link>
                    <button className="fb-btn fb-btn-danger" onClick={() => deleteForm(form.Id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}

export default Dashboard;