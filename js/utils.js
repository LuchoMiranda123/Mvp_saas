/* ============================================
   Agency OS — Utilities
   ============================================ */
const Utils = {
    formatDate(dateStr) {
        if (!dateStr) return '—';
        const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        const d = new Date(dateStr + 'T00:00:00');
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    },

    formatDateShort(dateStr) {
        if (!dateStr) return '—';
        const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        const d = new Date(dateStr + 'T00:00:00');
        return `${d.getDate()} ${months[d.getMonth()]}`;
    },

    relativeDate(dateStr) {
        if (!dateStr) return '—';
        const now = new Date('2026-04-14');
        const d = new Date(dateStr + 'T00:00:00');
        const diff = Math.round((d - now) / (1000 * 60 * 60 * 24));
        if (diff === 0) return 'Hoy';
        if (diff === 1) return 'Mañana';
        if (diff === -1) return 'Ayer';
        if (diff > 0 && diff <= 7) return `En ${diff} días`;
        if (diff < 0 && diff >= -7) return `Hace ${Math.abs(diff)} días`;
        return Utils.formatDateShort(dateStr);
    },

    generateId() { return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5); },

    debounce(fn, ms = 300) {
        let t;
        return function(...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); };
    },

    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    truncate(str, len = 50) {
        if (!str) return '';
        return str.length > len ? str.substring(0, len) + '...' : str;
    },

    formatNumber(n) {
        if (n === undefined || n === null) return '0';
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return n.toLocaleString('es-PE');
    },

    formatCurrency(n) {
        return '$' + (n || 0).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    statusColor(status) {
        const map = {
            'Activo':'badge-good', 'Completada':'badge-good', 'Aprobado':'badge-good', 'Aprobada':'badge-good', 'Publicado':'badge-good', 'Conectado':'badge-good', 'Disponible':'badge-good', 'Completado':'badge-good', 'Programado':'badge-info', 'Respondido':'badge-good',
            'Onboarding':'badge-info', 'En proceso':'badge-info', 'Programada':'badge-info', 'En revisión':'badge-warning', 'Ejecutando...':'badge-warning',
            'Planificación':'badge-neutral', 'Backlog':'badge-neutral', 'Pendiente':'badge-neutral', 'En revisión':'badge-warning',
            'Esperando cliente':'badge-warning', 'Corregir':'badge-warning', 'Atención':'badge-warning',
            'Pausado':'badge-danger', 'Pausada':'badge-danger', 'Rechazado':'badge-danger', 'Riesgo':'badge-danger',
        };
        return map[status] || 'badge-neutral';
    },

    healthLabel(h) {
        return { good:'Saludable', warning:'Atención', danger:'Riesgo' }[h] || h;
    },
    healthColor(h) {
        return { good:'badge-good', warning:'badge-warning', danger:'badge-danger' }[h] || 'badge-neutral';
    },

    priorityColor(p) {
        return { 'Alta':'text-red-600 bg-red-50 border-red-200', 'Media':'text-amber-600 bg-amber-50 border-amber-200', 'Baja':'text-blue-600 bg-blue-50 border-blue-200' }[p] || 'text-slate-600 bg-slate-50';
    },

    channelIcon(ch) {
        const map = { 'Instagram':'instagram', 'Facebook':'facebook', 'TikTok':'music', 'LinkedIn':'linkedin', 'YouTube':'youtube', 'Google':'search', 'Google Ads':'search', 'Meta Ads':'target', 'Web':'globe', 'Email':'mail', 'Todos':'layers', 'Zoom':'video' };
        return map[ch] || 'hash';
    },

    fileIcon(type) {
        const map = { 'image':'image', 'video':'video', 'pdf':'file-text', 'document':'file-text', 'spreadsheet':'table', 'design':'pen-tool', 'archive':'archive' };
        return map[type] || 'file';
    },

    getCalendarDays(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(i);
        return days;
    },

    monthName(m) {
        return ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][m];
    }
};
