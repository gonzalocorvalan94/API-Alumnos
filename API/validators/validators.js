import {
  nombreValidation,
  nacimientoValidation,
  cursoValidation,
  divisionValidation,
  promedioValidation,
  materiasAprobadasValidation,
} from './body.js';
import { param, body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/errorValidatorHandler.js';

export const validateIdParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo')
    .toInt(),
  handleValidationErrors,
];

export const validateCreateAlumno = [
  nombreValidation,
  nacimientoValidation,
  cursoValidation,
  divisionValidation,
  promedioValidation,
  materiasAprobadasValidation,
  handleValidationErrors,
];

// Validación para PUT (actualización completa - todos los campos requeridos)
export const validateUpdateAlumno = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo')
    .toInt(),
  body('id').not().exists().withMessage('No se puede modificar el ID'),
  nombreValidation, // Sin .optional() - requerido en PUT
  nacimientoValidation, // Sin .optional() - requerido en PUT
  cursoValidation, // Sin .optional() - requerido en PUT
  divisionValidation, // Sin .optional() - requerido en PUT
  promedioValidation, // Sin .optional() - requerido en PUT
  materiasAprobadasValidation, // Sin .optional() - requerido en PUT
  handleValidationErrors,
];

export const validatePatchAlumno = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo')
    .toInt(),
  body('id').not().exists().withMessage('No se puede modificar el ID'),
  nombreValidation.optional(),
  nacimientoValidation.optional(),
  cursoValidation.optional(),
  divisionValidation.optional(),
  promedioValidation.optional(),
  materiasAprobadasValidation.optional(),
  // Validar que al menos un campo sea proporcionado
  body().custom((value, { req }) => {
    const { nombre, nacimiento, curso, division, promedio, materiasAprobadas } =
      req.body;
    if (
      !nombre &&
      !nacimiento &&
      !curso &&
      !division &&
      !promedio &&
      !materiasAprobadas
    ) {
      throw new Error('Debe proporcionar al menos un campo para actualizar');
    }
    return true;
  }),
  handleValidationErrors,
];
