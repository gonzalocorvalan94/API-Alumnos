import {
  actualizarAlumno,
  obtenerTodosLosAlumnos,
} from '../models/alumnos.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { obtenerAlumnosPorId } from '../models/alumnos.model.js';
import { crearAlumno } from '../models/alumnos.model.js';
import { eliminarAlumno } from '../models/alumnos.model.js';
import { getAlumnosPorPromedio } from '../models/alumnos.filters.js';
import { getAlumnosPorNombre } from '../models/alumnos.filters.js';

export const getAlumnos = catchAsync(async (req, res) => {
  const alumnos = await obtenerTodosLosAlumnos();
  res.status(200).json(alumnos);
});

export const getAlumnoPorId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const alumno = await obtenerAlumnosPorId(id);
  res.status(200).json(alumno);
});

export const createAlumno = catchAsync(async (req, res) => {
  const datosAlumnos = req.body; // Obtenemos el objeto completo

  const alumnoCreado = await crearAlumno(datosAlumnos); // Pasamos el objeto directamente

  res.status(201).json(alumnoCreado);
});

export const updateAlumno = catchAsync(async (req, res) => {
  const { id } = req.params;
  const datosAlumnos = req.body;
  const alumnoActualizado = await actualizarAlumno(id, datosAlumnos);

  res.status(200).json(alumnoActualizado);
});

export const patchAlumno = catchAsync(async (req, res) => {
  const { id } = req.params;

  const alumnoActual = await obtenerAlumnosPorId(id);
  if (!alumnoActual) {
    const error = new Error('Alumno no encontrado');
    error.statusCode = 404;
    throw error;
  }

  const datosActualizados = { ...alumnoActual, ...req.body };

  const alumnoActualizado = await actualizarAlumno(id, datosActualizados);

  res.status(200).json({
    success: true,
    data: alumnoActualizado,
  });

  //esta funcion lo que hace es obtener el alumno por id, modifico los campos y relleno el resto con los que no se modifican, luego se usa la funcion del put para actualizar parcialmente
});

export const deleteAlumno = catchAsync(async (req, res) => {
  const { id } = req.params;
  const alumnoEliminado = await eliminarAlumno(id);

  res.status(200).json(alumnoEliminado);
});

export const getAlumnosFiltrados = catchAsync(async (req, res) => {
  const { promedioMin, promedioMax } = req.query;

  // Convierte a número (o null si no viene)
  const min = promedioMin ? Number(promedioMin) : null;
  const max = promedioMax ? Number(promedioMax) : null;

  // Filtra DIRECTAMENTE en la base de datos
  const alumnos = await getAlumnosPorPromedio(min, max);

  res.status(200).json(alumnos);
});

export const getAlumnosPorNombreController = catchAsync(async (req, res) => {
  const { nombre } = req.query;
  const alumnos = await getAlumnosPorNombre(nombre);

  res.status(200).json(alumnos);
});
