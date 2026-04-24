const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seed() {
  const users = [
    { email: 'yagmur@petverse.com', password: 'petverse' },
    { email: 'sukru@petverse.com', password: 'petverse' },
    { email: 'zeynep@petverse.com', password: 'petverse' }
  ];

  for (const user of users) {
    console.log(`Seeding user: ${user.email}`);
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password
    });
    if (error) {
      console.error(`Error for ${user.email}:`, error.message);
    } else {
      console.log(`Success for ${user.email}`);
    }
  }
}

seed();
