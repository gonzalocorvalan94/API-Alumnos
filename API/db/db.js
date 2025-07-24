import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,      // 'localhost'
  user: process.env.DB_USER,      // 'root'
  password: process.env.DB_PASS,  // 'root'
  database: process.env.DB_NAME,  // 'alumnos_db'
  connectionLimit: 10,
});

// Opcional: función para obtener conexión si necesitás queries transaccionales o más control
export async function getConnection() {
  return await pool.getConnection();
}