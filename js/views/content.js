/* ============================================
   Agency OS — Content View (5 Subtabs)
   Calendario, Gestor, Copywriter, Community, Aprobaciones
   ============================================ */
let _contentTab = 'calendario';
let _contentMonth = 3; // April 2026 (0-indexed)
let _contentYear = 2026;

function renderContent(client, sub) {
    if (sub) _contentTab = sub;
    const tabs = [
        { id:'calendario', label:'Calendario', icon:'calendar' },
        { id:'manager', label:'Gestor de Contenido', icon:'layout' },
        { id:'copywriter', label:'Copywriter', icon:'pen-tool' },
        { id:'community', label:'Community', icon:'message-circle' },
        { id:'aprobaciones', label:'Aprobaciones', icon:'check-square' }
    ];

    let body = '';
    switch(_contentTab) {
        case 'calendario': body = _renderCalendar(client); break;
        case 'manager': body = _renderManager(client); break;
        case 'copywriter': body = _renderCopywriter(client); break;
        case 'community': body = _renderCommunity(client); break;
        case 'aprobaciones': body = _renderApprovals(client); break;
        default: body = _renderCalendar(client);
    }

    return `
    ${UI.pageHeader('Contenido', 'Todo el contenido del cliente en un solo lugar.')}
    ${UI.tabs(tabs, _contentTab, 'App.switchContentTab')}
    ${body}`;
}

App.switchContentTab = function(tab) {
    _contentTab = tab;
    const cid = Router.currentClientId();
    if (cid) Router.go('client/' + cid + '/contenido/' + tab);
};

