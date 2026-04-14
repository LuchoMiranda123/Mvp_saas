/* ============================================
   Agency OS — Dashboard View
   ============================================ */
let _dashFilter = { search:'', status:'Todos', industry:'Todos' };

function renderDashboard() {
    const clients = Store.clients.filter(c => {
        if (_dashFilter.search && !c.name.toLowerCase().includes(_dashFilter.search.toLowerCase()) && !c.industry.toLowerCase().includes(_dashFilter.search.toLowerCase())) return false;
        if (_dashFilter.status !== 'Todos' && c.status !== _dashFilter.status) return false;
        if (_dashFilter.industry !== 'Todos' && c.industry !== _dashFilter.industry) return false;
        return true;
    });

    const statuses = ['Todos', ...new Set(Store.clients.map(c => c.status))];
    const industries = ['Todos', ...new Set(Store.clients.map(c => c.industry))];
    const totalTasks = Store.clients.reduce((s,c) => s + c.pendingTasks, 0);
    const onboarding = Store.clients.filter(c => c.status === 'Onboarding').length;
    const warnings = Store.clients.filter(c => c.health === 'warning' || c.health === 'danger').length;

    const clientsHTML = clients.map(c => {
        const owner = Store.getTeamMember(c.owner);
        return `
        <a href="#client/${c.id}/resumen" class="block bg-white rounded-xl border border-slate-200 shadow-sm card-hover cursor-pointer group">
            <div class="p-5">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 ${c.color} rounded-lg text-white flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-105 transition-transform">${c.logo}</div>
                        <div>
                            <h3 class="font-bold text-slate-900 text-base group-hover:text-primary-600 transition-colors">${c.name}</h3>
                            <p class="text-xs text-slate-500">${c.industry}</p>
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-1">
                        ${UI.badge(c.status)}
                        ${UI.healthBadge(c.health)}
                    </div>
                </div>
                <div class="mb-3">
                    <div class="flex justify-between text-xs text-slate-500 mb-1"><span>Progreso</span><span>${c.progress}%</span></div>
                    ${UI.progressBar(c.progress, 'sm')}
                </div>
                <div class="flex items-center gap-4 text-xs text-slate-600">
                    <span class="flex items-center gap-1" title="Tareas pendientes"><i data-lucide="check-square" class="w-3.5 h-3.5 text-slate-400"></i>${c.pendingTasks}</span>
                    <span class="flex items-center gap-1" title="En revisión"><i data-lucide="eye" class="w-3.5 h-3.5 text-amber-500"></i>${c.reviewItems}</span>
                    ${owner ? `<span class="flex items-center gap-1" title="Owner"><i data-lucide="user" class="w-3.5 h-3.5 text-slate-400"></i>${owner.name.split(' ')[0]}</span>` : ''}
                </div>
            </div>
            <div class="px-5 py-3 bg-slate-50 rounded-b-xl border-t border-slate-100 flex justify-between items-center text-xs">
                <span class="flex items-center gap-1 text-slate-500"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>${c.nextMeeting ? Utils.relativeDate(c.nextMeeting.date) + ', ' + c.nextMeeting.time : 'Sin reunión'}</span>
                <span class="font-semibold text-primary-600 group-hover:underline">Abrir →</span>
            </div>
        </a>`;
    }).join('');

    return `
    <div class="overflow-y-auto h-full">
    <div class="p-6 md:p-8 max-w-7xl mx-auto view-transition">
        <div class="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
            <div>
                <h1 class="text-2xl font-bold text-slate-900 mb-1">Dashboard General</h1>
                <p class="text-slate-500">Resumen operativo de todos los clientes activos.</p>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
                ${UI.searchInput('Buscar cliente...', "App.dashSearch(this.value)")}
                ${UI.select(statuses.map(s => ({value:s,label:s})), _dashFilter.status, "App.dashFilterStatus(this.value)")}
                ${UI.select(industries.map(i => ({value:i,label:i})), _dashFilter.industry, "App.dashFilterIndustry(this.value)")}
                ${UI.button('Nuevo Cliente', { variant:'primary', icon:'plus', onclick:"App.showNewClientModal()" })}
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            ${UI.kpiCard('Total Clientes', Store.clients.length, undefined, 'users')}
            ${UI.kpiCard('En Onboarding', onboarding, undefined, 'flag')}
            ${UI.kpiCard('Requieren Atención', warnings, undefined, 'alert-triangle')}
            ${UI.kpiCard('Tareas Globales', totalTasks, undefined, 'check-square')}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${clientsHTML || UI.emptyState('search', 'Sin resultados', 'No se encontraron clientes con esos filtros.')}
        </div>
    </div>
    </div>`;
}

