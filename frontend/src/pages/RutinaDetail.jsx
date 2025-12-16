import { useState, useEffect } from 'react';
import { rutinasAPI, ejerciciosAPI } from '../services/api';
import EjercicioItem from '../components/EjercicioItem';
import './RutinaDetail.css';

export default function RutinaDetail({ rutinaId, onBack, onEdit }) {
  const [rutina, setRutina] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarRutina();
  }, [rutinaId]);

  const cargarRutina = async () => {
    setLoading(true);
    setError(null);
    try {
      const datos = await rutinasAPI.obtenerPorId(rutinaId);
      setRutina(datos);
    } catch (err) {
      setError('Error al cargar la rutina');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const agruparEjerciciosPorDia = (ejercicios) => {
    const dias = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];

    const agrupados = {};
    dias.forEach((dia) => {
      agrupados[dia] = [];
    });

    ejercicios.forEach((ej) => {
      if (agrupados[ej.dia_semana]) {
        agrupados[ej.dia_semana].push(ej);
      }
    });

    return agrupados;
  };

  const handleDeleteEjercicio = async (id) => {
    if (window.confirm('¿Eliminar este ejercicio?')) {
      try {
        await ejerciciosAPI.eliminar(id);
        cargarRutina();
      } catch (err) {
        alert('Error al eliminar el ejercicio');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando rutina...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Volver
        </button>
      </div>
    );
  }

  if (!rutina) {
    return (
      <div className="page-container">
        <div className="error-message">Rutina no encontrada</div>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Volver
        </button>
      </div>
    );
  }

  const ejerciciosPorDia = agruparEjerciciosPorDia(rutina.ejercicios || []);
  const diasConEjercicios = Object.entries(ejerciciosPorDia).filter(
    ([, ejercicios]) => ejercicios.length > 0
  );

  return (
    <div className="page-container">
      <div className="detail-header">
        <button className="btn-back" onClick={onBack}>
          ← Volver
        </button>
        <div className="detail-title-section">
          <h2>{rutina.nombre}</h2>
          {rutina.descripcion && <p className="detail-description">{rutina.descripcion}</p>}
        </div>
        <button className="btn btn-primary" onClick={onEdit}>
          ✏️ Editar Rutina
        </button>
      </div>

      {diasConEjercicios.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Sin ejercicios</h3>
          <p>Esta rutina no tiene ejercicios asignados</p>
          <button className="btn btn-primary" onClick={onEdit}>
            Agregar ejercicios
          </button>
        </div>
      ) : (
        <div className="ejercicios-container">
          {diasConEjercicios.map(([dia, ejercicios]) => (
            <div key={dia} className="dia-section">
              <h3 className="dia-title">
                <span className="dia-icon">📅</span>
                {dia}
              </h3>
              <div className="ejercicios-list">
                {ejercicios
                  .sort((a, b) => a.orden - b.orden)
                  .map((ejercicio) => (
                    <EjercicioItem
                      key={ejercicio.id}
                      ejercicio={ejercicio}
                      onDelete={() => handleDeleteEjercicio(ejercicio.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}