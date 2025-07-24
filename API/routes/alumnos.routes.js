import { Router } from 'express';
import {
  getAlumnos,
  getAlumnoPorId,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  patchAlumno,
  getAlumnosFiltrados,
  getAlumnosPorNombreController,
} from '../controllers/alumnos.controller.js';

import {
  validateCreateAlumno,
  validateUpdateAlumno,
  validateIdParam,
  validatePatchAlumno,
} from '../validators/validators.js';

import {
  validatePromedioFilter,
  validateNombreFilter,
} from '../validators/filterValidators.js';

const router = Router();

router.get('/filtrar/promedio', validatePromedioFilter, getAlumnosFiltrados);
router.get(
  '/filtrar/nombre',
  validateNombreFilter,
  getAlumnosPorNombreController
);
router.get('/:id', validateIdParam, getAlumnoPorId);
router.get('/', getAlumnos);
router.post('/', validateCreateAlumno, createAlumno);
router.put('/:id', validateUpdateAlumno, updateAlumno);
router.patch('/:id', validatePatchAlumno, patchAlumno);
router.delete('/:id', validateIdParam, deleteAlumno);
export default router;
