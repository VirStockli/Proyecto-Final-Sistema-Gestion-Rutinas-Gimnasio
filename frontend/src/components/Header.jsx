import './Header.css';

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">💪 Gym Routines</h1>
          <p className="header-subtitle">Gestiona tus rutinas de entrenamiento</p>
        </div>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}