/* ============================================
   Agency OS — Workspace Layout
   ============================================ */
function renderWorkspaceLayout(clientId, activeModule, contentHtml) {
    const client = Store.getClient(clientId);
    if (!client) { Router.go('dashboard'); return ''; }
    const owner = Store.getTeamMember(client.owner);

    const navItems = [
        { id:'resumen', label:'Resumen', icon:'layout-dashboard' },
        { id:'onboarding', label:'Onboarding', icon:'flag' },
        { id:'brief', label:'Brief', icon:'file-text' },
        { id:'reuniones', label:'Reuniones', icon:'users' },
        { id:'archivos', label:'Archivos', icon:'folder' },
        { id:'benchmark', label:'Benchmark IA', icon:'microscope' },
        { id:'estrategia', label:'Estrategia', icon:'target' },
        { id:'contenido', label:'Contenido', icon:'pen-tool' },
        { id:'operaciones', label:'Operaciones', icon:'list-checks' },
        { id:'reportes', label:'Reportes', icon:'pie-chart' },
        { id:'configuracion', label:'Configuración', icon:'settings' }
    ];

    const sidebarLinks = navItems.map(item => `
        <a href="#client/${clientId}/${item.id}" class="sidebar-link flex items-center px-3 py-2 text-sm font-medium rounded-lg ${activeModule === item.id ? 'active' : 'text-slate-600'}">
            <i data-lucide="${item.icon}" class="sidebar-icon w-4 h-4 mr-3 ${activeModule === item.id ? '' : 'text-slate-400'}"></i>
            ${item.label}
        </a>
    `).join('');

    return `
    <div class="flex h-full">
        <aside class="w-60 bg-white border-r border-slate-200 h-full flex-none flex-col hidden md:flex overflow-y-auto">
            <div class="p-4 border-b border-slate-200">
                <button onclick="Router.go('dashboard')" class="text-xs font-medium text-slate-500 hover:text-primary-600 flex items-center mb-3 transition-colors">
                    <i data-lucide="arrow-left" class="w-3 h-3 mr-1"></i> Dashboard
                </button>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 ${client.color} rounded-lg text-white flex items-center justify-center font-bold shadow-inner">${client.logo}</div>
                    <div class="min-w-0">
                        <h2 class="font-bold text-slate-900 text-sm truncate" title="${client.name}">${client.name}</h2>
                        <p class="text-xs text-slate-500 truncate">${client.industry}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-3">
                    ${UI.badge(client.status)}
                    ${UI.healthBadge(client.health)}
                </div>
            </div>
            <nav class="flex-1 p-3 space-y-0.5">${sidebarLinks}</nav>
            <div class="p-4 border-t border-slate-200 bg-slate-50/50">
                <div class="flex justify-between text-xs text-slate-500 mb-1"><span>Progreso</span><span class="font-semibold">${client.progress}%</span></div>
                ${UI.progressBar(client.progress, 'sm')}
                ${owner ? `<div class="flex items-center gap-2 mt-3 text-xs text-slate-500"><i data-lucide="user" class="w-3 h-3"></i>Owner: ${owner.name}</div>` : ''}
            </div>
        </aside>
        <div class="flex-1 overflow-y-auto">
            <div class="md:hidden bg-white border-b border-slate-200 p-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <button onclick="Router.go('dashboard')" class="text-slate-500"><i data-lucide="arrow-left" class="w-5 h-5"></i></button>
                    <span class="font-bold text-sm truncate">${client.name}</span>
                </div>
                <select onchange="Router.go('client/${clientId}/'+this.value)" class="text-sm border rounded-lg px-2 py-1">
                    ${navItems.map(n => `<option value="${n.id}" ${activeModule===n.id?'selected':''}>${n.label}</option>`).join('')}
                </select>
            </div>
            <div class="p-5 md:p-8 max-w-7xl mx-auto view-transition">${contentHtml}</div>
        </div>
    </div>`;
}
