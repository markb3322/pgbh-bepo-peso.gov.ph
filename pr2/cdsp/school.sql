CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_schools_district ON schools(district);
CREATE INDEX IF NOT EXISTS idx_schools_school_name ON schools(school_name);

CREATE OR REPLACE FUNCTION update_schools_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_schools_updated_at ON schools;

CREATE TRIGGER update_schools_updated_at
  BEFORE UPDATE ON schools
  FOR EACH ROW
  EXECUTE FUNCTION update_schools_updated_at();

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow everyone to read schools" ON schools;
DROP POLICY IF EXISTS "Allow everyone to insert schools" ON schools;
DROP POLICY IF EXISTS "Allow everyone to update schools" ON schools;
DROP POLICY IF EXISTS "Allow everyone to delete schools" ON schools;

CREATE POLICY "Allow everyone to read schools" ON schools FOR SELECT USING (true);
CREATE POLICY "Allow everyone to insert schools" ON schools FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow everyone to update schools" ON schools FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow everyone to delete schools" ON schools FOR DELETE USING (true);

INSERT INTO schools (school_name, district, address) VALUES
('Bohol National High School', '1', 'Cogon, Tagbilaran City'),
('University of Bohol', '1', 'Maria Clara Street, Tagbilaran City'),
('Holy Name University', '1', 'J.A. Clarin Street, Tagbilaran City'),
('Bohol Island State University - Main', '1', 'Cogtong, Candijay'),
('St. Joseph Cathedral School', '1', 'Poblacion, Tagbilaran City'),
('Buenavista National High School', '2', 'Poblacion, Buenavista'),
('Ubay National Science High School', '2', 'Poblacion, Ubay'),
('Talibon National High School', '2', 'Poblacion, Talibon'),
('Getafe National High School', '2', 'Poblacion, Getafe'),
('Jagna Central School', '3', 'Poblacion, Jagna'),
('Candijay National High School', '3', 'Poblacion, Candijay'),
('Guindulman National High School', '3', 'Poblacion, Guindulman'),
('Anda National High School', '3', 'Poblacion, Anda'),
('Carmen National High School', '2', 'Poblacion, Carmen'),
('Dagohoy National High School', '2', 'Poblacion, Dagohoy'),
('San Miguel Technical High School', '2', 'Poblacion, San Miguel'),
('Pilar National High School', '3', 'Poblacion, Pilar'),
('Sierra Bullones Technical High School', '3', 'Poblacion, Sierra Bullones'),
('Valencia National High School', '3', 'Poblacion, Valencia'),
('Batuan National High School', '3', 'Poblacion, Batuan');