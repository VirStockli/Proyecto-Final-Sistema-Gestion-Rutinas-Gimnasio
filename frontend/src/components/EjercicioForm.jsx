import { useState, useEffect } from 'react';
import './EjercicioForm.css';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function EjercicioForm({ ejercicio, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    dia_semana: 'Lunes',
    series: 3,
    repeticiones: 10,
    peso: '',
    notas: '',
    orden: 0,
  });

  useEffect(() => {
    if (ejercicio) {
      setFormData(ejercicio);
    }
  }, [ejercicio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'series' || name === 'repeticiones' || name === 'peso' || name === 'orden'
        ? value === '' ? '' : parseInt(value)
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.nombre.trim()) {
      alert('El nombre del ejercicio es requerido');
      return;
    }
    if (!formData.series || formData.series <= 0) {
      alert('Las series deben ser mayor a 0');
      return;
    }
    if (!formData.repeticiones || formData.repeticiones <= 0) {
      alert('Las repeticiones deben ser mayor a 0');
      return;
    }

    const datosEnvio = {
      nombre: formData.nombre.trim(),
      dia_semana: formData.dia_semana,
      series: formData.series,
      repeticiones: formData.repeticiones,
      peso: formData.peso ? parseInt(formData.peso) : null,
      notas: formData.notas.trim() || null,
      orden: formData.orden,
    };

    onSubmit(datosEnvio);
  };

  return (
    <div className="ejercicio-form-container">
      <h4>{ejercicio ? '✏️ Editar Ejercicio' : '➕ Nuevo Ejercicio'}</h4>

      <form onSubmit={handleSubmit} className="ejercicio-form">
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Nombre del Ejercicio</label>
            <input
              type="text"
              name="nombre"
              className="form-input"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="ej: Press de Banca, Sentadillas..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Día de la Semana</label>
            <select
              name="dia_semana"
              className="form-select"
              value={formData.dia_semana}
              onChange={handleChange}
            >
              {DIAS.map((dia) => (
                <option key={dia} value={dia}>
                  {dia}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row-3">
          <div className="form-group">
            <label className="form-label">Series</label>
            <input
              type="number"
              name="series"
              className="form-input"
              value={formData.series}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Repeticiones</label>
            <input
              type="number"
              name="repeticiones"
              className="form-input"
              value={formData.repeticiones}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Peso (kg)</label>
            <input
              type="number"
              name="peso"
              className="form-input"
              value={formData.peso}
              onChange={handleChange}
              min="0"
              placeholder="Opcional"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Notas</label>
          <textarea
            name="notas"
            className="form-textarea"
            value={formData.notas}
            onChange={handleChange}
            placeholder="Ej: Cuidado con la forma, hacer más lentamente..."
            rows="2"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Orden en el Día</label>
          <input
            type="number"
            name="orden"
            className="form-input"
            value={formData.orden}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            💾 {ejercicio ? 'Actualizar' : 'Agregar'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            ✕ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}