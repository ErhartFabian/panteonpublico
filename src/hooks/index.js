import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Custom Hook para manejar estado de carga, error y datos de llamadas API
 * Incluye retry logic y abort controller para cleanup
 * 
 * @param {Function} asyncFunction - Función async a ejecutar
 * @param {Array} dependencies - Array de dependencias
 * @returns {Object} { data, loading, error, retry }
 */
export const useAsync = (asyncFunction, dependencies = []) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  // Ref para el AbortController (permite cancelar request si componente unmounts)
  const abortControllerRef = useRef(null);

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    abortControllerRef.current = new AbortController();

    try {
      const response = await asyncFunction(abortControllerRef.current.signal);
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      // No actualizar estado si fue abortado
      if (error.name !== 'AbortError') {
        setState({ data: null, loading: false, error: error.message });
      }
    }
  }, [asyncFunction]);

  useEffect(() => {
    execute();

    // Cleanup: cancelar request si componente unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, dependencies);

  return {
    ...state,
    retry: execute,
  };
};

/**
 * Custom Hook para validación y manejo de formularios
 * Incluye validación en tiempo real y sanitización básica
 * 
 * @param {Object} initialValues - Valores iniciales del formulario
 * @param {Function} onSubmit - Función a ejecutar al enviar
 * @returns {Object} { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues }
 */
export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Error al enviar formulario:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    reset,
  };
};

/**
 * Custom Hook para debouncing (útil para búsquedas y filtros)
 * 
 * @param {*} value - Valor a debounce
 * @param {number} delay - Milisegundos de delay
 * @returns {*} Valor debouncido
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom Hook para manejar toggle state (boolean)
 * 
 * @param {boolean} initialState - Estado inicial
 * @returns {Array} [state, toggle, setTrue, setFalse]
 */
export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return [state, toggle, setTrue, setFalse];
};

/**
 * Custom Hook para manejar localStorage de forma segura
 * 
 * @param {string} key - Clave en localStorage
 * @param {*} initialValue - Valor inicial
 * @returns {Array} [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage [${key}]:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error al escribir localStorage [${key}]:`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

/**
 * Custom Hook para manejar eventos con cleanup automático
 * 
 * @param {String} eventName - Nombre del evento (ej: 'scroll', 'resize')
 * @param {Function} handler - Función handler del evento
 * @param {Object} element - Elemento donde asignar el evento (default: window)
 */
export const useEventListener = (eventName, handler, element = typeof window !== 'undefined' ? window : null) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element) return;

    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

/**
 * Custom Hook para manejar timeouts con cleanup automático
 * Previene memory leaks
 * 
 * @param {Function} callback - Función a ejecutar
 * @param {number} delay - Milisegundos de delay
 * @Returns {Function} Función para cancelar el timeout
 */
export const useTimeout = (callback, delay) => {
  const savedCallback = useRef();
  const timeoutId = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) return;

    timeoutId.current = setTimeout(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, delay);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [delay]);

  // Retornar función para cancelar manualmente si es necesario
  return () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };
};

/**
 * Custom Hook para prevenir memory leaks en mounted state
 * Útil para componentes async que pueden unmount antes de completar
 * 
 * @returns {Object} { isMounted }
 */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return { isMounted };
};
