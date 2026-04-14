/* ============================================
   Agency OS — Operations / Tasks View
   Kanban + List views, task detail drawer
   ============================================ */
let _opsView = 'kanban';
let _opsFilter = { status:'', assignee:'', priority:'', channel:'', search:'' };

const KANBAN_COLUMNS = [
    { id:'Backlog', label:'Backlog', color:'bg-slate-400' },
    { id:'En proceso', label:'En Proceso', color:'bg-blue-500' },
    { id:'En revisión', label:'En Revisión', color:'bg-amber-500' },
    { id:'Esperando cliente', label:'Esperando Cliente', color:'bg-purple-500' },
    { id:'Aprobado', label:'Aprobado', color:'bg-green-500' },
    { id:'Programado', label:'Programado', color:'bg-cyan-500' },
    { id:'Publicado', label:'Publicado', color:'bg-emerald-600' }
];

function renderOperations(client) {
    const tasks = _filterTasks(client.tasks || []);
    const allTasks = client.tasks || [];
    const assignees = [...new Set(allTasks.map(t => t.assignee))].filter(Boolean);

    const viewTabs = `
    <div class="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
        <button onclick="App.setOpsView('kanban')" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${_opsView === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
            <i data-lucide="layout-grid" class="w-4 h-4 inline mr-1 align-text-bottom"></i>Kanban
        </button>
        <button onclick="App.setOpsView('list')" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${_opsView === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
            <i data-lucide="list" class="w-4 h-4 inline mr-1 align-text-bottom"></i>Lista
        </button>
    </div>`;

    const filtersHtml = `
    <div class="flex flex-wrap gap-2 items-center">
        ${UI.searchInput('Buscar tarea...', "App.filterOps('search',this.value)")}
        ${UI.select([{value:'',label:'Todos los estados'},...KANBAN_COLUMNS.map(c=>({value:c.id,label:c.label}))], _opsFilter.status, "App.filterOps('status',this.value)")}
        ${UI.select([{value:'',label:'Todos'},...assignees.map(a=>({value:a,label:Store.getTeamName(a)}))], _opsFilter.assignee, "App.filterOps('assignee',this.value)")}
        ${UI.select([{value:'',label:'Prioridad'},{value:'Alta',label:'Alta'},{value:'Media',label:'Media'},{value:'Baja',label:'Baja'}], _opsFilter.priority, "App.filterOps('priority',this.value)")}
    </div>`;

    const body = _opsView === 'kanban' ? _renderKanban(client.id, tasks) : _renderTaskList(client.id, tasks);

    return `
    ${UI.pageHeader('Operaciones', `${allTasks.length} tareas totales · ${allTasks.filter(t=>!['Aprobado','Publicado','Programado'].includes(t.status)).length} pendientes`, `
        <div class="flex items-center gap-2">
            ${viewTabs}
            ${UI.button('Nueva Tarea', { variant:'primary', icon:'plus', onclick:`App.showNewTaskModal('${client.id}')` })}
        </div>
    `)}
    <div class="mb-4">${filtersHtml}</div>
    ${body}`;
}

function _filterTasks(tasks) {
    return tasks.filter(t => {
        if (_opsFilter.status && t.status !== _opsFilter.status) return false;
        if (_opsFilter.assignee && t.assignee !== _opsFilter.assignee) return false;
        if (_opsFilter.priority && t.priority !== _opsFilter.priority) return false;
        if (_opsFilter.search) {
            const s = _opsFilter.search.toLowerCase();
            if (!t.title.toLowerCase().includes(s) && !(t.desc||'').toLowerCase().includes(s)) return false;
        }
        return true;
    });
}

App.setOpsView = function(v) { _opsView = v; App.render(); };
App.filterOps = function(key, val) { _opsFilter[key] = val; App.render(); };