/* ======= CALENDARIO ======= */
function _renderCalendar(client) {
    const cal = client.content.calendar || [];
    const days = Utils.getCalendarDays(_contentYear, _contentMonth);
    const monthName = Utils.monthName(_contentMonth);

    const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    const padStr = (n) => String(n).padStart(2,'0');
    const gridCells = days.map(d => {
        if (d === null) return '<div class="min-h-[80px] bg-slate-50/50"></div>';
        const dateStr = `${_contentYear}-${padStr(_contentMonth+1)}-${padStr(d)}`;
        const pieces = cal.filter(c => c.date === dateStr);
        const isToday = dateStr === '2026-04-14';
        return `
        <div class="min-h-[80px] p-1 border-t border-slate-100 ${isToday ? 'bg-primary-50/40' : 'hover:bg-slate-50'} transition-colors">
            <div class="text-xs font-medium ${isToday ? 'text-primary-700 font-bold' : 'text-slate-500'} mb-1 px-1">${d}</div>
            ${pieces.map(p => `
                <button onclick="App.showPieceDetail('${client.id}','${p.id}')" class="block w-full text-left px-1.5 py-0.5 mb-0.5 rounded text-xs truncate cursor-pointer transition-colors
                    ${p.status === 'Publicado' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                      p.status === 'Programado' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                      p.status === 'En revisión' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                      p.status === 'En proceso' ? 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200' :
                      'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                    <i data-lucide="${Utils.channelIcon(p.channel)}" class="w-3 h-3 inline mr-0.5 align-text-bottom"></i>${Utils.truncate(p.title, 20)}
                </button>
            `).join('')}
        </div>`;
    }).join('');

    return `
    <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
            ${UI.button('', { variant:'ghost', icon:'chevron-left', onclick:'App.calPrev()' })}
            <h3 class="text-lg font-bold text-slate-900">${monthName} ${_contentYear}</h3>
            ${UI.button('', { variant:'ghost', icon:'chevron-right', onclick:'App.calNext()' })}
        </div>
        <div class="flex gap-2">
            ${UI.button('Nueva Pieza', { variant:'primary', icon:'plus', onclick:`App.showNewPieceModal('${client.id}')` })}
        </div>
    </div>
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
        <div class="min-w-[700px]">
        <div class="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
            ${dayNames.map(d => `<div class="py-2 text-center text-xs font-semibold text-slate-500 uppercase">${d}</div>`).join('')}
        </div>
        <div class="grid grid-cols-7 cal-grid">${gridCells}</div>
        </div>
        </div>
    </div>
    <div class="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-green-200"></span>Publicado</span>
        <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-blue-200"></span>Programado</span>
        <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-amber-200"></span>En revisión</span>
        <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-cyan-200"></span>En proceso</span>
        <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-slate-200"></span>Backlog / Pendiente</span>
    </div>`;
}

App.calPrev = function() { _contentMonth--; if (_contentMonth < 0) { _contentMonth = 11; _contentYear--; } App.render(); };
App.calNext = function() { _contentMonth++; if (_contentMonth > 11) { _contentMonth = 0; _contentYear++; } App.render(); };

App.showPieceDetail = function(clientId, pieceId) {
    const client = Store.getClient(clientId);
    if (!client) return;
    const piece = client.content.calendar.find(c => c.id === pieceId);
    if (!piece) return;
    UI.openModal(piece.title, `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div><p class="text-xs text-slate-400">Formato</p><p class="text-sm font-semibold">${piece.format}</p></div>
                <div><p class="text-xs text-slate-400">Canal</p><p class="text-sm font-semibold flex items-center gap-1"><i data-lucide="${Utils.channelIcon(piece.channel)}" class="w-4 h-4"></i>${piece.channel}</p></div>
                <div><p class="text-xs text-slate-400">Fecha</p><p class="text-sm font-semibold">${Utils.formatDate(piece.date)}</p></div>
                <div><p class="text-xs text-slate-400">Estado</p><p class="text-sm">${UI.badge(piece.status)}</p></div>
                <div><p class="text-xs text-slate-400">Asignado a</p><p class="text-sm">${UI.avatar(piece.assignee,'sm')} <span class="ml-1">${Store.getTeamName(piece.assignee)}</span></p></div>
                <div><p class="text-xs text-slate-400">Prioridad</p><p class="text-sm"><span class="px-2 py-0.5 rounded text-xs font-medium border ${Utils.priorityColor(piece.priority)}">${piece.priority}</span></p></div>
            </div>
            <div class="flex gap-2 pt-4 border-t">
                ${piece.status !== 'Publicado' ? `
                <select onchange="App.changePieceStatus('${clientId}','${pieceId}',this.value)" class="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white">
                    ${['Backlog','Pendiente','En proceso','En revisión','Programado','Publicado'].map(s => `<option value="${s}" ${s === piece.status ? 'selected' : ''}>${s}</option>`).join('')}
                </select>` : ''}
                ${UI.button('Cerrar', { variant:'secondary', onclick:'UI.closeModal()' })}
            </div>
        </div>
    `);
};

App.changePieceStatus = function(clientId, pieceId, newStatus) {
    const client = Store.getClient(clientId);
    const piece = client.content.calendar.find(c => c.id === pieceId);
    if (piece) { piece.status = newStatus; Store.save(); }
    UI.closeModal();
    UI.toast('Estado actualizado');
    App.render();
};

App.showNewPieceModal = function(clientId) {
    UI.openModal('Nueva Pieza de Contenido', `
        <div class="space-y-4">
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Título</label><input id="np-title" type="text" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" placeholder="Ej: Reel sobre producto X"></div>
            <div class="grid grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Fecha</label><input id="np-date" type="date" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value="2026-04-20"></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Formato</label><select id="np-format" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"><option>Reel</option><option>Carrusel</option><option>Post Estático</option><option>Video Vertical</option><option>Story</option><option>Blog</option><option>Ad</option></select></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Canal</label><select id="np-channel" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"><option>Instagram</option><option>TikTok</option><option>Facebook</option><option>LinkedIn</option><option>YouTube</option><option>Web</option><option>Meta Ads</option></select></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Prioridad</label><select id="np-priority" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"><option>Alta</option><option>Media</option><option>Baja</option></select></div>
            </div>
            <div class="flex justify-end gap-2 pt-4 border-t">
                ${UI.button('Cancelar', { variant:'secondary', onclick:'UI.closeModal()' })}
                ${UI.button('Crear Pieza', { variant:'primary', icon:'plus', onclick:`App.createPiece('${clientId}')` })}
            </div>
        </div>
    `);
};

App.createPiece = function(clientId) {
    const title = document.getElementById('np-title').value.trim();
    if (!title) { UI.toast('Escribe un título','warning'); return; }
    const client = Store.getClient(clientId);
    client.content.calendar.push({
        id: Utils.generateId(), title,
        date: document.getElementById('np-date').value,
        format: document.getElementById('np-format').value,
        channel: document.getElementById('np-channel').value,
        priority: document.getElementById('np-priority').value,
        status:'Backlog', assignee:'ana'
    });
    Store.save();
    UI.closeModal();
    UI.toast('Pieza creada');
    App.render();
};

/* ======= GESTOR DE CONTENIDO (Manager) ======= */
function _renderManager(client) {
    const cal = client.content.calendar || [];
    return `
    <div class="mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <p class="text-sm text-slate-500">Genera guiones, pautas visuales y estructuras de contenido con IA.</p>
        ${UI.button('Generar Contenido IA', { variant:'primary', icon:'sparkles', onclick:`App.showGenerateContentModal('${client.id}')` })}
    </div>
    ${cal.length === 0
        ? UI.emptyState('layout','Sin contenido aún','Crea piezas en el calendario o genera contenido con IA.','')
        : `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${cal.map(p => `
            ${UI.card(`<div class="p-4">
                <div class="flex items-center gap-2 mb-2">
                    <i data-lucide="${Utils.channelIcon(p.channel)}" class="w-4 h-4 text-slate-400"></i>
                    <span class="text-xs text-slate-500">${p.channel} · ${p.format}</span>
                    <span class="ml-auto">${UI.badge(p.status)}</span>
                </div>
                <h4 class="font-semibold text-slate-900 text-sm mb-2">${p.title}</h4>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        ${UI.avatar(p.assignee,'sm')}
                        <span class="text-xs text-slate-500">${Utils.formatDateShort(p.date)}</span>
                    </div>
                    <span class="px-2 py-0.5 rounded text-xs font-medium border ${Utils.priorityColor(p.priority)}">${p.priority}</span>
                </div>
            </div>`)}
        `).join('')}</div>`}`;
}

App.showGenerateContentModal = function(clientId) {
    UI.openModal('Generar Contenido con IA', `
        <div class="space-y-4">
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Tipo de Contenido</label>
                <select id="gc-type" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option>Guion de Reel/Video</option><option>Estructura de Carrusel</option><option>Pauta Visual</option><option>Ideas de Contenido (7 días)</option><option>Script para Story</option>
                </select>
            </div>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Tema o Contexto</label>
                <textarea id="gc-context" rows="3" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" placeholder="Ej: Video educativo sobre inspección de instalaciones sanitarias..."></textarea>
            </div>
            <div class="flex justify-end gap-2 pt-4 border-t">
                ${UI.button('Cancelar', { variant:'secondary', onclick:'UI.closeModal()' })}
                ${UI.button('Generar con IA', { variant:'primary', icon:'sparkles', onclick:`App.generateContent('${clientId}')` })}
            </div>
        </div>
    `);
};

App.generateContent = function(clientId) {
    const type = document.getElementById('gc-type').value;
    const context = document.getElementById('gc-context').value;
    UI.closeModal();
    UI.toast('Generando contenido con IA...', 'info');
    setTimeout(() => {
        const result = `📋 ${type}\n\n🎯 Tema: ${context || 'Generado automáticamente'}\n\n🎬 ESTRUCTURA:\n\n1. HOOK (0-3s): Pregunta provocadora o dato impactante.\n2. DESARROLLO (3-20s): 3 puntos clave con visual de apoyo.\n3. TRANSICIÓN (20-25s): Giro narrativo o revelación.\n4. CTA (25-30s): Llamada a la acción clara.\n\n📝 COPY SUGERIDO:\nHook: "¿Sabías que el 40% de las propiedades nuevas tienen fallas ocultas?"\n\n🎨 VISUAL: Planos cerrados del producto/servicio. Texto en pantalla bold. Paleta de marca.\n\n🎵 AUDIO: Música trending + voz en off profesional.\n\n#Hashtags: #Marketing #Contenido #EstrategiaDigital`;
        UI.openModal('Contenido Generado por IA', `
            <pre class="whitespace-pre-wrap text-sm text-slate-700 bg-slate-50 p-4 rounded-lg font-sans leading-relaxed">${Utils.escapeHtml(result)}</pre>
            <div class="flex justify-end gap-2 mt-4">
                ${UI.button('Copiar', { variant:'secondary', icon:'copy', onclick:`navigator.clipboard.writeText(document.querySelector('#modal-content pre').textContent);UI.toast('Copiado al portapapeles')` })}
                ${UI.button('Cerrar', { variant:'primary', onclick:'UI.closeModal()' })}
            </div>
        `);
    }, 1500);
};

/* ======= COPYWRITER ======= */
function _renderCopywriter(client) {
    const copies = client.content.copies || [];

    if (copies.length === 0) {
        return UI.emptyState('pen-tool','Sin copies creados','Genera copies persuasivos para campañas y contenido orgánico.',
            UI.button('Generar Copy IA', { variant:'primary', icon:'sparkles', onclick:`App.showCopyGeneratorModal('${client.id}')` }));
    }

    const cardsHtml = copies.map(cp => `
        ${UI.card(`<div class="p-5">
            <div class="flex items-center justify-between mb-3">
                <div>
                    <h4 class="font-semibold text-slate-900">${cp.title}</h4>
                    <p class="text-xs text-slate-500 mt-0.5">${cp.type} · ${cp.channel} · Tono: ${cp.tone}</p>
                </div>
                ${UI.badge(cp.status)}
            </div>
            <div class="space-y-3">
                ${cp.versions.map((v, i) => `
                    <div class="bg-slate-50 rounded-lg p-4 border border-slate-100">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-primary-600 uppercase">Variante: ${v.label}</span>
                            <button onclick="navigator.clipboard.writeText(this.closest('.bg-slate-50').querySelector('p').textContent);UI.toast('Copy copiado')" class="text-xs text-slate-400 hover:text-primary-600 flex items-center gap-1"><i data-lucide="copy" class="w-3 h-3"></i>Copiar</button>
                        </div>
                        <p class="text-sm text-slate-700 whitespace-pre-line leading-relaxed">${Utils.escapeHtml(v.text)}</p>
                    </div>
                `).join('')}
            </div>
        </div>`)}`).join('');

    return `
    <div class="mb-4 flex justify-between items-center">
        <p class="text-sm text-slate-500">Copies persuasivos para campañas y contenido orgánico.</p>
        ${UI.button('Generar Copy IA', { variant:'primary', icon:'sparkles', onclick:`App.showCopyGeneratorModal('${client.id}')` })}
    </div>
    <div class="space-y-4">${cardsHtml}</div>`;
}

App.showCopyGeneratorModal = function(clientId) {
    UI.openModal('Generador de Copy IA', `
        <div class="space-y-4">
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Tipo de Copy</label>
                <select id="cg-type" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option>Ad Copy (Meta/Google)</option><option>Copy Orgánico (Feed)</option><option>Hooks para Reels/TikTok</option><option>CTAs</option><option>Email Subject Lines</option><option>Bio / Descripción</option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Canal</label>
                    <select id="cg-channel" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"><option>Instagram</option><option>TikTok</option><option>Facebook</option><option>Meta Ads</option><option>Google Ads</option><option>LinkedIn</option></select>
                </div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Tono</label>
                    <select id="cg-tone" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"><option>Profesional</option><option>Casual</option><option>Premium</option><option>Educativo</option><option>Urgente</option><option>Emocional</option></select>
                </div>
            </div>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Contexto / Producto</label>
                <textarea id="cg-context" rows="2" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" placeholder="Describe el producto o servicio a promocionar..."></textarea></div>
            <div class="flex justify-end gap-2 pt-4 border-t">
                ${UI.button('Cancelar', { variant:'secondary', onclick:'UI.closeModal()' })}
                ${UI.button('Generar Variantes', { variant:'primary', icon:'sparkles', onclick:`App.generateCopy('${clientId}')` })}
            </div>
        </div>
    `);
};

App.generateCopy = function(clientId) {
    const type = document.getElementById('cg-type').value;
    const channel = document.getElementById('cg-channel').value;
    const tone = document.getElementById('cg-tone').value;
    const ctx = document.getElementById('cg-context').value;
    UI.closeModal();
    UI.toast('Generando copies con IA...','info');
    setTimeout(() => {
        const client = Store.getClient(clientId);
        client.content.copies.push({
            id: Utils.generateId(), title: `Copy generado: ${type}`, type: type.split('(')[0].trim(), channel, tone, status:'En revisión',
            versions:[
                { label:'Directa', text:`🎯 ${ctx || 'Tu próximo paso está aquí.'}\n\n¿Listo para dar el siguiente paso? Descubre cómo podemos ayudarte.\n\n👉 Link en bio` },
                { label:'Emocional', text:`💡 Imagina tener todo resuelto.\n\n${ctx || 'Deja de preocuparte y empieza a disfrutar.'}\n\nMiles ya lo hicieron. ¿Y tú?\n\n📱 Escríbenos hoy` }
            ]
        });
        Store.save();
        UI.toast('Copies generados');
        App.render();
    }, 1500);
};

/* ======= COMMUNITY ======= */
function _renderCommunity(client) {
    const msgs = client.content.community || [];

    if (msgs.length === 0) {
        return UI.emptyState('message-circle','Sin mensajes pendientes','Cuando lleguen consultas, comentarios o menciones aparecerán aquí.','');
    }

    const pending = msgs.filter(m => m.status === 'Pendiente');
    const responded = msgs.filter(m => m.status === 'Respondido');

    return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${UI.kpiCard('Total Mensajes', msgs.length, undefined, 'message-circle')}
        ${UI.kpiCard('Pendientes', pending.length, undefined, 'clock')}
        ${UI.kpiCard('Respondidos', responded.length, undefined, 'check-circle')}
    </div>
    <div class="space-y-4">
        ${msgs.map(m => `
            ${UI.card(`<div class="p-5">
                <div class="flex items-start gap-4">
                    <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-none">${m.from.charAt(1).toUpperCase()}</div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1 flex-wrap">
                            <span class="font-semibold text-slate-900 text-sm">${Utils.escapeHtml(m.from)}</span>
                            <span class="inline-flex items-center gap-1 text-xs text-slate-400"><i data-lucide="${Utils.channelIcon(m.channel)}" class="w-3 h-3"></i>${m.channel}</span>
                            ${UI.badge(m.type, m.type === 'Consulta' ? 'badge-warning' : m.type === 'Interés' ? 'badge-good' : m.type === 'Positivo' ? 'badge-info' : 'badge-neutral')}
                            ${m.urgency === 'alta' ? '<span class="text-xs text-red-600 font-semibold">Urgente</span>' : ''}
                            <span class="ml-auto text-xs text-slate-400">${Utils.relativeDate(m.date)}</span>
                        </div>
                        <p class="text-sm text-slate-700 mb-3 bg-slate-50 rounded-lg p-3">${Utils.escapeHtml(m.message)}</p>
                        ${m.suggestedReply ? `
                            <div class="bg-primary-50 border border-primary-100 rounded-lg p-3 mb-3">
                                <p class="text-xs font-semibold text-primary-600 mb-1 flex items-center gap-1"><i data-lucide="sparkles" class="w-3 h-3"></i>Respuesta Sugerida por IA</p>
                                <p class="text-sm text-primary-800">${Utils.escapeHtml(m.suggestedReply)}</p>
                            </div>` : ''}
                        <div class="flex gap-2">
                            ${m.status === 'Pendiente' ? `
                                ${UI.button('Aprobar y Responder', { variant:'success', icon:'check', cls:'text-xs !px-3 !py-1.5', onclick:`App.approveCommunityReply('${client.id}','${m.id}')` })}
                                ${UI.button('Editar Respuesta', { variant:'secondary', icon:'edit', cls:'text-xs !px-3 !py-1.5', onclick:`App.editCommunityReply('${client.id}','${m.id}')` })}
                                ${UI.button('Ignorar', { variant:'ghost', cls:'text-xs !px-3 !py-1.5', onclick:`App.ignoreCommunityMsg('${client.id}','${m.id}')` })}
                            ` : `<span class="text-xs text-green-600 font-medium flex items-center gap-1"><i data-lucide="check-circle" class="w-3 h-3"></i>Respondido</span>`}
                        </div>
                    </div>
                </div>
            </div>`)}`).join('')}
    </div>`;
}

App.approveCommunityReply = function(clientId, msgId) {
    const client = Store.getClient(clientId);
    const msg = client.content.community.find(m => m.id === msgId);
    if (msg) { msg.status = 'Respondido'; Store.save(); }
    UI.toast('Respuesta enviada');
    App.render();
};

App.editCommunityReply = function(clientId, msgId) {
    const client = Store.getClient(clientId);
    const msg = client.content.community.find(m => m.id === msgId);
    if (!msg) return;
    UI.openModal('Editar Respuesta', `
        <div class="space-y-4">
            <p class="text-sm text-slate-500">Mensaje original de <strong>${Utils.escapeHtml(msg.from)}</strong>: "${Utils.escapeHtml(msg.message)}"</p>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Respuesta</label>
                <textarea id="cr-reply" rows="4" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">${Utils.escapeHtml(msg.suggestedReply || '')}</textarea>
            </div>
            <div class="flex justify-end gap-2">
                ${UI.button('Cancelar', { variant:'secondary', onclick:'UI.closeModal()' })}
                ${UI.button('Enviar Respuesta', { variant:'success', icon:'send', onclick:`App.sendCommunityReply('${clientId}','${msgId}')` })}
            </div>
        </div>
    `);
};

App.sendCommunityReply = function(clientId, msgId) {
    const client = Store.getClient(clientId);
    const msg = client.content.community.find(m => m.id === msgId);
    if (msg) {
        msg.suggestedReply = document.getElementById('cr-reply').value;
        msg.status = 'Respondido';
        Store.save();
    }
    UI.closeModal();
    UI.toast('Respuesta enviada');
    App.render();
};

App.ignoreCommunityMsg = function(clientId, msgId) {
    const client = Store.getClient(clientId);
    const msg = client.content.community.find(m => m.id === msgId);
    if (msg) { msg.status = 'Respondido'; Store.save(); }
    UI.toast('Mensaje marcado como ignorado','info');
    App.render();
};

/* ======= APROBACIONES ======= */
function _renderApprovals(client) {
    const list = client.content.approvals || [];

    if (list.length === 0) {
        return UI.emptyState('check-square','Sin aprobaciones pendientes','Cuando envíes piezas a revisión del cliente, aparecerán aquí.','');
    }

    return `
    <div class="space-y-4">
        ${list.map(a => {
            const statusColors = { 'Aprobado':'bg-green-50 border-green-200', 'En revisión':'bg-amber-50 border-amber-200', 'Corregir':'bg-red-50 border-red-200' };
            return `${UI.card(`<div class="p-5 ${statusColors[a.status] || ''}">
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <h4 class="font-semibold text-slate-900">${a.piece}</h4>
                        <p class="text-xs text-slate-500 mt-0.5">${a.format} · Enviado ${Utils.formatDate(a.date)}</p>
                    </div>
                    ${UI.badge(a.status)}
                </div>
                ${a.clientNote ? `
                    <div class="bg-white/80 border border-slate-200 rounded-lg p-3 mb-3">
                        <p class="text-xs font-semibold text-slate-500 mb-1">Nota del Cliente</p>
                        <p class="text-sm text-slate-700">${Utils.escapeHtml(a.clientNote)}</p>
                    </div>` : ''}
                <div class="mb-3">
                    <p class="text-xs font-semibold text-slate-500 mb-2">Historial</p>
                    <div class="space-y-1">
                        ${(a.history||[]).map(h => `<div class="flex items-center gap-2 text-xs text-slate-500"><i data-lucide="clock" class="w-3 h-3"></i><span>${Utils.formatDate(h.date)}</span><span class="text-slate-400">—</span><span>${h.action}</span></div>`).join('')}
                    </div>
                </div>
                <div class="flex gap-2">
                    ${a.status !== 'Aprobado' ? `
                        ${UI.button('Marcar Aprobado', { variant:'success', icon:'check', cls:'text-xs !px-3 !py-1.5', onclick:`App.approveContent('${client.id}','${a.id}')` })}
                        ${UI.button('Solicitar Corrección', { variant:'danger', icon:'x', cls:'text-xs !px-3 !py-1.5', onclick:`App.rejectContent('${client.id}','${a.id}')` })}
                    ` : `<span class="text-xs text-green-600 font-medium flex items-center gap-1"><i data-lucide="check-circle" class="w-3 h-3"></i>Aprobado por el cliente</span>`}
                </div>
            </div>`)}`;
        }).join('')}
    </div>`;
}

App.approveContent = function(clientId, approvalId) {
    const client = Store.getClient(clientId);
    const a = client.content.approvals.find(x => x.id === approvalId);
    if (a) {
        a.status = 'Aprobado';
        a.history.push({ date:'2026-04-14', action:'Aprobado' });
        Store.save();
    }
    UI.toast('Pieza aprobada');
    App.render();
};

App.rejectContent = function(clientId, approvalId) {
    const client = Store.getClient(clientId);
    const a = client.content.approvals.find(x => x.id === approvalId);
    if (a) {
        a.status = 'Corregir';
        a.history.push({ date:'2026-04-14', action:'Corrección solicitada' });
        Store.save();
    }
    UI.toast('Corrección solicitada','warning');
    App.render();
};
