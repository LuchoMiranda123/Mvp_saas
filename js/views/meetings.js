/* ============================================
   Agency OS — Meetings View
   ============================================ */
function renderMeetings(client) {
    const meetings = client.meetings;
    const upcoming = meetings.filter(m => m.status === 'Programada');
    const past = meetings.filter(m => m.status === 'Completada');

    return `
    ${UI.pageHeader('Reuniones', 'Minutas, acuerdos y grabaciones del equipo.', `
        ${UI.button('Subir Reunión', { variant:'secondary', icon:'upload', onclick:`App.showUploadMeetingModal('${client.id}')` })}
        ${UI.button('Nueva Reunión', { variant:'primary', icon:'plus', onclick:`App.showNewMeetingModal('${client.id}')` })}
    `)}

    ${upcoming.length ? `
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Próximas</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            ${upcoming.map(m => `
                ${UI.card(`
                    <div class="p-5">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h4 class="font-semibold text-slate-900">${m.title || m.type}</h4>
                                <p class="text-sm text-slate-500 mt-0.5">${Utils.relativeDate(m.date)} · ${m.time} · ${m.duration}</p>
                            </div>
                            ${UI.badge(m.status)}
                        </div>
                        <div class="flex items-center gap-1 text-xs text-slate-500"><i data-lucide="users" class="w-3.5 h-3.5 mr-1"></i>${m.participants.join(', ')}</div>
                    </div>
                `)}
            `).join('')}
        </div>
    ` : ''}

    <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Historial</h3>
    ${past.length ? `
        <div class="space-y-4">
            ${past.map(m => `
                ${UI.card(`
                    <div class="p-5 cursor-pointer hover:bg-slate-50 transition" onclick="App.showMeetingDetail('${client.id}','${m.id}')">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <div class="flex items-center gap-2">
                                    <h4 class="font-semibold text-slate-900">${m.type}</h4>
                                    ${m.recording ? '<span class="text-xs text-green-600 flex items-center gap-1"><i data-lucide="video" class="w-3 h-3"></i>Grabación</span>' : ''}
                                </div>
                                <p class="text-sm text-slate-500 mt-0.5">${Utils.formatDate(m.date)} · ${m.time} · ${m.duration}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                ${(m.tags||[]).map(t => UI.badge(t, 'badge-info')).join('')}
                                ${UI.badge(m.status)}
                            </div>
                        </div>
                        ${m.summary ? `<p class="text-sm text-slate-600 mb-3 line-clamp-2">${Utils.truncate(m.summary, 200)}</p>` : ''}
                        <div class="flex items-center gap-1 text-xs text-slate-400"><i data-lucide="users" class="w-3 h-3 mr-1"></i>${m.participants.join(', ')}</div>
                    </div>
                `)}
            `).join('')}
        </div>
    ` : UI.emptyState('calendar', 'Sin reuniones registradas', 'Agrega o sube tu primera reunión.')}`;
}

