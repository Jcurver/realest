-- Create notes table and insert sample data
-- Run this in your Supabase project's SQL Editor
-- https://app.supabase.com/project/_/sql/new

create table notes (
  id bigserial primary key,
  title text
);

-- Enable Row Level Security (RLS)
alter table notes enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access" on notes
for select
using (true);

-- Insert sample data
insert into notes(title)
values
  ('Today I created a Supabase project.'),
  ('I added some data and queried it from Next.js.'),
  ('It was awesome!');

