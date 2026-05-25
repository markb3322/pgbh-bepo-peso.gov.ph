-- Create municipalities table
CREATE TABLE municipalities (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_city BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE municipalities ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read municipalities" ON municipalities
    FOR SELECT USING (true);

-- Insert all 48 municipalities (47 municipalities + 1 city)
INSERT INTO municipalities (name, is_city) VALUES
('Alburquerque', false),
('Alicia', false),
('Anda', false),
('Antequera', false),
('Baclayon', false),
('Balilihan', false),
('Batuan', false),
('Bien Unido', false),
('Bilar', false),
('Buenavista', false),
('Calape', false),
('Candijay', false),
('Carmen', false),
('Catigbian', false),
('Clarin', false),
('Corella', false),
('Cortes', false),
('Dagohoy', false),
('Danao', false),
('Dauis', false),
('Dimiao', false),
('Duero', false),
('Garcia Hernandez', false),
('Getafe', false),
('Guindulman', false),
('Inabanga', false),
('Jagna', false),
('Lila', false),
('Loay', false),
('Loboc', false),
('Loon', false),
('Mabini', false),
('Maribojoc', false),
('Panglao', false),
('Pilar', false),
('Pres. Carlos P. Garcia', false),
('Sagbayan', false),
('San Isidro', false),
('San Miguel', false),
('Sevilla', false),
('Sierra Bullones', false),
('Sikatuna', false),
('Tagbilaran', true),
('Talibon', false),
('Trinidad', false),
('Tubigon', false),
('Ubay', false),
('Valencia', false);

-- Create index on name
CREATE INDEX idx_municipalities_name ON municipalities(name);

-- Verify
SELECT COUNT(*) AS total_municipalities FROM municipalities;
-- Should return 48

DO $$
DECLARE
    m_id BIGINT;
BEGIN
    -- Alburquerque (11)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Alburquerque';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bahi'), (m_id, 'Basacdacu'), (m_id, 'Cantiguib'), (m_id, 'Dangay'),
    (m_id, 'East Poblacion'), (m_id, 'Ponong'), (m_id, 'San Agustin'),
    (m_id, 'Santa Filomena'), (m_id, 'Tagbuane'), (m_id, 'Toril'), (m_id, 'West Poblacion');

    -- Alicia (15)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Alicia';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Cabatang'), (m_id, 'Cagongcagong'), (m_id, 'Cambaol'), (m_id, 'Cayacay'),
    (m_id, 'Del Monte'), (m_id, 'Katipunan'), (m_id, 'La Hacienda'),
    (m_id, 'Mahayag'), (m_id, 'Napo'), (m_id, 'Pagahat'),
    (m_id, 'Poblacion'), (m_id, 'Progreso'), (m_id, 'Putlongcam'),
    (m_id, 'Sudlon'), (m_id, 'Untaga');

    -- Anda (16)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Anda';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Almaria'), (m_id, 'Bacong'), (m_id, 'Badiang'), (m_id, 'Buenasuerte'),
    (m_id, 'Candabong'), (m_id, 'Casica'), (m_id, 'Katipunan'), (m_id, 'Linawan'),
    (m_id, 'Lundag'), (m_id, 'Poblacion'), (m_id, 'Santa Cruz'),
    (m_id, 'Suba'), (m_id, 'Talisay'), (m_id, 'Tanod'), (m_id, 'Tawid'), (m_id, 'Virgen');

    -- Antequera (21)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Antequera';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Angilan'), (m_id, 'Bantolinao'), (m_id, 'Bicahan'), (m_id, 'Bitaugan'),
    (m_id, 'Bungahan'), (m_id, 'Canlaas'), (m_id, 'Cansibuan'), (m_id, 'Can-omay'),
    (m_id, 'Celing'), (m_id, 'Danao'), (m_id, 'Danicop'), (m_id, 'Mag-aso'),
    (m_id, 'Poblacion'), (m_id, 'Quinapon-an'), (m_id, 'Santo Rosario'),
    (m_id, 'Tabuan'), (m_id, 'Tagubaas'), (m_id, 'Tupas'), (m_id, 'Ubojan'),
    (m_id, 'Viga'), (m_id, 'Villa Aurora');

    -- Baclayon (17)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Baclayon';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Cambanac'), (m_id, 'Dasitam'), (m_id, 'Buenaventura'), (m_id, 'Guiwanon'),
    (m_id, 'Landican'), (m_id, 'Laya'), (m_id, 'Libertad'), (m_id, 'Montaña'),
    (m_id, 'Pamilacan'), (m_id, 'Payahan'), (m_id, 'Poblacion'),
    (m_id, 'San Isidro'), (m_id, 'San Roque'), (m_id, 'San Vicente'),
    (m_id, 'Santa Cruz'), (m_id, 'Taguihon'), (m_id, 'Tanday');

    -- Balilihan (31)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Balilihan';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Baucan Norte'), (m_id, 'Baucan Sur'), (m_id, 'Boctol'),
    (m_id, 'Boyog Norte'), (m_id, 'Boyog Proper'), (m_id, 'Boyog Sur'),
    (m_id, 'Cabad'), (m_id, 'Candasig'), (m_id, 'Cantalid'),
    (m_id, 'Cantomimbo'), (m_id, 'Cogon'), (m_id, 'Datag Norte'),
    (m_id, 'Datag Sur'), (m_id, 'Del Carmen Este'), (m_id, 'Del Carmen Norte'),
    (m_id, 'Del Carmen Weste'), (m_id, 'Del Carmen Sur'), (m_id, 'Del Rosario'),
    (m_id, 'Dorol'), (m_id, 'Haguilanan Grande'), (m_id, 'Hanopol Este'),
    (m_id, 'Hanopol Norte'), (m_id, 'Hanopol Weste'), (m_id, 'Magsija'),
    (m_id, 'Maslog'), (m_id, 'Sagasa'), (m_id, 'Sal-ing'),
    (m_id, 'San Isidro'), (m_id, 'San Roque'), (m_id, 'Santo Niño'),
    (m_id, 'Tagustusan');

    -- Batuan (15)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Batuan';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Aloja'), (m_id, 'Behind the Clouds'), (m_id, 'Cabacnitan'),
    (m_id, 'Cambacay'), (m_id, 'Cantigdas'), (m_id, 'Garcia'),
    (m_id, 'Janlud'), (m_id, 'Poblacion Norte'), (m_id, 'Poblacion Sur'),
    (m_id, 'Poblacion Vieja'), (m_id, 'Quezon'), (m_id, 'Quirino'),
    (m_id, 'Rizal'), (m_id, 'Rosariohan'), (m_id, 'Santa Cruz');

    -- Bien Unido (15)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Bien Unido';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bilangbilangan Daku'), (m_id, 'Bilangbilangan Diot'), (m_id, 'Hingotanan East'),
    (m_id, 'Hingotanan West'), (m_id, 'Liberty'), (m_id, 'Malingin'),
    (m_id, 'Mandawa'), (m_id, 'Maomawan'), (m_id, 'Poblacion'),
    (m_id, 'Puerto San Pedro'), (m_id, 'Sagasa'), (m_id, 'Tuboran'),
    (m_id, 'Pinamgo'), (m_id, 'Bonbonon'), (m_id, 'Hinlayagan Ilaud');

    -- Bilar (19)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Bilar';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bonifacio'), (m_id, 'Bugang Norte'), (m_id, 'Bugang Sur'),
    (m_id, 'Cabacnitan'), (m_id, 'Cambigsi'), (m_id, 'Campagao'),
    (m_id, 'Cansumbol'), (m_id, 'Dagohoy'), (m_id, 'Owac'),
    (m_id, 'Poblacion'), (m_id, 'Quezon'), (m_id, 'Riverside'),
    (m_id, 'Rizal'), (m_id, 'Roxas'), (m_id, 'Subayon'),
    (m_id, 'Villa Aurora'), (m_id, 'Villa Suerte'), (m_id, 'Yanaya'),
    (m_id, 'Zamora');

    -- Buenavista (35)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Buenavista';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Anonang'), (m_id, 'Asinan'), (m_id, 'Bago'), (m_id, 'Baluarte'),
    (m_id, 'Bantuan'), (m_id, 'Bato'), (m_id, 'Bonotbonot'), (m_id, 'Bugaong'),
    (m_id, 'Cambuhat'), (m_id, 'Cambus-oc'), (m_id, 'Cangawa'), (m_id, 'Cantomugcad'),
    (m_id, 'Cantores'), (m_id, 'Cantuba'), (m_id, 'Catigbian'), (m_id, 'Cawag'),
    (m_id, 'Cruz'), (m_id, 'Dait'), (m_id, 'Eastern Cabul-an'),
    (m_id, 'Hunan'), (m_id, 'Lapacan Norte'), (m_id, 'Lapacan Sur'),
    (m_id, 'Lubang'), (m_id, 'Lusong'), (m_id, 'Maguinda'),
    (m_id, 'Magsaysay'), (m_id, 'Poblacion'), (m_id, 'Puting Bato'),
    (m_id, 'Rufo Hill'), (m_id, 'Sweetland'), (m_id, 'Tan-awan'),
    (m_id, 'Tambangan'), (m_id, 'Tugas'), (m_id, 'Western Cabul-an'),
    (m_id, 'Panghagban');

    -- Calape (33)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Calape';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Abucayan Norte'), (m_id, 'Abucayan Sur'), (m_id, 'Banlasan'),
    (m_id, 'Bentig'), (m_id, 'Binogawan'), (m_id, 'Bonbon'),
    (m_id, 'Cabayugan'), (m_id, 'Cabudburan'), (m_id, 'Calunasan'),
    (m_id, 'Camias'), (m_id, 'Canguha'), (m_id, 'Catmonan'),
    (m_id, 'Desamparados'), (m_id, 'Kahayag'), (m_id, 'Kinabag-an'),
    (m_id, 'Labuon'), (m_id, 'Lawis'), (m_id, 'Liboron'),
    (m_id, 'Looc'), (m_id, 'Lomboy'), (m_id, 'Lucob'),
    (m_id, 'Madangog'), (m_id, 'Magtongtong'), (m_id, 'Mandaug'),
    (m_id, 'Mantatao'), (m_id, 'Sampoangon'), (m_id, 'San Isidro'),
    (m_id, 'Santa Cruz'), (m_id, 'Sojoton'), (m_id, 'Talisay'),
    (m_id, 'Tinibgan'), (m_id, 'Tultugan'), (m_id, 'Ulbujan');

    -- Candijay (21)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Candijay';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Abihilan'), (m_id, 'Anoling'), (m_id, 'Boyo-an'),
    (m_id, 'Cadapdapan'), (m_id, 'Cambane'), (m_id, 'Can-olin'),
    (m_id, 'Canawa'), (m_id, 'Cogtong'), (m_id, 'La Union'),
    (m_id, 'Luan'), (m_id, 'Lungsoda-an'), (m_id, 'Mahangin'),
    (m_id, 'Pagahat'), (m_id, 'Panadtaran'), (m_id, 'Panas'),
    (m_id, 'Poblacion'), (m_id, 'San Isidro'), (m_id, 'Tambongan'),
    (m_id, 'Tawid'), (m_id, 'Tugas'), (m_id, 'Tubod');

    -- Carmen (29)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Carmen';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Alegria'), (m_id, 'Bicao'), (m_id, 'Buenavista'),
    (m_id, 'Buenos Aires'), (m_id, 'Calatrava'), (m_id, 'El Progreso'),
    (m_id, 'El Salvador'), (m_id, 'Guadalupe'), (m_id, 'Katipunan'),
    (m_id, 'La Libertad'), (m_id, 'La Paz'), (m_id, 'La Salvacion'),
    (m_id, 'La Victoria'), (m_id, 'Matin-ao'), (m_id, 'Montehermoso'),
    (m_id, 'Montesuerte'), (m_id, 'Montesunting'), (m_id, 'Montevideo'),
    (m_id, 'Nueva Fuerza'), (m_id, 'Nueva Vida Este'), (m_id, 'Nueva Vida Norte'),
    (m_id, 'Nueva Vida Sur'), (m_id, 'Poblacion Norte'), (m_id, 'Poblacion Sur'),
    (m_id, 'Tac-an'), (m_id, 'Triunfo'), (m_id, 'Villaflor'),
    (m_id, 'Villafuerte'), (m_id, 'Villarcayo');

    -- Catigbian (22)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Catigbian';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Alegria'), (m_id, 'Ambuan'), (m_id, 'Baang'),
    (m_id, 'Bagtic'), (m_id, 'Bongbong'), (m_id, 'Cambailan'),
    (m_id, 'Candumayao'), (m_id, 'Causwagan Norte'), (m_id, 'Causwagan Sur'),
    (m_id, 'Hagbuaya'), (m_id, 'Haguilanan'), (m_id, 'Kang-iras'),
    (m_id, 'Libertad Sur'), (m_id, 'Liboron'), (m_id, 'Mahayag Norte'),
    (m_id, 'Mahayag Sur'), (m_id, 'Maitum'), (m_id, 'Mantacida'),
    (m_id, 'Poblacion'), (m_id, 'Poblacion Weste'), (m_id, 'Rizal'),
    (m_id, 'Sinakayanan');

    -- Clarin (24)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Clarin';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bacani'), (m_id, 'Bogtongbod'), (m_id, 'Bonbon'),
    (m_id, 'Bontud'), (m_id, 'Buacao'), (m_id, 'Buangan'),
    (m_id, 'Cabog'), (m_id, 'Caboy'), (m_id, 'Caluwasan'),
    (m_id, 'Candajec'), (m_id, 'Cantoyoc'), (m_id, 'Comaang'),
    (m_id, 'Danahao'), (m_id, 'Katipunan'), (m_id, 'Lajog'),
    (m_id, 'Mataub'), (m_id, 'Nahawan'), (m_id, 'Poblacion Centro'),
    (m_id, 'Poblacion Norte'), (m_id, 'Poblacion Sur'), (m_id, 'Tangaran'),
    (m_id, 'Tontunan'), (m_id, 'Tubod'), (m_id, 'Villaflor');

    -- Corella (8)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Corella';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Anislag'), (m_id, 'Canangca-an'), (m_id, 'Canapnapan'),
    (m_id, 'Cancatac'), (m_id, 'Pandol'), (m_id, 'Poblacion'),
    (m_id, 'Sambog'), (m_id, 'Tanday');

    -- Cortes (14)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Cortes';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'De la Paz'), (m_id, 'Fatima'), (m_id, 'Loreto'),
    (m_id, 'Lourdes'), (m_id, 'Malayo Norte'), (m_id, 'Malayo Sur'),
    (m_id, 'Montserrat'), (m_id, 'New Lourdes'), (m_id, 'Patrocinio'),
    (m_id, 'Poblacion'), (m_id, 'Rosario'), (m_id, 'Salvador'),
    (m_id, 'San Roque'), (m_id, 'Upper de la Paz');

    -- Dagohoy (15)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Dagohoy';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Babag'), (m_id, 'Can-oling'), (m_id, 'Candelaria'),
    (m_id, 'Estaca'), (m_id, 'La Esperanza'), (m_id, 'La Trinidad'),
    (m_id, 'Mahayag'), (m_id, 'Malitbog'), (m_id, 'Poblacion'),
    (m_id, 'San Miguel'), (m_id, 'San Vicente'), (m_id, 'Santa Cruz'),
    (m_id, 'Villa Aurora'), (m_id, 'Villa Candelaria'), (m_id, 'Villa Victoria');

    -- Danao (17)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Danao';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Cabatuan'), (m_id, 'Cantubod'), (m_id, 'Carbon'),
    (m_id, 'Concepcion'), (m_id, 'Dagohoy'), (m_id, 'Hibale'),
    (m_id, 'Magkaya'), (m_id, 'Nahud'), (m_id, 'Poblacion'),
    (m_id, 'Remedios'), (m_id, 'San Carlos'), (m_id, 'San Miguel'),
    (m_id, 'Santa Fe'), (m_id, 'Santo Niño'), (m_id, 'Tabok'),
    (m_id, 'Taming'), (m_id, 'Villa Anunciado');

    -- Dauis (12)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Dauis';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Biking'), (m_id, 'Bingag'), (m_id, 'Catarman'),
    (m_id, 'Dao'), (m_id, 'Mariveles'), (m_id, 'Mayacabac'),
    (m_id, 'Poblacion'), (m_id, 'San Isidro'), (m_id, 'Songculan'),
    (m_id, 'Tabalong'), (m_id, 'Tinago'), (m_id, 'Totolan');

    -- Dimiao (35)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Dimiao';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Abihilan'), (m_id, 'Alemania'), (m_id, 'Bag-ong Barrio'),
    (m_id, 'Bakilid'), (m_id, 'Balbalan'), (m_id, 'Banban'),
    (m_id, 'Bauyabao'), (m_id, 'Bilisan'), (m_id, 'Cabagakian'),
    (m_id, 'Cabanbanan'), (m_id, 'Cadap-agan'), (m_id, 'Calipayan'),
    (m_id, 'Cambacol'), (m_id, 'Cantomayor'), (m_id, 'Canlambong'),
    (m_id, 'Catugasan'), (m_id, 'Cogon'), (m_id, 'Datag'),
    (m_id, 'Guindaguitan'), (m_id, 'Guingoyuran'), (m_id, 'Hinawanan'),
    (m_id, 'Imelda'), (m_id, 'Junob'), (m_id, 'Lapsaon'),
    (m_id, 'Limokon Ilaod'), (m_id, 'Limokon Ilaya'), (m_id, 'Luyo'),
    (m_id, 'Malijao'), (m_id, 'Oac'), (m_id, 'Pagsa'),
    (m_id, 'Pangihawan'), (m_id, 'Poblacion'), (m_id, 'Puangyuta'),
    (m_id, 'Sawang'), (m_id, 'Tangohay');

    -- Duero (21)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Duero';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Alejawan'), (m_id, 'Angilan'), (m_id, 'Anibongan'),
    (m_id, 'Bangwalog'), (m_id, 'Cansuhay'), (m_id, 'Danao'),
    (m_id, 'Duay'), (m_id, 'Guinsularan'), (m_id, 'Itum'),
    (m_id, 'Langkis'), (m_id, 'Lobogon'), (m_id, 'Madua Norte'),
    (m_id, 'Madua Sur'), (m_id, 'Mambool'), (m_id, 'Mawi'),
    (m_id, 'Payao'), (m_id, 'San Antonio'), (m_id, 'San Isidro'),
    (m_id, 'San Pedro'), (m_id, 'Taytay'), (m_id, 'Tiguis');

    -- Garcia Hernandez (30)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Garcia Hernandez';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Abijilan'), (m_id, 'Anonang'), (m_id, 'Badiang'),
    (m_id, 'Bantugan'), (m_id, 'Basiao'), (m_id, 'Binongkalan'),
    (m_id, 'Calangahan'), (m_id, 'Camba-og'), (m_id, 'Camyaca'),
    (m_id, 'Canayaon'), (m_id, 'Cantao-on'), (m_id, 'Catmon'),
    (m_id, 'Cayam'), (m_id, 'Cogon'), (m_id, 'Datag'),
    (m_id, 'East Poblacion'), (m_id, 'Lungsodaan'), (m_id, 'Malinao'),
    (m_id, 'Manaba'), (m_id, 'Pasong'), (m_id, 'Poblacion Weste'),
    (m_id, 'Sacaon'), (m_id, 'Sampong'), (m_id, 'San Vicente'),
    (m_id, 'Song-on'), (m_id, 'Tabuan'), (m_id, 'Tambo'),
    (m_id, 'Taytay'), (m_id, 'Tinibgan'), (m_id, 'Ulbujan');

    -- Getafe (24)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Getafe';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Alumar'), (m_id, 'Banacon'), (m_id, 'Buyog'),
    (m_id, 'Cabasic'), (m_id, 'Camiguing'), (m_id, 'Cangmundo'),
    (m_id, 'Carlos P. Garcia'), (m_id, 'Corte Baud'), (m_id, 'Handumon'),
    (m_id, 'Jagoliao'), (m_id, 'Jandayan Norte'), (m_id, 'Jandayan Sur'),
    (m_id, 'Mahanay'), (m_id, 'Nasingin'), (m_id, 'Pandanon'),
    (m_id, 'Poblacion'), (m_id, 'Saguise'), (m_id, 'Salog'),
    (m_id, 'San Jose'), (m_id, 'Santo Niño'), (m_id, 'Taytay'),
    (m_id, 'Tugas'), (m_id, 'Tulang'), (m_id, 'Tulang Diot');

    -- Guindulman (19)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Guindulman';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Basdio'), (m_id, 'Bato'), (m_id, 'Bayong'),
    (m_id, 'Biabas'), (m_id, 'Bulawan'), (m_id, 'Cabantian'),
    (m_id, 'Canhaway'), (m_id, 'Cansiwang'), (m_id, 'Casbu'),
    (m_id, 'Catungawan Norte'), (m_id, 'Catungawan Sur'), (m_id, 'Guinacot'),
    (m_id, 'Guio-ang'), (m_id, 'Lombog'), (m_id, 'Mayuga'),
    (m_id, 'Poblacion'), (m_id, 'Sawang'), (m_id, 'Tabajan'),
    (m_id, 'Trinidad');

    -- Inabanga (50)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Inabanga';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Anonang'), (m_id, 'Badiang'), (m_id, 'Badiangon'),
    (m_id, 'Baguhan'), (m_id, 'Bahoan'), (m_id, 'Banahao'),
    (m_id, 'Baogo'), (m_id, 'Bonotbonot'), (m_id, 'Bugang'),
    (m_id, 'Cagawasan'), (m_id, 'Cagayan'), (m_id, 'Cambitoon'),
    (m_id, 'Canlinte'), (m_id, 'Cawayan'), (m_id, 'Cogon'),
    (m_id, 'Cuaming'), (m_id, 'Dagnawan'), (m_id, 'Dagohoy'),
    (m_id, 'Dait Sur'), (m_id, 'Datag'), (m_id, 'Fatima'),
    (m_id, 'Hambongan'), (m_id, 'Ilihan Sur'), (m_id, 'Ilihan Norte'),
    (m_id, 'Lapacan Norte'), (m_id, 'Lapacan Sur'), (m_id, 'Lawa'),
    (m_id, 'Liloan Norte'), (m_id, 'Liloan Sur'), (m_id, 'Lomboy'),
    (m_id, 'Lonoy Cainsican'), (m_id, 'Lonoy Roma'), (m_id, 'Lutao'),
    (m_id, 'Luyo'), (m_id, 'Mabuhay'), (m_id, 'Magkaya'),
    (m_id, 'Maria Rosario'), (m_id, 'Napo'), (m_id, 'Nueva Esperanza'),
    (m_id, 'Nueva Vida'), (m_id, 'Ondol'), (m_id, 'Poblacion'),
    (m_id, 'San Jose'), (m_id, 'San Isidro'), (m_id, 'San Vicente'),
    (m_id, 'Santo Niño'), (m_id, 'Santo Rosario'), (m_id, 'Sua'),
    (m_id, 'Tuburan'), (m_id, 'U-og');

    -- Jagna (33)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Jagna';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Alejawan'), (m_id, 'Balili'), (m_id, 'Boctol'),
    (m_id, 'Bunga Ilaya'), (m_id, 'Bunga Mar'), (m_id, 'Buyog'),
    (m_id, 'Cabungaan'), (m_id, 'Calabacita'), (m_id, 'Cambugason'),
    (m_id, 'Can-ipol'), (m_id, 'Canjulao'), (m_id, 'Cantagay'),
    (m_id, 'Cantuyoc'), (m_id, 'Can-uba'), (m_id, 'Can-upao'),
    (m_id, 'Faraon'), (m_id, 'Ipil'), (m_id, 'Kinagbaan'),
    (m_id, 'Laca'), (m_id, 'Larapan'), (m_id, 'Lonoy'),
    (m_id, 'Looc'), (m_id, 'Malbog'), (m_id, 'Mayana'),
    (m_id, 'Naatang'), (m_id, 'Nausok'), (m_id, 'Odiong'),
    (m_id, 'Pagina'), (m_id, 'Pangdan'), (m_id, 'Poblacion'),
    (m_id, 'Tejero'), (m_id, 'Tubod Mar'), (m_id, 'Tubod Monte');

    -- Lila (18)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Lila';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Banban'), (m_id, 'Bonkokan Ilaya'), (m_id, 'Bonkokan Ubos'),
    (m_id, 'Calvario'), (m_id, 'Candulang'), (m_id, 'Catugasan'),
    (m_id, 'Cayupo'), (m_id, 'Cogon'), (m_id, 'Jambawan'),
    (m_id, 'La Fortuna'), (m_id, 'Lomanoy'), (m_id, 'Macalingan'),
    (m_id, 'Malinao East'), (m_id, 'Malinao West'), (m_id, 'Nagsulay'),
    (m_id, 'Poblacion'), (m_id, 'Taug'), (m_id, 'Tiguis');

    -- Loay (24)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Loay';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Agape'), (m_id, 'Alegria Norte'), (m_id, 'Alegria Sur'),
    (m_id, 'Bonbon'), (m_id, 'Botong Occidental'), (m_id, 'Botong Oriental'),
    (m_id, 'Bugho'), (m_id, 'Cabantian'), (m_id, 'Calayugan Norte'),
    (m_id, 'Calayugan Sur'), (m_id, 'Cambanac'), (m_id, 'Canigaan'),
    (m_id, 'Cansibao'), (m_id, 'Cansiwang'), (m_id, 'Cogon Norte'),
    (m_id, 'Cogon Sur'), (m_id, 'Hinawanan'), (m_id, 'Las Salinas Norte'),
    (m_id, 'Las Salinas Sur'), (m_id, 'Palo'), (m_id, 'Poblacion Ibabao'),
    (m_id, 'Poblacion Ubos'), (m_id, 'Sagnap'), (m_id, 'Tambangan');

    -- Loboc (28)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Loboc';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Agape'), (m_id, 'Alegria'), (m_id, 'Bagumbayan'),
    (m_id, 'Bahian'), (m_id, 'Bonbon Lower'), (m_id, 'Bonbon Upper'),
    (m_id, 'Buenavista'), (m_id, 'Bugho'), (m_id, 'Cabadiangan'),
    (m_id, 'Calunasan Norte'), (m_id, 'Calunasan Sur'), (m_id, 'Camaya-an'),
    (m_id, 'Cambance'), (m_id, 'Candabong'), (m_id, 'Candasag'),
    (m_id, 'Canlasid'), (m_id, 'Gon-ob'), (m_id, 'Gotozon'),
    (m_id, 'Jimilian'), (m_id, 'Oy'), (m_id, 'Poblacion Ondol'),
    (m_id, 'Poblacion Sawang'), (m_id, 'Quinoguitan'), (m_id, 'Taytay'),
    (m_id, 'Tigbao'), (m_id, 'Ugong'), (m_id, 'Valladolid'),
    (m_id, 'Villaflor');

    -- Loon (67)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Loon';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Agsoso'), (m_id, 'Badbad Occidental'), (m_id, 'Badbad Oriental'),
    (m_id, 'Bagacay Kawayan'), (m_id, 'Bagacay Saong'), (m_id, 'Bagacay'),
    (m_id, 'Banahao'), (m_id, 'Bantig Bas'), (m_id, 'Bantig Daku'),
    (m_id, 'Basac'), (m_id, 'Basdaco'), (m_id, 'Basdio'),
    (m_id, 'Biasong'), (m_id, 'Bongco'), (m_id, 'Bongco'),
    (m_id, 'Bongbong'), (m_id, 'Bontores'), (m_id, 'Cabacongan'),
    (m_id, 'Cabahug Norte'), (m_id, 'Cabahug Sur'), (m_id, 'Cabalagnan'),
    (m_id, 'Canabajon'), (m_id, 'Canam-ag'), (m_id, 'Candanay'),
    (m_id, 'Candavid'), (m_id, 'Cang-isok'), (m_id, 'Cansaguir'),
    (m_id, 'Cantam-is Bago'), (m_id, 'Cantam-is Baslay'), (m_id, 'Cantaongon'),
    (m_id, 'Cantumogbad'), (m_id, 'Catagbacan Norte'), (m_id, 'Catagbacan Sur'),
    (m_id, 'Cogon Norte'), (m_id, 'Cogon Sur'), (m_id, 'Cuasi'),
    (m_id, 'Genomoan'), (m_id, 'Genoveva'), (m_id, 'Intabaan'),
    (m_id, 'Lintuan'), (m_id, 'Looc'), (m_id, 'Mocpoc Norte'),
    (m_id, 'Mocpoc Sur'), (m_id, 'Motosawa'), (m_id, 'Nagtuang'),
    (m_id, 'Napo'), (m_id, 'Nueva Vida'), (m_id, 'Pangasi'),
    (m_id, 'Poblacion'), (m_id, 'Pondol'), (m_id, 'Quinobcoban'),
    (m_id, 'Sactud'), (m_id, 'Sagbayan'), (m_id, 'Sandigan'),
    (m_id, 'Song-on'), (m_id, 'Talisay'), (m_id, 'Tange'),
    (m_id, 'Tangnan'), (m_id, 'Ticugan'), (m_id, 'Tiwi'),
    (m_id, 'Tontonan'), (m_id, 'Tubodacu'), (m_id, 'Tubodio'),
    (m_id, 'Tubuan'), (m_id, 'Ubay Daku'), (m_id, 'Ubay Diot');

    -- Mabini (22)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Mabini';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Abaca'), (m_id, 'Abad Santos'), (m_id, 'Aguipo'),
    (m_id, 'Baybayon'), (m_id, 'Bulawan'), (m_id, 'Cabidian'),
    (m_id, 'Cawayanan'), (m_id, 'Concepcion'), (m_id, 'Del Mar'),
    (m_id, 'Lungsodaan'), (m_id, 'Marcelo'), (m_id, 'Minol'),
    (m_id, 'Paraiso'), (m_id, 'Poblacion I'), (m_id, 'Poblacion II'),
    (m_id, 'San Isidro'), (m_id, 'San Jose'), (m_id, 'San Roque'),
    (m_id, 'San Vicente'), (m_id, 'Santa Cruz'), (m_id, 'Tangkigan'),
    (m_id, 'Valaga');

    -- Maribojoc (22)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Maribojoc';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'San Roque'), (m_id, 'San Vicente'), (m_id, 'Santa Cruz'),
    (m_id, 'Santo Niño'), (m_id, 'Santo Rosario'), (m_id, 'Agahay'),
    (m_id, 'Aliguay'), (m_id, 'Anislag'), (m_id, 'Bayacabac'),
    (m_id, 'Bood'), (m_id, 'Busao'), (m_id, 'Cabawan'),
    (m_id, 'Candavid'), (m_id, 'Dipatlong'), (m_id, 'Guiwanon'),
    (m_id, 'Jandig'), (m_id, 'Lagtangon'), (m_id, 'Lincod'),
    (m_id, 'Pagnitoan'), (m_id, 'Poblacion'), (m_id, 'Punsod'),
    (m_id, 'Punta Cruz');

    -- Panglao (10)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Panglao';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bil-isan'), (m_id, 'Bolod'), (m_id, 'Danao'),
    (m_id, 'Doljo'), (m_id, 'Libaong'), (m_id, 'Looc'),
    (m_id, 'Lourdes'), (m_id, 'Poblacion'), (m_id, 'Tangnan'),
    (m_id, 'Tawala');

    -- Pilar (21)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Pilar';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Aurora'), (m_id, 'Bagacay'), (m_id, 'Bagumbayan'),
    (m_id, 'Bayong'), (m_id, 'Buenasuerte'), (m_id, 'Cagawasan'),
    (m_id, 'Cansungay'), (m_id, 'Catagdaan'), (m_id, 'Del Pilar'),
    (m_id, 'Estaca'), (m_id, 'Ilaud'), (m_id, 'Inaghuban'),
    (m_id, 'La Suerte'), (m_id, 'Lumbay'), (m_id, 'Lundag'),
    (m_id, 'Pamacsalan'), (m_id, 'Poblacion'), (m_id, 'Rizal'),
    (m_id, 'San Carlos'), (m_id, 'San Isidro'), (m_id, 'San Vicente');

    -- Pres. Carlos P. Garcia (23)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Pres. Carlos P. Garcia';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Aguining'), (m_id, 'Basiao'), (m_id, 'Baud'),
    (m_id, 'Bayog'), (m_id, 'Bogo'), (m_id, 'Bonbonon'),
    (m_id, 'Butan'), (m_id, 'Campamanog'), (m_id, 'Canmangao'),
    (m_id, 'Gaus'), (m_id, 'Kabangkalan'), (m_id, 'Lapinig'),
    (m_id, 'Lipata'), (m_id, 'Poblacion'), (m_id, 'Popoo'),
    (m_id, 'Saguise'), (m_id, 'San Jose'), (m_id, 'San Vicente'),
    (m_id, 'Santo Rosario'), (m_id, 'Tilmobo'), (m_id, 'Tugas'),
    (m_id, 'Tugnao'), (m_id, 'Villa Milagrosa');

    -- Sagbayan (24)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Sagbayan';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Calangahan'), (m_id, 'Canmano'), (m_id, 'Canmaya Centro'),
    (m_id, 'Canmaya Diot'), (m_id, 'Dagnawan'), (m_id, 'Danao'),
    (m_id, 'Kabayugan'), (m_id, 'Kagawasan'), (m_id, 'Katipunan'),
    (m_id, 'Langtad'), (m_id, 'Libertad Norte'), (m_id, 'Libertad Sur'),
    (m_id, 'Mantalongon'), (m_id, 'Poblacion'), (m_id, 'Sagbayan Sur'),
    (m_id, 'San Agustin'), (m_id, 'San Antonio'), (m_id, 'San Isidro'),
    (m_id, 'San Ramon'), (m_id, 'San Roque'), (m_id, 'San Vicente Norte'),
    (m_id, 'San Vicente Sur'), (m_id, 'Santa Catalina'), (m_id, 'Villa Garcia');

    -- San Isidro (12)
    SELECT id INTO m_id FROM municipalities WHERE name = 'San Isidro';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Abehilan'), (m_id, 'Baunos'), (m_id, 'Cabanugan'),
    (m_id, 'Caimbang'), (m_id, 'Cambansag'), (m_id, 'Candungao'),
    (m_id, 'Cansague Norte'), (m_id, 'Cansague Sur'), (m_id, 'Causwagan Sur'),
    (m_id, 'Masonoy'), (m_id, 'Poblacion'), (m_id, 'San Jose');

    -- San Miguel (18)
    SELECT id INTO m_id FROM municipalities WHERE name = 'San Miguel';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bayongan'), (m_id, 'Bugang'), (m_id, 'Cabangahan'),
    (m_id, 'Caluasan'), (m_id, 'Camanaga'), (m_id, 'Cambangay Norte'),
    (m_id, 'Capayas'), (m_id, 'Corazon'), (m_id, 'Garcia'),
    (m_id, 'Hagbuyo'), (m_id, 'Kawasan'), (m_id, 'Mahayag'),
    (m_id, 'Poblacion'), (m_id, 'San Isidro'), (m_id, 'San Jose'),
    (m_id, 'San Vicente'), (m_id, 'Santo Niño'), (m_id, 'Tomoc');

    -- Sevilla (13)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Sevilla';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bayawahan'), (m_id, 'Cabancalan'), (m_id, 'Calape'),
    (m_id, 'Calinga-an'), (m_id, 'Cambagui'), (m_id, 'Ewon'),
    (m_id, 'Guinob-an'), (m_id, 'Lagtangan'), (m_id, 'Licolico'),
    (m_id, 'Lobgob'), (m_id, 'Magsaysay'), (m_id, 'Poblacion'),
    (m_id, 'Suba');

    -- Sierra Bullones (22)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Sierra Bullones';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Abachanan'), (m_id, 'Anibongan'), (m_id, 'Bugsoc'),
    (m_id, 'Cahayag'), (m_id, 'Canlangit'), (m_id, 'Canta-ub'),
    (m_id, 'Casilay'), (m_id, 'Danicop'), (m_id, 'Dusita'),
    (m_id, 'Lataban'), (m_id, 'Magsaysay'), (m_id, 'Matin-ao'),
    (m_id, 'Nan-od'), (m_id, 'Poblacion'), (m_id, 'Salvador'),
    (m_id, 'San Agustin'), (m_id, 'San Isidro'), (m_id, 'San Jose'),
    (m_id, 'San Juan'), (m_id, 'Santa Cruz'), (m_id, 'Villa Garcia'),
    (m_id, 'Villahermosa');

    -- Sikatuna (10)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Sikatuna';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Abucay Norte'), (m_id, 'Abucay Sur'), (m_id, 'Badiang'),
    (m_id, 'Bahaybahay'), (m_id, 'Cambuac Norte'), (m_id, 'Cambuac Sur'),
    (m_id, 'Canagong'), (m_id, 'Libjo'), (m_id, 'Poblacion I'),
    (m_id, 'Poblacion II');

    -- Tagbilaran City (15)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Tagbilaran';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bool'), (m_id, 'Booy'), (m_id, 'Cabawan'),
    (m_id, 'Cogon'), (m_id, 'Dao'), (m_id, 'Dampas'),
    (m_id, 'Manga'), (m_id, 'Mansasa'), (m_id, 'Poblacion I'),
    (m_id, 'Poblacion II'), (m_id, 'Poblacion III'), (m_id, 'San Isidro'),
    (m_id, 'Taloto'), (m_id, 'Tiptip'), (m_id, 'Ubujan');

    -- Talibon (25)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Talibon';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bagacay'), (m_id, 'Balintawak'), (m_id, 'Burgos'),
    (m_id, 'Calituban'), (m_id, 'Cataban'), (m_id, 'Guindacpan'),
    (m_id, 'Magsaysay'), (m_id, 'Mahanay'), (m_id, 'Nocnocan'),
    (m_id, 'Poblacion'), (m_id, 'Rizal'), (m_id, 'Sag'),
    (m_id, 'San Agustin'), (m_id, 'San Carlos'), (m_id, 'San Francisco'),
    (m_id, 'San Isidro'), (m_id, 'San Jose'), (m_id, 'San Pedro'),
    (m_id, 'San Roque'), (m_id, 'Santo Niño'), (m_id, 'Sikatuna'),
    (m_id, 'Suba'), (m_id, 'Tanghaligue'), (m_id, 'Zamora'),
    (m_id, 'San Vicente');

    -- Trinidad (20)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Trinidad';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Banlasan'), (m_id, 'Bongbong'), (m_id, 'Cabug'),
    (m_id, 'Catoogan'), (m_id, 'Guinobatan'), (m_id, 'Hinlayagan Ilaud'),
    (m_id, 'Hinlayagan Ilaya'), (m_id, 'Kauswagan'), (m_id, 'Kinanao-an'),
    (m_id, 'La Union'), (m_id, 'La Victoria'), (m_id, 'Mabuhay Kabiguhan'),
    (m_id, 'Mahagbu'), (m_id, 'Manuel M. Roxas'), (m_id, 'Poblacion'),
    (m_id, 'San Isidro'), (m_id, 'San Vicente'), (m_id, 'Santo Tomas'),
    (m_id, 'Soom'), (m_id, 'Tagum Norte');

    -- Tubigon (34)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Tubigon';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Bagongbanwa'), (m_id, 'Batasan'), (m_id, 'Bilangbilangan'),
    (m_id, 'Bosongon'), (m_id, 'Buenos Aires'), (m_id, 'Bunacan'),
    (m_id, 'Cabulihan'), (m_id, 'Cahayag'), (m_id, 'Cawayanan'),
    (m_id, 'Centro'), (m_id, 'Genoveva'), (m_id, 'Guiwanon'),
    (m_id, 'Ilihan Norte'), (m_id, 'Ilihan Sur'), (m_id, 'Libertad'),
    (m_id, 'Macaas'), (m_id, 'Matab-ang'), (m_id, 'Mocaboc Norte'),
    (m_id, 'Mocaboc Sur'), (m_id, 'Moto'), (m_id, 'Panaytayon'),
    (m_id, 'Pandao'), (m_id, 'Pinayagan Norte'), (m_id, 'Pinayagan Sur'),
    (m_id, 'Pooc Occidental'), (m_id, 'Pooc Oriental'), (m_id, 'Poblacion'),
    (m_id, 'Potohan'), (m_id, 'Talenceras'), (m_id, 'Tan-awan'),
    (m_id, 'Tinangnan'), (m_id, 'Ubay Island'), (m_id, 'Ubojan'),
    (m_id, 'Villanueva');

    -- Ubay (44)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Ubay';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Achila'), (m_id, 'Bay-ang'), (m_id, 'Benliw'),
    (m_id, 'Biabas'), (m_id, 'Bongbong'), (m_id, 'Bood'),
    (m_id, 'Buenavista'), (m_id, 'Cagting'), (m_id, 'Calanggaman'),
    (m_id, 'Camambugan'), (m_id, 'Casate'), (m_id, 'Cawayan'),
    (m_id, 'Cuya'), (m_id, 'Fatima'), (m_id, 'Gabi'),
    (m_id, 'Governor Boyles'), (m_id, 'Guintabo-an'), (m_id, 'Hambabauran'),
    (m_id, 'Humayhumay'), (m_id, 'Ilihan'), (m_id, 'Imelda'),
    (m_id, 'Juagdan'), (m_id, 'Katarungan'), (m_id, 'La Esperanza'),
    (m_id, 'Lomangog'), (m_id, 'Los Angeles'), (m_id, 'Pag-asa'),
    (m_id, 'Pangpang'), (m_id, 'Poblacion'), (m_id, 'San Francisco'),
    (m_id, 'San Isidro'), (m_id, 'San Pascual'), (m_id, 'San Vicente'),
    (m_id, 'Sentinel'), (m_id, 'Sinandigan'), (m_id, 'Sikatuna'),
    (m_id, 'Tapal'), (m_id, 'Tapon'), (m_id, 'Tintinan'),
    (m_id, 'Tipolo'), (m_id, 'Tubog'), (m_id, 'Tuboran'),
    (m_id, 'Union'), (m_id, 'Villa Teresita');

    -- Valencia (35)
    SELECT id INTO m_id FROM municipalities WHERE name = 'Valencia';
    INSERT INTO barangays (municipality_id, name) VALUES
    (m_id, 'Adlawan'), (m_id, 'Anas'), (m_id, 'Anonang'),
    (m_id, 'Anoyon'), (m_id, 'Balingasao'), (m_id, 'Banderahan'),
    (m_id, 'Botong'), (m_id, 'Buyog'), (m_id, 'Canduao Occidental'),
    (m_id, 'Canduao Oriental'), (m_id, 'Canlusong'), (m_id, 'Canmanico'),
    (m_id, 'Cansibao'), (m_id, 'Catug-an'), (m_id, 'Cutcutan'),
    (m_id, 'Danao'), (m_id, 'Genoveva'), (m_id, 'Ginopolan'),
    (m_id, 'La Victoria'), (m_id, 'Lantang'), (m_id, 'Limocon'),
    (m_id, 'Loctob'), (m_id, 'Magsaysay'), (m_id, 'Marawis'),
    (m_id, 'Maubo'), (m_id, 'Nailo'), (m_id, 'Omjon'),
    (m_id, 'Pangi-an'), (m_id, 'Poblacion Occidental'), (m_id, 'Poblacion Oriental'),
    (m_id, 'Simang'), (m_id, 'Taug'), (m_id, 'Tausion'),
    (m_id, 'Taytay'), (m_id, 'Ticum');
END $$;