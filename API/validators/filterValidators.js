import { handleValidationErrors } from '../middlewares/errorValidatorHandler.js';
import { query } from 'express-validator';

export const validatePromedioFilter = [
  query('promedioMin')
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage('Debe ser entre 1 y 10')
    .toFloat(), // <-- Convierte explícitamente a float
  query('promedioMax')
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage('Debe ser entre 1 y 10')
    .toFloat() // <-- Convierte explícitamente a float
    .custom((max, { req }) => {
      if (req.query.promedioMin && max < req.query.promedioMin) {
        throw new Error('promedioMax no puede ser menor que promedioMin');
      }
      return true;
    }),
  handleValidationErrors,
];

export const validateNombreFilter = [
  query('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .escape(),
];