/* ======= KANBAN ======= */
function _renderKanban(clientId, tasks) {
    const cols = KANBAN_COLUMNS.map(col => {
        const colTasks = tasks.filter(t => t.status === col.id);
        return `
        <div class="kanban-col flex-none bg-slate-50/80 rounded-xl p-3">
            <div class="flex items-center gap-2 mb-3 px-1">
                <div class="w-2.5 h-2.5 rounded-full ${col.color}"></div>
                <h4 class="text-sm font-semibold text-slate-700">${col.label}</h4>
                <span class="text-xs text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded-full">${colTasks.length}</span>
            </div>
            <div class="space-y-2 min-h-[100px]">
                ${colTasks.map(t => _taskCard(clientId, t)).join('')}
            </div>
        </div>`;
    }).join('');

    return `<div class="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">${cols}</div>`;
}

function _taskCard(clientId, t) {
    const done = (t.subtasks||[]).filter(s=>s.done).length;
    const total = (t.subtasks||[]).length;
    return `
    <div class="bg-white rounded-lg border border-slate-200 shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow task-card" onclick="App.openTaskDrawer('${clientId}','${t.id}')">
        <div class="flex items-start justify-between mb-2">
            <span class="px-2 py-0.5 rounded text-xs font-medium border ${Utils.priorityColor(t.priority)}">${t.priority}</span>
            <div class="flex items-center gap-1 text-xs text-slate-400">
                <i data-lucide="${Utils.channelIcon(t.channel)}" class="w-3 h-3"></i>
            </div>
        </div>
        <h5 class="text-sm font-medium text-slate-900 mb-2 line-clamp-2">${t.title}</h5>
        ${total > 0 ? `
        <div class="flex items-center gap-2 mb-2">
            ${UI.progressBar(total > 0 ? Math.round(done/total*100) : 0, 'sm')}
            <span class="text-xs text-slate-400 flex-none">${done}/${total}</span>
        </div>` : ''}
        <div class="flex items-center justify-between">
            ${UI.avatar(t.assignee, 'sm')}
            <span class="text-xs text-slate-400">${Utils.relativeDate(t.dueDate)}</span>
        </div>
        ${(t.tags||[]).length > 0 ? `<div class="flex flex-wrap gap-1 mt-2">${t.tags.slice(0,2).map(tag => `<span class="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">${tag}</span>`).join('')}</div>` : ''}
    </div>`;
}

/* ======= LIST VIEW ======= */
function _renderTaskList(clientId, tasks) {
    if (tasks.length === 0) return UI.emptyState('check-square','Sin tareas','Crea una nueva tarea para empezar.','');

    const rows = tasks.map(t => {
        const done = (t.subtasks||[]).filter(s=>s.done).length;
        const total = (t.subtasks||[]).length;
        return `
        <tr class="hover:bg-slate-50 cursor-pointer" onclick="App.openTaskDrawer('${clientId}','${t.id}')">
            <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-xs font-medium border ${Utils.priorityColor(t.priority)}">${t.priority}</span></td>
            <td class="px-4 py-3 text-sm font-medium text-slate-900 max-w-xs truncate">${t.title}</td>
            <td class="px-4 py-3">${UI.badge(t.status)}</td>
            <td class="px-4 py-3"><div class="flex items-center gap-2">${UI.avatar(t.assignee,'sm')}<span class="text-sm text-slate-600">${Store.getTeamName(t.assignee)}</span></div></td>
            <td class="px-4 py-3 text-sm text-slate-500"><i data-lucide="${Utils.channelIcon(t.channel)}" class="w-3.5 h-3.5 inline mr-1 text-slate-400 align-text-bottom"></i>${t.channel}</td>
            <td class="px-4 py-3 text-sm text-slate-500">${Utils.relativeDate(t.dueDate)}</td>
            <td class="px-4 py-3">${total > 0 ? `<span class="text-xs text-slate-500">${done}/${total}</span>` : '—'}</td>
        </tr>`;
    }).join('');

    return UI.table(['','Tarea','Estado','Asignado','Canal','Vencimiento','Subtareas'], rows);
}

