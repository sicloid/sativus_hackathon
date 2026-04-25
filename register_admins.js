require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const pool = new Pool({ connectionString: 'postgresql://postgres.qnieazuqjnnrwipudoff:Sativus.12345_@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres' });

async function createAdmin(email) {
  console.log(`Creating ${email}...`);
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'Sativus.12345_',
    options: {
      data: { role: 'admin' }
    }
  });
  
  if (error) {
    console.error('Signup error:', error.message);
  } else {
    console.log('Signup success:', data.user.id);
    // Explicitly update metadata in DB just to be absolutely sure
    await pool.query(
      "UPDATE auth.users SET raw_user_meta_data = jsonb_set(COALESCE(raw_user_meta_data, '{}'::jsonb), '{role}', '\"admin\"') WHERE id = \$1",
      [data.user.id]
    );
    console.log('Role updated to admin in DB.');
  }
}

(async () => {
  await createAdmin('zeynep@petverse.com');
  await createAdmin('admin@petverse.com');
  pool.end();
})();
