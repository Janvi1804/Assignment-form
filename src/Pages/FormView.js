// import { useEffect, useState } from 'react';

// import axios from 'axios';

// import { useParams, Link } from 'react-router-dom';

// function FormView() {

//     const { id } = useParams();

//     const [form, setForm] = useState(null);

//     const [fields, setFields] = useState([]);

//     const [responses, setResponses] = useState({});

//     useEffect(() => {
//         fetchForm();
//     }, []);

//     const fetchForm = async () => {

//         const res = await axios.get(
//             `http://localhost:5000/form/${id}`
//         );

//         setForm(res.data.form);

//         setFields(res.data.fields);
//     };

//     const handleChange = (label, value) => {

//         setResponses({
//             ...responses,
//             [label]: value
//         });
//     };

//     const submitForm = async () => {

//         await axios.post(
//             'http://localhost:5000/submit-response',
//             {
//                 formId: id,
//                 responseData: responses
//             }
//         );

//         alert('Form Submitted');
//     };

//     return (

//         <div className="container mt-4">

//             <div className="d-flex justify-content-between mb-4">

//                 <h2
//                     style={{
//                         color: form?.ThemeColor
//                     }}
//                 >
//                     {form?.Title}
//                 </h2>

//                 <div>

//                     <Link
//                         to="/"
//                         className="btn btn-dark me-2"
//                     >
//                         Dashboard
//                     </Link>

//                     <Link
//                         to={`/responses/${id}`}
//                         className="btn btn-warning"
//                     >
//                         Responses
//                     </Link>

//                 </div>

//             </div>

//             <div className="card p-4 shadow">

//                 {
//                     fields.map((field, index) => (

//                         <div
//                             className="mb-4"
//                             key={index}
//                         >

//                             <label className="form-label fw-bold">
//                                 {field.Label}
//                             </label>

//                             {
//                                 ['text', 'email', 'number', 'date']
//                                 .includes(field.FieldType) && (

//                                     <input
//                                         type={field.FieldType}
//                                         className="form-control"
//                                         onChange={(e) =>
//                                             handleChange(
//                                                 field.Label,
//                                                 e.target.value
//                                             )
//                                         }
//                                     />
//                                 )
//                             }

//                             {
//                                 field.FieldType === 'textarea' && (

//                                     <textarea
//                                         className="form-control"
//                                         rows="4"
//                                         onChange={(e) =>
//                                             handleChange(
//                                                 field.Label,
//                                                 e.target.value
//                                             )
//                                         }
//                                     />
//                                 )
//                             }

//                             {
//                                 field.FieldType === 'dropdown' && (

//                                     <select
//                                         className="form-select"
//                                         onChange={(e) =>
//                                             handleChange(
//                                                 field.Label,
//                                                 e.target.value
//                                             )
//                                         }
//                                     >

//                                         <option>
//                                             Select
//                                         </option>

//                                         {
//                                             JSON.parse(field.OptionsData)
//                                             .map((opt, i) => (

//                                                 <option key={i}>
//                                                     {opt}
//                                                 </option>
//                                             ))
//                                         }

//                                     </select>
//                                 )
//                             }

//                             {
//                                 ['radio', 'checkbox']
//                                 .includes(field.FieldType) && (

//                                     JSON.parse(field.OptionsData)
//                                     .map((opt, i) => (

//                                         <div
//                                             className="form-check"
//                                             key={i}
//                                         >

//                                             <input
//                                                 type={field.FieldType}
//                                                 className="form-check-input"
//                                                 name={field.Label}
//                                                 value={opt}

//                                                 onChange={(e) =>
//                                                     handleChange(
//                                                         field.Label,
//                                                         e.target.value
//                                                     )
//                                                 }
//                                             />

//                                             <label className="form-check-label">
//                                                 {opt}
//                                             </label>

//                                         </div>
//                                     ))
//                                 )
//                             }

//                         </div>
//                     ))
//                 }

//                 <button
//                     className="btn btn-lg text-white"
//                     style={{
//                         backgroundColor: form?.ThemeColor
//                     }}
//                     onClick={submitForm}
//                 >
//                     Submit Form
//                 </button>

//             </div>

//         </div>
//     );
// }

// export default FormView;









