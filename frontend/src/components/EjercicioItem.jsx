import './EjercicioItem.css';

export default function EjercicioItem({ ejercicio, onDelete }) {
  return (
    <div className="ejercicio-item">
      <div className="ejercicio-header">
        <h4 className="ejercicio-nombre">{ejercicio.nombre}</h4>
        <button
          className="btn-delete-small"
          onClick={onDelete}
          title="Eliminar ejercicio"
        >
          ✕
        </button>
      </div>

      <div className="ejercicio-stats">
        <div className="stat">
          <span className="stat-label">Series</span>
          <span className="stat-value">{ejercicio.series}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Repeticiones</span>
          <span className="stat-value">{ejercicio.repeticiones}</span>
        </div>
        {ejercicio.peso && (
          <div className="stat">
            <span className="stat-label">Peso</span>
            <span className="stat-value">{ejercicio.peso} kg</span>
          </div>
        )}
      </div>

      {ejercicio.notas && (
        <div className="ejercicio-notas">
          <span className="notas-label">📝 Notas:</span>
          <p className="notas-texto">{ejercicio.notas}</p>
        </div>
      )}
    </div>
  );
}