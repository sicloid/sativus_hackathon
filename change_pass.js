require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const pool = new Pool({ connectionString: 'postgresql://postgres.qnieazuqjnnrwipudoff:Sativus.12345_@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres' });

async function resetZeynep() {
  console.log('Deleting zeynep...');
  await pool.query("DELETE FROM auth.users WHERE email = 'zeynep@petverse.com'");
  
  console.log('Re-creating zeynep with password petverse...');
  const { data, error } = await supabase.auth.signUp({
    email: 'zeynep@petverse.com',
    password: 'petverse',
    options: {
      data: { role: 'admin' }
    }
  });
  
  if (error) {
    console.error('Signup error:', error.message);
  } else {
    console.log('Signup success:', data.user?.id);
    await pool.query(
      "UPDATE auth.users SET raw_user_meta_data = jsonb_set(COALESCE(raw_user_meta_data, '{}'::jsonb), '{role}', '\"admin\"') WHERE email = 'zeynep@petverse.com'"
    );
    console.log('Role updated to admin in DB.');
  }
}

resetZeynep().then(() => pool.end());
