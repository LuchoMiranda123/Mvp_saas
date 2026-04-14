/* ============================================
   Agency OS — AI Agents Panel
   ============================================ */
function renderAgents() {
    const agents = Store.agents;

    return `
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4">
        <div>
            <h1 class="text-2xl font-bold text-slate-900">Copilotos IA</h1>
            <p class="text-slate-500 mt-1">Asistentes inteligentes que potencian tu agencia.</p>
        </div>
        <div class="flex items-center gap-2">
            <div class="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>${agents.filter(a => a.status === 'Disponible').length} disponibles
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${agents.map(agent => _agentCard(agent)).join('')}
    </div>

    <!-- How it works -->
    ${UI.card(`<div class="p-6 mt-8">
        <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><i data-lucide="info" class="w-5 h-5 text-primary-500"></i>¿Cómo funcionan los Copilotos IA?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
                <div class="w-12 h-12 bg-primary-100 rounded-xl mx-auto mb-3 flex items-center justify-center"><i data-lucide="database" class="w-6 h-6 text-primary-600"></i></div>
                <h4 class="font-semibold text-slate-900 mb-1">1. Contexto del Cliente</h4>
                <p class="text-sm text-slate-500">Cada agente accede al brief, benchmark, historial y métricas del cliente para generar resultados personalizados.</p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-primary-100 rounded-xl mx-auto mb-3 flex items-center justify-center"><i data-lucide="cpu" class="w-6 h-6 text-primary-600"></i></div>
                <h4 class="font-semibold text-slate-900 mb-1">2. Procesamiento IA</h4>
                <p class="text-sm text-slate-500">Los agentes procesan la información con modelos de lenguaje avanzados para generar propuestas, copies, análisis y reportes.</p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-primary-100 rounded-xl mx-auto mb-3 flex items-center justify-center"><i data-lucide="check-circle" class="w-6 h-6 text-primary-600"></i></div>
                <h4 class="font-semibold text-slate-900 mb-1">3. Revisión Humana</h4>
                <p class="text-sm text-slate-500">Tú revisas, editas y apruebas. La IA genera borradores; tu equipo toma las decisiones finales.</p>
            </div>
        </div>
    </div>`)}`;
}

function _agentCard(agent) {
    const isRunning = agent.status === 'Ejecutando...';
    const statusColor = isRunning ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-green-600 bg-green-50 border-green-200';

    return `
    ${UI.card(`<div class="p-5 h-full flex flex-col">
        <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <i data-lucide="${agent.icon}" class="w-6 h-6 text-white"></i>
            </div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}">
                ${isRunning ? '<span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>' : '<span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>'}
                ${agent.status}
            </span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-1">${agent.name}</h3>
        <p class="text-sm text-slate-500 mb-4 flex-1">${agent.desc}</p>
        <div class="grid grid-cols-2 gap-3 mb-4 text-center">
            <div class="bg-slate-50 rounded-lg p-2">
                <div class="text-lg font-bold text-slate-900">${agent.execCount}</div>
                <div class="text-xs text-slate-400">Ejecuciones</div>
            </div>
            <div class="bg-slate-50 rounded-lg p-2">
                <div class="text-sm font-semibold text-slate-700">${agent.lastRun}</div>
                <div class="text-xs text-slate-400">Última ejecución</div>
            </div>
        </div>
        <div class="mb-4">
            <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Tareas Recientes</p>
            <ul class="space-y-1">
                ${(agent.tasks||[]).slice(0,3).map(t => `
                    <li class="text-xs text-slate-600 flex items-center gap-1.5">
                        <i data-lucide="check-circle" class="w-3 h-3 text-green-400"></i>${t}
                    </li>`).join('')}
            </ul>
        </div>
        ${UI.button(isRunning ? 'En ejecución...' : 'Usar Agente', { 
            variant: isRunning ? 'secondary' : 'primary', 
            icon: isRunning ? 'loader' : 'play', 
            cls:'w-full justify-center', 
            onclick: isRunning ? '' : `App.runAgent('${agent.id}')` 
        })}
    </div>`)}`;
}

App.runAgent = function(agentId) {
    const agent = Store.agents.find(a => a.id === agentId);
    if (!agent) return;

    const prevStatus = agent.status;
    agent.status = 'Ejecutando...';
    Store.save();
    App.render();

    UI.toast(`${agent.name} ejecutándose...`, 'info');

    setTimeout(() => {
        agent.status = 'Disponible';
        agent.lastRun = 'Hace un momento';
        agent.execCount++;
        Store.save();

        const results = {
            'research': 'Análisis de competencia actualizado. Se detectaron 3 nuevas tendencias relevantes para tus clientes.',
            'strategy': 'Propuesta de redistribución de presupuesto generada. Se estima un incremento del 15% en leads.',
            'content': 'Se generaron 5 guiones de contenido y 3 pautas visuales listas para revisión.',
            'copy': 'Se generaron 12 variantes de copy para campañas activas. Listas para revisión.',
            'community': 'Se clasificaron 8 mensajes y se generaron respuestas sugeridas para todos.',
            'reports': 'Reporte ejecutivo generado con insights de las últimas 4 semanas.'
        };

        UI.openModal(`${agent.name} - Resultado`, `
            <div class="space-y-4">
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                        <i data-lucide="check-circle" class="w-5 h-5 text-green-600"></i>
                        <span class="font-semibold text-green-800">Ejecución completada</span>
                    </div>
                    <p class="text-sm text-green-700">${results[agentId] || 'Tarea completada exitosamente.'}</p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                    <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Detalles</p>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <div><span class="text-slate-400">Agente:</span> <span class="font-medium">${agent.name}</span></div>
                        <div><span class="text-slate-400">Duración:</span> <span class="font-medium">~3 segundos</span></div>
                        <div><span class="text-slate-400">Ejecución #:</span> <span class="font-medium">${agent.execCount}</span></div>
                        <div><span class="text-slate-400">Estado:</span> <span class="text-green-600 font-medium">Completado</span></div>
                    </div>
                </div>
                <div class="flex justify-end">
                    ${UI.button('Cerrar', { variant:'primary', onclick:'UI.closeModal();App.render()' })}
                </div>
            </div>
        `);
    }, 3000);
};
