import { pool } from '../db/db.js';

export async function obtenerTodosLosAlumnos() {
  const [filas] = await pool.query('SELECT * FROM alumnos');
  return filas;
}

export async function obtenerAlumnosPorId(id) {
  const [alumno] = await pool.query('SELECT * FROM alumnos WHERE id= ?', [id]);
  return alumno[0]; //la query la devuelve como un arreglo, por eso le paso el lugar [0] (lo unico que contiene)
}

export async function crearAlumno(datosAlumnos) {
  const { nombre, nacimiento, curso, division, promedio, materiasAprobadas } =
    datosAlumnos;

  const [result] = await pool.query(
    'INSERT INTO alumnos (nombre, nacimiento, curso, division, promedio, materiasAprobadas) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, nacimiento, curso, division, promedio, materiasAprobadas]
  );

  // result.insertId contiene el ID generado por la base de datos
  return { id: result.insertId, ...datosAlumnos };
}

export async function actualizarAlumno(id, datosAlumnos) {
  const { nombre, nacimiento, curso, division, promedio, materiasAprobadas } =
    datosAlumnos;

  const [queryInfo] = await pool.query(
    `UPDATE alumnos 
     SET nombre = ?, nacimiento = ?, curso = ?, division = ?, promedio = ?, materiasAprobadas = ? 
     WHERE id = ?`,
    [nombre, nacimiento, curso, division, promedio, materiasAprobadas, id]
  );

  return { id, ...datosAlumnos };
}

export async function eliminarAlumno(id) {
  const [alumno] = await pool.query('SELECT * from alumnos WHERE id =?', [id]);

  await pool.query('DELETE FROM alumnos WHERE id=?', [id]);

  return alumno[0];
}