/* ======= TASK DRAWER ======= */
App.openTaskDrawer = function(clientId, taskId) {
    const client = Store.getClient(clientId);
    if (!client) return;
    const t = client.tasks.find(x => x.id === taskId);
    if (!t) return;

    const done = (t.subtasks||[]).filter(s=>s.done).length;
    const total = (t.subtasks||[]).length;

    const statusOptions = KANBAN_COLUMNS.map(c =>
        `<option value="${c.id}" ${c.id === t.status ? 'selected' : ''}>${c.label}</option>`
    ).join('');

    const subtasksHtml = (t.subtasks||[]).map((s, i) => `
        <label class="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-slate-50 cursor-pointer group">
            <input type="checkbox" ${s.done ? 'checked' : ''} onchange="App.toggleSubtask('${clientId}','${taskId}',${i})" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500">
            <span class="text-sm ${s.done ? 'line-through text-slate-400' : 'text-slate-700'}">${Utils.escapeHtml(s.text)}</span>
        </label>
    `).join('');

    const commentsHtml = (t.comments||[]).map(c => UI.comment(c.author, c.text, c.date, c.author)).join('');

    UI.openDrawer(`
        <div class="p-5 border-b border-slate-200">
            <div class="flex items-center justify-between mb-3">
                <span class="px-2 py-0.5 rounded text-xs font-medium border ${Utils.priorityColor(t.priority)}">${t.priority}</span>
                <button onclick="UI.closeDrawer()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
            </div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">${Utils.escapeHtml(t.title)}</h2>
            <p class="text-sm text-slate-600 mb-4">${Utils.escapeHtml(t.desc || '')}</p>

            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p class="text-xs text-slate-400 mb-1">Estado</p>
                    <select onchange="App.changeTaskStatus('${clientId}','${taskId}',this.value)" class="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-sm bg-white">${statusOptions}</select>
                </div>
                <div>
                    <p class="text-xs text-slate-400 mb-1">Asignado a</p>
                    <div class="flex items-center gap-2">${UI.avatar(t.assignee,'sm')}<span>${Store.getTeamName(t.assignee)}</span></div>
                </div>
                <div>
                    <p class="text-xs text-slate-400 mb-1">Canal</p>
                    <p class="flex items-center gap-1"><i data-lucide="${Utils.channelIcon(t.channel)}" class="w-4 h-4 text-slate-400"></i>${t.channel}</p>
                </div>
                <div>
                    <p class="text-xs text-slate-400 mb-1">Vencimiento</p>
                    <p>${Utils.formatDate(t.dueDate)}</p>
                </div>
            </div>
            ${(t.tags||[]).length > 0 ? `<div class="flex flex-wrap gap-1 mt-3">${t.tags.map(tag => `<span class="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">${tag}</span>`).join('')}</div>` : ''}
        </div>

        <!-- Subtasks -->
        <div class="p-5 border-b border-slate-200">
            <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-slate-900">Subtareas ${total > 0 ? `<span class="text-slate-400 font-normal">(${done}/${total})</span>` : ''}</h3>
                <button onclick="App.addSubtaskPrompt('${clientId}','${taskId}')" class="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"><i data-lucide="plus" class="w-3 h-3"></i>Agregar</button>
            </div>
            ${total > 0 ? `<div>${subtasksHtml}</div>` : '<p class="text-sm text-slate-400">Sin subtareas</p>'}
            ${total > 0 ? `<div class="mt-2">${UI.progressBar(Math.round(done/total*100),'sm')}</div>` : ''}
        </div>

        <!-- Comments -->
        <div class="p-5">
            <h3 class="text-sm font-semibold text-slate-900 mb-3">Comentarios <span class="text-slate-400 font-normal">(${(t.comments||[]).length})</span></h3>
            <div class="divide-y divide-slate-100">${commentsHtml || '<p class="text-sm text-slate-400">Sin comentarios</p>'}</div>
            <div class="mt-4 flex gap-2">
                <input id="task-comment-input" type="text" placeholder="Escribe un comentario..." class="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm" onkeydown="if(event.key==='Enter')App.addTaskComment('${clientId}','${taskId}')">
                ${UI.button('Enviar', { variant:'primary', cls:'!px-3 !py-2', onclick:`App.addTaskComment('${clientId}','${taskId}')` })}
            </div>
        </div>
    `);
};

