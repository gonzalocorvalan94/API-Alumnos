import { pool } from '../db/db.js';

export const getAlumnosPorPromedio = async (min = null, max = null) => {
  let query = 'SELECT * FROM alumnos';
  const params = [];
  const conditions = []; // <-- Array separado para condiciones

  // Añade condiciones solo si los valores no son null/undefined
  if (min !== null && min !== undefined) {
    conditions.push('promedio >= ?');
    params.push(min);
  }

  if (max !== null && max !== undefined) {
    conditions.push('promedio <= ?');
    params.push(max);
  }

  // Une las condiciones con AND solo si hay alguna
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  const [alumnos] = await pool.query(query, params);
  return alumnos;
};

export const getAlumnosPorNombre = async (nombre) => {
  const [alumnos] = await pool.query(
    'SELECT * FROM alumnos WHERE LOWER(nombre) LIKE LOWER(?)',
    [`%${nombre}%`] // El % permite coincidencias parciales
  );
  return alumnos;
};
