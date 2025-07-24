export function errorHandler(err, req, res, next) {
  console.error(err); // Lo logueás en consola (útil en desarrollo)

  const status = err.status || 500;
  const mensaje = err.message || 'Error interno del servidor';

  res.status(status).json({
    ok: false,
    mensaje,
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  });
}