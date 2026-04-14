/* ============================================
   Agency OS — Brief View
   ============================================ */
function renderBrief(client) {
    const b = client.brief;
    function sf(field) { return `onchange="Store.updateClient('${client.id}','brief.${field}',this.value); UI.toast('Brief guardado')"` }

    const sections = [
        { key:'negocio', label:'1. Negocio y Contexto', ph:'¿Qué hace la empresa y en qué contexto opera?' },
        { key:'propuestaValor', label:'2. Propuesta de Valor', ph:'¿Cuál es el diferencial principal de la marca?' },
        { key:'servicios', label:'3. Servicios / Productos Principales', ph:'Listar los servicios o productos clave...' },
        { key:'publicoObjetivo', label:'4. Público Objetivo (Buyer Persona)', ph:'Describir los segmentos de audiencia...' },
        { key:'diferenciadores', label:'5. Diferenciadores Competitivos', ph:'¿Qué los hace únicos frente a la competencia?' },
        { key:'competencia', label:'6. Competencia Directa', ph:'Principales competidores y sus características...' },
        { key:'objetivosComerciales', label:'7. Objetivos Comerciales', ph:'Metas de ventas, facturación, crecimiento...' },
        { key:'objetivosMarketing', label:'8. Objetivos de Marketing', ph:'Leads, seguidores, engagement, awareness...' },
        { key:'tono', label:'9. Tono y Estilo de Comunicación', ph:'¿Cómo debe sonar la marca?' },
        { key:'restricciones', label:'10. Restricciones y Lineamientos', ph:'¿Qué NO se puede hacer o decir?' },
        { key:'insights', label:'11. Insights del Cliente', ph:'Información valiosa que el cliente ha compartido...' },
        { key:'dolores', label:'12. Dolores Frecuentes del Público', ph:'¿Qué problemas tiene el público que la marca resuelve?' },
        { key:'mensajePrincipal', label:'13. Mensaje Principal', ph:'La idea central que resume la comunicación...' },
        { key:'ctaPrincipal', label:'14. CTA Principal', ph:'La acción que queremos que tome el público...' }
    ];

    const filledCount = sections.filter(s => b[s.key] && b[s.key].trim()).length;

    const summaryHtml = sections.filter(s => b[s.key]).map(s => `
        <div class="mb-3">
            <h4 class="text-xs font-semibold text-primary-700 uppercase tracking-wide">${s.label}</h4>
            <p class="text-sm text-slate-700 mt-0.5">${Utils.truncate(b[s.key], 120)}</p>
        </div>
    `).join('');

    return `
    ${UI.pageHeader('Brief de Marca', 'Documento base para IA y equipo creativo.', `
        <div class="flex items-center gap-2">
            ${UI.badge(b.status)}
            <span class="text-xs text-slate-400">Última actualización: ${Utils.formatDate(b.lastUpdate)}</span>
        </div>
        <div class="flex gap-2">
            ${UI.button('Generar Resumen IA', { variant:'secondary', icon:'sparkles', onclick:`App.generateBriefSummary('${client.id}')` })}
            ${UI.button('Exportar PDF', { variant:'secondary', icon:'download', onclick:"UI.toast('PDF exportado (simulado)','info')" })}
        </div>
    `)}

    <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex-1">
            ${UI.card(`
                <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <h3 class="font-semibold">Brief Completo</h3>
                        <span class="text-xs text-slate-400">${filledCount}/${sections.length} secciones</span>
                    </div>
                    <div class="w-32">${UI.progressBar(b.complete, 'sm')}</div>
                </div>
                <div class="p-5 space-y-6">
                    ${sections.map(s => `
                        <div>
                            <label class="block text-sm font-semibold text-brand mb-1.5">${s.label}</label>
                            <textarea class="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[80px] resize-y" placeholder="${s.ph}" ${sf(s.key)}>${Utils.escapeHtml(b[s.key] || '')}</textarea>
                        </div>
                    `).join('')}
                    <div class="flex justify-between items-center pt-4 border-t border-slate-200">
                        ${UI.button('Guardar Brief', { variant:'primary', icon:'save', onclick:`UI.toast('Brief guardado correctamente')` })}
                        ${UI.button('Marcar como Aprobado', { variant:'success', icon:'check', onclick:`App.approveBrief('${client.id}')` })}
                    </div>
                </div>
            `)}
        </div>

        <div class="w-full lg:w-80 flex-none">
            ${UI.card(`
                <div class="p-5 bg-primary-50 border-b border-primary-100 rounded-t-xl">
                    <h3 class="font-semibold text-primary-900 flex items-center gap-2"><i data-lucide="sparkles" class="w-5 h-5 text-primary-600"></i> Resumen IA del Brief</h3>
                </div>
                <div id="brief-summary" class="p-5 text-sm text-slate-700 space-y-3">
                    ${summaryHtml || '<p class="text-slate-400 italic">Completa el brief para generar un resumen automático.</p>'}
                </div>
            `, 'sticky top-4')}
        </div>
    </div>`;
}

App.approveBrief = function(clientId) {
    Store.updateClient(clientId, 'brief.status', 'Aprobado');
    Store.updateClient(clientId, 'brief.lastUpdate', '2026-04-14');
    UI.toast('Brief marcado como aprobado');
    App.render();
};

App.generateBriefSummary = function(clientId) {
    UI.toast('Generando resumen IA...', 'info');
    setTimeout(() => { UI.toast('Resumen generado exitosamente'); App.render(); }, 1500);
};
