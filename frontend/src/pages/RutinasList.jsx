import { useState, useEffect } from 'react';
import { rutinasAPI } from '../services/api';
import RutinaCard from '../components/RutinaCard';
import SearchBar from '../components/SearchBar';
import './Pages.css';

export default function RutinasList({ onViewDetail, onEdit }) {
  const [rutinas, setRutinas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar rutinas al montar el componente
  useEffect(() => {
    cargarRutinas();
  }, []);

  // Filtrar rutinas cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim()) {
      buscarRutinas(searchTerm);
    } else {
      setFiltradas(rutinas);
    }
  }, [searchTerm, rutinas]);

  const cargarRutinas = async () => {
    setLoading(true);
    setError(null);
    try {
      const datos = await rutinasAPI.obtenerTodas();
      // Cargar detalles de cada rutina para contar ejercicios
      const rutinasConDetalles = await Promise.all(
        datos.map(async (r) => {
          const detalle = await rutinasAPI.obtenerPorId(r.id);
          return detalle;
        })
      );
      setRutinas(rutinasConDetalles);
      setFiltradas(rutinasConDetalles);
    } catch (err) {
      setError('Error al cargar las rutinas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buscarRutinas = async (nombre) => {
    try {
      const datos = await rutinasAPI.buscar(nombre);
      setFiltradas(datos);
    } catch (err) {
      console.error('Error en búsqueda:', err);
      setFiltradas([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta rutina?')) {
      try {
        await rutinasAPI.eliminar(id);
        setRutinas(rutinas.filter((r) => r.id !== id));
      } catch (err) {
        alert('Error al eliminar la rutina');
        console.error(err);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Mis Rutinas</h2>
        <p className="page-subtitle">Selecciona una rutina para ver más detalles</p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar rutina por nombre..."
      />

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando rutinas...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!loading && filtradas.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No hay rutinas</h3>
          <p>{searchTerm ? 'No se encontraron resultados' : 'Crea tu primera rutina'}</p>
        </div>
      )}

      {!loading && filtradas.length > 0 && (
        <div className="rutinas-grid">
          {filtradas.map((rutina) => (
            <RutinaCard
              key={rutina.id}
              rutina={rutina}
              onView={() => onViewDetail(rutina.id)}
              onEdit={() => onEdit(rutina.id)}
              onDelete={() => handleDelete(rutina.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}