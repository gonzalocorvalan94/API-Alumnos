import { body, validationResult } from 'express-validator';

// Validaciones comunes reutilizables
export const nombreValidation = body('nombre')
  .notEmpty()
  .withMessage('El nombre es requerido')
  .isLength({ min: 3 })
  .withMessage('El nombre debe tener al menos 3 caracteres')
  .matches(/^[A-Za-z\s]+$/)
  .withMessage('El nombre solo puede contener letras y espacios')
  .trim()
  .escape();

export const nacimientoValidation = body('nacimiento')
  .notEmpty()
  .withMessage('La fecha de nacimiento es requerida')
  .isISO8601()
  .withMessage('La fecha debe tener formato YYYY-MM-DD')
  .toDate();

export const cursoValidation = body('curso')
  .notEmpty()
  .withMessage('El curso es requerido')
  .isInt({ min: 1, max: 6 })
  .withMessage('El curso debe ser entre 1 y 6');

export const divisionValidation = body('division')
  .notEmpty()
  .withMessage('La división es requerida')
  .isAlpha()
  .withMessage('La división debe ser una letra')
  .isLength({ min: 1, max: 1 })
  .withMessage('La división debe ser una sola letra')
  .toUpperCase();

export const promedioValidation = body('promedio')
  .notEmpty()
  .withMessage('El promedio es requerido')
  .isFloat({ min: 1, max: 10 })
  .withMessage('El promedio debe ser entre 1 y 10');

export const materiasAprobadasValidation = body('materiasAprobadas')
  .notEmpty()
  .withMessage('Las materias aprobadas son requeridas')
  .isInt({ min: 0 })
  .withMessage('Debe ser un número positivo');