// Dashboard interaction helpers
window.App = window.App || {};
App.dashSearch = function(val) { _dashFilter.search = val; App.render(); };
App.dashFilterStatus = function(val) { _dashFilter.status = val; App.render(); };
App.dashFilterIndustry = function(val) { _dashFilter.industry = val; App.render(); };
App.showNewClientModal = function() {
    UI.openModal('Nuevo Cliente', `
        <div class="space-y-4">
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Nombre de la marca</label><input id="nc-name" type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" placeholder="Ej: Mi Empresa S.A.C."></div>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Rubro / Industria</label><input id="nc-industry" type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" placeholder="Ej: Tecnología"></div>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Contacto principal</label><input id="nc-contact" type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" placeholder="Ej: Juan Pérez"></div>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Email</label><input id="nc-email" type="email" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" placeholder="contacto@empresa.com"></div>
            <div class="flex justify-end gap-2 pt-2">
                ${UI.button('Cancelar', { variant:'secondary', onclick:'UI.closeModal()' })}
                ${UI.button('Crear Cliente', { variant:'primary', icon:'plus', onclick:'App.createClient()' })}
            </div>
        </div>
    `);
};
App.createClient = function() {
    const name = document.getElementById('nc-name').value.trim();
    const industry = document.getElementById('nc-industry').value.trim();
    if (!name) { UI.toast('Ingresa un nombre', 'error'); return; }
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const initials = name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
    const colors = ['bg-blue-600','bg-purple-600','bg-emerald-600','bg-orange-600','bg-rose-600','bg-cyan-600','bg-teal-600'];
    const newClient = {
        id, name, industry: industry || 'General', status:'Onboarding', progress:0, health:'good', owner:'luis',
        logo: initials, color: colors[Math.floor(Math.random()*colors.length)],
        contacts:[{ name: document.getElementById('nc-contact').value || 'N/A', role:'Contacto', email: document.getElementById('nc-email').value || '', phone:'', primary:true }],
        nextMeeting:null, pendingTasks:0, reviewItems:0,
        onboarding:{ complete:0, steps:[{id:1,title:'Datos administrativos',done:false,desc:''},{id:2,title:'Contactos',done:false,desc:''},{id:3,title:'Accesos a redes',done:false,desc:''},{id:4,title:'Business Manager',done:false,desc:''},{id:5,title:'Material de marca',done:false,desc:''},{id:6,title:'Kick-off meeting',done:false,desc:''},{id:7,title:'Objetivos',done:false,desc:''},{id:8,title:'Herramientas',done:false,desc:''}], data:{razonSocial:name,ruc:'',direccion:'',web:'',instagram:'',facebook:'',tiktok:'',linkedin:'',youtube:'',objetivos:'',propuestaValor:'',tono:'',buyerPersona:'',competidores:''} },
        brief:{ complete:0, lastUpdate:'', status:'Pendiente', negocio:'', propuestaValor:'', servicios:'', publicoObjetivo:'', diferenciadores:'', competencia:'', objetivosComerciales:'', objetivosMarketing:'', tono:'', restricciones:'', insights:'', dolores:'', mensajePrincipal:'', ctaPrincipal:'' },
        meetings:[], files:{ driveConnected:false, folders:[] }, benchmark:null, strategy:null,
        content:{ calendar:[], copies:[], community:[], approvals:[] }, tasks:[],
        reports:{ current:{ period:'—', kpis:{alcance:0,interacciones:0,leads:0,cpl:0,seguidores:0,publicaciones:0,engagement:0,clicks:0}, vs_anterior:{}, topContent:[], worstContent:[], insights:[], recommendations:[], chartData:{labels:[],seguidores:[],alcance:[],leads:[]} } },
        settings:{ meetingFrequency:'Semanal', meetingDay:'Lunes', meetingTime:'10:00', reportFrequency:'Mensual', reportDay:'Primera semana', teamAssigned:['luis'], integrations:[], alerts:[], tags:[] }
    };
    Store.data.clients.push(newClient);
    Store.save();
    UI.closeModal();
    UI.toast('Cliente creado exitosamente');
    App.render();
};
