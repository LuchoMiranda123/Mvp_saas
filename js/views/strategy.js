/* ============================================
   Agency OS — Strategy & Planning View
   ============================================ */
function renderStrategy(client) {
    if (!client.strategy) {
        return `
        ${UI.pageHeader('Estrategia & Planificación', 'Plan estratégico de marketing y distribución de presupuesto.')}
        ${UI.emptyState('lightbulb', 'Sin estrategia configurada', 'Genera una propuesta estratégica con ayuda del agente IA Strategy.', UI.button('Generar Propuesta Estratégica IA', { variant:'primary', icon:'sparkles', onclick:`App.generateStrategy('${client.id}')` }))}`;
    }

    const s = client.strategy;
    const budgetTotal = (s.budget.meta||0)+(s.budget.google||0)+(s.budget.tiktok||0)+(s.budget.produccion||0);

    const pillarsHtml = s.pillars.map((p,i) => `
        <div class="flex items-start gap-3 p-4 bg-primary-50/60 border border-primary-100 rounded-lg">
            <div class="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center text-sm font-bold flex-none">${i+1}</div>
            <div><p class="font-semibold text-slate-900">${p}</p></div>
        </div>`).join('');

    const audiencesHtml = s.audiences.map(a => `
        <div class="p-4 border border-slate-200 rounded-lg">
            <h4 class="font-semibold text-slate-900 mb-1">${a.name}</h4>
            <p class="text-sm text-slate-600 mb-2">${a.desc}</p>
            <div class="flex flex-wrap gap-1">${a.channels.map(ch => `<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-600"><i data-lucide="${Utils.channelIcon(ch)}" class="w-3 h-3"></i>${ch}</span>`).join('')}</div>
        </div>`).join('');

    const campRows = s.campaigns.map(c => `
        <tr class="hover:bg-slate-50">
            <td class="px-4 py-3 text-sm font-medium text-slate-900">${c.name}</td>
            <td class="px-4 py-3 text-sm">${c.type}</td>
            <td class="px-4 py-3 text-sm"><span class="inline-flex items-center gap-1"><i data-lucide="${Utils.channelIcon(c.channel)}" class="w-3.5 h-3.5 text-slate-400"></i>${c.channel}</span></td>
            <td class="px-4 py-3 text-sm font-medium">${Utils.formatCurrency(c.budget)}/mes</td>
            <td class="px-4 py-3 text-sm">${UI.badge(c.status)}</td>
            <td class="px-4 py-3 text-sm font-medium">${c.leads}</td>
            <td class="px-4 py-3 text-sm">${c.cpa > 0 ? Utils.formatCurrency(c.cpa) : '—'}</td>
        </tr>`).join('');

    const calendarHtml = (s.calendarMacro||[]).map(m => `
        <div class="flex items-center gap-4 p-3 border border-slate-200 rounded-lg">
            <div class="w-16 text-center flex-none"><div class="text-xs text-slate-400 uppercase">Meta</div><div class="font-bold text-primary-600">${m.kpi}</div></div>
            <div class="flex-1"><h4 class="font-semibold text-slate-900 text-sm">${m.month}</h4><p class="text-sm text-slate-600">${m.focus}</p></div>
        </div>`).join('');

    return `
    ${UI.pageHeader('Estrategia & Planificación', 'Plan estratégico de marketing y distribución de presupuesto.', `
        <div class="flex gap-2 items-center">
            ${UI.badge(s.status)}
            ${UI.button('Exportar PDF', { variant:'secondary', icon:'download', onclick:`UI.toast('PDF de estrategia descargado (simulado)','info')` })}
            ${s.status !== 'Aprobada' ? UI.button('Marcar como Aprobada', { variant:'success', icon:'check', onclick:`App.approveStrategy('${client.id}')` }) : ''}
        </div>
    `)}

    <!-- Summary + Objective -->
    ${UI.card(`<div class="p-5">
        <h3 class="font-semibold text-slate-900 mb-2 flex items-center gap-2"><i data-lucide="target" class="w-5 h-5 text-primary-500"></i>Resumen Estratégico</h3>
        <p class="text-sm text-slate-600 leading-relaxed mb-4">${s.summary}</p>
        <div class="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p class="text-xs text-primary-600 font-semibold uppercase">Objetivo Principal</p>
            <p class="text-sm font-semibold text-primary-800 mt-1">${s.objective}</p>
        </div>
        <div class="mt-3 bg-slate-50 rounded-lg p-4">
            <p class="text-xs text-slate-500 font-semibold uppercase">Posicionamiento</p>
            <p class="text-sm text-slate-800 mt-1 italic">"${s.positioning}"</p>
        </div>
    </div>`)}

    <!-- Pillars + Audiences -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
            <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Pilares de Contenido</h3>
            <div class="space-y-3">${pillarsHtml}</div>
        </div>
        <div>
            <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Audiencias</h3>
            <div class="space-y-3">${audiencesHtml}</div>
        </div>
    </div>

    <!-- Campaigns Table -->
    <div class="mt-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Campañas</h3>
        ${s.campaigns.length > 0 ? UI.table(['Campaña','Tipo','Canal','Budget','Estado','Leads','CPA'], campRows) : UI.emptyState('target','Sin campañas activas','Las campañas se configurarán cuando la estrategia sea aprobada.','')}
    </div>

    <!-- Budget Calculator -->
    <div class="mt-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Distribución de Presupuesto</h3>
        ${UI.card(`<div class="p-5">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${_budgetSlider('Meta Ads', 'meta', s.budget.meta||0, client.id)}
                ${_budgetSlider('Google Ads', 'google', s.budget.google||0, client.id)}
                ${_budgetSlider('TikTok Ads', 'tiktok', s.budget.tiktok||0, client.id)}
                ${_budgetSlider('Producción', 'produccion', s.budget.produccion||0, client.id)}
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-slate-200">
                <div class="text-sm text-slate-500">Total mensual</div>
                <div class="text-2xl font-bold text-slate-900" id="budget-total">${Utils.formatCurrency(budgetTotal)}</div>
            </div>
            <div class="mt-4 bg-slate-50 rounded-lg p-4">
                <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Resultados Estimados (mensual)</p>
                <div class="grid grid-cols-3 gap-4 text-center" id="budget-estimates">
                    <div><div class="text-lg font-bold text-slate-900" id="est-leads">${Math.round(budgetTotal * 0.12)}</div><div class="text-xs text-slate-500">Leads estimados</div></div>
                    <div><div class="text-lg font-bold text-slate-900" id="est-reach">${Utils.formatNumber(budgetTotal * 35)}</div><div class="text-xs text-slate-500">Alcance estimado</div></div>
                    <div><div class="text-lg font-bold text-slate-900" id="est-cpl">${Utils.formatCurrency(budgetTotal > 0 ? budgetTotal / (budgetTotal * 0.12) : 0)}</div><div class="text-xs text-slate-500">CPL estimado</div></div>
                </div>
            </div>
        </div>`)}
    </div>

    <!-- Calendar Macro -->
    <div class="mt-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Calendario Macro</h3>
        <div class="space-y-3">${calendarHtml}</div>
    </div>

    <!-- Risks & Next Steps -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-red-800 mb-3 flex items-center gap-2"><i data-lucide="alert-triangle" class="w-5 h-5"></i>Riesgos Identificados</h3><ul class="space-y-2">${(s.risks||[]).map(r => `<li class="text-sm text-slate-700 flex items-start gap-2"><i data-lucide="alert-circle" class="w-4 h-4 text-red-400 mt-0.5 flex-none"></i>${r}</li>`).join('')}</ul></div>`)}
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-primary-800 mb-3 flex items-center gap-2"><i data-lucide="arrow-right-circle" class="w-5 h-5"></i>Próximos Pasos</h3><ul class="space-y-2">${(s.nextSteps||[]).map(n => `<li class="text-sm text-slate-700 flex items-start gap-2"><i data-lucide="circle-dot" class="w-4 h-4 text-primary-400 mt-0.5 flex-none"></i>${n}</li>`).join('')}</ul></div>`)}
    </div>`;
}

function _budgetSlider(label, key, value, clientId) {
    return `
    <div>
        <div class="flex justify-between mb-1"><label class="text-sm font-medium text-slate-700">${label}</label><span class="text-sm font-bold text-slate-900" id="bud-${key}">${Utils.formatCurrency(value)}</span></div>
        <input type="range" min="0" max="3000" step="50" value="${value}" class="range-input w-full" oninput="App.updateBudget('${clientId}','${key}',this.value)">
    </div>`;
}

App.updateBudget = function(clientId, key, val) {
    val = parseInt(val);
    const client = Store.getClient(clientId);
    if (!client || !client.strategy) return;
    client.strategy.budget[key] = val;
    document.getElementById('bud-' + key).textContent = Utils.formatCurrency(val);
    const b = client.strategy.budget;
    const total = (b.meta||0) + (b.google||0) + (b.tiktok||0) + (b.produccion||0);
    const totalEl = document.getElementById('budget-total');
    if (totalEl) totalEl.textContent = Utils.formatCurrency(total);
    const leads = Math.round(total * 0.12);
    const leadsEl = document.getElementById('est-leads');
    if (leadsEl) leadsEl.textContent = leads;
    const reachEl = document.getElementById('est-reach');
    if (reachEl) reachEl.textContent = Utils.formatNumber(total * 35);
    const cplEl = document.getElementById('est-cpl');
    if (cplEl) cplEl.textContent = leads > 0 ? Utils.formatCurrency(total / leads) : '$0.00';
    Store.save();
};

App.approveStrategy = function(clientId) {
    Store.updateClient(clientId, 'strategy.status', 'Aprobada');
    UI.toast('Estrategia marcada como aprobada');
    App.render();
};

App.generateStrategy = function(clientId) {
    UI.toast('Generando propuesta estratégica IA...', 'info');
    setTimeout(() => {
        Store.updateClient(clientId, 'strategy', {
            status:'En revisión', lastUpdate:'2026-04-14',
            summary:'Propuesta estratégica generada automáticamente por el agente IA Strategy basada en el brief y benchmark del cliente.',
            objective:'Definir con el cliente en próxima reunión.',
            positioning:'Por definir.',
            pillars:['Educación del mercado','Autoridad de marca','Casos de éxito','Comunidad'],
            audiences:[{name:'Audiencia principal',desc:'Por definir según brief.',channels:['Instagram','Google']}],
            campaigns:[], budget:{meta:0,google:0,tiktok:0,produccion:0},
            calendarMacro:[{month:'Mes 1',focus:'Lanzamiento de presencia digital',kpi:'Por definir'}],
            risks:['Sin riesgos identificados aún'], nextSteps:['Revisar y ajustar con el equipo','Presentar al cliente para aprobación']
        });
        UI.toast('Propuesta estratégica generada');
        App.render();
    }, 2000);
};
