db = db.getSiblingDB(process.env.MONGO_DB_NAME || 'mydb');

const user = process.env.MONGO_APP_USER || 'appuser';
const pass = process.env.MONGO_APP_PASS || 'apppass';

db.createUser({
  user,
  pwd: pass,
  roles: [{ role: 'readWrite', db: db.getName() }]
});