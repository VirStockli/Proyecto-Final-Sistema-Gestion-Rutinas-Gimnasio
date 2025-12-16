import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder || 'Buscar...'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            className="search-clear"
            onClick={() => onChange('')}
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}