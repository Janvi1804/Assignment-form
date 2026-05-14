import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import CreateForm from './Pages/CreateForm';
import FormView from './Pages/FormView';
import Responses from './Pages/Responses';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/create" element={<CreateForm />} />

        <Route path="/form/:id" element={<FormView />} />

        <Route path="/responses/:id" element={<Responses />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;