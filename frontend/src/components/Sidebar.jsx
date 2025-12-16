import './Sidebar.css';

export default function Sidebar({ currentPage, onNavigate, isDark, onToggleTheme }) {
  const menuItems = [
    { id: 'rutinas', label: '📋 Mis Rutinas', icon: '📋' },
    { id: 'crear', label: '➕ Nueva Rutina', icon: '➕' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">💪</span>
          <span className="logo-text">Gym</span>
        </div>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="version-info">
          <span>v1.0.0</span>
        </button>
      </div>
    </aside>
  );
}