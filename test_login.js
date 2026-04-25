require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

(async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'zeynep@petverse.com',
    password: 'petverse',
  });
  if (error) {
    console.error('Login failed:', error.message);
  } else {
    console.log('Login successful!', data.user.id);
  }
})();
