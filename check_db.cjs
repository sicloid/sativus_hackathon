const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query('SELECT name, "image_url" FROM "products" WHERE "image_url" LIKE \'%bing.net%\' LIMIT 5', (err, res) => {
  if (err) console.error(err);
  else console.log("Products with bing.net:", res.rows);
  pool.end();
});
