CREATE TABLE IF NOT EXISTS cdsp_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  description TEXT,
  total_students INTEGER DEFAULT 0,
  district TEXT NOT NULL,
  municipality TEXT NOT NULL,
  barangay TEXT NOT NULL,
  venue TEXT NOT NULL,
  status TEXT CHECK (status IN ('Complete', 'Incomplete')) DEFAULT 'Incomplete',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cdsp_events_district ON cdsp_events(district);
CREATE INDEX IF NOT EXISTS idx_cdsp_events_municipality ON cdsp_events(municipality);
CREATE INDEX IF NOT EXISTS idx_cdsp_events_status ON cdsp_events(status);
CREATE INDEX IF NOT EXISTS idx_cdsp_events_created_at ON cdsp_events(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updated_at
CREATE TRIGGER update_cdsp_events_updated_at
  BEFORE UPDATE ON cdsp_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE cdsp_events ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
-- Allow authenticated users to SELECT (read) events
CREATE POLICY "Allow authenticated users to read events"
  ON cdsp_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to INSERT (create) events
CREATE POLICY "Allow authenticated users to insert events"
  ON cdsp_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to UPDATE (edit) events
CREATE POLICY "Allow authenticated users to update events"
  ON cdsp_events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to DELETE events
CREATE POLICY "Allow authenticated users to delete events"
  ON cdsp_events
  FOR DELETE
  TO authenticated
  USING (true);

-- Optional: Allow anonymous users to read events (for public map view)
CREATE POLICY "Allow anonymous users to read events"
  ON cdsp_events
  FOR SELECT
  TO anon
  USING (true);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample events (you can remove these)
INSERT INTO cdsp_events (event_name, description, total_students, district, municipality, barangay, venue, status) VALUES
('Skills Training - Welding', 'Basic welding skills training for out-of-school youth', 45, '1', 'Tagbilaran City', 'Cogon', 'Tagbilaran City Gym', 'Complete'),
('Entrepreneurship Seminar', 'Financial literacy and small business management', 60, '2', 'Ubay', 'Poblacion', 'Ubay Municipal Hall', 'Complete'),
('Digital Literacy Workshop', 'Basic computer and internet skills', 35, '3', 'Jagna', 'Poblacion', 'Jagna Community Center', 'Incomplete'),
('Agriculture Training', 'Modern farming techniques and crop management', 50, '1', 'Balilihan', 'Poblacion', 'Balilihan Covered Court', 'Complete'),
('Dressmaking Course', 'Basic sewing and dressmaking skills', 30, '2', 'Talibon', 'Poblacion', 'Talibon Training Center', 'Incomplete'),
('Bread and Pastry Production', 'TESDA accredited bakery training', 25, '3', 'Guindulman', 'Poblacion', 'Guindulman Vocational School', 'Complete'),
('Solar Panel Installation', 'Renewable energy technician training', 20, '1', 'Dauis', 'Poblacion', 'Dauis Technical Institute', 'Incomplete'),
('Housekeeping NCII', 'Hotel and restaurant housekeeping skills', 40, '2', 'Getafe', 'Poblacion', 'Getafe Community Center', 'Complete');

-- ============================================
-- VERIFY TABLE CREATION
-- ============================================

-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name = 'cdsp_events';

-- Check RLS is enabled
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'cdsp_events';

-- ============================================
-- CDSP EVENTS TABLE FOR BEPO-PESO
-- Community-Driven Skills Program Events
-- ============================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_cdsp_events_updated_at ON cdsp_events;

-- Drop existing function if it exists (optional - to avoid conflicts)
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create the cdsp_events table (if not exists)
CREATE TABLE IF NOT EXISTS cdsp_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  description TEXT,
  total_students INTEGER DEFAULT 0,
  district TEXT NOT NULL,
  municipality TEXT NOT NULL,
  barangay TEXT NOT NULL,
  venue TEXT NOT NULL,
  status TEXT CHECK (status IN ('Complete', 'Incomplete')) DEFAULT 'Incomplete',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cdsp_events_district ON cdsp_events(district);
CREATE INDEX IF NOT EXISTS idx_cdsp_events_municipality ON cdsp_events(municipality);
CREATE INDEX IF NOT EXISTS idx_cdsp_events_status ON cdsp_events(status);
CREATE INDEX IF NOT EXISTS idx_cdsp_events_created_at ON cdsp_events(created_at);

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updated_at
CREATE TRIGGER update_cdsp_events_updated_at
  BEFORE UPDATE ON cdsp_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE cdsp_events ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES (to avoid conflicts)
-- ============================================
DROP POLICY IF EXISTS "Allow everyone to read events" ON cdsp_events;
DROP POLICY IF EXISTS "Allow everyone to insert events" ON cdsp_events;
DROP POLICY IF EXISTS "Allow everyone to update events" ON cdsp_events;
DROP POLICY IF EXISTS "Allow everyone to delete events" ON cdsp_events;

-- ============================================
-- ALLOW ALL ACCESS (Public Access)
-- ============================================

-- Allow everyone to SELECT (read) events
CREATE POLICY "Allow everyone to read events"
  ON cdsp_events
  FOR SELECT
  USING (true);

-- Allow everyone to INSERT (create) events
CREATE POLICY "Allow everyone to insert events"
  ON cdsp_events
  FOR INSERT
  WITH CHECK (true);

-- Allow everyone to UPDATE (edit) events
CREATE POLICY "Allow everyone to update events"
  ON cdsp_events
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow everyone to DELETE events
CREATE POLICY "Allow everyone to delete events"
  ON cdsp_events
  FOR DELETE
  USING (true);

-- ============================================
-- VERIFY TABLE CREATION
-- ============================================

-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name = 'cdsp_events';

-- Check RLS is enabled
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'cdsp_events';

-- Show all policies on the table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'cdsp_events';