// ================================================================
//  db.js — Supabase Client & Gestionnaire de Ressources
//  Jungfrau-Aletsch V14
//  Prérequis : CDN Supabase chargé avant ce script
//  Usage global : window.JA_DB.getAll(), .upload(), etc.
// ================================================================

(function () {
    'use strict';

    const SUPABASE_URL = 'https://dhtwddtngnbkqrqudxsz.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_d7sX3qqGzJXYSUOyxkkkGA_EnK7hyue';
    const BUCKET      = 'site-media';

    if (!window.supabase) {
        console.error('[JA_DB] Le CDN Supabase n\'est pas chargé. Ajouter le script CDN avant db.js.');
        return;
    }

    const { createClient } = window.supabase;
    const client = createClient(SUPABASE_URL, SUPABASE_KEY);

    // ── Lecture ──────────────────────────────────────────────────────

    async function getAll() {
        const { data, error } = await client
            .from('resources')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        if (error) { console.error('[JA_DB] getAll:', error.message); return []; }
        return data;
    }

    async function getByType(type) {
        const { data, error } = await client
            .from('resources')
            .select('*')
            .eq('type', type)
            .eq('is_active', true)
            .order('name');
        if (error) { console.error('[JA_DB] getByType:', error.message); return []; }
        return data;
    }

    async function getByCategory(category) {
        const { data, error } = await client
            .from('resources')
            .select('*')
            .eq('category', category)
            .eq('is_active', true)
            .order('name');
        if (error) { console.error('[JA_DB] getByCategory:', error.message); return []; }
        return data;
    }

    async function getByPage(page) {
        const { data, error } = await client
            .from('resources')
            .select('*')
            .or(`page_reference.ilike.%${page}%,page_reference.eq.all`)
            .eq('is_active', true);
        if (error) { console.error('[JA_DB] getByPage:', error.message); return []; }
        return data;
    }

    async function getById(id) {
        const { data, error } = await client
            .from('resources')
            .select('*')
            .eq('id', id)
            .single();
        if (error) { console.error('[JA_DB] getById:', error.message); return null; }
        return data;
    }

    // ── Upload vers Supabase Storage ─────────────────────────────────

    async function upload(file, meta = {}) {
        const timestamp  = Date.now();
        const safeName   = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const category   = meta.category || 'general';
        const path       = `${category}/${timestamp}_${safeName}`;

        const { error: uploadErr } = await client.storage
            .from(BUCKET)
            .upload(path, file, { cacheControl: '3600', upsert: false });

        if (uploadErr) {
            console.error('[JA_DB] upload storage:', uploadErr.message);
            return null;
        }

        const { data: urlData } = client.storage.from(BUCKET).getPublicUrl(path);

        const record = {
            name:           meta.name        || file.name,
            description:    meta.description || null,
            type:           _mimeToType(file.type),
            category,
            filename:       safeName,
            storage_path:   path,
            public_url:     urlData.publicUrl,
            size_bytes:     file.size,
            alt_text:       meta.alt_text       || null,
            page_reference: meta.page_reference || null,
        };

        const { data, error: insertErr } = await client
            .from('resources')
            .insert(record)
            .select()
            .single();

        if (insertErr) {
            console.error('[JA_DB] upload insert:', insertErr.message);
            return null;
        }
        return data;
    }

    // Désactivation logique (soft delete — préserve l'historique)
    async function remove(id) {
        const resource = await getById(id);
        if (!resource) return false;

        const { error } = await client
            .from('resources')
            .update({ is_active: false, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) { console.error('[JA_DB] remove:', error.message); return false; }
        return true;
    }

    // Mise à jour des métadonnées d'une ressource (admin only — nécessite auth)
    async function update(id, fields) {
        fields.updated_at = new Date().toISOString();
        const { data, error } = await client
            .from('resources')
            .update(fields)
            .eq('id', id)
            .select()
            .single();
        if (error) { console.error('[JA_DB] update:', error.message); return null; }
        return data;
    }

    // Récupérer TOUTES les ressources (y compris inactives) — admin only
    async function getAllAdmin() {
        const { data, error } = await client
            .from('resources')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) { console.error('[JA_DB] getAllAdmin:', error.message); return []; }
        return data;
    }

    // ── Statistiques ─────────────────────────────────────────────────

    async function getStats() {
        const all = await getAll();
        const totalSize = all.reduce((acc, r) => acc + (r.size_bytes || 0), 0);
        return {
            total:     all.length,
            images:    all.filter(r => r.type === 'image').length,
            videos:    all.filter(r => r.type === 'video').length,
            pdfs:      all.filter(r => r.type === 'pdf').length,
            others:    all.filter(r => !['image','video','pdf'].includes(r.type)).length,
            totalSize,
            totalSizeFormatted: formatSize(totalSize),
        };
    }

    // ── Helpers ──────────────────────────────────────────────────────

    function _mimeToType(mime) {
        if (!mime) return 'other';
        if (mime.startsWith('image/')) return 'image';
        if (mime.startsWith('video/')) return 'video';
        if (mime === 'application/pdf') return 'pdf';
        return 'other';
    }

    function formatSize(bytes) {
        if (!bytes || bytes === 0) return '—';
        if (bytes < 1024)          return `${bytes} B`;
        if (bytes < 1024 * 1024)   return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    function getTypeIcon(type) {
        const icons = {
            image: '🖼️',
            video: '🎬',
            pdf:   '📄',
            data:  '📊',
            other: '📁',
        };
        return icons[type] || icons.other;
    }

    function getCategoryLabel(category) {
        const labels = {
            hero:          'Hero',
            sites:         'Sites',
            parcours:      'Parcours',
            branding:      'Identité',
            icons:         'Icônes',
            technical:     'Technique',
            general:       'Général',
            equipe:        'Équipe',
            documents:     'Documents',
            videos:        'Vidéos',
        };
        return labels[category] || category;
    }

    // ── Exposition globale ───────────────────────────────────────────

    window.JA_DB = {
        getAll,
        getAllAdmin,
        getByType,
        getByCategory,
        getByPage,
        getById,
        upload,
        update,
        remove,
        getStats,
        formatSize,
        getTypeIcon,
        getCategoryLabel,
        client,
    };

    console.info('[JA_DB] Supabase client initialisé ✓');

})();