App.changeTaskStatus = function(clientId, taskId, newStatus) {
    Store.updateTask(clientId, taskId, { status: newStatus });
    UI.toast('Estado actualizado');
    App.render();
    // Re-open drawer with refreshed data
    setTimeout(() => App.openTaskDrawer(clientId, taskId), 100);
};

App.toggleSubtask = function(clientId, taskId, idx) {
    const client = Store.getClient(clientId);
    const task = client.tasks.find(t => t.id === taskId);
    if (task && task.subtasks[idx] !== undefined) {
        task.subtasks[idx].done = !task.subtasks[idx].done;
        Store.save();
    }
    App.render();
    setTimeout(() => App.openTaskDrawer(clientId, taskId), 100);
};

App.addSubtaskPrompt = function(clientId, taskId) {
    const text = prompt('Nueva subtarea:');
    if (!text || !text.trim()) return;
    const client = Store.getClient(clientId);
    const task = client.tasks.find(t => t.id === taskId);
    if (task) {
        if (!task.subtasks) task.subtasks = [];
        task.subtasks.push({ text: text.trim(), done: false });
        Store.save();
    }
    App.render();
    setTimeout(() => App.openTaskDrawer(clientId, taskId), 100);
};

App.addTaskComment = function(clientId, taskId) {
    const input = document.getElementById('task-comment-input');
    if (!input || !input.value.trim()) return;
    Store.addComment(clientId, taskId, { author:'luis', text: input.value.trim(), date:'2026-04-14' });
    App.render();
    setTimeout(() => App.openTaskDrawer(clientId, taskId), 100);
};

/* ======= NEW TASK MODAL ======= */
App.showNewTaskModal = function(clientId) {
    const client = Store.getClient(clientId);
    const teamOptions = (client.settings.teamAssigned || []).map(id =>
        `<option value="${id}">${Store.getTeamName(id)}</option>`
    ).join('');

    UI.openModal('Nueva Tarea', `
        <div class="space-y-4">
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Título</label><input id="nt-title" type="text" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" placeholder="Ej: Diseñar carrusel de tips"></div>
            <div><label class="block text-sm font-medium text-slate-700 mb-1">Descripción</label><textarea id="nt-desc" rows="2" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" placeholder="Detalle de la tarea..."></textarea></div>
            <div class="grid grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Asignar a</label><select id="nt-assignee" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">${teamOptions}</select></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Prioridad</label><select id="nt-priority" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"><option>Alta</option><option>Media</option><option selected>Media</option><option>Baja</option></select></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Canal</label><select id="nt-channel" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"><option>Instagram</option><option>TikTok</option><option>Facebook</option><option>LinkedIn</option><option>Google Ads</option><option>Meta Ads</option><option>Web</option><option>Todos</option></select></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Vencimiento</label><input id="nt-due" type="date" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value="2026-04-21"></div>
            </div>
            <div class="flex justify-end gap-2 pt-4 border-t">
                ${UI.button('Cancelar', { variant:'secondary', onclick:'UI.closeModal()' })}
                ${UI.button('Crear Tarea', { variant:'primary', icon:'plus', onclick:`App.createTask('${clientId}')` })}
            </div>
        </div>
    `);
};

App.createTask = function(clientId) {
    const title = document.getElementById('nt-title').value.trim();
    if (!title) { UI.toast('Escribe un título','warning'); return; }
    Store.addTask(clientId, {
        title, desc: document.getElementById('nt-desc').value.trim(),
        status:'Backlog', assignee: document.getElementById('nt-assignee').value,
        priority: document.getElementById('nt-priority').value,
        format:'General', channel: document.getElementById('nt-channel').value,
        dueDate: document.getElementById('nt-due').value,
        subtasks:[], comments:[], tags:[]
    });
    UI.closeModal();
    UI.toast('Tarea creada');
    App.render();
};
