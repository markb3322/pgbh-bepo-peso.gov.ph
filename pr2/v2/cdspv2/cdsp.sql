-- ============================================
-- COMPLETE DATABASE SETUP
-- schools table + cdsp_events table + full access
-- ============================================

-- 1. Create schools table
CREATE TABLE IF NOT EXISTS schools (
    id SERIAL PRIMARY KEY,
    school_name TEXT NOT NULL,
    district TEXT,
    municipality TEXT,
    barangay TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create cdsp_events table
CREATE TABLE IF NOT EXISTS cdsp_events (
    id SERIAL PRIMARY KEY,
    event_name TEXT NOT NULL,
    district TEXT,
    municipality TEXT,
    barangay TEXT,
    school_name TEXT,
    school_id INTEGER REFERENCES schools(id) ON DELETE SET NULL,
    event_date DATE,
    venue TEXT,
    total_students INTEGER DEFAULT 0,
    description TEXT,
    status TEXT DEFAULT 'Incomplete',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Disable RLS for both tables (full access)
ALTER TABLE schools DISABLE ROW LEVEL SECURITY;
ALTER TABLE cdsp_events DISABLE ROW LEVEL SECURITY;