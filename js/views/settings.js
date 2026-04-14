/* ============================================
   Agency OS — Settings / Configuration View
   ============================================ */
function renderSettings(client) {
    const s = client.settings;
    const data = client.onboarding ? client.onboarding.data : {};

    return `
    ${UI.pageHeader('Configuración', 'Datos del cliente, equipo, integraciones y alertas.')}

    <!-- General Data -->
    ${UI.card(`<div class="p-5">
        <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="building" class="w-5 h-5 text-primary-500"></i>Datos Generales</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label class="block text-xs font-semibold text-slate-500 mb-1">Razón Social</label><input type="text" value="${Utils.escapeHtml(data.razonSocial||client.name)}" onchange="App.saveSetting('${client.id}','onboarding.data.razonSocial',this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"></div>
            <div><label class="block text-xs font-semibold text-slate-500 mb-1">RUC / NIT</label><input type="text" value="${Utils.escapeHtml(data.ruc||'')}" onchange="App.saveSetting('${client.id}','onboarding.data.ruc',this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"></div>
            <div><label class="block text-xs font-semibold text-slate-500 mb-1">Industria</label><input type="text" value="${Utils.escapeHtml(client.industry)}" onchange="App.saveSetting('${client.id}','industry',this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"></div>
            <div><label class="block text-xs font-semibold text-slate-500 mb-1">Web</label><input type="text" value="${Utils.escapeHtml(data.web||'')}" onchange="App.saveSetting('${client.id}','onboarding.data.web',this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"></div>
            <div class="md:col-span-2"><label class="block text-xs font-semibold text-slate-500 mb-1">Dirección</label><input type="text" value="${Utils.escapeHtml(data.direccion||'')}" onchange="App.saveSetting('${client.id}','onboarding.data.direccion',this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"></div>
        </div>
    </div>`)}

    <!-- Contacts -->
    ${UI.card(`<div class="p-5 mt-6">
        <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="users" class="w-5 h-5 text-primary-500"></i>Contactos</h3>
        <div class="space-y-3">
            ${(client.contacts||[]).map((c, i) => `
                <div class="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                    <div class="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-sm font-bold text-white">${c.name.split(' ').map(w=>w[0]).join('').substring(0,2)}</div>
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-slate-900">${Utils.escapeHtml(c.name)}</p>
                        <p class="text-xs text-slate-500">${Utils.escapeHtml(c.role)}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-600">${Utils.escapeHtml(c.email)}</p>
                        <p class="text-xs text-slate-400">${Utils.escapeHtml(c.phone||'')}</p>
                    </div>
                    ${c.primary ? '<span class="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">Principal</span>' : ''}
                </div>`).join('')}
        </div>
    </div>`)}

    <!-- Team Assigned -->
    ${UI.card(`<div class="p-5 mt-6">
        <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="user-check" class="w-5 h-5 text-primary-500"></i>Equipo Asignado</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            ${(s.teamAssigned||[]).map(id => {
                const m = Store.getTeamMember(id);
                if (!m) return '';
                return `<div class="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                    ${UI.avatar(id)}
                    <div>
                        <p class="text-sm font-semibold text-slate-900">${m.name}</p>
                        <p class="text-xs text-slate-500">${m.role}</p>
                    </div>
                </div>`;
            }).join('')}
        </div>
        <div class="mt-3">
            ${UI.button('Gestionar Equipo', { variant:'secondary', icon:'settings', onclick:`UI.toast('Gestión de equipo (simulado)','info')` })}
        </div>
    </div>`)}

    <!-- Meetings & Reports Frequency -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        ${UI.card(`<div class="p-5">
            <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="calendar" class="w-5 h-5 text-primary-500"></i>Frecuencia de Reuniones</h3>
            <div class="space-y-3">
                <div><label class="block text-xs font-semibold text-slate-500 mb-1">Frecuencia</label>
                    ${UI.select([{value:'Semanal',label:'Semanal'},{value:'Quincenal',label:'Quincenal'},{value:'Mensual',label:'Mensual'}], s.meetingFrequency, `App.saveSetting('${client.id}','settings.meetingFrequency',this.value)`, 'w-full')}
                </div>
                <div><label class="block text-xs font-semibold text-slate-500 mb-1">Día</label><input type="text" value="${Utils.escapeHtml(s.meetingDay||'')}" onchange="App.saveSetting('${client.id}','settings.meetingDay',this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"></div>
                <div><label class="block text-xs font-semibold text-slate-500 mb-1">Hora</label><input type="time" value="${s.meetingTime||'10:00'}" onchange="App.saveSetting('${client.id}','settings.meetingTime',this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"></div>
            </div>
        </div>`)}
        ${UI.card(`<div class="p-5">
            <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="file-text" class="w-5 h-5 text-primary-500"></i>Frecuencia de Reportes</h3>
            <div class="space-y-3">
                <div><label class="block text-xs font-semibold text-slate-500 mb-1">Frecuencia</label>
                    ${UI.select([{value:'Semanal',label:'Semanal'},{value:'Quincenal',label:'Quincenal'},{value:'Mensual',label:'Mensual'}], s.reportFrequency, `App.saveSetting('${client.id}','settings.reportFrequency',this.value)`, 'w-full')}
                </div>
                <div><label class="block text-xs font-semibold text-slate-500 mb-1">Entrega</label><input type="text" value="${Utils.escapeHtml(s.reportDay||'')}" onchange="App.saveSetting('${client.id}','settings.reportDay',this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"></div>
            </div>
        </div>`)}
    </div>

    <!-- Integrations -->
    ${UI.card(`<div class="p-5 mt-6">
        <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="plug" class="w-5 h-5 text-primary-500"></i>Integraciones</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            ${(s.integrations||[]).map(int => `
                <div class="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><i data-lucide="${int.icon}" class="w-4 h-4 text-slate-600"></i></div>
                        <span class="text-sm font-medium text-slate-900">${int.name}</span>
                    </div>
                    ${int.status === 'Conectado'
                        ? '<span class="text-xs text-green-600 font-medium flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span>Conectado</span>'
                        : `<button onclick="App.connectIntegration('${client.id}','${int.name}')" class="text-xs text-primary-600 hover:text-primary-700 font-medium">Conectar</button>`}
                </div>`).join('')}
        </div>
    </div>`)}

    <!-- Alerts -->
    ${UI.card(`<div class="p-5 mt-6">
        <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="bell" class="w-5 h-5 text-primary-500"></i>Alertas Configuradas</h3>
        ${(s.alerts||[]).length > 0 ? `
        <div class="space-y-2">
            ${s.alerts.map((a, i) => `
                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div class="flex items-center gap-2"><i data-lucide="alert-circle" class="w-4 h-4 text-amber-500"></i><span class="text-sm text-slate-700">${Utils.escapeHtml(a)}</span></div>
                    <button onclick="App.removeAlert('${client.id}',${i})" class="text-slate-400 hover:text-red-500"><i data-lucide="x" class="w-4 h-4"></i></button>
                </div>`).join('')}
        </div>` : '<p class="text-sm text-slate-400">Sin alertas configuradas.</p>'}
        <div class="mt-3 flex gap-2">
            <input id="new-alert" type="text" placeholder="Nueva alerta..." class="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm" onkeydown="if(event.key==='Enter')App.addAlert('${client.id}')">
            ${UI.button('Agregar', { variant:'secondary', icon:'plus', onclick:`App.addAlert('${client.id}')` })}
        </div>
    </div>`)}

    <!-- Tags -->
    ${UI.card(`<div class="p-5 mt-6">
        <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="tag" class="w-5 h-5 text-primary-500"></i>Etiquetas Internas</h3>
        <div class="flex flex-wrap gap-2">
            ${(s.tags||[]).map(t => `<span class="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">${Utils.escapeHtml(t)}<button onclick="App.removeTag('${client.id}','${t}')" class="text-primary-400 hover:text-primary-700 ml-1"><i data-lucide="x" class="w-3 h-3"></i></button></span>`).join('')}
        </div>
        <div class="mt-3 flex gap-2">
            <input id="new-tag" type="text" placeholder="Nueva etiqueta..." class="border border-slate-300 rounded-lg px-3 py-2 text-sm" onkeydown="if(event.key==='Enter')App.addTag('${client.id}')">
            ${UI.button('Agregar', { variant:'secondary', icon:'plus', onclick:`App.addTag('${client.id}')` })}
        </div>
    </div>`)}

    <!-- Danger Zone -->
    ${UI.card(`<div class="p-5 mt-6 border-red-200">
        <h3 class="font-semibold text-red-700 mb-3 flex items-center gap-2"><i data-lucide="alert-triangle" class="w-5 h-5"></i>Zona de Peligro</h3>
        <div class="flex items-center justify-between">
            <div><p class="text-sm text-slate-700">Cambiar estado del cliente</p><p class="text-xs text-slate-500">Pausar o reactivar operaciones para este cliente.</p></div>
            ${client.status === 'Pausado'
                ? UI.button('Reactivar Cliente', { variant:'success', icon:'play', onclick:`App.changeClientStatus('${client.id}','Activo')` })
                : UI.button('Pausar Cliente', { variant:'danger', icon:'pause', onclick:`App.changeClientStatus('${client.id}','Pausado')` })}
        </div>
    </div>`)}`;
}

