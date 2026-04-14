/* ============================================
   Agency OS — Onboarding View
   ============================================ */
function renderOnboarding(client) {
    const ob = client.onboarding;
    const d = ob.data;

    function saveField(field) {
        return `onchange="Store.updateClient('${client.id}','onboarding.data.${field}',this.value); UI.toast('Guardado')"`;
    }

    function toggleStep(stepId) {
        return `onclick="App.toggleOnboardingStep('${client.id}',${stepId})"`;
    }

    const stepsHtml = ob.steps.map(s => `
        <li class="flex items-start gap-3 py-2">
            <input type="checkbox" ${s.done ? 'checked' : ''} ${toggleStep(s.id)} class="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer">
            <div>
                <span class="text-sm font-medium ${s.done ? 'text-slate-400 line-through' : 'text-slate-900'}">${s.title}</span>
                ${s.desc ? `<p class="text-xs text-slate-400 mt-0.5">${s.desc}</p>` : ''}
            </div>
        </li>
    `).join('');

    return `
    ${UI.pageHeader('Onboarding', 'Recopilación de información inicial — Mes 0', UI.button('Guardar Todo', { variant:'primary', icon:'save', onclick:"UI.toast('Datos guardados correctamente')" }))}

    <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex-1 space-y-6">
            ${UI.card(`
                <div class="p-5 border-b border-slate-100"><h3 class="font-semibold text-lg">1. Datos Básicos de la Empresa</h3></div>
                <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">Razón Social</label><input type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" value="${Utils.escapeHtml(d.razonSocial)}" ${saveField('razonSocial')}></div>
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">RUC</label><input type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" value="${Utils.escapeHtml(d.ruc)}" ${saveField('ruc')}></div>
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">Dirección</label><input type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" value="${Utils.escapeHtml(d.direccion)}" ${saveField('direccion')}></div>
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">Sitio Web</label><input type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" value="${Utils.escapeHtml(d.web)}" ${saveField('web')}></div>
                </div>
            `)}

            ${UI.card(`
                <div class="p-5 border-b border-slate-100"><h3 class="font-semibold text-lg">2. Canales y Redes Sociales</h3></div>
                <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex items-center gap-3 p-3 border rounded-lg bg-slate-50"><i data-lucide="instagram" class="w-5 h-5 text-pink-600 flex-none"></i><input type="text" class="flex-1 bg-transparent text-sm border-none focus:ring-0 p-0" value="${Utils.escapeHtml(d.instagram)}" placeholder="@usuario" ${saveField('instagram')}></div>
                    <div class="flex items-center gap-3 p-3 border rounded-lg bg-slate-50"><i data-lucide="facebook" class="w-5 h-5 text-blue-600 flex-none"></i><input type="text" class="flex-1 bg-transparent text-sm border-none focus:ring-0 p-0" value="${Utils.escapeHtml(d.facebook)}" placeholder="Página" ${saveField('facebook')}></div>
                    <div class="flex items-center gap-3 p-3 border rounded-lg bg-slate-50"><i data-lucide="music" class="w-5 h-5 text-black flex-none"></i><input type="text" class="flex-1 bg-transparent text-sm border-none focus:ring-0 p-0" value="${Utils.escapeHtml(d.tiktok)}" placeholder="@usuario" ${saveField('tiktok')}></div>
                    <div class="flex items-center gap-3 p-3 border rounded-lg bg-slate-50"><i data-lucide="linkedin" class="w-5 h-5 text-blue-700 flex-none"></i><input type="text" class="flex-1 bg-transparent text-sm border-none focus:ring-0 p-0" value="${Utils.escapeHtml(d.linkedin)}" placeholder="Página" ${saveField('linkedin')}></div>
                    <div class="flex items-center gap-3 p-3 border rounded-lg bg-slate-50"><i data-lucide="youtube" class="w-5 h-5 text-red-600 flex-none"></i><input type="text" class="flex-1 bg-transparent text-sm border-none focus:ring-0 p-0" value="${Utils.escapeHtml(d.youtube)}" placeholder="Canal" ${saveField('youtube')}></div>
                </div>
            `)}

            ${UI.card(`
                <div class="p-5 border-b border-slate-100"><h3 class="font-semibold text-lg">3. Objetivos y Marca</h3></div>
                <div class="p-5 space-y-4">
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">Objetivos principales</label><textarea class="w-full border border-slate-300 rounded-lg p-2.5 text-sm min-h-[80px]" ${saveField('objetivos')}>${Utils.escapeHtml(d.objetivos)}</textarea></div>
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">Propuesta de valor</label><textarea class="w-full border border-slate-300 rounded-lg p-2.5 text-sm min-h-[80px]" ${saveField('propuestaValor')}>${Utils.escapeHtml(d.propuestaValor)}</textarea></div>
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">Tono de marca</label><input type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" value="${Utils.escapeHtml(d.tono)}" ${saveField('tono')}></div>
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">Buyer Persona</label><textarea class="w-full border border-slate-300 rounded-lg p-2.5 text-sm min-h-[80px]" ${saveField('buyerPersona')}>${Utils.escapeHtml(d.buyerPersona)}</textarea></div>
                    <div><label class="block text-sm font-medium text-slate-700 mb-1">Competidores declarados <span class="text-slate-400 font-normal">(opcional)</span></label><input type="text" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm" value="${Utils.escapeHtml(d.competidores)}" ${saveField('competidores')}></div>
                </div>
            `)}
        </div>

        <div class="w-full lg:w-72 flex-none">
            ${UI.card(`
                <div class="p-5 sticky top-4">
                    <h3 class="font-semibold text-slate-900 mb-3">Progreso de Onboarding</h3>
                    ${UI.progressBar(ob.complete)}
                    <div class="text-right text-xs text-slate-500 mt-1 mb-4">${ob.complete}% completado</div>
                    <ul class="space-y-1">${stepsHtml}</ul>
                </div>
            `)}
        </div>
    </div>`;
}

App.toggleOnboardingStep = function(clientId, stepId) {
    const client = Store.getClient(clientId);
    const step = client.onboarding.steps.find(s => s.id === stepId);
    if (step) {
        step.done = !step.done;
        client.onboarding.complete = Math.round(client.onboarding.steps.filter(s => s.done).length / client.onboarding.steps.length * 100);
        Store.save();
        App.render();
    }
};
