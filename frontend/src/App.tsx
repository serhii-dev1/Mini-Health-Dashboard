
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientList } from './components/PatientList';
import { PatientDetail } from './components/PatientDetail';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