App.saveSetting = function(clientId, path, value) {
    Store.updateClient(clientId, path, value);
    UI.toast('Guardado', 'success');
};

App.connectIntegration = function(clientId, name) {
    const client = Store.getClient(clientId);
    const int = client.settings.integrations.find(i => i.name === name);
    if (int) { int.status = 'Conectado'; Store.save(); }
    UI.toast(`${name} conectado`);
    App.render();
};

App.removeAlert = function(clientId, idx) {
    const client = Store.getClient(clientId);
    client.settings.alerts.splice(idx, 1);
    Store.save();
    App.render();
};

App.addAlert = function(clientId) {
    const input = document.getElementById('new-alert');
    if (!input || !input.value.trim()) return;
    const client = Store.getClient(clientId);
    if (!client.settings.alerts) client.settings.alerts = [];
    client.settings.alerts.push(input.value.trim());
    Store.save();
    App.render();
};

App.addTag = function(clientId) {
    const input = document.getElementById('new-tag');
    if (!input || !input.value.trim()) return;
    const client = Store.getClient(clientId);
    if (!client.settings.tags) client.settings.tags = [];
    client.settings.tags.push(input.value.trim());
    Store.save();
    App.render();
};

App.removeTag = function(clientId, tag) {
    const client = Store.getClient(clientId);
    client.settings.tags = (client.settings.tags||[]).filter(t => t !== tag);
    Store.save();
    App.render();
};

App.changeClientStatus = function(clientId, newStatus) {
    Store.updateClient(clientId, 'status', newStatus);
    Store.updateClient(clientId, 'health', newStatus === 'Pausado' ? 'danger' : 'good');
    UI.toast(`Cliente ${newStatus === 'Pausado' ? 'pausado' : 'reactivado'}`);
    App.render();
};
