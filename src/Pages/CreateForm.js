// import { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function CreateForm() {

//     const [title, setTitle] = useState('');

//     const [themeColor, setThemeColor] = useState('#0d6efd');

//     const [fields, setFields] = useState([]);

//     const addField = (type) => {

//         setFields([
//             ...fields,
//             {
//                 type,
//                 label: '',
//                 options: []
//             }
//         ]);
//     };

//     const updateField = (index, key, value) => {

//         const updated = [...fields];

//         updated[index][key] = value;

//         setFields(updated);
//     };

//     const saveForm = async () => {

//         await axios.post(
//             'http://localhost:5000/create-form',
//             {
//                 title,
//                 themeColor,
//                 fields
//             }
//         );

//         alert('Form Created Successfully');
//     };

//     return (

//         <div className="container mt-4">

//             <div className="d-flex justify-content-between mb-4">

//                 <h2>Create Form</h2>

//                 <div>

//                     <Link
//                         to="/"
//                         className="btn btn-dark me-2"
//                     >
//                         Dashboard
//                     </Link>

//                 </div>

//             </div>

//             <div className="card p-4 shadow">

//                 <input
//                     className="form-control mb-3"
//                     placeholder="Form Title"
//                     onChange={(e) => setTitle(e.target.value)}
//                 />

//                 <label className="mb-2">
//                     Theme Color
//                 </label>

//                 <input
//                     type="color"
//                     className="form-control form-control-color mb-4"
//                     onChange={(e) => setThemeColor(e.target.value)}
//                 />

//                 <div className="mb-4">

//                     <button
//                         className="btn btn-primary me-2 mb-2"
//                         onClick={() => addField('text')}
//                     >
//                         Text
//                     </button>

//                     <button
//                         className="btn btn-success me-2 mb-2"
//                         onClick={() => addField('email')}
//                     >
//                         Email
//                     </button>

//                     <button
//                         className="btn btn-warning me-2 mb-2"
//                         onClick={() => addField('number')}
//                     >
//                         Number
//                     </button>

//                     <button
//                         className="btn btn-info me-2 mb-2"
//                         onClick={() => addField('date')}
//                     >
//                         Date
//                     </button>

//                     <button
//                         className="btn btn-secondary me-2 mb-2"
//                         onClick={() => addField('textarea')}
//                     >
//                         Textarea
//                     </button>

//                     <button
//                         className="btn btn-dark me-2 mb-2"
//                         onClick={() => addField('dropdown')}
//                     >
//                         Dropdown
//                     </button>

//                     <button
//                         className="btn btn-danger me-2 mb-2"
//                         onClick={() => addField('radio')}
//                     >
//                         Radio
//                     </button>

//                     <button
//                         className="btn btn-outline-primary mb-2"
//                         onClick={() => addField('checkbox')}
//                     >
//                         Checkbox
//                     </button>

//                 </div>

//                 {
//                     fields.map((field, index) => (

//                         <div
//                             key={index}
//                             className="card p-3 mb-3 border-0 shadow-sm"
//                         >

//                             <h5 className="mb-3">
//                                 {field.type.toUpperCase()} FIELD
//                             </h5>

//                             <input
//                                 className="form-control mb-3"
//                                 placeholder="Field Label"
//                                 onChange={(e) =>
//                                     updateField(
//                                         index,
//                                         'label',
//                                         e.target.value
//                                     )
//                                 }
//                             />

//                             {
//                                 ['dropdown', 'radio', 'checkbox']
//                                 .includes(field.type) && (

//                                     <input
//                                         className="form-control"
//                                         placeholder="Options comma separated"
//                                         onChange={(e) =>
//                                             updateField(
//                                                 index,
//                                                 'options',
//                                                 e.target.value.split(',')
//                                             )
//                                         }
//                                     />
//                                 )
//                             }

//                         </div>
//                     ))
//                 }

//                 <button
//                     className="btn btn-lg text-white"
//                     style={{
//                         backgroundColor: themeColor
//                     }}
//                     onClick={saveForm}
//                 >
//                     Save Form
//                 </button>

//             </div>

//         </div>
//     );
// }

// export default CreateForm;





