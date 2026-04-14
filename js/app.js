/* ============================================
   Agency OS — App Initialization & Render
   ============================================ */
window.App = window.App || {};

/* ======= Main Layout (top bar) ======= */
function renderMainLayout(bodyHtml, activePage) {
    const unreadCount = Store.clients.reduce((s, c) => s + c.reviewItems, 0);
    return `
    <header class="h-14 flex-none bg-brand flex items-center justify-between px-5 shadow-md z-30">
        <div class="flex items-center gap-6">
            <a href="#dashboard" class="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
                <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-sm font-extrabold flex-none">A</div>
                <span class="hidden sm:inline">Agency OS</span>
            </a>
            <nav class="hidden sm:flex items-center gap-1 ml-4">
                <a href="#dashboard" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activePage === 'dashboard' ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'}">
                    <i data-lucide="layout-dashboard" class="w-4 h-4 inline mr-1 align-text-bottom"></i>Dashboard
                </a>
                <a href="#agents" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activePage === 'agents' ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'}">
                    <i data-lucide="bot" class="w-4 h-4 inline mr-1 align-text-bottom"></i>Copilotos IA
                </a>
            </nav>
            <div class="flex sm:hidden items-center gap-1">
                <a href="#dashboard" class="p-1.5 rounded-lg ${activePage === 'dashboard' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}"><i data-lucide="layout-dashboard" class="w-5 h-5"></i></a>
                <a href="#agents" class="p-1.5 rounded-lg ${activePage === 'agents' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}"><i data-lucide="bot" class="w-5 h-5"></i></a>
            </div>
        </div>
        <div class="flex items-center gap-1.5 sm:gap-3">
            <button onclick="App.showNotifications()" class="relative text-slate-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10">
                <i data-lucide="bell" class="w-5 h-5"></i>
                ${unreadCount > 0 ? `<span class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">${unreadCount}</span>` : ''}
            </button>
            <button onclick="App.showCommandPalette()" class="text-slate-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10" title="Buscar (Ctrl+K)">
                <i data-lucide="search" class="w-5 h-5"></i>
            </button>
            <div class="w-px h-6 bg-white/20 hidden sm:block"></div>
            <button onclick="App.showUserMenu()" class="flex items-center gap-2 text-white hover:bg-white/10 rounded-lg px-2 py-1.5 transition-colors">
                <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold">LR</div>
                <span class="hidden sm:inline text-sm font-medium">Luis R.</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 hidden sm:inline"></i>
            </button>
        </div>
    </header>
    <main class="flex-1 overflow-hidden">${bodyHtml}</main>`;
}

/* ======= Core Render ======= */
App.render = function() {
    const app = document.getElementById('app');
    if (!app) return;
    const route = Router.route;
    const params = Router.params;
    let html = '';

    if (route === 'login' || !route) {
        html = renderLogin();
    } else if (route === 'dashboard') {
        html = renderMainLayout(renderDashboard(), 'dashboard');
    } else if (route === 'agents') {
        html = renderMainLayout(
            `<div class="overflow-y-auto h-full"><div class="p-6 md:p-8 max-w-7xl mx-auto view-transition">${renderAgents()}</div></div>`,
            'agents'
        );
    } else if (route === 'client') {
        const clientId = params.clientId;
        const module = params.module || 'resumen';
        const sub = params.sub || '';
        const client = Store.getClient(clientId);

        if (!client) {
            Router.go('dashboard');
            return;
        }

        let content = '';
        switch (module) {
            case 'resumen': content = renderSummary(client); break;
            case 'onboarding': content = renderOnboarding(client); break;
            case 'brief': content = renderBrief(client); break;
            case 'reuniones': content = renderMeetings(client); break;
            case 'archivos': content = renderFiles(client); break;
            case 'benchmark': content = renderBenchmark(client); break;
            case 'estrategia': content = renderStrategy(client); break;
            case 'contenido': content = renderContent(client, sub); break;
            case 'operaciones': content = renderOperations(client); break;
            case 'reportes': content = renderReports(client); break;
            case 'configuracion': content = renderSettings(client); break;
            default: content = renderSummary(client);
        }

        const workspaceHtml = renderWorkspaceLayout(clientId, module, content);
        html = renderMainLayout(workspaceHtml, 'client');
    } else {
        Router.go('dashboard');
        return;
    }

    app.innerHTML = html;

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize Chart.js charts if on reports page
    if (route === 'client' && (params.module === 'reportes')) {
        const client = Store.getClient(params.clientId);
        if (client) {
            setTimeout(() => initReportCharts(client), 50);
        }
    }
};

/* ======= Notification panel ======= */
App.showNotifications = function() {
    const items = Store.clients.filter(c => c.reviewItems > 0 || c.health === 'warning' || c.health === 'danger');
    const notifHtml = items.length > 0 ? items.map(c => `
        <a href="#client/${c.id}/resumen" onclick="UI.closeModal()" class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <div class="w-8 h-8 ${c.color} rounded-lg text-white flex items-center justify-center text-xs font-bold">${c.logo}</div>
            <div class="flex-1">
                <p class="text-sm font-medium text-slate-900">${c.name}</p>
                <p class="text-xs text-slate-500">
                    ${c.reviewItems > 0 ? `${c.reviewItems} piezas en revisión` : ''}
                    ${c.health === 'warning' ? ' · Requiere atención' : c.health === 'danger' ? ' · En riesgo' : ''}
                </p>
            </div>
            ${c.health !== 'good' ? `<span class="w-2 h-2 rounded-full ${c.health === 'danger' ? 'bg-red-500' : 'bg-amber-500'}"></span>` : ''}
        </a>
    `).join('') : '<p class="text-sm text-slate-400 text-center py-4">Sin notificaciones pendientes.</p>';

    UI.openModal('Notificaciones', notifHtml);
};

/* ======= Command Palette / Quick Search ======= */
App.showCommandPalette = function() {
    UI.openModal('Buscar', `
        <div>
            <input id="cmd-search" type="text" autofocus placeholder="Buscar cliente, módulo o acción..." class="w-full border-0 border-b border-slate-200 px-0 py-3 text-lg focus:ring-0 focus:border-primary-500" oninput="App.filterCommandPalette(this.value)">
            <div id="cmd-results" class="mt-3 max-h-80 overflow-y-auto">
                ${Store.clients.map(c => `
                    <a href="#client/${c.id}/resumen" onclick="UI.closeModal()" class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer cmd-item" data-name="${c.name.toLowerCase()} ${c.industry.toLowerCase()}">
                        <div class="w-8 h-8 ${c.color} rounded-lg text-white flex items-center justify-center text-xs font-bold">${c.logo}</div>
                        <div><span class="text-sm font-medium text-slate-900">${c.name}</span><span class="text-xs text-slate-400 ml-2">${c.industry}</span></div>
                    </a>
                `).join('')}
            </div>
        </div>
    `);
    setTimeout(() => { const el = document.getElementById('cmd-search'); if (el) el.focus(); }, 100);
};

App.filterCommandPalette = function(query) {
    const items = document.querySelectorAll('.cmd-item');
    const q = query.toLowerCase();
    items.forEach(item => {
        item.style.display = item.dataset.name.includes(q) ? '' : 'none';
    });
};

/* ======= User Menu ======= */
App.showUserMenu = function() {
    UI.openModal('Cuenta', `
        <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">LR</div>
                <div>
                    <p class="font-semibold text-slate-900">Luis Rodríguez</p>
                    <p class="text-sm text-slate-500">Director de Estrategia</p>
                    <p class="text-xs text-slate-400">luis@agencyos.com</p>
                </div>
            </div>
            <div class="border-t border-slate-200 pt-3 space-y-1">
                <button onclick="UI.closeModal();UI.toast('Perfil (simulado)','info')" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><i data-lucide="user" class="w-4 h-4 text-slate-400"></i>Mi Perfil</button>
                <button onclick="UI.closeModal();UI.toast('Preferencias (simulado)','info')" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-slate-400"></i>Preferencias</button>
                <button onclick="App.resetData()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><i data-lucide="refresh-cw" class="w-4 h-4 text-slate-400"></i>Resetear Datos Demo</button>
                <button onclick="UI.closeModal();Router.go('login')" class="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><i data-lucide="log-out" class="w-4 h-4"></i>Cerrar Sesión</button>
            </div>
        </div>
    `);
};

App.resetData = function() {
    Store.reset();
    UI.closeModal();
    UI.toast('Datos restablecidos al estado original');
    App.render();
};

/* ======= Keyboard shortcuts ======= */
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        App.showCommandPalette();
    }
    if (e.key === 'Escape') {
        UI.closeModal();
        UI.closeDrawer();
    }
});

/* ======= Initialize ======= */
App.init = function() {
    Store.init();
    Router.init();
};

document.addEventListener('DOMContentLoaded', App.init);
