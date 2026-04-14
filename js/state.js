/* ============================================
   Agency OS — State Management
   ============================================ */
const Store = {
    _data: null,
    _listeners: [],

    init() {
        const saved = localStorage.getItem('agencyOS_v2');
        if (saved) {
            try { this._data = JSON.parse(saved); } catch(e) { this._data = null; }
        }
        if (!this._data) this._data = JSON.parse(JSON.stringify(AppData));
    },

    get data() { return this._data; },
    get clients() { return this._data.clients; },
    get team() { return this._data.team; },
    get agents() { return this._data.agents; },

    save() {
        localStorage.setItem('agencyOS_v2', JSON.stringify(this._data));
        this._notify();
    },

    reset() {
        localStorage.removeItem('agencyOS_v2');
        this._data = JSON.parse(JSON.stringify(AppData));
        this._notify();
    },

    getClient(id) { return this._data.clients.find(c => c.id === id); },

    getTeamMember(id) { return this._data.team.find(t => t.id === id); },

    getTeamName(id) {
        const m = this.getTeamMember(id);
        return m ? m.name : id;
    },

    getTeamAvatar(id) {
        const m = this.getTeamMember(id);
        return m ? m.avatar : '??';
    },

    getTeamColor(id) {
        const m = this.getTeamMember(id);
        return m ? m.color : 'bg-slate-500';
    },

    updateClient(id, path, value) {
        const client = this.getClient(id);
        if (!client) return;
        const keys = path.split('.');
        let obj = client;
        for (let i = 0; i < keys.length - 1; i++) {
            obj = obj[keys[i]];
            if (!obj) return;
        }
        obj[keys[keys.length - 1]] = value;
        this.save();
    },

    updateTask(clientId, taskId, updates) {
        const client = this.getClient(clientId);
        if (!client) return;
        const task = client.tasks.find(t => t.id === taskId);
        if (task) { Object.assign(task, updates); this.save(); }
    },

    addTask(clientId, task) {
        const client = this.getClient(clientId);
        if (!client) return;
        task.id = 't' + Date.now();
        client.tasks.push(task);
        client.pendingTasks = client.tasks.filter(t => !['Aprobado','Publicado','Programado'].includes(t.status)).length;
        this.save();
    },

    addComment(clientId, taskId, comment) {
        const client = this.getClient(clientId);
        if (!client) return;
        const task = client.tasks.find(t => t.id === taskId);
        if (task) {
            if (!task.comments) task.comments = [];
            task.comments.push(comment);
            this.save();
        }
    },

    updateApproval(clientId, approvalId, status, note) {
        const client = this.getClient(clientId);
        if (!client) return;
        const ap = client.content.approvals.find(a => a.id === approvalId);
        if (ap) {
            ap.status = status;
            if (note) ap.clientNote = note;
            ap.history.push({ date: new Date().toISOString().split('T')[0], action: status === 'Aprobado' ? 'Aprobado' : status === 'Corregir' ? 'Corrección solicitada' : 'Rechazado' });
            this.save();
        }
    },

    updateCommunityStatus(clientId, msgId, status) {
        const client = this.getClient(clientId);
        if (!client) return;
        const msg = client.content.community.find(m => m.id === msgId);
        if (msg) { msg.status = status; this.save(); }
    },

    subscribe(fn) { this._listeners.push(fn); return () => { this._listeners = this._listeners.filter(l => l !== fn); }; },
    _notify() { this._listeners.forEach(fn => fn()); }
};
