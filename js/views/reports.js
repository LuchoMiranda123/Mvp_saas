/* ============================================
   Agency OS — Reports View (Chart.js)
   ============================================ */
let _reportPeriod = 'current';

function renderReports(client) {
    const r = client.reports && client.reports.current;
    if (!r) {
        return `${UI.pageHeader('Reportes', 'Informes ejecutivos con métricas clave.')}
        ${UI.emptyState('bar-chart-2','Sin reportes disponibles','Los reportes se generan con datos de campañas activas.',
            UI.button('Generar Reporte IA', { variant:'primary', icon:'sparkles', onclick:`UI.toast('Generando reporte...','info')` }))}`;
    }

    const k = r.kpis;
    const vs = r.vs_anterior;

    return `
    ${UI.pageHeader('Reportes', `Período: ${r.period}`, `
        <div class="flex items-center gap-2">
            ${UI.button('Exportar PDF', { variant:'secondary', icon:'download', onclick:`UI.toast('Reporte exportado (simulado)','info')` })}
            ${UI.button('Presentar al Cliente', { variant:'secondary', icon:'presentation', onclick:`UI.toast('Modo presentación activado (simulado)','info')` })}
            ${UI.button('Generar Insights IA', { variant:'primary', icon:'sparkles', onclick:`App.generateReportInsights('${client.id}')` })}
        </div>
    `)}

    <!-- KPIs Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        ${UI.kpiCard('Alcance Total', k.alcance, vs.alcance, 'eye')}
        ${UI.kpiCard('Interacciones', k.interacciones, vs.interacciones, 'heart')}
        ${UI.kpiCard('Leads Generados', k.leads, vs.leads, 'user-plus')}
        ${UI.kpiCard('CPL Promedio', k.cpl > 0 ? '$' + k.cpl.toFixed(2) : '—', vs.cpl ? -vs.cpl : undefined, 'dollar-sign')}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        ${UI.kpiCard('Seguidores', k.seguidores, vs.seguidores, 'users')}
        ${UI.kpiCard('Publicaciones', k.publicaciones, vs.publicaciones, 'image')}
        ${UI.kpiCard('Engagement Rate', k.engagement + '%', vs.engagement, 'trending-up')}
        ${UI.kpiCard('Clicks', k.clicks, vs.clicks, 'mouse-pointer')}
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-slate-900 mb-4">Crecimiento de Seguidores</h3><canvas id="chart-followers" height="200"></canvas></div>`)}
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-slate-900 mb-4">Alcance Mensual</h3><canvas id="chart-reach" height="200"></canvas></div>`)}
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-slate-900 mb-4">Leads Generados</h3><canvas id="chart-leads" height="200"></canvas></div>`)}
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-slate-900 mb-4">Distribución por Canal</h3><canvas id="chart-channels" height="200"></canvas></div>`)}
    </div>

    <!-- Top & Worst Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
            <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Top Content</h3>
            ${r.topContent.length > 0 ? UI.table(['Contenido','Views','Eng.','Leads'],
                r.topContent.map(c => `<tr class="hover:bg-slate-50">
                    <td class="px-4 py-2.5 text-sm font-medium text-slate-900 max-w-[200px] truncate">${c.title}</td>
                    <td class="px-4 py-2.5 text-sm">${Utils.formatNumber(c.views)}</td>
                    <td class="px-4 py-2.5 text-sm"><span class="text-green-600 font-medium">${c.engagement}%</span></td>
                    <td class="px-4 py-2.5 text-sm font-medium">${c.leads}</td>
                </tr>`).join('')
            ) : '<p class="text-sm text-slate-400">Sin datos</p>'}
        </div>
        <div>
            <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Peor Rendimiento</h3>
            ${r.worstContent.length > 0 ? UI.table(['Contenido','Views','Eng.','Leads'],
                r.worstContent.map(c => `<tr class="hover:bg-slate-50">
                    <td class="px-4 py-2.5 text-sm font-medium text-slate-900 max-w-[200px] truncate">${c.title}</td>
                    <td class="px-4 py-2.5 text-sm">${Utils.formatNumber(c.views)}</td>
                    <td class="px-4 py-2.5 text-sm"><span class="text-red-600 font-medium">${c.engagement}%</span></td>
                    <td class="px-4 py-2.5 text-sm font-medium">${c.leads}</td>
                </tr>`).join('')
            ) : '<p class="text-sm text-slate-400">Sin datos</p>'}
        </div>
    </div>

    <!-- Insights & Recommendations -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-slate-900 mb-3 flex items-center gap-2"><i data-lucide="lightbulb" class="w-5 h-5 text-amber-500"></i>Insights</h3><ul class="space-y-2">${(r.insights||[]).map(i => `<li class="text-sm text-slate-700 flex items-start gap-2"><i data-lucide="zap" class="w-4 h-4 text-amber-400 mt-0.5 flex-none"></i>${i}</li>`).join('')}</ul></div>`)}
        ${UI.card(`<div class="p-5"><h3 class="font-semibold text-slate-900 mb-3 flex items-center gap-2"><i data-lucide="clipboard-list" class="w-5 h-5 text-primary-500"></i>Recomendaciones</h3><ul class="space-y-2">${(r.recommendations||[]).map(i => `<li class="text-sm text-slate-700 flex items-start gap-2"><i data-lucide="arrow-right" class="w-4 h-4 text-primary-400 mt-0.5 flex-none"></i>${i}</li>`).join('')}</ul></div>`)}
    </div>`;
}

/* Post-render: initialize Chart.js charts */
function initReportCharts(client) {
    const r = client.reports && client.reports.current;
    if (!r || !r.chartData) return;
    const cd = r.chartData;

    const commonOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } }
        }
    };

    const ctxF = document.getElementById('chart-followers');
    if (ctxF) new Chart(ctxF, {
        type: 'line',
        data: { labels: cd.labels, datasets: [{ label:'Seguidores', data: cd.seguidores, borderColor:'#6366f1', backgroundColor:'rgba(99,102,241,0.1)', fill:true, tension:0.4, pointBackgroundColor:'#6366f1' }] },
        options: commonOpts
    });

    const ctxR = document.getElementById('chart-reach');
    if (ctxR) new Chart(ctxR, {
        type: 'bar',
        data: { labels: cd.labels, datasets: [{ label:'Alcance', data: cd.alcance, backgroundColor:'rgba(99,102,241,0.6)', borderRadius:6 }] },
        options: commonOpts
    });

    const ctxL = document.getElementById('chart-leads');
    if (ctxL) new Chart(ctxL, {
        type: 'line',
        data: { labels: cd.labels, datasets: [{ label:'Leads', data: cd.leads, borderColor:'#10b981', backgroundColor:'rgba(16,185,129,0.1)', fill:true, tension:0.4, pointBackgroundColor:'#10b981' }] },
        options: commonOpts
    });

    const ctxC = document.getElementById('chart-channels');
    if (ctxC) {
        const b = client.strategy && client.strategy.budget ? client.strategy.budget : { meta:40, google:30, tiktok:15, produccion:15 };
        new Chart(ctxC, {
            type: 'doughnut',
            data: {
                labels: ['Meta Ads','Google Ads','TikTok Ads','Producción'],
                datasets: [{ data: [b.meta||0, b.google||0, b.tiktok||0, b.produccion||0], backgroundColor:['#6366f1','#f59e0b','#000000','#10b981'], borderWidth:0 }]
            },
            options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ padding:16, usePointStyle:true, font:{size:11} } } } }
        });
    }
}

App.generateReportInsights = function(clientId) {
    UI.toast('Generando insights con IA...', 'info');
    setTimeout(() => {
        const client = Store.getClient(clientId);
        if (client && client.reports && client.reports.current) {
            client.reports.current.insights.push('🤖 IA: Se detecta oportunidad de optimización en horario de publicación. El engagement es 25% mayor entre 7-9pm.');
            client.reports.current.recommendations.push('🤖 IA: Considerar redistribuir 20% del presupuesto de TikTok hacia Meta Ads para mejorar CPA.');
            Store.save();
        }
        UI.toast('Nuevos insights generados');
        App.render();
    }, 1500);
};
