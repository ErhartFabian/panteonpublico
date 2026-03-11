import axios from 'axios';

/**
 * Servicio centralizado de API
 * Maneja todas las llamadas HTTP, validación, error handling y retry logic
 * 
 * @module services/api
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10);
const MAX_RETRIES = parseInt(process.env.REACT_APP_MAX_RETRIES || '3', 10);

// Crear instancia de axios con configuración predeterminada
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

/**
 * Validar que los parámetros de ID sean seguros
 * Previene inyección de SQL y XSS
 * 
 * @param {string} params - Parámetros a validar
 * @returns {boolean} True si es seguro
 */
function validateIdParams(params) {
  // Solo permite números y caracteres alfanuméricos válidos
  const idPattern = /^[a-zA-Z0-9\-_]+$/;
  return idPattern.test(String(params));
}

/**
 * GET - Obtener datos de la tabla Panteon
 * @returns {Promise} Array de datos del panteon
 */
export const getPanteonData = async () => {
  try {
    const endpoint = process.env.REACT_APP_API_PANTEON_ENDPOINT || '/panteon';
    const response = await apiClient.get(endpoint);
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Respuesta de API inválida: esperado array');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del panteon:', error);
    throw new Error('No se pudieron cargar los datos del panteon. Por favor, intente nuevamente.');
  }
};

/**
 * GET - Obtener datos de una fosa específica
 * @param {string} cuartel - Número de cuartel
 * @param {string} clase - Clase de fosa
 * @param {string} lote - Número de lote
 * @param {string} fosa - Número de fosa
 * @returns {Promise} Datos de la fosa
 */
export const getFosaData = async (cuartel, clase, lote, fosa) => {
  try {
    // Validar que todos los parámetros sean seguros
    const params = `${cuartel}${clase}${lote}${fosa}`;
    
    if (!validateIdParams(params)) {
      throw new Error('Parámetros de búsqueda inválidos');
    }

    const endpoint = process.env.REACT_APP_API_FOSA_ENDPOINT || '/api/getAllDataByFosa';
    const response = await apiClient.get(`${endpoint}/${params}`);
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Respuesta de API inválida');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de la fosa:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Fosa no encontrada. Verifique los datos e intente nuevamente.');
    }
    
    throw new Error('No se pudieron cargar los datos de la fosa. Por favor, intente nuevamente.');
  }
};

/**
 * Utilidad para hacer llamadas GET genéricas con retry logic
 * @param {string} url - URL relativa del endpoint
 * @param {number} retries - Número de intentos
 * @returns {Promise} Respuesta de la API
 */
export const getWithRetry = async (url, retries = MAX_RETRIES) => {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      lastError = error;
      
      // No reintentar si es error de cliente (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }
      
      // Esperar antes de reintentar (exponential backoff)
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  
  throw lastError;
};

/**
 * POST - Validar y enviar formulario de contacto (vía backend)
 * @param {Object} formData - Datos del formulario
 * @returns {Promise} Confirmación de envío
 */
export const sendContactForm = async (formData) => {
  try {
    // Validar estructura mínima
    const { user_name, user_email, user_number, message } = formData;
    
    if (!user_name || !user_email || !user_number || !message) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validación de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user_email)) {
      throw new Error('Email inválido');
    }

    // Validación de teléfono (solo números)
    if (!/^\d{10}$/.test(user_number.replace(/\D/g, ''))) {
      throw new Error('Número de teléfono inválido');
    }

    const response = await apiClient.post('/contact', {
      user_name: String(user_name).trim(),
      user_email: String(user_email).trim(),
      user_number: String(user_number).trim(),
      message: String(message).trim(),
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    throw new Error(error.message || 'Error al enviar el formulario. Por favor, intente nuevamente.');
  }
};

/**
 * Exportar cliente para configuración avanzada si es necesario
 */
export default apiClient;
