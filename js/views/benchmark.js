/* ============================================
   Agency OS — Benchmark View
   ============================================ */
function renderBenchmark(client) {
    if (!client.benchmark) {
        return `
        ${UI.pageHeader('Benchmark & Research', 'Análisis de competencia procesado por IA.')}
        ${UI.emptyState('microscope', 'Sin análisis de benchmark', 'Deja que el agente IA Research analice la competencia y genere un estudio completo.', UI.button('Generar Estudio de Mercado IA', { variant:'primary', icon:'play', onclick:`App.generateBenchmark('${client.id}')` }))}`;
    }

    const bm = client.benchmark;
    const compCards = bm.competitors.map(c => `
        ${UI.card(`
            <div class="p-5">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-600">${c.logo}</div>
                    <div>
                        <h4 class="font-bold text-slate-900">${c.name}</h4>
                        <p class="text-xs text-slate-500">${c.web}</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center mb-4">
                    <div class="bg-slate-50 rounded p-2"><div class="text-xs text-slate-400">IG</div><div class="font-bold text-sm">${Utils.formatNumber(c.instagram)}</div></div>
                    <div class="bg-slate-50 rounded p-2"><div class="text-xs text-slate-400">TikTok</div><div class="font-bold text-sm">${Utils.formatNumber(c.tiktok)}</div></div>
                    <div class="bg-slate-50 rounded p-2"><div class="text-xs text-slate-400">FB</div><div class="font-bold text-sm">${Utils.formatNumber(c.facebook)}</div></div>
                </div>
                <div class="space-y-2">
                    <div><p class="text-xs font-semibold text-green-700 uppercase">Fortalezas</p><ul class="text-xs text-slate-600 mt-1 space-y-0.5">${c.strengths.map(s => `<li class="flex items-start gap-1"><i data-lucide="plus" class="w-3 h-3 text-green-500 mt-0.5 flex-none"></i>${s}</li>`).join('')}</ul></div>
                    <div><p class="text-xs font-semibold text-red-700 uppercase">Debilidades</p><ul class="text-xs text-slate-600 mt-1 space-y-0.5">${c.weaknesses.map(s => `<li class="flex items-start gap-1"><i data-lucide="minus" class="w-3 h-3 text-red-500 mt-0.5 flex-none"></i>${s}</li>`).join('')}</ul></div>
                </div>
                <div class="mt-3 pt-3 border-t">
                    <p class="text-xs text-slate-500"><span class="font-semibold">Tono:</span> ${c.tone}</p>
                    <p class="text-xs text-slate-500"><span class="font-semibold">Pricing:</span> ${c.pricing}</p>
                </div>
            </div>
        `)}
    `).join('');

    const matrixHeaders = ['Factor', client.name, ...bm.competitors.map(c => c.name)];
    const matrixRows = bm.matrix.map(row => {
        const vals = [row.pg, row.comp1, row.comp2, row.comp3].filter(v => v !== undefined && v > 0);
        return `<tr class="hover:bg-slate-50">
            <td class="px-4 py-2.5 text-sm font-medium text-slate-900">${row.factor}</td>
            ${vals.map((v, i) => `<td class="px-4 py-2.5 text-sm text-center"><div class="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${v >= 4 ? 'bg-green-100 text-green-800' : v >= 3 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}">${v}</div></td>`).join('')}
        </tr>`;
    });

    const insightsHtml = bm.insights.map(ins => {
        const icon = ins.type === 'oportunidad' ? 'lightbulb' : ins.type === 'amenaza' ? 'alert-triangle' : 'info';
        const color = ins.type === 'oportunidad' ? 'text-green-600 bg-green-50 border-green-200' : ins.type === 'amenaza' ? 'text-red-600 bg-red-50 border-red-200' : 'text-blue-600 bg-blue-50 border-blue-200';
        return `<div class="flex items-start gap-3 p-3 rounded-lg border ${color}"><i data-lucide="${icon}" class="w-4 h-4 mt-0.5 flex-none"></i><p class="text-sm">${ins.text}</p></div>`;
    }).join('');

    return `
    ${UI.pageHeader('Benchmark & Research', 'Análisis de competencia procesado por IA.', `
        <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400">Última actualización: ${Utils.formatDate(bm.lastUpdate)}</span>
            ${UI.button('Actualizar Análisis', { variant:'secondary', icon:'refresh-cw', onclick:`UI.toast('Análisis actualizado (simulado)','info')` })}
        </div>
    `)}

    ${UI.card(`<div class="p-5"><h3 class="font-semibold text-slate-900 mb-2 flex items-center gap-2"><i data-lucide="globe" class="w-5 h-5 text-primary-500"></i>Overview del Mercado</h3><p class="text-sm text-slate-600 leading-relaxed">${bm.overview}</p></div>`)}

    <div class="mt-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Competidores Analizados</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${compCards}</div>
    </div>

    <div class="mt-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Matriz Comparativa</h3>
        ${UI.table(matrixHeaders, matrixRows)}
    </div>

    <div class="mt-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Hallazgos Clave & Insights</h3>
        <div class="space-y-3">${insightsHtml}</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-green-800 mb-3 flex items-center gap-2"><i data-lucide="trending-up" class="w-5 h-5"></i>Oportunidades</h3><ul class="space-y-2">${(bm.opportunities||[]).map(o => `<li class="text-sm text-slate-700 flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 flex-none"></i>${o}</li>`).join('')}</ul></div>`)}
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-red-800 mb-3 flex items-center gap-2"><i data-lucide="alert-triangle" class="w-5 h-5"></i>Amenazas</h3><ul class="space-y-2">${(bm.threats||[]).map(o => `<li class="text-sm text-slate-700 flex items-start gap-2"><i data-lucide="x" class="w-4 h-4 text-red-500 mt-0.5 flex-none"></i>${o}</li>`).join('')}</ul></div>`)}
    </div>`;
}

App.generateBenchmark = function(clientId) {
    UI.toast('Generando estudio de mercado IA...', 'info');
    setTimeout(() => {
        Store.updateClient(clientId, 'benchmark', {
            status:'Completado', lastUpdate:'2026-04-14', overview:'Análisis generado por IA. El mercado presenta oportunidades claras en contenido digital.',
            competitors:[{ name:'Competidor 1', logo:'C1', web:'comp1.com', instagram:5000, tiktok:2000, facebook:3000, strengths:['Marca conocida'], weaknesses:['Poca innovación'], content:'Contenido estándar.', tone:'Corporativo', pricing:'Precio medio' }],
            matrix:[{factor:'Presencia Digital',pg:3,comp1:3,comp2:0,comp3:0}], insights:[{type:'oportunidad',text:'Oportunidad detectada por IA en el segmento digital.'}], opportunities:['Mejorar presencia digital'], threats:['Competencia creciente']
        });
        UI.toast('Estudio de mercado generado'); App.render();
    }, 2000);
};
