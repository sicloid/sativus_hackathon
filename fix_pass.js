const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: 'postgresql://postgres.qnieazuqjnnrwipudoff:Sativus.12345_@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres' });

(async () => {
  try {
    const hash = bcrypt.hashSync('petverse', 10);
    console.log('Hash:', hash);
    await pool.query(
      "UPDATE auth.users SET encrypted_password = \$1 WHERE email IN ('zeynep@petverse.com', 'admin@petverse.com')",
      [hash]
    );
    console.log('Password updated with bcrypt!');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
})();
