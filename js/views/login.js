/* ============================================
   Agency OS — Login View
   ============================================ */
function renderLogin() {
    return `
    <div class="overflow-y-auto h-full">
    <div class="min-h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div class="max-w-md w-full space-y-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-100">
            <div class="text-center">
                <div class="w-16 h-16 bg-brand mx-auto rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">A</div>
                <h2 class="mt-6 text-3xl font-extrabold text-slate-900">Agency OS</h2>
                <p class="mt-2 text-sm text-slate-500">Sistema operativo para agencias con copilotos de IA</p>
            </div>
            <form class="mt-8 space-y-5" onsubmit="event.preventDefault(); Router.go('dashboard')">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
                    <input type="email" autocomplete="email" required class="block w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="demo@agencyos.com" value="demo@agencyos.com">
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                    <input type="password" autocomplete="current-password" required class="block w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="••••••••" value="password123">
                </div>
                <div class="flex items-center justify-between">
                    <label class="flex items-center text-sm text-slate-600"><input type="checkbox" checked class="mr-2 rounded border-slate-300 text-primary-600 focus:ring-primary-500">Recordarme</label>
                    <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500">¿Olvidaste tu clave?</a>
                </div>
                <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-brand hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors shadow-md">
                    Ingresar al Sistema
                </button>
                <div class="relative my-4">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200"></div></div>
                    <div class="relative flex justify-center text-xs"><span class="bg-white px-3 text-slate-400">o accede rápido</span></div>
                </div>
                <button type="button" onclick="Router.go('dashboard')" class="w-full flex justify-center py-2.5 px-4 border-2 border-primary-200 text-sm font-medium rounded-lg text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none transition-colors">
                    <i data-lucide="zap" class="w-4 h-4 mr-2"></i> Acceso Demo Rápido
                </button>
            </form>
            <p class="text-center text-xs text-slate-400 mt-4">MVP Demo v1.0 — Agency OS © 2026</p>
        </div>
    </div>
    </div>`;
}
