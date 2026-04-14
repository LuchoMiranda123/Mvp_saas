/* ============================================
   Agency OS — Files / Drive View
   ============================================ */
let _filesView = 'grid';
let _filesFilter = '';

function renderFiles(client) {
    const f = client.files;
    const allFiles = f.folders.flatMap(folder => folder.files.map(file => ({ ...file, folder: folder.name })));
    const filtered = _filesFilter ? allFiles.filter(file => file.name.toLowerCase().includes(_filesFilter.toLowerCase()) || file.type.includes(_filesFilter.toLowerCase())) : null;

    const folderHtml = f.folders.map(folder => `
        <div class="mb-6">
            <div class="flex items-center gap-2 mb-3">
                <i data-lucide="${folder.icon || 'folder'}" class="w-5 h-5 text-primary-500"></i>
                <h3 class="font-semibold text-slate-900">${folder.name}</h3>
                <span class="text-xs text-slate-400">${folder.files.length} archivos</span>
            </div>
            ${_filesView === 'grid' ? `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${folder.files.map(file => renderFileCard(file, client.id)).join('')}
                </div>
            ` : `
                ${UI.table(['Nombre','Tipo','Tamaño','Fecha','Estado'], folder.files.map(file => `
                    <tr class="hover:bg-slate-50 cursor-pointer" onclick="App.showFileDetail('${client.id}','${file.id}')">
                        <td class="px-4 py-3 text-sm"><div class="flex items-center gap-2"><i data-lucide="${Utils.fileIcon(file.type)}" class="w-4 h-4 text-slate-400"></i>${file.name}</div></td>
                        <td class="px-4 py-3 text-sm text-slate-500">${file.type}</td>
                        <td class="px-4 py-3 text-sm text-slate-500">${file.size}</td>
                        <td class="px-4 py-3 text-sm text-slate-500">${Utils.formatDateShort(file.date)}</td>
                        <td class="px-4 py-3">${UI.badge(file.status)}</td>
                    </tr>
                `))}
            `}
        </div>
    `).join('');

    const searchResults = filtered ? `
        <div class="mb-6">
            <h3 class="font-semibold text-slate-900 mb-3">Resultados de búsqueda (${filtered.length})</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                ${filtered.map(file => renderFileCard(file, client.id)).join('')}
            </div>
        </div>
    ` : '';

    return `
    ${UI.pageHeader('Archivos & Drive', 'Asset hub — Gestión centralizada de archivos del cliente.', `
        <div class="flex items-center gap-2">
            <div class="flex bg-white border border-slate-200 rounded-lg p-0.5">
                <button onclick="_filesView='grid'; App.render()" class="px-3 py-1.5 text-xs font-medium rounded ${_filesView==='grid'?'bg-slate-100 text-slate-900 shadow-sm':'text-slate-500'}"><i data-lucide="grid-3x3" class="w-3.5 h-3.5"></i></button>
                <button onclick="_filesView='list'; App.render()" class="px-3 py-1.5 text-xs font-medium rounded ${_filesView==='list'?'bg-slate-100 text-slate-900 shadow-sm':'text-slate-500'}"><i data-lucide="list" class="w-3.5 h-3.5"></i></button>
            </div>
            ${UI.button('Subir Archivo', { variant:'primary', icon:'upload', onclick:`UI.toast('Archivo subido (simulado)','info')` })}
        </div>
    `)}

    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div class="flex-1 max-w-md">${UI.searchInput('Buscar archivos...', "_filesFilter=this.value; App.render()")}</div>
        <div class="flex items-center gap-3">
            <span class="flex items-center gap-2 text-sm ${f.driveConnected ? 'text-green-600' : 'text-slate-400'}">
                <i data-lucide="hard-drive" class="w-4 h-4"></i>
                Google Drive: <span class="font-semibold">${f.driveConnected ? 'Conectado' : 'No conectado'}</span>
            </span>
            ${!f.driveConnected ? UI.button('Conectar Drive', { variant:'secondary', icon:'link', onclick:`App.connectDrive('${client.id}')` }) : ''}
        </div>
    </div>

    ${searchResults || folderHtml || UI.emptyState('folder', 'Sin archivos', 'Sube archivos o conecta Google Drive para comenzar.')}`;
}

function renderFileCard(file, clientId) {
    const iconBg = { image:'bg-pink-50 text-pink-600', video:'bg-purple-50 text-purple-600', pdf:'bg-red-50 text-red-600', document:'bg-blue-50 text-blue-600', spreadsheet:'bg-green-50 text-green-600', design:'bg-amber-50 text-amber-600', archive:'bg-slate-100 text-slate-600' };
    return `
    <div class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-primary-300 transition cursor-pointer" onclick="App.showFileDetail('${clientId}','${file.id}')">
        <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-lg ${iconBg[file.type] || 'bg-slate-100 text-slate-500'} flex items-center justify-center">
                <i data-lucide="${Utils.fileIcon(file.type)}" class="w-5 h-5"></i>
            </div>
            ${UI.badge(file.status)}
        </div>
        <h4 class="text-sm font-medium text-slate-900 truncate mb-1" title="${file.name}">${file.name}</h4>
        <div class="flex items-center gap-3 text-xs text-slate-400">
            <span>${file.size}</span>
            <span>${Utils.formatDateShort(file.date)}</span>
        </div>
    </div>`;
}

App.showFileDetail = function(clientId, fileId) {
    const client = Store.getClient(clientId);
    let file = null;
    for (const folder of client.files.folders) {
        file = folder.files.find(f => f.id === fileId);
        if (file) break;
    }
    if (!file) return;

    UI.openDrawer(`
        <div class="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 class="font-bold text-slate-900 text-lg">Detalle del Archivo</h3>
            <button onclick="UI.closeDrawer()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <div class="p-5 space-y-5">
            <div class="bg-slate-100 rounded-lg p-8 flex items-center justify-center">
                <i data-lucide="${Utils.fileIcon(file.type)}" class="w-16 h-16 text-slate-300"></i>
            </div>
            <div>
                <h4 class="font-semibold text-slate-900 mb-1">${file.name}</h4>
                <div class="flex items-center gap-3 text-sm text-slate-500">
                    <span>${file.type}</span><span>${file.size}</span><span>${Utils.formatDate(file.date)}</span>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-slate-700">Estado:</span>
                ${UI.badge(file.status)}
            </div>
            <div class="border-t pt-4 space-y-3">
                <h4 class="text-sm font-semibold text-slate-700">Comentarios</h4>
                <div class="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">Archivo revisado y aprobado por el equipo creativo.</div>
                <div class="flex gap-2">
                    <input type="text" class="flex-1 border rounded-lg px-3 py-2 text-sm" placeholder="Agregar comentario...">
                    ${UI.button('Enviar', { variant:'primary', cls:'py-2', onclick:"UI.toast('Comentario agregado')" })}
                </div>
            </div>
            <div class="flex gap-2">
                ${UI.button('Descargar', { variant:'secondary', icon:'download', cls:'flex-1', onclick:"UI.toast('Descargando... (simulado)','info')" })}
                ${UI.button('Compartir', { variant:'secondary', icon:'share-2', cls:'flex-1', onclick:"UI.toast('Link copiado','info')" })}
            </div>
        </div>
    `);
};

App.connectDrive = function(clientId) {
    Store.updateClient(clientId, 'files.driveConnected', true);
    UI.toast('Google Drive conectado exitosamente');
    App.render();
};
