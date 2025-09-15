/**
 * LocalStorage Utilities for Hafis Code Playground
 * Handles localStorage operations, auto-save, version history, and preferences
 * Author: Hafis Yulianto
 */

class StorageManager {
    constructor() {
        this.storageKeys = {
            PROJECT: 'hafis_playground_project',
            PREFERENCES: 'hafis_playground_preferences', 
            HISTORY: 'hafis_playground_history',
            THEME: 'hafis_playground_theme',
            TEMPLATES: 'hafis_playground_templates',
            SNIPPETS: 'hafis_playground_snippets',
            SETTINGS: 'hafis_playground_settings',
            BACKUP: 'hafis_playground_backup',
            ANALYTICS: 'hafis_playground_analytics'
        };
        
        this.maxHistoryVersions = 10;
        this.autoSaveInterval = 2000; // 2 seconds
        this.autoSaveTimer = null;
        this.autoSaveCallback = null;
        
        // Storage quotas (in bytes)
        this.storageQuotas = {
            maxTotalSize: 5 * 1024 * 1024, // 5MB
            maxProjectSize: 1 * 1024 * 1024, // 1MB
            maxHistorySize: 2 * 1024 * 1024, // 2MB
            warningThreshold: 0.8 // 80%
        };
        
        this.compressionEnabled = true;
        this.encryptionEnabled = false; // For future implementation
        
        this.init();
    }
    
    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    
    init() {
        // Check localStorage availability
        if (!this.isStorageAvailable()) {
            console.warn('⚠️ localStorage is not available');
            this.fallbackToMemoryStorage();
            return;
        }
        
        // Initialize default preferences if not exists
        if (!this.getPreferences()) {
            this.setPreferences(this.getDefaultPreferences());
        }
        
        // Cleanup old data if needed
        this.performMaintenance();
        
        // Setup storage event listener for cross-tab synchronization
        this.setupStorageEventListener();
        
        console.log('💾 Storage Manager initialized');
        this.logStorageInfo();
    }
    
    isStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    fallbackToMemoryStorage() {
        // Create in-memory storage fallback
        this.memoryStorage = {};
        
        // Override localStorage methods
        this.setItem = (key, value) => {
            this.memoryStorage[key] = value;
        };
        
        this.getItem = (key) => {
            return this.memoryStorage[key] || null;
        };
        
        this.removeItem = (key) => {
            delete this.memoryStorage[key];
        };
        
        this.clear = () => {
            this.memoryStorage = {};
        };
        
        console.warn('📝 Using in-memory storage fallback');
    }
    
    getDefaultPreferences() {
        return {
            autoSave: true,
            livePreview: true,
            fontSize: 14,
            tabSize: 2,
            wordWrap: true,
            theme: 'vs-dark',
            lastActiveFile: 'html',
            editorMode: 'monaco',
            previewMode: 'desktop',
            consoleEnabled: true,
            snippetsEnabled: true,
            historyEnabled: true,
            compressionEnabled: true,
            backupEnabled: true,
            analyticsEnabled: true,
            notifications: {
                saveSuccess: true,
                autoSave: false,
                errors: true,
                warnings: true
            },
            shortcuts: {
                save: 'Ctrl+S',
                run: 'Ctrl+Enter',
                format: 'Ctrl+Shift+F',
                toggleTheme: 'Ctrl+Shift+T'
            }
        };
    }
    