import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');

  :root {
    --bg: #0e0e12;
    --surface: #16161e;
    --surface2: #1e1e2a;
    --border: rgba(255,255,255,0.07);
    --accent: #7c6cfc;
    --accent-glow: rgba(124,108,252,0.3);
    --text: #f0f0f5;
    --muted: #8888a8;
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
    max-width: 700px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
  }

  .fb-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.5rem;
    padding-bottom: 1.75rem;
    border-bottom: 1px solid var(--border);
  }

  .fb-form-title {
    font-family: var(--font-head);
    font-size: clamp(1.35rem, 4vw, 1.9rem);
    font-weight: 800;
    letter-spacing: -0.03em;
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
  .fb-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  .fb-btn-dark    { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
  .fb-btn-warning { background: #fbbf24; color: #0e0e12; }

  .fb-nav-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }

  /* ── Panel ── */
  .fb-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ── Field ── */
  .fb-field { display: flex; flex-direction: column; gap: 0.5rem; }

  .fb-field-label {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
  }

  .fb-input, .fb-textarea, .fb-select {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.7rem 1rem;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .fb-input:focus, .fb-textarea:focus, .fb-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  .fb-input::placeholder, .fb-textarea::placeholder { color: var(--muted); }
  .fb-textarea { resize: vertical; min-height: 100px; }

  .fb-select option { background: var(--surface2); }

  /* Radio / Checkbox */
  .fb-choice-list { display: flex; flex-direction: column; gap: 0.5rem; }

  .fb-choice-item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.6rem 0.85rem;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .fb-choice-item:hover {
    border-color: var(--accent);
    background: rgba(124,108,252,0.06);
  }
  .fb-choice-item input[type="radio"],
  .fb-choice-item input[type="checkbox"] {
    accent-color: var(--accent);
    width: 16px; height: 16px;
    cursor: pointer;
    flex-shrink: 0;
  }
  .fb-choice-label { font-size: 0.88rem; cursor: pointer; }

  .fb-divider { height: 1px; background: var(--border); border: none; }

  /* Submit button */
  .fb-submit {
    width: 100%;
    padding: 0.9rem 2rem;
    border: none;
    border-radius: 10px;
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    letter-spacing: -0.01em;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
  }
  .fb-submit:hover { opacity: 0.9; transform: translateY(-2px); }
  .fb-submit:active { transform: translateY(0); }

  /* Skeleton loader */
  .fb-skeleton {
    background: linear-gradient(90deg, var(--surface2) 25%, var(--surface) 50%, var(--surface2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }
  @keyframes shimmer { to { background-position: -200% 0; } }

  @media (max-width: 520px) {
    .fb-wrap { padding: 1.25rem 1rem; }
    .fb-panel { padding: 1.25rem; gap: 1.25rem; }
  }
`;

function FormView() {
  const { id } = useParams();
  const [form, setForm]           = useState(null);
  const [fields, setFields]       = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { fetchForm(); }, []);

  const fetchForm = async () => {
    const res = await axios.get(`http://localhost:5000/form/${id}`);
    setForm(res.data.form);
    setFields(res.data.fields);
  };

  const handleChange = (label, value) => setResponses({ ...responses, [label]: value });

  const submitForm = async () => {
    await axios.post('http://localhost:5000/submit-response', { formId: id, responseData: responses });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <style>{styles}</style>
        <div className="fb-wrap" style={{ textAlign: 'center', paddingTop: '6rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Form Submitted!
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Thank you for your response.</p>
          <Link to="/" className="fb-btn fb-btn-dark">← Back to Dashboard</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="fb-wrap">

        <header className="fb-header">
          {form ? (
            <h2 className="fb-form-title" style={{ color: form.ThemeColor }}>{form.Title}</h2>
          ) : (
            <div className="fb-skeleton" style={{ height: '2rem', width: '55%' }} />
          )}
          <div className="fb-nav-actions">
            <Link to="/" className="fb-btn fb-btn-dark">Dashboard</Link>
            <Link to={`/responses/${id}`} className="fb-btn fb-btn-warning">Responses</Link>
          </div>
        </header>

        <div className="fb-panel">
          {fields.length === 0 ? (
            <>
              {[1,2,3].map(i => (
                <div key={i} className="fb-field">
                  <div className="fb-skeleton" style={{ height: '0.9rem', width: '30%' }} />
                  <div className="fb-skeleton" style={{ height: '2.5rem' }} />
                </div>
              ))}
            </>
          ) : (
            <>
              {fields.map((field, index) => (
                <div className="fb-field" key={index}>
                  <label className="fb-field-label">{field.Label}</label>

                  {['text','email','number','date'].includes(field.FieldType) && (
                    <input
                      type={field.FieldType}
                      className="fb-input"
                      onChange={(e) => handleChange(field.Label, e.target.value)}
                    />
                  )}

                  {field.FieldType === 'textarea' && (
                    <textarea
                      className="fb-textarea"
                      rows="4"
                      onChange={(e) => handleChange(field.Label, e.target.value)}
                    />
                  )}

                  {field.FieldType === 'dropdown' && (
                    <select className="fb-select" onChange={(e) => handleChange(field.Label, e.target.value)}>
                      <option value="">Select an option</option>
                      {JSON.parse(field.OptionsData).map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {['radio','checkbox'].includes(field.FieldType) && (
                    <div className="fb-choice-list">
                      {JSON.parse(field.OptionsData).map((opt, i) => (
                        <label className="fb-choice-item" key={i}>
                          <input
                            type={field.FieldType}
                            name={field.Label}
                            value={opt}
                            onChange={(e) => handleChange(field.Label, e.target.value)}
                          />
                          <span className="fb-choice-label">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <hr className="fb-divider" />

              <button
                className="fb-submit"
                style={{
                  background: form?.ThemeColor || 'var(--accent)',
                  boxShadow: `0 4px 24px ${form?.ThemeColor || '#7c6cfc'}55`
                }}
                onClick={submitForm}
              >
                Submit Form
              </button>
            </>
          )}
        </div>

      </div>
    </>
  );
}

export default FormView;