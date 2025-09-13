/**
 * StorageManager
 * Mengelola penyimpanan project, preferensi, dan tema di localStorage
 */
class StorageManager {
    constructor() {
        this.PROJECT_KEY = 'hafis_code_playground_project';
        this.PREF_KEY = 'hafis_code_playground_preferences';
        this.THEME_KEY = 'hafis_code_playground_theme';
        this.AUTO_SAVE_INTERVAL = 5000;
        this.autoSaveTimer = null;
    }

    // Project CRUD
    saveProject(project) {
        try {
            localStorage.setItem(this.PROJECT_KEY, JSON.stringify(project));
            return true;
        } catch (e) {
            return false;
        }
    }

    loadProject() {
        const data = localStorage.getItem(this.PROJECT_KEY);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch (e) {
            return null;
        }
    }

    getDefaultProject() {
        return {
            files: { html: '', css: '', js: '' },
            activeFile: 'html',
            projectName: 'Untitled Project',
            lastModified: new Date().toISOString()
        };
    }

    // Shareable link (hash-based)
    loadFromShareableLink() {
        const hash = window.location.hash;
        if (hash.startsWith('#share=')) {
            try {
                const decoded = decodeURIComponent(hash.replace('#share=', ''));
                return JSON.parse(atob(decoded));
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // Preferences
    setPreferences(prefs) {
        localStorage.setItem(this.PREF_KEY, JSON.stringify(prefs));
    }
    getPreferences() {
        const data = localStorage.getItem(this.PREF_KEY);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch (e) {
            return null;
        }
    }

    // Theme
    setTheme(theme) {
        localStorage.setItem(this.THEME_KEY, theme);
    }
    getTheme() {
        return localStorage.getItem(this.THEME_KEY) || 'light';
    }

    // Auto-save
    startAutoSave(getProjectFn) {
        this.stopAutoSave();
        this.autoSaveTimer = setInterval(() => {
            const project = getProjectFn();
            this.saveProject(project);
        }, this.AUTO_SAVE_INTERVAL);
    }
    stopAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
        }
    }
}

window.StorageManager = StorageManager;
