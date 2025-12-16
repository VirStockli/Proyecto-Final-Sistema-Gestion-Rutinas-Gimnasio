import axios from 'axios';

// URL base de la API (desde variable de entorno o localhost)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// ============ SERVICIOS DE RUTINAS ============

export const rutinasAPI = {
  // Obtener todas las rutinas
  obtenerTodas: async () => {
    try {
      const response = await apiClient.get('/rutinas');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener una rutina específica
  obtenerPorId: async (id) => {
    try {
      const response = await apiClient.get(`/rutinas/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Buscar rutinas por nombre
  buscar: async (nombre) => {
    try {
      const response = await apiClient.get('/rutinas/buscar', {
        params: { nombre },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Crear una nueva rutina
  crear: async (datos) => {
    try {
      const response = await apiClient.post('/rutinas', datos);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar una rutina
  actualizar: async (id, datos) => {
    try {
      const response = await apiClient.put(`/rutinas/${id}`, datos);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Eliminar una rutina
  eliminar: async (id) => {
    try {
      await apiClient.delete(`/rutinas/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// ============ SERVICIOS DE EJERCICIOS ============

export const ejerciciosAPI = {
  // Crear un ejercicio en una rutina
  crear: async (rutinaId, datos) => {
    try {
      const response = await apiClient.post(`/rutinas/${rutinaId}/ejercicios`, datos);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar un ejercicio
  actualizar: async (id, datos) => {
    try {
      const response = await apiClient.put(`/ejercicios/${id}`, datos);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Eliminar un ejercicio
  eliminar: async (id) => {
    try {
      await apiClient.delete(`/ejercicios/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default apiClient;