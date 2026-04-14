/* ============================================
   Agency OS — Summary View
   ============================================ */
function renderSummary(client) {
    const owner = Store.getTeamMember(client.owner);
    const urgentTasks = client.tasks.filter(t => t.priority === 'Alta' && !['Aprobado','Publicado'].includes(t.status)).slice(0, 5);
    const reviewTasks = client.tasks.filter(t => t.status === 'En revisión').slice(0, 5);
    const upcomingMeeting = client.meetings.find(m => m.status === 'Programada');

    const timelineItems = [];
    client.meetings.filter(m => m.status === 'Completada').slice(0, 3).forEach(m => {
        timelineItems.push({ title: m.type + ' completada', date: Utils.relativeDate(m.date), desc: Utils.truncate(m.summary, 80) });
    });
    if (client.benchmark) timelineItems.push({ title: 'Benchmark completado', date: Utils.formatDateShort(client.benchmark.lastUpdate) });
    if (client.strategy) timelineItems.push({ title: 'Estrategia: ' + client.strategy.status, date: Utils.formatDateShort(client.strategy.lastUpdate) });

    return `
    ${UI.pageHeader('Resumen Ejecutivo', `Vista rápida del estado de ${client.name}`, UI.button('Ver Reporte', { variant:'secondary', icon:'bar-chart-2', onclick:`Router.go('client/${client.id}/reportes')` }))}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        ${UI.kpiCard('Tareas Pendientes', client.pendingTasks, undefined, 'check-square')}
        ${UI.kpiCard('En Revisión', client.reviewItems, undefined, 'eye')}
        ${UI.kpiCard('Progreso General', client.progress + '%', undefined, 'trending-up')}
        ${UI.kpiCard('Salud', Utils.healthLabel(client.health), undefined, 'heart')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="lg:col-span-2 space-y-6">
            ${UI.card(`
                <div class="p-5 border-b border-slate-100 flex items-center gap-2">
                    <i data-lucide="activity" class="w-5 h-5 text-primary-500"></i>
                    <h3 class="font-semibold text-slate-900">Actividad Reciente</h3>
                </div>
                <div class="p-5">
                    ${timelineItems.length ? UI.timeline(timelineItems) : '<p class="text-sm text-slate-400">Sin actividad reciente.</p>'}
                </div>
            `)}

            ${UI.card(`
                <div class="p-5 border-b border-slate-100 flex items-center gap-2">
                    <i data-lucide="alert-circle" class="w-5 h-5 text-red-500"></i>
                    <h3 class="font-semibold text-slate-900">Tareas Urgentes</h3>
                </div>
                <div class="divide-y divide-slate-100">
                    ${urgentTasks.length ? urgentTasks.map(t => `
                        <div class="px-5 py-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer" onclick="App.openTaskDrawer('${client.id}','${t.id}')">
                            <div class="flex items-center gap-3 min-w-0">
                                ${UI.avatar(t.assignee, 'sm')}
                                <div class="min-w-0">
                                    <p class="text-sm font-medium text-slate-900 truncate">${t.title}</p>
                                    <p class="text-xs text-slate-500">${t.format} · ${t.channel}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 flex-none">
                                ${UI.badge(t.status)}
                                <span class="text-xs text-slate-400">${Utils.relativeDate(t.dueDate)}</span>
                            </div>
                        </div>
                    `).join('') : '<div class="p-5 text-sm text-slate-400">Sin tareas urgentes 🎉</div>'}
                </div>
            `)}
        </div>

        <div class="space-y-6">
            ${upcomingMeeting ? UI.card(`
                <div class="p-5">
                    <div class="flex items-center gap-2 mb-3">
                        <i data-lucide="calendar" class="w-5 h-5 text-primary-500"></i>
                        <h3 class="font-semibold text-slate-900">Próxima Reunión</h3>
                    </div>
                    <p class="text-sm font-medium text-slate-900 mb-1">${upcomingMeeting.title || upcomingMeeting.type}</p>
                    <p class="text-sm text-slate-500">${Utils.relativeDate(upcomingMeeting.date)}, ${upcomingMeeting.time}</p>
                    <p class="text-xs text-slate-400 mt-1">${upcomingMeeting.participants.join(', ')}</p>
                </div>
            `) : ''}

            ${UI.card(`
                <div class="p-5 border-b border-slate-100">
                    <h3 class="font-semibold text-slate-900">Estado de Módulos</h3>
                </div>
                <div class="divide-y divide-slate-100">
                    <div class="px-5 py-3 flex justify-between items-center text-sm">
                        <span class="text-slate-600">Onboarding</span>
                        <span class="font-bold ${client.onboarding.complete===100?'text-green-600':'text-amber-600'}">${client.onboarding.complete}%</span>
                    </div>
                    <div class="px-5 py-3 flex justify-between items-center text-sm">
                        <span class="text-slate-600">Brief</span>
                        <span class="font-bold">${client.brief.complete}%</span>
                    </div>
                    <div class="px-5 py-3 flex justify-between items-center text-sm">
                        <span class="text-slate-600">Benchmark</span>
                        <span class="font-bold ${client.benchmark?'text-green-600':'text-slate-400'}">${client.benchmark ? 'Listo' : 'Pendiente'}</span>
                    </div>
                    <div class="px-5 py-3 flex justify-between items-center text-sm">
                        <span class="text-slate-600">Estrategia</span>
                        <span class="font-bold">${client.strategy ? client.strategy.status : 'N/A'}</span>
                    </div>
                </div>
            `)}

            ${reviewTasks.length ? UI.card(`
                <div class="p-5 border-b border-slate-100 flex items-center gap-2">
                    <i data-lucide="eye" class="w-5 h-5 text-amber-500"></i>
                    <h3 class="font-semibold text-slate-900">En Revisión</h3>
                </div>
                <div class="divide-y divide-slate-100">
                    ${reviewTasks.map(t => `
                        <div class="px-5 py-3 cursor-pointer hover:bg-slate-50" onclick="App.openTaskDrawer('${client.id}','${t.id}')">
                            <p class="text-sm font-medium text-slate-900 truncate">${t.title}</p>
                            <p class="text-xs text-slate-500">${Store.getTeamName(t.assignee)}</p>
                        </div>
                    `).join('')}
                </div>
            `) : ''}
        </div>
    </div>`;
}