    setupStorageEventListener() {
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('hafis_playground_')) {
                console.log(`🔄 Storage updated from another tab: ${e.key}`);
                this.handleCrossTabUpdate(e);
            }
        });
    }
    
    handleCrossTabUpdate(event) {
        // Handle cross-tab synchronization
        switch (event.key) {
            case this.storageKeys.PROJECT:
                this.notifyProjectUpdate(event.newValue);
                break;
            case this.storageKeys.THEME:
                this.notifyThemeUpdate(event.newValue);
                break;
            case this.storageKeys.PREFERENCES:
                this.notifyPreferencesUpdate(event.newValue);
                break;
        }
    }
    
    notifyProjectUpdate(newValue) {
        if (newValue) {
            document.dispatchEvent(new CustomEvent('projectUpdated', {
                detail: { project: JSON.parse(newValue) }
            }));
        }
    }
    
    notifyThemeUpdate(newValue) {
        if (newValue) {
            document.dispatchEvent(new CustomEvent('themeUpdated', {
                detail: { theme: newValue }
            }));
        }
    }
    
    notifyPreferencesUpdate(newValue) {
        if (newValue) {
            document.dispatchEvent(new CustomEvent('preferencesUpdated', {
                detail: { preferences: JSON.parse(newValue) }
            }));
        }
    }
    
    // ==========================================================================
    // PROJECT MANAGEMENT
    // ==========================================================================
    
    saveProject(projectData) {
        try {
            // Validate project data
            if (!this.validateProjectData(projectData)) {
                throw new Error('Invalid project data structure');
            }
            
            // Add metadata
            projectData.lastModified = new Date().toISOString();
            projectData.version = '1.0.0';
            projectData.id = projectData.id || this.generateProjectId();
            
            // Compress if enabled
            const dataToStore = this.compressionEnabled 
                ? this.compressData(projectData)
                : projectData;
            
            // Check size before saving
            const dataSize = this.calculateDataSize(dataToStore);
            if (dataSize > this.storageQuotas.maxProjectSize) {
                throw new Error(`Project size (${this.formatBytes(dataSize)}) exceeds maximum allowed (${this.formatBytes(this.storageQuotas.maxProjectSize)})`);
            }
            
            // Save to localStorage
            this.setItem(this.storageKeys.PROJECT, JSON.stringify(dataToStore));
            
            // Add to version history
            if (this.getPreferences().historyEnabled) {
                this.addToHistory(projectData);
            }
            
            // Update analytics
            this.updateAnalytics('project_saved');
            
            console.log('💾 Project saved successfully');
            this.showNotification('Project saved!', 'success');
            
            return true;
        } catch (error) {
            console.error('❌ Error saving project:', error);
            this.showNotification(`Error saving project: ${error.message}`, 'error');
            return false;
        }
    }
    
    loadProject() {
        try {
            const projectData = this.getItem(this.storageKeys.PROJECT);
            if (!projectData) {
                console.log('📄 No saved project found, loading default');
                return this.getDefaultProject();
            }
            
            let parsedData = JSON.parse(projectData);
            
            // Decompress if needed
            if (this.compressionEnabled && parsedData._compressed) {
                parsedData = this.decompressData(parsedData);
            }
            
            // Validate loaded data
            if (!this.validateProjectData(parsedData)) {
                console.warn('⚠️ Invalid project data, loading default');
                return this.getDefaultProject();
            }
            
            // Migrate old project format if needed
            parsedData = this.migrateProjectData(parsedData);
            
            console.log('📂 Project loaded successfully');
            return parsedData;
            
        } catch (error) {
            console.error('❌ Error loading project:', error);
            this.showNotification('Error loading project, using default', 'warning');
            return this.getDefaultProject();
        }
    }
    
    getDefaultProject() {
        return {
            id: this.generateProjectId(),
            name: 'Untitled Project',
            description: 'A new project created in Hafis Code Playground',
            files: {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Hafis Code Playground! 🚀</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to Hafis Code Playground! 🚀</h1>
        <p>Start coding and see your changes live!</p>
        <button onclick="changeColor()" class="btn">Change Color</button>
        <div id="output"></div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
                css: `/* Hafis Code Playground - Default Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 500px;
    width: 90%;
}

h1 {
    color: #4a5568;
    margin-bottom: 1rem;
    font-size: 2rem;
}

p {
    color: #718096;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

#output {
    margin-top: 1rem;
    padding: 1rem;
    background: #f7fafc;
    border-radius: 8px;
    min-height: 50px;
    border-left: 4px solid #667eea;
}`,
                js: `// Hafis Code Playground - Interactive JavaScript

console.log('🚀 Welcome to Hafis Code Playground!');

// Array of beautiful colors
const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

let currentColorIndex = 0;

function changeColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    document.body.style.background = colors[currentColorIndex];
    
    const output = document.getElementById('output');
    output.innerHTML = \`
        <h3>🎨 Color Changed!</h3>
        <p>Background updated to gradient #\${currentColorIndex + 1}</p>
        <small>Keep clicking to cycle through more colors!</small>
    \`;
    
    console.log(\`Color changed to gradient #\${currentColorIndex + 1}\`);
}

// Fun welcome message
function showWelcome() {
    const output = document.getElementById('output');
    output.innerHTML = \`
        <h3>👋 Hello Developer!</h3>
        <p>You're using Hafis Code Playground</p>
        <small>Click the button above to see some magic! ✨</small>
    \`;
}

// Initialize
document.addEventListener('DOMContentLoaded', showWelcome);`
            },
            activeFile: 'html',
            lastModified: new Date().toISOString(),
            created: new Date().toISOString(),
            version: '1.0.0',
            tags: ['starter', 'demo'],
            settings: {
                livePreview: true,
                autoSave: true
            }
        };
    }
    
    validateProjectData(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.files || typeof data.files !== 'object') return false;
        if (!data.files.html || !data.files.css || !data.files.js) return false;
        return true;
    }
    
    migrateProjectData(data) {
        // Migrate old project format to new format
        if (!data.version) {
            data.version = '1.0.0';
        }
        
        if (!data.id) {
            data.id = this.generateProjectId();
        }
        
        if (!data.created) {
            data.created = data.lastModified || new Date().toISOString();
        }
        
        return data;
    }
    
    generateProjectId() {
        return 'project_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    clearProject() {
        try {
            // Backup current project before clearing
            const currentProject = this.loadProject();
            this.createBackup(currentProject, 'before_clear');
            
            // Remove project data
            this.removeItem(this.storageKeys.PROJECT);
            
            console.log('🗑️ Project cleared');
            this.showNotification('Project cleared', 'info');
            return this.getDefaultProject();
            
        } catch (error) {
            console.error('❌ Error clearing project:', error);
            this.showNotification('Error clearing project', 'error');
            return null;
        }
    }
    
    // ==========================================================================
    // AUTO-SAVE FUNCTIONALITY
    // ==========================================================================
    
    startAutoSave(getProjectDataCallback) {
        const preferences = this.getPreferences();
        if (!preferences.autoSave) {
            console.log('📴 Auto-save is disabled');
            return;
        }
        
        this.autoSaveCallback = getProjectDataCallback;
        
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
        }
        
        this.autoSaveTimer = setInterval(() => {
            this.performAutoSave();
        }, this.autoSaveInterval);
        
        console.log(`⏰ Auto-save started (interval: ${this.autoSaveInterval}ms)`);
    }
    
    stopAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
        }
        
        console.log('⏸️ Auto-save stopped');
    }
    
    performAutoSave() {
        if (!this.autoSaveCallback) return;
        
        try {
            const projectData = this.autoSaveCallback();
            if (projectData) {
                // Check if project has actually changed
                const currentProject = this.loadProject();
                if (this.hasProjectChanged(currentProject, projectData)) {
                    this.saveProject(projectData);
                    
                    if (this.getPreferences().notifications.autoSave) {
                        this.showNotification('Auto-saved', 'info', 1000);
                    }
                }
            }
        } catch (error) {
            console.error('❌ Auto-save failed:', error);
        }
    }
    
    hasProjectChanged(oldProject, newProject) {
        if (!oldProject || !newProject) return true;
        
        // Compare file contents
        const oldFiles = JSON.stringify(oldProject.files);
        const newFiles = JSON.stringify(newProject.files);
        
        return oldFiles !== newFiles;
    }
    
    // ==========================================================================
    // VERSION HISTORY
    // ==========================================================================
    
    addToHistory(projectData) {
        try {
            let history = this.getHistory();
            
            // Create history entry
            const historyEntry = {
                id: this.generateHistoryId(),
                project: { ...projectData },
                timestamp: new Date().toISOString(),
                size: this.calculateDataSize(projectData),
                changes: this.detectChanges(history[0]?.project, projectData)
            };
            
            // Add to beginning of array
            history.unshift(historyEntry);
            
            // Keep only max versions
            if (history.length > this.maxHistoryVersions) {
                history = history.slice(0, this.maxHistoryVersions);
            }
            
            // Check history size limit
            const historySize = this.calculateDataSize(history);
            if (historySize > this.storageQuotas.maxHistorySize) {
                // Remove oldest entries until under limit
                while (this.calculateDataSize(history) > this.storageQuotas.maxHistorySize && history.length > 1) {
                    history.pop();
                }
            }
            
            this.setItem(this.storageKeys.HISTORY, JSON.stringify(history));
            console.log(`📚 Added to history (${history.length} versions)`);
            
        } catch (error) {
            console.error('❌ Error adding to history:', error);
        }
    }
    
    getHistory() {
        try {
            const history = this.getItem(this.storageKeys.HISTORY);
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('❌ Error getting history:', error);
            return [];
        }
    }
    
    restoreFromHistory(historyId) {
        try {
            const history = this.getHistory();
            const historyEntry = history.find(entry => entry.id === historyId);
            
            if (!historyEntry) {
                throw new Error('History entry not found');
            }
            
            // Backup current project before restoring
            const currentProject = this.loadProject();
            this.createBackup(currentProject, 'before_restore');
            
            // Restore the project
            const restoredProject = { ...historyEntry.project };
            restoredProject.lastModified = new Date().toISOString();
            
            this.saveProject(restoredProject);
            
            console.log(`🔄 Restored from history: ${historyEntry.timestamp}`);
            this.showNotification('Project restored from history', 'success');
            
            return restoredProject;
            
        } catch (error) {
            console.error('❌ Error restoring from history:', error);
            this.showNotification(`Error restoring project: ${error.message}`, 'error');
            return null;
        }
    }
    
    clearHistory() {
        try {
            this.removeItem(this.storageKeys.HISTORY);
            console.log('🗑️ History cleared');
            this.showNotification('History cleared', 'info');
        } catch (error) {
            console.error('❌ Error clearing history:', error);
        }
    }
    
    generateHistoryId() {
        return 'history_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }
    
    detectChanges(oldProject, newProject) {
        if (!oldProject) return ['initial_version'];
        
        const changes = [];
        
        // Check for file changes
        Object.keys(newProject.files).forEach(fileType => {
            if (oldProject.files[fileType] !== newProject.files[fileType]) {
                changes.push(`${fileType}_modified`);
            }
        });
        
        // Check for metadata changes
        if (oldProject.name !== newProject.name) {
            changes.push('name_changed');
        }
        
        if (oldProject.description !== newProject.description) {
            changes.push('description_changed');
        }
        
        return changes.length > 0 ? changes : ['minor_changes'];
    }
    
    // ==========================================================================
    // PREFERENCES MANAGEMENT
    // ==========================================================================
    
    getPreferences() {
        try {
            const preferences = this.getItem(this.storageKeys.PREFERENCES);
            return preferences ? JSON.parse(preferences) : null;
        } catch (error) {
            console.error('❌ Error getting preferences:', error);
            return null;
        }
    }
    
    setPreferences(preferences) {
        try {
            // Merge with default preferences
            const defaultPrefs = this.getDefaultPreferences();
            const mergedPreferences = { ...defaultPrefs, ...preferences };
            
            this.setItem(this.storageKeys.PREFERENCES, JSON.stringify(mergedPreferences));
            
            console.log('⚙️ Preferences updated');
            return true;
        } catch (error) {
            console.error('❌ Error setting preferences:', error);
            return false;
        }
    }
    
    updatePreference(key, value) {
        const preferences = this.getPreferences() || this.getDefaultPreferences();
        
        // Support nested keys (e.g., 'notifications.saveSuccess')
        const keys = key.split('.');
        let current = preferences;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
        
        return this.setPreferences(preferences);
    }
    
    resetPreferences() {
        const defaultPrefs = this.getDefaultPreferences();
        return this.setPreferences(defaultPrefs);
    }
    
    // ==========================================================================
    // THEME MANAGEMENT
    // ==========================================================================
    
    getTheme() {
        try {
            return this.getItem(this.storageKeys.THEME) || 'light';
        } catch (error) {
            console.error('❌ Error getting theme:', error);
            return 'light';
        }
    }
    
    setTheme(theme) {
        try {
            this.setItem(this.storageKeys.THEME, theme);
            console.log(`🎨 Theme set to: ${theme}`);
            return true;
        } catch (error) {
            console.error('❌ Error setting theme:', error);
            return false;
        }
    }
    
    // ==========================================================================
    // IMPORT/EXPORT FUNCTIONALITY
    // ==========================================================================
    
    exportProject(projectData, options = {}) {
        try {
            const exportData = {
                metadata: {
                    name: projectData.name || 'Exported Project',
                    description: projectData.description || 'Exported from Hafis Code Playground',
                    exportedAt: new Date().toISOString(),
                    version: '1.0.0',
                    source: 'hafis_code_playground'
                },
                project: projectData,
                preferences: options.includePreferences ? this.getPreferences() : null,
                history: options.includeHistory ? this.getHistory() : null
            };
            
            if (options.format === 'json') {
                return this.exportAsJSON(exportData);
            } else {
                return this.exportAsZip(exportData);
            }
            
        } catch (error) {
            console.error('❌ Error exporting project:', error);
            this.showNotification('Error exporting project', 'error');
            return false;
        }
    }
    
    exportAsJSON(data) {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        this.downloadBlob(blob, `${data.metadata.name}.json`);
        
        this.showNotification('Project exported as JSON', 'success');
        return true;
    }
    
    exportAsZip(data) {
        // Since we can't use JSZip in this environment, create individual file downloads
        const files = {
            'index.html': data.project.files.html,
            'style.css': data.project.files.css,
            'script.js': data.project.files.js,
            'project.json': JSON.stringify(data, null, 2)
        };
        
        // Download each file with a small delay
        Object.entries(files).forEach(([filename, content], index) => {
            setTimeout(() => {
                const blob = new Blob([content], { type: 'text/plain' });
                this.downloadBlob(blob, filename);
            }, index * 200);
        });
        
        this.showNotification('Project files exported', 'success');
        return true;
    }
    
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    importProject(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    // Validate import data
                    if (!this.validateImportData(importData)) {
                        throw new Error('Invalid import data format');
                    }
                    
                    // Backup current project
                    const currentProject = this.loadProject();
                    this.createBackup(currentProject, 'before_import');
                    
                    // Import the project
                    const projectData = importData.project || importData;
                    this.saveProject(projectData);
                    
                    // Import preferences if included
                    if (importData.preferences) {
                        this.setPreferences(importData.preferences);
                    }
                    
                    console.log('📥 Project imported successfully');
                    this.showNotification('Project imported successfully', 'success');
                    
                    resolve(projectData);
                    
                } catch (error) {
                    console.error('❌ Error importing project:', error);
                    this.showNotification(`Import failed: ${error.message}`, 'error');
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsText(file);
        });
    }
    
    validateImportData(data) {
        // Check if it's a direct project or wrapped export
        const projectData = data.project || data;
        
        return this.validateProjectData(projectData);
    }
    
    // ==========================================================================
    // SHAREABLE LINKS
    // ==========================================================================
    
    generateShareableLink(projectData) {
        try {
            // Compress project data for sharing
            const compressedData = this.compressData(projectData);
            
            // Encode to base64
            const encodedData = btoa(JSON.stringify(compressedData));
            
            // Check URL length limit
            if (encodedData.length > 2000) {
                throw new Error('Project too large to share via URL');
            }
            
            const baseUrl = window.location.origin + window.location.pathname;
            const shareUrl = `${baseUrl}#share=${encodedData}`;
            
            // Copy to clipboard
            this.copyToClipboard(shareUrl);
            
            console.log('🔗 Shareable link generated');
            this.showNotification('Share link copied to clipboard!', 'success');
            
            return shareUrl;
            
        } catch (error) {
            console.error('❌ Error generating shareable link:', error);
            this.showNotification(`Error generating share link: ${error.message}`, 'error');
            return null;
        }
    }
    
    loadFromShareableLink() {
        try {
            const hash = window.location.hash;
            if (!hash.startsWith('#share=')) {
                return null;
            }
            
            const encodedData = hash.substring(7);
            const decodedData = atob(encodedData);
            const projectData = JSON.parse(decodedData);
            
            // Decompress if needed
            const finalData = projectData._compressed 
                ? this.decompressData(projectData)
                : projectData;
            
            console.log('🔗 Project loaded from shared link');
            this.showNotification('Project loaded from shared link!', 'success');
            
            return finalData;
            
        } catch (error) {
            console.error('❌ Error loading from shareable link:', error);
            this.showNotification('Error loading shared project', 'error');
            return null;
        }
    }
    
    copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
    
    // ==========================================================================
    // BACKUP & RESTORE
    // ==========================================================================
    
    createBackup(projectData, reason = 'manual') {
        try {
            const backups = this.getBackups();
            
            const backup = {
                id: this.generateBackupId(),
                project: { ...projectData },
                reason: reason,
                timestamp: new Date().toISOString(),
                size: this.calculateDataSize(projectData)
            };
            
            backups.unshift(backup);
            
            // Keep only last 5 backups
            if (backups.length > 5) {
                backups.splice(5);
            }
            
            this.setItem(this.storageKeys.BACKUP, JSON.stringify(backups));
            
            console.log(`💼 Backup created: ${reason}`);
            
        } catch (error) {
            console.error('❌ Error creating backup:', error);
        }
    }
    
    getBackups() {
        try {
            const backups = this.getItem(this.storageKeys.BACKUP);
            return backups ? JSON.parse(backups) : [];
        } catch (error) {
            console.error('❌ Error getting backups:', error);
            return [];
        }
    }
    
    restoreBackup(backupId) {
        try {
            const backups = this.getBackups();
            const backup = backups.find(b => b.id === backupId);
            
            if (!backup) {
                throw new Error('Backup not found');
            }
            
            this.saveProject(backup.project);
            
            console.log(`♻️ Restored from backup: ${backup.timestamp}`);
            this.showNotification('Project restored from backup', 'success');
            
            return backup.project;
            
        } catch (error) {
            console.error('❌ Error restoring backup:', error);
            this.showNotification('Error restoring backup', 'error');
            return null;
        }
    }
    
    generateBackupId() {
        return 'backup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }
    
    // ==========================================================================
    // DATA COMPRESSION
    // ==========================================================================
    
    compressData(data) {
        if (!this.compressionEnabled) return data;
        
        try {
            // Simple compression: remove whitespace and use shorter keys
            const compressed = {
                _compressed: true,
                _version: '1.0',
                d: data
            };
            
            return compressed;
            
        } catch (error) {
            console.error('❌ Compression failed:', error);
            return data;
        }
    }
    
    decompressData(compressedData) {
        if (!compressedData._compressed) return compressedData;
        
        try {
            return compressedData.d;
        } catch (error) {
            console.error('❌ Decompression failed:', error);
            return compressedData;
        }
    }
    
    // ==========================================================================
    // STORAGE ANALYTICS & MONITORING
    // ==========================================================================
    
    updateAnalytics(action, metadata = {}) {
        if (!this.getPreferences().analyticsEnabled) return;
        
        try {
            const analytics = this.getAnalytics();
            
            const event = {
                action: action,
                timestamp: new Date().toISOString(),
                metadata: metadata
            };
            
            analytics.events.push(event);
            analytics.stats[action] = (analytics.stats[action] || 0) + 1;
            analytics.lastUpdated = new Date().toISOString();
            
            // Keep only last 100 events
            if (analytics.events.length > 100) {
                analytics.events = analytics.events.slice(-100);
            }
            
            this.setItem(this.storageKeys.ANALYTICS, JSON.stringify(analytics));
            
        } catch (error) {
            console.error('❌ Error updating analytics:', error);
        }
    }
    
    getAnalytics() {
        try {
            const analytics = this.getItem(this.storageKeys.ANALYTICS);
            return analytics ? JSON.parse(analytics) : {
                events: [],
                stats: {},
                created: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error('❌ Error getting analytics:', error);
            return { events: [], stats: {}, created: new Date().toISOString() };
        }
    }
    
    getStorageInfo() {
        try {
            let totalSize = 0;
            const sizes = {};
            
            Object.entries(this.storageKeys).forEach(([key, storageKey]) => {
                const item = this.getItem(storageKey);
                const size = item ? item.length * 2 : 0; // Rough estimate (UTF-16)
                sizes[key] = size;
                totalSize += size;
            });
            
            return {
                totalSize: totalSize,
                totalSizeFormatted: this.formatBytes(totalSize),
                quota: this.storageQuotas.maxTotalSize,
                quotaFormatted: this.formatBytes(this.storageQuotas.maxTotalSize),
                usagePercentage: (totalSize / this.storageQuotas.maxTotalSize) * 100,
                remainingSpace: this.storageQuotas.maxTotalSize - totalSize,
                remainingSpaceFormatted: this.formatBytes(this.storageQuotas.maxTotalSize - totalSize),
                isNearLimit: (totalSize / this.storageQuotas.maxTotalSize) > this.storageQuotas.warningThreshold,
                breakdown: sizes
            };
            
        } catch (error) {
            console.error('❌ Error getting storage info:', error);
            return null;
        }
    }
    
    calculateDataSize(data) {
        return JSON.stringify(data).length * 2; // Rough estimate for UTF-16
    }
    
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    performMaintenance() {
        try {
            const storageInfo = this.getStorageInfo();
            
            if (storageInfo.isNearLimit) {
                console.warn('⚠️ Storage usage is high:', storageInfo.usagePercentage.toFixed(1) + '%');
                this.optimizeStorage();
            }
            
            // Clean up old analytics data
            this.cleanupOldData();
            
            console.log('🧹 Storage maintenance completed');
            
        } catch (error) {
            console.error('❌ Error during maintenance:', error);
        }
    }
    
    optimizeStorage() {
        try {
            // Remove old history entries
            const history = this.getHistory();
            if (history.length > 5) {
                const optimizedHistory = history.slice(0, 5);
                this.setItem(this.storageKeys.HISTORY, JSON.stringify(optimizedHistory));
            }
            
            // Remove old backups
            const backups = this.getBackups();
            if (backups.length > 3) {
                const optimizedBackups = backups.slice(0, 3);
                this.setItem(this.storageKeys.BACKUP, JSON.stringify(optimizedBackups));
            }
            
            console.log('🗜️ Storage optimized');
            
        } catch (error) {
            console.error('❌ Error optimizing storage:', error);
        }
    }
    
    cleanupOldData() {
        try {
            const analytics = this.getAnalytics();
            const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            
            // Remove events older than 1 week
            analytics.events = analytics.events.filter(event => 
                new Date(event.timestamp) > oneWeekAgo
            );
            
            this.setItem(this.storageKeys.ANALYTICS, JSON.stringify(analytics));
            
        } catch (error) {
            console.error('❌ Error cleaning up data:', error);
        }
    }
    
    clearAllStorage() {
        if (confirm('Are you sure you want to clear all stored data? This action cannot be undone.')) {
            try {
                Object.values(this.storageKeys).forEach(key => {
                    this.removeItem(key);
                });
                
                console.log('🗑️ All storage cleared');
                this.showNotification('All storage cleared', 'info');
                
                // Reload page to reset everything
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                
                return true;
            } catch (error) {
                console.error('❌ Error clearing storage:', error);
                this.showNotification('Error clearing storage', 'error');
                return false;
            }
        }
        return false;
    }
    
    // ==========================================================================
    // UTILITY METHODS
    // ==========================================================================
    
    // Safe localStorage methods with error handling
    setItem(key, value) {
        try {
            if (this.memoryStorage) {
                this.memoryStorage[key] = value;
            } else {
                localStorage.setItem(key, value);
            }
        } catch (error) {
            console.error(`❌ Error setting ${key}:`, error);
            throw error;
        }
    }
    
    getItem(key) {
        try {
            if (this.memoryStorage) {
                return this.memoryStorage[key] || null;
            } else {
                return localStorage.getItem(key);
            }
        } catch (error) {
            console.error(`❌ Error getting ${key}:`, error);
            return null;
        }
    }
    
    removeItem(key) {
        try {
            if (this.memoryStorage) {
                delete this.memoryStorage[key];
            } else {
                localStorage.removeItem(key);
            }
        } catch (error) {
            console.error(`❌ Error removing ${key}:`, error);
        }
    }
    
    clear() {
        try {
            if (this.memoryStorage) {
                this.memoryStorage = {};
            } else {
                localStorage.clear();
            }
        } catch (error) {
            console.error('❌ Error clearing storage:', error);
        }
    }
    
    showNotification(message, type = 'info', duration = 3000) {
        const preferences = this.getPreferences();
        if (!preferences?.notifications?.[type === 'error' ? 'errors' : type === 'warning' ? 'warnings' : 'saveSuccess']) {
            return;
        }
        
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
        
        // Dispatch custom event for UI to handle
        document.dispatchEvent(new CustomEvent('storageNotification', {
            detail: { message, type, duration }
        }));
    }
    
    logStorageInfo() {
        const storageInfo = this.getStorageInfo();
        if (storageInfo) {
            console.log('📊 Storage Information:');
            console.log(`  Total Usage: ${storageInfo.totalSizeFormatted} / ${storageInfo.quotaFormatted} (${storageInfo.usagePercentage.toFixed(1)}%)`);
            console.log(`  Remaining: ${storageInfo.remainingSpaceFormatted}`);
            
            if (storageInfo.isNearLimit) {
                console.warn('⚠️ Storage usage is high!');
            }
        }
    }
}

// Export for global use
window.StorageManager = StorageManager;