App.showMeetingDetail = function(clientId, meetingId) {
    const client = Store.getClient(clientId);
    const m = client.meetings.find(mt => mt.id === meetingId);
    if (!m) return;

    UI.openModal(m.type + ' — ' + Utils.formatDate(m.date), `
        <div class="space-y-5">
            <div class="flex items-center gap-4 text-sm text-slate-500">
                <span class="flex items-center gap-1"><i data-lucide="clock" class="w-4 h-4"></i>${m.time} · ${m.duration}</span>
                <span class="flex items-center gap-1"><i data-lucide="users" class="w-4 h-4"></i>${m.participants.length} participantes</span>
                ${m.recording ? '<span class="flex items-center gap-1 text-green-600"><i data-lucide="video" class="w-4 h-4"></i>Grabación disponible</span>' : ''}
            </div>

            ${m.summary ? `
                <div>
                    <h4 class="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><i data-lucide="sparkles" class="w-4 h-4 text-primary-500"></i>Resumen IA</h4>
                    <div class="bg-primary-50 rounded-lg p-4 text-sm text-slate-700">${m.summary}</div>
                </div>
            ` : ''}

            ${m.agreements.length ? `
                <div>
                    <h4 class="text-sm font-semibold text-slate-700 mb-2">Acuerdos</h4>
                    <ul class="space-y-1.5">${m.agreements.map(a => `<li class="flex items-start gap-2 text-sm"><i data-lucide="check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-none"></i>${a}</li>`).join('')}</ul>
                </div>
            ` : ''}

            ${m.actionItems.length ? `
                <div>
                    <h4 class="text-sm font-semibold text-slate-700 mb-2">Tareas Derivadas</h4>
                    <ul class="space-y-1.5">${m.actionItems.map(a => `<li class="flex items-start gap-2 text-sm"><i data-lucide="arrow-right" class="w-4 h-4 text-primary-500 mt-0.5 flex-none"></i>${a}</li>`).join('')}</ul>
                </div>
            ` : ''}

            <div>
                <h4 class="text-sm font-semibold text-slate-700 mb-2">Participantes</h4>
                <div class="flex flex-wrap gap-2">${m.participants.map(p => `<span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">${p}</span>`).join('')}</div>
            </div>

            <div class="flex justify-between items-center border-t pt-4">
                ${UI.button('Crear Tareas desde Reunión', { variant:'primary', icon:'list-plus', onclick:`UI.toast('Tareas creadas (simulado)','info'); UI.closeModal()` })}
                ${UI.button('Generar Resumen IA', { variant:'secondary', icon:'sparkles', onclick:`UI.toast('Resumen generado','info')` })}
            </div>
        </div>
    `);
};

App.showNewMeetingModal = function(clientId) {
    UI.openModal('Nueva Reunión', `
        <div class="space-y-4">
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Título / Tipo</label><input id="nm-title" type="text" class="w-full border rounded-lg p-2.5 text-sm" placeholder="Ej: Revisión quincenal"></div>
            <div class="grid grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Fecha</label><input id="nm-date" type="date" class="w-full border rounded-lg p-2.5 text-sm" value="2026-04-20"></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Hora</label><input id="nm-time" type="time" class="w-full border rounded-lg p-2.5 text-sm" value="10:00"></div>
            </div>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Participantes</label><input id="nm-parts" type="text" class="w-full border rounded-lg p-2.5 text-sm" placeholder="Nombres separados por coma"></div>
            <div class="flex justify-end gap-2 pt-2">
                ${UI.button('Cancelar', { variant:'secondary', onclick:'UI.closeModal()' })}
                ${UI.button('Crear Reunión', { variant:'primary', onclick:`App.createMeeting('${clientId}')` })}
            </div>
        </div>
    `);
};

App.createMeeting = function(clientId) {
    const client = Store.getClient(clientId);
    const title = document.getElementById('nm-title').value;
    const date = document.getElementById('nm-date').value;
    const time = document.getElementById('nm-time').value;
    const parts = document.getElementById('nm-parts').value.split(',').map(p=>p.trim()).filter(Boolean);
    client.meetings.unshift({ id:'m'+Date.now(), date, time, duration:'45 min', type: title || 'Reunión', participants: parts.length ? parts : ['Equipo'], status:'Programada', summary:'', agreements:[], actionItems:[], recording:false, tags:[] });
    Store.save(); UI.closeModal(); UI.toast('Reunión creada'); App.render();
};

App.showUploadMeetingModal = function(clientId) {
    UI.openModal('Subir Reunión', `
        <div class="space-y-4">
            <div class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                <i data-lucide="upload-cloud" class="w-10 h-10 text-slate-400 mx-auto mb-3"></i>
                <p class="text-sm text-slate-600 mb-1">Arrastra el archivo de audio/video aquí</p>
                <p class="text-xs text-slate-400">o haz clic para seleccionar (Simulado)</p>
            </div>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Notas adicionales</label><textarea class="w-full border rounded-lg p-2.5 text-sm min-h-[60px]" placeholder="Contexto de la reunión..."></textarea></div>
            <div class="flex justify-end gap-2 pt-2">
                ${UI.button('Cancelar', { variant:'secondary', onclick:'UI.closeModal()' })}
                ${UI.button('Subir y Generar Resumen', { variant:'primary', icon:'sparkles', onclick:`UI.toast('Reunión subida y resumen generado (simulado)','info'); UI.closeModal()` })}
            </div>
        </div>
    `);
};
