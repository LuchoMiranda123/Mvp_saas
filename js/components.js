/* ============================================
   Agency OS — Reusable UI Components
   ============================================ */
const UI = {
    badge(text, cls) {
        if (!cls) cls = Utils.statusColor(text);
        return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}">${Utils.escapeHtml(text)}</span>`;
    },

    healthBadge(health) {
        return UI.badge(Utils.healthLabel(health), Utils.healthColor(health));
    },

    button(text, opts = {}) {
        const { variant='primary', icon='', cls='', onclick='' } = opts;
        const base = 'inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 transition-colors gap-2 whitespace-nowrap';
        const variants = {
            primary: 'border-transparent text-white bg-primary-600 hover:bg-primary-700',
            secondary: 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50',
            ghost: 'border-transparent text-slate-600 bg-transparent hover:bg-slate-100 shadow-none',
            danger: 'border-transparent text-white bg-red-600 hover:bg-red-700',
            success: 'border-transparent text-white bg-green-600 hover:bg-green-700'
        };
        const iconHtml = icon ? `<i data-lucide="${icon}" class="w-4 h-4"></i>` : '';
        const click = onclick ? `onclick="${onclick}"` : '';
        return `<button class="${base} ${variants[variant]||variants.primary} ${cls}" ${click}>${iconHtml}${text}</button>`;
    },

    progressBar(pct, size='md') {
        const h = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';
        const color = pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-primary-500' : pct >= 25 ? 'bg-amber-500' : 'bg-red-500';
        return `<div class="w-full bg-slate-200 rounded-full ${h}"><div class="${color} ${h} rounded-full transition-all" style="width:${Math.min(pct,100)}%"></div></div>`;
    },

    avatar(id, size='md') {
        const sz = size === 'sm' ? 'w-7 h-7 text-xs' : size === 'lg' ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm';
        return `<div class="${sz} ${Store.getTeamColor(id)} rounded-full flex items-center justify-center text-white font-semibold flex-none" title="${Utils.escapeHtml(Store.getTeamName(id))}">${Store.getTeamAvatar(id)}</div>`;
    },

    icon(name, cls='w-4 h-4') {
        return `<i data-lucide="${name}" class="${cls}"></i>`;
    },

    kpiCard(label, value, change, icon, prefix='') {
        const trend = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-slate-500';
        const arrow = change > 0 ? 'trending-up' : change < 0 ? 'trending-down' : 'minus';
        const sign = change > 0 ? '+' : '';
        return `
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm stat-card">
            <div class="flex justify-between items-start mb-2">
                <span class="text-slate-500 text-sm font-medium">${label}</span>
                ${icon ? `<div class="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center"><i data-lucide="${icon}" class="w-4 h-4"></i></div>` : ''}
            </div>
            <div class="text-2xl font-bold text-slate-900">${prefix}${typeof value === 'number' ? Utils.formatNumber(value) : value}</div>
            ${change !== undefined ? `<div class="text-xs ${trend} mt-1 flex items-center gap-1"><i data-lucide="${arrow}" class="w-3 h-3"></i>${sign}${change}% vs mes anterior</div>` : ''}
        </div>`;
    },

    tabs(items, activeId, onClickFn) {
        return `<div class="border-b border-slate-200 mb-6"><nav class="-mb-px flex space-x-6 overflow-x-auto">${items.map(item =>
            `<button onclick="${onClickFn}('${item.id}')" class="whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeId === item.id ? 'tab-active' : 'tab-inactive'}">${item.icon ? `<i data-lucide="${item.icon}" class="w-4 h-4 inline mr-1.5 align-text-bottom"></i>` : ''}${item.label}</button>`
        ).join('')}</nav></div>`;
    },

    emptyState(icon, title, desc, actionHtml='') {
        return `
        <div class="text-center py-16 bg-white border border-slate-200 border-dashed rounded-xl">
            <div class="mx-auto w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4"><i data-lucide="${icon}" class="w-7 h-7 text-slate-400"></i></div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">${title}</h3>
            <p class="text-slate-500 text-sm mb-6 max-w-md mx-auto">${desc}</p>
            ${actionHtml}
        </div>`;
    },

    table(headers, rows, opts={}) {
        return `
        <div class="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
            <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                    <tr>${headers.map(h => `<th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">${h}</th>`).join('')}</tr>
                </thead>
                <tbody class="divide-y divide-slate-100">${rows.join('')}</tbody>
            </table>
        </div>`;
    },

    timeline(items) {
        return `<div class="space-y-4">${items.map((item, i) => `
            <div class="flex gap-4">
                <div class="flex flex-col items-center">
                    <div class="w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-primary-500' : 'bg-slate-300'} mt-1.5 flex-none"></div>
                    ${i < items.length - 1 ? '<div class="w-px flex-1 bg-slate-200 mt-1"></div>' : ''}
                </div>
                <div class="pb-4">
                    <p class="text-sm font-medium text-slate-900">${item.title}</p>
                    <p class="text-xs text-slate-500 mt-0.5">${item.date}</p>
                    ${item.desc ? `<p class="text-sm text-slate-600 mt-1">${item.desc}</p>` : ''}
                </div>
            </div>`).join('')}</div>`;
    },

    comment(author, text, date, avatarId) {
        return `
        <div class="flex gap-3 py-3">
            ${UI.avatar(avatarId || author, 'sm')}
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-sm font-semibold text-slate-900">${Utils.escapeHtml(Store.getTeamName(avatarId || author))}</span>
                    <span class="text-xs text-slate-400">${Utils.relativeDate(date)}</span>
                </div>
                <p class="text-sm text-slate-600">${Utils.escapeHtml(text)}</p>
            </div>
        </div>`;
    },

    searchInput(placeholder, onInputFn) {
        return `
        <div class="relative">
            <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" placeholder="${placeholder}" oninput="${onInputFn}" class="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full bg-white">
        </div>`;
    },

    select(options, value, onChangeFn, cls='') {
        return `<select onchange="${onChangeFn}" class="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${cls}">${options.map(o =>
            `<option value="${o.value}" ${o.value === value ? 'selected' : ''}>${o.label}</option>`
        ).join('')}</select>`;
    },

    // Modal helpers
    openModal(title, contentHtml) {
        document.getElementById('modal-content').innerHTML = `
            <div class="flex items-center justify-between p-5 border-b border-slate-200">
                <h3 class="text-lg font-bold text-slate-900">${title}</h3>
                <button onclick="UI.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
            </div>
            <div class="p-5">${contentHtml}</div>`;
        document.getElementById('modal-overlay').classList.remove('hidden');
        document.getElementById('modal-overlay').classList.add('flex');
        lucide.createIcons({ root: document.getElementById('modal-content') });
    },

    closeModal() {
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-overlay').classList.remove('flex');
    },

    openDrawer(contentHtml) {
        document.getElementById('drawer-content').innerHTML = contentHtml;
        document.getElementById('drawer-overlay').classList.remove('hidden');
        document.getElementById('drawer-content').classList.add('drawer-enter');
        lucide.createIcons({ root: document.getElementById('drawer-content') });
    },

    closeDrawer() {
        document.getElementById('drawer-overlay').classList.add('hidden');
        document.getElementById('drawer-content').classList.remove('drawer-enter');
    },

    toast(message, type='success') {
        const colors = { success:'bg-green-600', error:'bg-red-600', warning:'bg-amber-600', info:'bg-primary-600' };
        const icons = { success:'check-circle', error:'x-circle', warning:'alert-triangle', info:'info' };
        const el = document.createElement('div');
        el.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium toast-enter`;
        el.innerHTML = `<i data-lucide="${icons[type]}" class="w-4 h-4"></i>${Utils.escapeHtml(message)}`;
        document.getElementById('toast-container').appendChild(el);
        lucide.createIcons({ root: el });
        setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 3000);
    },

    pageHeader(title, subtitle, actionsHtml='') {
        return `
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4">
            <div>
                <h1 class="text-2xl font-bold text-slate-900">${title}</h1>
                ${subtitle ? `<p class="text-slate-500 mt-1">${subtitle}</p>` : ''}
            </div>
            <div class="flex items-center gap-2 flex-wrap">${actionsHtml}</div>
        </div>`;
    },

    card(content, cls='') {
        return `<div class="bg-white rounded-xl border border-slate-200 shadow-sm ${cls}">${content}</div>`;
    }
};
