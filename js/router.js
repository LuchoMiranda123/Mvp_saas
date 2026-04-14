/* ============================================
   Agency OS — Hash Router
   ============================================ */
const Router = {
    _route: '', _params: {},

    get route() { return this._route; },
    get params() { return this._params; },

    init() {
        window.addEventListener('hashchange', () => this.resolve());
        if (!location.hash) location.hash = '#login';
        else this.resolve();
    },

    resolve() {
        const hash = location.hash.slice(1) || 'login';
        const parts = hash.split('/');
        this._route = parts[0];
        this._params = {};

        if (this._route === 'client' && parts.length >= 2) {
            this._params.clientId = parts[1];
            this._params.module = parts[2] || 'resumen';
            this._params.sub = parts[3] || '';
        }

        App.render();
    },

    go(hash) { location.hash = '#' + hash; },

    currentClientId() { return this._params.clientId || null; },
    currentModule() { return this._params.module || 'resumen'; },
    currentSub() { return this._params.sub || ''; }
};
