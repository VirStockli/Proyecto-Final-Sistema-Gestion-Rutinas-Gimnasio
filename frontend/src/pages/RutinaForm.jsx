import { useState, useEffect } from 'react';
import { rutinasAPI, ejerciciosAPI } from '../services/api';
import EjercicioForm from '../components/EjercicioForm';
import './RutinaForm.css';

export default function RutinaForm({ rutinaId, onSuccess }) {
  const [rutina, setRutina] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEjercicioForm, setShowEjercicioForm] = useState(false);
  const [editingEjercicio, setEditingEjercicio] = useState(null);

  useEffect(() => {
    if (rutinaId) {
      cargarRutina();
    }
  }, [rutinaId]);

  const cargarRutina = async () => {
    setLoading(true);
    try {
      const datos = await rutinasAPI.obtenerPorId(rutinaId);
      setRutina(datos);
      setFormData({ nombre: datos.nombre, descripcion: datos.descripcion });
      setEjercicios(datos.ejercicios || []);
    } catch (err) {
      setError('Error al cargar la rutina');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRutina = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (rutinaId) {
        await rutinasAPI.actualizar(rutinaId, formData);
      } else {
        await rutinasAPI.crear(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.detail || 'Error al guardar la rutina');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEjercicio = async (datoEjercicio) => {
    try {
      if (editingEjercicio) {
        const actualizado = await ejerciciosAPI.actualizar(
          editingEjercicio.id,
          datoEjercicio
        );
        setEjercicios(
          ejercicios.map((e) => (e.id === editingEjercicio.id ? actualizado : e))
        );
      } else if (rutinaId) {
        const nuevo = await ejerciciosAPI.crear(rutinaId, datoEjercicio);
        setEjercicios([...ejercicios, nuevo]);
      } else {
        // Agregar localmente si aún no se guardó la rutina
        setEjercicios([
          ...ejercicios,
          { ...datoEjercicio, id: Date.now(), rutina_id: null },
        ]);
      }
      setShowEjercicioForm(false);
      setEditingEjercicio(null);
    } catch (err) {
      setError('Error al agregar/actualizar ejercicio');
      console.error(err);
    }
  };

  const handleDeleteEjercicio = async (id) => {
    if (window.confirm('¿Eliminar este ejercicio?')) {
      try {
        if (id > 1000) {
          // Temporal (generado localmente)
          setEjercicios(ejercicios.filter((e) => e.id !== id));
        } else {
          await ejerciciosAPI.eliminar(id);
          setEjercicios(ejercicios.filter((e) => e.id !== id));
        }
      } catch (err) {
        setError('Error al eliminar el ejercicio');
        console.error(err);
      }
    }
  };

  const handleEditEjercicio = (ejercicio) => {
    setEditingEjercicio(ejercicio);
    setShowEjercicioForm(true);
  };

  if (loading && rutinaId) {
    return (
      <div className="page-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-container form-rutina">
        <h2>{rutinaId ? '✏️ Editar Rutina' : '➕ Nueva Rutina'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmitRutina}>
          <div className="form-group">
            <label className="form-label">Nombre de la Rutina</label>
            <input
              type="text"
              name="nombre"
              className="form-input"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="ej: Push Day, Pull Day..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción (opcional)</label>
            <textarea
              name="descripcion"
              className="form-textarea"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe los objetivos de esta rutina..."
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !formData.nombre.trim()}
          >
            💾 Guardar Rutina
          </button>
        </form>
      </div>

      {rutinaId && (
        <div className="ejercicios-management">
          <div className="exercises-header">
            <h3>Ejercicios de la Rutina</h3>
            <button
              className="btn btn-secondary btn-small"
              onClick={() => {
                setEditingEjercicio(null);
                setShowEjercicioForm(!showEjercicioForm);
              }}
            >
              {showEjercicioForm ? '✕ Cancelar' : '➕ Agregar Ejercicio'}
            </button>
          </div>

          {showEjercicioForm && (
            <EjercicioForm
              ejercicio={editingEjercicio}
              onSubmit={handleAddEjercicio}
              onCancel={() => {
                setShowEjercicioForm(false);
                setEditingEjercicio(null);
              }}
            />
          )}

          {ejercicios.length === 0 ? (
            <div className="empty-state-small">
              <p>📭 No hay ejercicios. ¡Agrega uno!</p>
            </div>
          ) : (
            <div className="ejercicios-list-form">
              {ejercicios.map((ej) => (
                <div key={ej.id} className="ejercicio-form-item">
                  <div className="ejercicio-form-info">
                    <h4>{ej.nombre}</h4>
                    <p>
                      {ej.dia_semana} • {ej.series}x{ej.repeticiones}
                      {ej.peso && ` • ${ej.peso}kg`}
                    </p>
                  </div>
                  <div className="ejercicio-form-actions">
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => handleEditEjercicio(ej)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="btn-icon btn-danger-icon"
                      onClick={() => handleDeleteEjercicio(ej.id)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}