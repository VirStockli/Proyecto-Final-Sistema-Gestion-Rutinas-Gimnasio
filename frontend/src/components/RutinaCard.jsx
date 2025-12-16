import './RutinaCard.css';

export default function RutinaCard({ rutina, onView, onEdit, onDelete }) {
  const fechaFormato = new Date(rutina.fecha_creacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const ejerciciosCount = rutina.ejercicios?.length || 0;

  return (
    <div className="rutina-card animate-slide-in">
      <div className="card-header">
        <h3 className="card-title">{rutina.nombre}</h3>
        <div className="card-badge">{ejerciciosCount} ejercicios</div>
      </div>

      {rutina.descripcion && (
        <p className="card-description">{rutina.descripcion}</p>
      )}

      <div className="card-info">
        <div className="info-item">
          <span className="info-icon">📅</span>
          <span className="info-text">{fechaFormato}</span>
        </div>
        {ejerciciosCount > 0 && (
          <div className="info-item">
            <span className="info-icon">💪</span>
            <span className="info-text">{ejerciciosCount} ejercicios</span>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-primary btn-small" onClick={onView}>
          👁️ Ver Detalle
        </button>
        <button className="btn btn-secondary btn-small" onClick={onEdit}>
          ✏️ Editar
        </button>
        <button className="btn btn-danger btn-small" onClick={onDelete}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}