-- ============================================================
--  Schema Supabase — Jungfrau-Aletsch V14
--  Base de données des ressources du site
--  Exécuter dans : Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Créer la table resources
CREATE TABLE IF NOT EXISTS public.resources (
    id             UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    name           VARCHAR(255)  NOT NULL,
    description    TEXT,
    type           VARCHAR(50)   NOT NULL CHECK (type IN ('image', 'video', 'pdf', 'data', 'other')),
    category       VARCHAR(100)  NOT NULL DEFAULT 'general',
    filename       VARCHAR(255)  NOT NULL,
    storage_path   TEXT,
    public_url     TEXT          NOT NULL,
    size_bytes     BIGINT,
    alt_text       VARCHAR(500),
    page_reference VARCHAR(100),
    is_active      BOOLEAN       DEFAULT true,
    created_at     TIMESTAMPTZ   DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   DEFAULT NOW()
);

-- 2. Activer Row Level Security
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- 3. Politique : lecture publique des ressources actives
CREATE POLICY "Lecture publique des ressources actives"
    ON public.resources
    FOR SELECT
    USING (is_active = true);

-- 4. Politique : insertion publique (pour l'upload via le formulaire)
CREATE POLICY "Insertion publique autorisée"
    ON public.resources
    FOR INSERT
    WITH CHECK (true);

-- 4.a Politique : UPDATE réservé aux utilisateurs authentifiés (admin)
CREATE POLICY "Modification admin autorisée"
    ON public.resources
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 4.b Politique : DELETE réservé aux utilisateurs authentifiés (admin)
CREATE POLICY "Suppression admin autorisée"
    ON public.resources
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- 5. Index pour les performances
CREATE INDEX IF NOT EXISTS idx_resources_type     ON public.resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_page     ON public.resources(page_reference);
CREATE INDEX IF NOT EXISTS idx_resources_active   ON public.resources(is_active);

-- 6. Données initiales : ressources existantes du site
INSERT INTO public.resources
    (name, description, type, category, filename, public_url, alt_text, page_reference, size_bytes)
VALUES
    (
        'Hero Observatory',
        'Image hero principale de la page accueil — vue de l''observatoire',
        'image', 'hero', 'hero-observatory.jpg',
        'assets/images/hero-observatory.jpg',
        'Vue panoramique de l''observatoire Jungfrau sous un ciel étoilé',
        'index', 917504
    ),
    (
        'Glacier Aletsch',
        'Photo du glacier d''Aletsch pour la page Sites',
        'image', 'sites', 'site-glacier.png',
        'assets/images/site-glacier.png',
        'Le glacier d''Aletsch, plus grand glacier des Alpes',
        'sites', 524288
    ),
    (
        'Jungfrau Sommet',
        'Photo du sommet emblématique de la Jungfrau (4158 m)',
        'image', 'sites', 'site-jungfrau.png',
        'assets/images/site-jungfrau.png',
        'Le sommet de la Jungfrau à 4158 mètres',
        'sites', 467968
    ),
    (
        'Flore Alpine',
        'Photo de la flore alpine caractéristique de la région',
        'image', 'sites', 'site-flore.png',
        'assets/images/site-flore.png',
        'Flore alpine de la région Jungfrau-Aletsch',
        'sites', 312320
    ),
    (
        'Sentiers de randonnée',
        'Photo des sentiers panoramiques de randonnée',
        'image', 'sites', 'site-randonnees.png',
        'assets/images/site-randonnees.png',
        'Sentiers de randonnée panoramiques Jungfrau-Aletsch',
        'sites,parcours', 260096
    ),
    (
        'Illustration Bro',
        'Illustration décorative utilisée sur plusieurs pages',
        'image', 'general', 'bro.png',
        'assets/images/bro.png',
        'Illustration décorative du site Jungfrau-Aletsch',
        'multiple', 84992
    ),
    (
        'Logo MCN Noir',
        'Logo officiel vectoriel de l''équipe M.C.N.',
        'image', 'branding', 'logomcnnoir.svg',
        'assets/images/logomcnnoir.svg',
        'Logo MCN — Médiation Culturelle et Numérique',
        'all', 51200
    ),
    (
        'Diagramme Simplification',
        'Diagramme technique d''architecture du projet',
        'image', 'technical', 'Simplification.png',
        'assets/images/Simplification.png',
        'Diagramme de simplification de l''architecture du site',
        'documentation', 8397
    ),
    (
        'Icône Accessibilité',
        'Icône symbolisant l''accessibilité aux personnes en situation de handicap',
        'image', 'icons', 'bx_handicap.png',
        'assets/images/bx_handicap.png',
        'Icône accessibilité — personne en situation de handicap',
        'accessibility', 5632
    ),
    (
        'Faune Alpine',
        'Photo de bouquetin des Alpes pour la carte Faune',
        'image', 'sites', 'site-faune.png',
        'assets/images/site-faune.png',
        'Bouquetin des Alpes dans son habitat naturel',
        'sites', 0
    ),
    (
        'Géologie Alpine',
        'Photo de formation géologique alpine pour la carte Géologie',
        'image', 'sites', 'site-geologie.png',
        'assets/images/site-geologie.png',
        'Formation géologique caractéristique de la région Jungfrau-Aletsch',
        'sites', 613830
    ),
    (
        'Page Témoignages',
        'Page dédiée aux témoignages voyageurs et vidéos du patrimoine Jungfrau-Aletsch',
        'other', 'pages', 'temoignages.html',
        'temoignages.html',
        'Page témoignages voyageurs — avis et vidéos du patrimoine UNESCO',
        'temoignages', 0
    ),
    (
        'Page Admin',
        'Interface administration pour la gestion des ressources du site',
        'other', 'admin', 'admin.html',
        'admin.html',
        'Page administration — gestion des ressources',
        'admin', 0
    ),
    -- Timeline Patrimoine
    (
        'Timeline 1972 UNESCO HQ',
        'Siège UNESCO Paris pour la timeline Patrimoine',
        'image', 'timeline', 'timeline-1972-unesco-hq.jpg',
        'assets/images/timeline/timeline-1972-unesco-hq.jpg',
        'Siège de l''UNESCO à Paris avec drapeaux',
        'timeline', 87694
    ),
    (
        'Timeline 1978 Premiers Sites',
        'Collage des 4 premiers sites UNESCO inscrits',
        'image', 'timeline', 'timeline-1978-premiers-sites.jpg',
        'assets/images/timeline/timeline-1978-premiers-sites.jpg',
        'Premiers sites UNESCO : Galápagos, Lalibela, Gorée, Yellowstone',
        'timeline', 65931
    ),
    (
        'Timeline 2001 Jungfrau Panorama',
        'Panorama Jungfrau pour inscription initiale',
        'image', 'timeline', 'timeline-2001-jungfrau-panorama.jpg',
        'assets/images/timeline/timeline-2001-jungfrau-panorama.jpg',
        'Panorama de la Jungfrau et de l''Eiger',
        'timeline', 50475
    ),
    (
        'Timeline 2007 Carte Périmètre',
        'Carte satellite du périmètre UNESCO 2007',
        'image', 'timeline', 'timeline-2007-carte-perimetre.jpg',
        'assets/images/timeline/timeline-2007-carte-perimetre.jpg',
        'Carte du périmètre UNESCO Jungfrau-Aletsch 2007',
        'timeline', 208984
    ),
    (
        'Timeline 2008 Logo Officiel',
        'Logo officiel UNESCO Swiss Alps',
        'image', 'timeline', 'timeline-2008-logo-officiel.png',
        'assets/images/timeline/timeline-2008-logo-officiel.png',
        'Logo UNESCO World Heritage Swiss Alps Jungfrau-Aletsch',
        'timeline', 25353
    ),
    (
        'Timeline 2014 Station Recherche',
        'Équipe scientifique avec station de surveillance',
        'image', 'timeline', 'timeline-2014-station-recherche.jpg',
        'assets/images/timeline/timeline-2014-station-recherche.jpg',
        'Station de surveillance scientifique en montagne',
        'timeline', 115407
    ),
    (
        'Timeline Carottage Glaciaire',
        'Scientifiques réalisant un carottage sur glacier',
        'image', 'timeline', 'timeline-2020-carottage-glace.jpg',
        'assets/images/timeline/timeline-2020-carottage-glace.jpg',
        'Carottage glaciaire par des scientifiques',
        'timeline', 137711
    ),
    -- Timeline Géologie
    (
        'Timeline Naissance Alpes',
        'Sommets alpins au lever du soleil',
        'image', 'timeline', 'timeline-geo-naissance-alpes.jpg',
        'assets/images/timeline/timeline-geo-naissance-alpes.jpg',
        'Sommets alpins émergeant au-dessus des nuages',
        'timeline', 0
    ),
    (
        'Timeline Roches Anciennes',
        'Strates rocheuses sédimentaires',
        'image', 'timeline', 'timeline-geo-roches-anciennes.jpg',
        'assets/images/timeline/timeline-geo-roches-anciennes.jpg',
        'Strates rocheuses sédimentaires anciennes',
        'timeline', 0
    ),
    (
        'Timeline Glaciation',
        'Glacier massif ère glaciaire',
        'image', 'timeline', 'timeline-geo-glaciation.jpg',
        'assets/images/timeline/timeline-geo-glaciation.jpg',
        'Glacier massif de l''ère glaciaire',
        'timeline', 0
    ),
    (
        'Timeline Découverte',
        'Instruments exploration anciens',
        'image', 'timeline', 'timeline-geo-decouverte.jpg',
        'assets/images/timeline/timeline-geo-decouverte.jpg',
        'Instruments de navigation et d''exploration anciens',
        'timeline', 0
    ),
    (
        'Timeline Tourisme',
        'Train de montagne Alpes suisses',
        'image', 'timeline', 'timeline-geo-tourisme.jpg',
        'assets/images/timeline/timeline-geo-tourisme.jpg',
        'Train de montagne dans les Alpes suisses',
        'timeline', 0
    ),
    (
        'Timeline Fonte',
        'Glacier en recul avec lac',
        'image', 'timeline', 'timeline-geo-fonte.jpg',
        'assets/images/timeline/timeline-geo-fonte.jpg',
        'Glacier en recul avec lac proglaciaire',
        'timeline', 0
    ),
    (
        'Timeline Climat',
        'Impact changement climatique sur glacier',
        'image', 'timeline', 'timeline-geo-climat.jpg',
        'assets/images/timeline/timeline-geo-climat.jpg',
        'Paysage montrant les effets du changement climatique sur les glaciers',
        'timeline', 0
    ),
    (
        'Timeline 2005 Gestion Participative',
        'Réunion de gestion participative du site UNESCO',
        'image', 'timeline', 'timeline-2005-gestion-participative.jpg',
        'assets/images/timeline/timeline-2005-gestion-participative.jpg',
        'Réunion de gestion participative associant collectivités et scientifiques',
        'timeline', 0
    ),
    -- Images page Faune (locales)
    (
        'Bouquetin des Alpes',
        'Photo de bouquetin pour la page Faune Alpine',
        'image', 'faune', 'bouquetin.jpg',
        'assets/images/faune/bouquetin.jpg',
        'Bouquetin des Alpes avec ses cornes recourbées sur un rocher alpin',
        'page-faune', 0
    ),
    (
        'Chamois',
        'Photo de chamois pour la page Faune Alpine',
        'image', 'faune', 'chamois.jpg',
        'assets/images/faune/chamois.jpg',
        'Chamois sur un versant rocheux alpin',
        'page-faune', 0
    ),
    (
        'Marmotte des Alpes',
        'Photo de marmotte pour la page Faune Alpine',
        'image', 'faune', 'marmotte.jpg',
        'assets/images/faune/marmotte.jpg',
        'Marmotte alpine dans une prairie de montagne',
        'page-faune', 0
    ),
    (
        'Aigle Royal',
        'Photo d''aigle royal pour la page Faune Alpine',
        'image', 'faune', 'aigle-royal.jpg',
        'assets/images/faune/aigle-royal.jpg',
        'Aigle royal en vol au-dessus des sommets',
        'page-faune', 0
    ),
    -- Images page Glacier (locales)
    (
        'Konkordiaplatz',
        'Vue aérienne du confluent glaciaire Konkordiaplatz',
        'image', 'glacier', 'konkordiaplatz.jpg',
        'assets/images/glacier/konkordiaplatz.jpg',
        'Le Konkordiaplatz — confluent des trois glaciers tributaires de l''Aletsch',
        'page-glacier', 0
    ),
    (
        'Vue Eggishorn',
        'Vue panoramique du glacier d''Aletsch depuis l''Eggishorn',
        'image', 'glacier', 'eggishorn-vue.jpg',
        'assets/images/glacier/eggishorn-vue.jpg',
        'Le glacier d''Aletsch vu depuis le sommet de l''Eggishorn',
        'page-glacier', 0
    );

-- 7. Vérification finale
SELECT
    type,
    COUNT(*)       AS total,
    SUM(size_bytes) AS taille_totale_bytes
FROM public.resources
GROUP BY type
ORDER BY type;

SELECT COUNT(*) AS total_ressources FROM public.resources;