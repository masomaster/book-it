const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.DATABASE_URL).then((m) => m);
  }

  cached.conn = await cached.promise;

  const db = mongoose.connection;
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);

  return cached.conn;
}

module.exports = connectDB;