import { useState } from 'react';
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
    --accent-glow: rgba(124,108,252,0.3);
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
    max-width: 800px;
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

  /* ── Buttons ── */
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
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    white-space: nowrap;
  }
  .fb-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  .fb-btn-dark    { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
  .fb-btn-accent  {
    background: var(--accent); color: #fff;
    padding: 0.8rem 2rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 10px;
    box-shadow: 0 0 24px var(--accent-glow);
    width: 100%;
    justify-content: center;
  }
  .fb-btn-accent:hover { box-shadow: 0 0 36px var(--accent-glow); }

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

  /* ── Form controls ── */
  .fb-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin-bottom: 0.45rem;
  }

  .fb-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.7rem 1rem;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.95rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .fb-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  .fb-input::placeholder { color: var(--muted); }

  /* Color row */
  .fb-color-row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .fb-color-swatch {
    width: 42px; height: 42px;
    border-radius: 8px;
    border: 2px solid var(--border);
    cursor: pointer;
    overflow: hidden;
    flex-shrink: 0;
    transition: transform 0.15s;
  }
  .fb-color-swatch:hover { transform: scale(1.05); }
  .fb-color-swatch input[type="color"] {
    width: 200%; height: 200%;
    margin: -50%;
    border: none;
    cursor: pointer;
    background: none;
  }
  .fb-color-preview {
    font-size: 0.85rem;
    color: var(--muted);
    font-family: monospace;
  }

  /* ── Field type buttons ── */
  .fb-type-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin-bottom: 0.6rem;
  }

  .fb-type-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .fb-type-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.9rem;
    border-radius: 7px;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--surface2);
    color: var(--text);
    transition: all 0.15s;
    letter-spacing: 0.02em;
  }
  .fb-type-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(124,108,252,0.08);
  }

  /* ── Field cards ── */
  .fb-fields { display: flex; flex-direction: column; gap: 0.85rem; }

  .fb-field-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.1rem 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    animation: slideIn 0.2s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fb-field-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fb-field-type-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    background: rgba(124,108,252,0.12);
    border: 1px solid rgba(124,108,252,0.25);
    padding: 0.2rem 0.55rem;
    border-radius: 5px;
  }

  .fb-field-remove {
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-size: 1rem;
    padding: 0.2rem 0.4rem;
    border-radius: 5px;
    transition: color 0.15s, background 0.15s;
  }
  .fb-field-remove:hover { color: var(--danger); background: rgba(248,113,113,0.1); }

  .fb-divider {
    height: 1px;
    background: var(--border);
    border: none;
  }

  @media (max-width: 520px) {
    .fb-wrap { padding: 1.25rem 1rem; }
    .fb-panel { padding: 1.25rem; gap: 1.25rem; }
    .fb-btn-accent { padding: 0.75rem 1.5rem; }
  }
`;

const FIELD_TYPES = [
  { type: 'text',     icon: 'T', label: 'Text' },
  { type: 'email',    icon: '@', label: 'Email' },
  { type: 'number',   icon: '#', label: 'Number' },
  { type: 'date',     icon: '▦', label: 'Date' },
  { type: 'textarea', icon: '¶', label: 'Textarea' },
  { type: 'dropdown', icon: '▾', label: 'Dropdown' },
  { type: 'radio',    icon: '◉', label: 'Radio' },
  { type: 'checkbox', icon: '☑', label: 'Checkbox' },
];

function CreateForm() {
  const [title, setTitle]           = useState('');
  const [themeColor, setThemeColor] = useState('#7c6cfc');
  const [fields, setFields]         = useState([]);

  const addField = (type) => setFields([...fields, { type, label: '', options: [] }]);

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const removeField = (index) => setFields(fields.filter((_, i) => i !== index));

  const saveForm = async () => {
    await axios.post('http://localhost:5000/create-form', { title, themeColor, fields });
    alert('Form Created Successfully');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fb-wrap">

        <header className="fb-header">
          <h2 className="fb-heading">Create Form</h2>
          <Link to="/" className="fb-btn fb-btn-dark">← Dashboard</Link>
        </header>

        <div className="fb-panel">

          {/* Title */}
          <div>
            <label className="fb-label">Form Title</label>
            <input
              className="fb-input"
              placeholder="e.g. Customer Feedback Survey"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Theme color */}
          <div>
            <label className="fb-label">Theme Color</label>
            <div className="fb-color-row">
              <span className="fb-color-swatch" style={{ background: themeColor }}>
                <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} />
              </span>
              <span className="fb-color-preview">{themeColor}</span>
            </div>
          </div>

          <hr className="fb-divider" />

          {/* Field type buttons */}
          <div>
            <p className="fb-type-label">Add Fields</p>
            <div className="fb-type-grid">
              {FIELD_TYPES.map(({ type, icon, label }) => (
                <button key={type} className="fb-type-btn" onClick={() => addField(type)}>
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Field cards */}
          {fields.length > 0 && (
            <div className="fb-fields">
              {fields.map((field, index) => (
                <div className="fb-field-card" key={index}>
                  <div className="fb-field-head">
                    <span className="fb-field-type-tag">
                      {FIELD_TYPES.find(f => f.type === field.type)?.icon} {field.type}
                    </span>
                    <button className="fb-field-remove" onClick={() => removeField(index)} title="Remove field">✕</button>
                  </div>

                  <input
                    className="fb-input"
                    placeholder="Field label"
                    value={field.label}
                    onChange={(e) => updateField(index, 'label', e.target.value)}
                  />

                  {['dropdown', 'radio', 'checkbox'].includes(field.type) && (
                    <input
                      className="fb-input"
                      placeholder="Options, comma-separated (e.g. Yes, No, Maybe)"
                      onChange={(e) => updateField(index, 'options', e.target.value.split(','))}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <hr className="fb-divider" />

          <button
            className="fb-btn fb-btn-accent"
            style={{ background: themeColor, boxShadow: `0 0 24px ${themeColor}55` }}
            onClick={saveForm}
          >
            Save Form
          </button>

        </div>
      </div>
    </>
  );
}

export default CreateForm;