import { useState, useEffect } from 'react';
import './styles/global.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RutinasList from './pages/RutinasList';
import RutinaDetail from './pages/RutinaDetail';
import RutinaForm from './pages/RutinaForm';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : true;
  });

  const [currentPage, setCurrentPage] = useState('rutinas');
  const [selectedRutinaId, setSelectedRutinaId] = useState(null);
  const [editingRutinaId, setEditingRutinaId] = useState(null);

  // Guardar preferencia de tema
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Renderizar página actual
  const renderPage = () => {
    switch (currentPage) {
      case 'rutinas':
        return (
          <RutinasList
            onViewDetail={(id) => {
              setSelectedRutinaId(id);
              setCurrentPage('detalle');
            }}
            onEdit={(id) => {
              setEditingRutinaId(id);
              setCurrentPage('editar');
            }}
          />
        );
      case 'crear':
        return (
          <RutinaForm
            onSuccess={() => {
              setCurrentPage('rutinas');
            }}
          />
        );
      case 'detalle':
        return (
          <RutinaDetail
            rutinaId={selectedRutinaId}
            onBack={() => setCurrentPage('rutinas')}
            onEdit={() => {
              setEditingRutinaId(selectedRutinaId);
              setCurrentPage('editar');
            }}
          />
        );
      case 'editar':
        return (
          <RutinaForm
            rutinaId={editingRutinaId}
            onSuccess={() => {
              setCurrentPage('detalle');
              setSelectedRutinaId(editingRutinaId);
            }}
          />
        );
      default:
        return <RutinasList />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <main style={{ flex: 1, overflow: 'auto' }}>
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        {renderPage()}
      </main>
    </div>
  );
}