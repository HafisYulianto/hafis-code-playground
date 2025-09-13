/**
 * Hafis Code Playground - Main Application Logic
 * Orchestrates all components and handles user interactions
 * Author: Hafis Yulianto
 */

class HafisCodePlayground {
    constructor() {
        this.storageManager = null;
        this.templateManager = null;
        this.editorManager = null;
        
        // Application state
        this.currentProject = {
            files: {
                html: '',
                css: '',
                js: ''
            },
            activeFile: 'html',
            projectName: 'Untitled Project',
            lastModified: new Date().toISOString()
        };
        
        this.settings = {
            livePreview: true,
            autoSave: true,
            theme: 'light',
            fontSize: 14,
            tabSize: 2,
            wordWrap: true,
            previewMode: 'desktop',
            consoleFilter: 'all'
        };
        
        // UI state
        this.isInitialized = false;
        this.isLoading = false;
        this.previewUpdateTimeout = null;
        this.autoSaveTimeout = null;
        this.consoleMessages = [];
        this.modifiedFiles = new Set();
        
        // DOM elements cache
        this.elements = {};
        
        this.init();
    }
    
    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    
    async init() {
        console.log('🚀 Initializing Hafis Code Playground...');
        
        try {
            this.showLoading(true);
            
            // Cache DOM elements
            this.cacheElements();
            
            // Initialize managers
            await this.initializeManagers();
            
            // Setup UI
            this.initializeUI();
            
            // Load project data
            this.loadProject();
            
            // Bind events
            this.bindEvents();
            
            // Setup auto-save
            this.setupAutoSave();
            
            // Check for shared project
            this.handleSharedProject();
            
            this.isInitialized = true;
            console.log('✨ Hafis Code Playground ready!');
            
            // Show welcome message
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('Failed to initialize playground:', error);
            this.showToast('Failed to initialize editor. Please refresh the page.', 'error');
        } finally {
            this.showLoading(false);
        }
    }
    
    cacheElements() {
        const selectors = {
            // Main containers
            loadingScreen: '#loadingScreen',
            editorContainer: '#editorContainer',
            previewFrame: '#previewFrame',
            previewWrapper: '#previewWrapper',
            consoleOutput: '#consoleOutput',
            snippetsList: '#snippetsList',
            
            // Controls
            templateSelect: '#templateSelect',
            runBtn: '#runBtn',
            themeToggle: '#themeToggle',
            livePreviewToggle: '#livePreviewToggle',
            moreBtn: '#moreBtn',
            moreMenu: '#moreMenu',
            
            // Menu items
            saveBtn: '#saveBtn',
            exportBtn: '#exportBtn',
            importBtn: '#importBtn',
            shareBtn: '#shareBtn',
            clearBtn: '#clearBtn',
            historyBtn: '#historyBtn',
            settingsBtn: '#settingsBtn',
            
            // Preview controls
            refreshPreview: '#refreshPreview',
            openInNewTab: '#openInNewTab',
            clearConsole: '#clearConsole',
            
            // Editor controls
            formatBtn: '#formatBtn',
            findBtn: '#findBtn',
            wordWrapBtn: '#wordWrapBtn',
            
            // Status elements
            cursorPosition: '#cursorPosition',
            languageInfo: '#languageInfo',
            previewStatus: '#previewStatus',
            previewStatusText: '#previewStatusText',
            consoleCount: '#consoleCount',
            
            // Modals
            shareModal: '#shareModal',
            settingsModal: '#settingsModal',
            shareLink: '#shareLink',
            copyShareLink: '#copyShareLink',
            
            // File input
            importInput: '#importInput'
        };
        
        Object.entries(selectors).forEach(([key, selector]) => {
            this.elements[key] = document.querySelector(selector);
        });
        
        // Cache file tabs and device buttons
        this.elements.fileTabs = document.querySelectorAll('.file-tab');
        this.elements.deviceBtns = document.querySelectorAll('.device-btn');
        this.elements.snippetCategoryBtns = document.querySelectorAll('.snippet-category-btn');
    }
    
    async initializeManagers() {
        // Initialize storage manager
        this.storageManager = new StorageManager();
        
        // Initialize template manager
        this.templateManager = new TemplateManager();
        
        // Initialize editor manager
        this.editorManager = new EditorManager();
        
        // Wait for editor to be ready
        let attempts = 0;
        const maxAttempts = 100;
        
        while (!this.editorManager.isInitialized && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!this.editorManager.isInitialized) {
            throw new Error('Editor initialization timeout');
        }
        
        // Setup editor change handler
        this.editorManager.onChange(() => {
            this.handleCodeChange();
        });
        
        // Setup cursor position handler
        this.editorManager.onCursorPositionChanged((e) => {
            this.updateCursorPosition(e);
        });
    }
    
    initializeUI() {
        // Initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Load settings
        this.loadSettings();
        
        // Setup theme
        this.initializeTheme();
        
        // Load templates dropdown
        this.loadTemplatesDropdown();
        
        // Load code snippets
        this.loadCodeSnippets();
        
        // Initialize console
        this.initializeConsole();
        
        // Update UI state
        this.updateUIState();
    }
    
    // ==========================================================================
    // PROJECT MANAGEMENT
    // ==========================================================================
    
    loadProject() {
        // Try to load shared project first
        const sharedProject = this.storageManager.loadFromShareableLink();
        if (sharedProject) {
            this.currentProject = { ...this.currentProject, ...sharedProject };
            this.showToast('Project loaded from shared link!', 'success');
        } else {
            // Load from storage
            const savedProject = this.storageManager.loadProject();
            if (savedProject) {
                this.currentProject = { ...this.currentProject, ...savedProject };
            }
        }
        
        // Switch to active file and load content
        this.switchFile(this.currentProject.activeFile || 'html');
        this.updatePreview();
        
        // Clear modified files indicator
        this.modifiedFiles.clear();
        this.updateFileTabsIndicator();
    }
    
    saveProject() {
        // Update current file content
        this.currentProject.files[this.currentProject.activeFile] = this.editorManager.getValue();
        this.currentProject.lastModified = new Date().toISOString();
        
        // Save to storage
        if (this.storageManager.saveProject(this.currentProject)) {
            this.modifiedFiles.clear();
            this.updateFileTabsIndicator();
            this.showToast('Project saved successfully!', 'success');
        } else {
            this.showToast('Failed to save project', 'error');
        }
    }
    
    clearProject() {
        if (confirm('Are you sure you want to clear the current project? This action cannot be undone.')) {
            const defaultProject = this.storageManager.getDefaultProject();
            this.currentProject = defaultProject;
            
            // Update editor
            this.switchFile('html');
            Object.keys(this.currentProject.files).forEach(fileType => {
                if (fileType === this.currentProject.activeFile) {
                    this.editorManager.setValue(this.currentProject.files[fileType]);
                }
            });
            
            // Update preview
            this.updatePreview();
            
            // Clear indicators
            this.modifiedFiles.clear();
            this.updateFileTabsIndicator();
            
            this.showToast('Project cleared', 'info');
        }
    }
    
    exportProject() {
        try {
            // Update current file
            this.currentProject.files[this.currentProject.activeFile] = this.editorManager.getValue();
            
            // Create download files
            this.downloadProjectFiles();
            
            this.showToast('Project exported successfully!', 'success');
        } catch (error) {
            console.error('Export error:', error);
            this.showToast('Failed to export project', 'error');
        }
    }
    
    downloadProjectFiles() {
        const files = {
            'index.html': this.currentProject.files.html,
            'style.css': this.currentProject.files.css,
            'script.js': this.currentProject.files.js
        };
        
        // Download each file individually (since we can't use JSZip)
        Object.entries(files).forEach(([filename, content], index) => {
            setTimeout(() => {
                this.downloadFile(content, filename);
            }, index * 200);
        });
    }
    
    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // ==========================================================================
    // FILE MANAGEMENT
    // ==========================================================================
    
    switchFile(fileType) {
        if (fileType === this.currentProject.activeFile) return;
        
        // Save current file content
        this.currentProject.files[this.currentProject.activeFile] = this.editorManager.getValue();
        
        // Switch to new file
        this.currentProject.activeFile = fileType;
        this.editorManager.switchFile(fileType);
        this.editorManager.setValue(this.currentProject.files[fileType] || '');
        
        // Update UI
        this.updateFileTabsActive();
        this.updateLanguageInfo();
        
        // Store preference
        this.settings.lastActiveFile = fileType;
        this.saveSettings();
    }
    
    updateFileTabsActive() {
        this.elements.fileTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.file === this.currentProject.activeFile) {
                tab.classList.add('active');
            }
        });
    }
    
    updateFileTabsIndicator() {
        this.elements.fileTabs.forEach(tab => {
            const fileType = tab.dataset.file;
            if (this.modifiedFiles.has(fileType)) {
                tab.classList.add('modified');
            } else {
                tab.classList.remove('modified');
            }
        });
    }
    
    // ==========================================================================
    // CODE EXECUTION & PREVIEW
    // ==========================================================================
    
    handleCodeChange() {
        // Mark current file as modified
        this.modifiedFiles.add(this.currentProject.activeFile);
        this.updateFileTabsIndicator();
        
        // Update current file content
        this.currentProject.files[this.currentProject.activeFile] = this.editorManager.getValue();
        
        // Trigger live preview if enabled
        if (this.settings.livePreview) {
            this.schedulePreviewUpdate();
        }
        
        // Schedule auto-save
        this.scheduleAutoSave();
    }
    
    schedulePreviewUpdate() {
        clearTimeout(this.previewUpdateTimeout);
        this.previewUpdateTimeout = setTimeout(() => {
            this.updatePreview();
        }, 500);
    }
    
    scheduleAutoSave() {
        if (!this.settings.autoSave) return;
        
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveProject();
        }, 3000);
    }
    
    runCode() {
        // Force preview update
        this.updatePreview();
        this.showToast('Code executed!', 'success');
    }
    
    updatePreview() {
        if (!this.elements.previewFrame) return;
        
        try {
            // Show loading indicator
            this.setPreviewStatus('loading', 'Updating...');
            
            // Build complete HTML
            const htmlContent = this.buildPreviewHTML();
            
            // Create blob URL and update iframe
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            // Handle iframe load
            this.elements.previewFrame.onload = () => {
                URL.revokeObjectURL(url);
                this.setPreviewStatus('success', 'Ready');
                this.setupPreviewConsole();
            };
            
            this.elements.previewFrame.onerror = () => {
                this.setPreviewStatus('error', 'Error');
            };
            
            // Update iframe
            this.elements.previewFrame.src = url;
            
        } catch (error) {
            console.error('Preview update error:', error);
            this.setPreviewStatus('error', 'Error');
            this.showToast('Failed to update preview', 'error');
        }
    }
    
    buildPreviewHTML() {
        const html = this.currentProject.files.html || '';
        const css = this.currentProject.files.css || '';
        const js = this.currentProject.files.js || '';
        
        // Extract existing head and body content
        const htmlDoc = new DOMParser().parseFromString(html, 'text/html');
        const head = htmlDoc.head?.innerHTML || '';
        const body = htmlDoc.body?.innerHTML || html;
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview - Hafis Code Playground</title>
    <style>
        ${css}
    </style>
    ${head}
</head>
<body>
    ${body}
    <script>
        // Console capture
        (function() {
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            const originalInfo = console.info;
            
            function sendToParent(type, args) {
                try {
                    window.parent.postMessage({
                        type: 'console',
                        level: type,
                        message: Array.from(args).map(arg => 
                            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                        ).join(' '),
                        timestamp: new Date().toLocaleTimeString()
                    }, '*');
                } catch (e) {
                    // Ignore errors when posting to parent
                }
            }
            
            console.log = function(...args) {
                originalLog.apply(console, args);
                sendToParent('log', args);
            };
            
            console.error = function(...args) {
                originalError.apply(console, args);
                sendToParent('error', args);
            };
            
            console.warn = function(...args) {
                originalWarn.apply(console, args);
                sendToParent('warn', args);
            };
            
            console.info = function(...args) {
                originalInfo.apply(console, args);
                sendToParent('info', args);
            };
            
            // Capture errors
            window.addEventListener('error', function(e) {
                sendToParent('error', [e.message + ' at ' + e.filename + ':' + e.lineno]);
            });
            
            window.addEventListener('unhandledrejection', function(e) {
                sendToParent('error', ['Unhandled Promise Rejection:', e.reason]);
            });
        })();
        
        // User code
        try {
            ${js}
        } catch (error) {
            console.error('JavaScript Error:', error.message);
        }
    </script>
</body>
</html>`;
    }
    
    setupPreviewConsole() {
        // Listen for console messages from preview iframe
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'console') {
                this.addConsoleMessage(
                    event.data.level,
                    event.data.message,
                    event.data.timestamp
                );
            }
        });
    }
    
    setPreviewStatus(status, text) {
        if (this.elements.previewStatus && this.elements.previewStatusText) {
            this.elements.previewStatus.className = 'w-2 h-2 rounded-full';
            this.elements.previewStatusText.textContent = text;
            
            switch (status) {
                case 'loading':
                    this.elements.previewStatus.classList.add('bg-yellow-500');
                    break;
                case 'success':
                    this.elements.previewStatus.classList.add('bg-green-500');
                    break;
                case 'error':
                    this.elements.previewStatus.classList.add('bg-red-500');
                    break;
                default:
                    this.elements.previewStatus.classList.add('bg-gray-500');
            }
        }
    }
    
    // ==========================================================================
    // CONSOLE MANAGEMENT
    // ==========================================================================
    
    initializeConsole() {
        this.consoleMessages = [];
        this.updateConsoleCount();
    }
    
    addConsoleMessage(level, message, timestamp) {
        const consoleMessage = {
            id: Date.now() + Math.random(),
            level: level || 'log',
            message: message || '',
            timestamp: timestamp || new Date().toLocaleTimeString(),
            time: Date.now()
        };
        
        this.consoleMessages.push(consoleMessage);
        this.renderConsoleMessage(consoleMessage);
        this.updateConsoleCount();
        
        // Auto-scroll to bottom
        if (this.elements.consoleOutput) {
            this.elements.consoleOutput.scrollTop = this.elements.consoleOutput.scrollHeight;
        }
    }
    
    renderConsoleMessage(message) {
        if (!this.elements.consoleOutput) return;
        
        const messageEl = document.createElement('div');
        messageEl.className = `console-message console-${message.level}`;
        messageEl.innerHTML = `
            <span class="timestamp">${message.timestamp}</span>
            <span class="content">${this.escapeHtml(message.message)}</span>
        `;
        
        this.elements.consoleOutput.appendChild(messageEl);
        
        // Limit console messages
        const messages = this.elements.consoleOutput.querySelectorAll('.console-message');
        if (messages.length > 100) {
            messages[0].remove();
            this.consoleMessages.shift();
        }
    }
    
    clearConsole() {
        this.consoleMessages = [];
        if (this.elements.consoleOutput) {
            this.elements.consoleOutput.innerHTML = `
                <div class="text-gray-500 flex items-center">
                    <i data-lucide="info" class="w-3 h-3 mr-2"></i>
                    Console cleared - output will appear here...
                </div>
            `;
        }
        this.updateConsoleCount();
        
        // Re-initialize icons
        if (window.lucide) {
            lucide.createIcons();
        }
    }
    
    updateConsoleCount() {
        if (this.elements.consoleCount) {
            this.elements.consoleCount.textContent = this.consoleMessages.length;
        }
    }
    
    // ==========================================================================
    // TEMPLATES & SNIPPETS
    // ==========================================================================
    
    loadTemplatesDropdown() {
        if (!this.elements.templateSelect) return;
        
        const templates = this.templateManager.getAllTemplates();
        this.elements.templateSelect.innerHTML = '<option value="">Select Template</option>';
        
        templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.id;
            option.textContent = template.name;
            this.elements.templateSelect.appendChild(option);
        });
    }
    
    loadTemplate(templateId) {
        if (!templateId) return;
        
        const template = this.templateManager.getTemplate(templateId);
        if (!template) return;
        
        if (confirm(`Load "${template.name}" template? This will replace your current code.`)) {
            this.currentProject.files = { ...template.files };
            this.currentProject.projectName = template.name;
            
            // Update editor
            this.editorManager.setValue(this.currentProject.files[this.currentProject.activeFile]);
            
            // Update preview
            this.updatePreview();
            
            // Mark all files as modified
            this.modifiedFiles = new Set(['html', 'css', 'js']);
            this.updateFileTabsIndicator();
            
            // Reset template selector
            this.elements.templateSelect.value = '';
            
            this.showToast(`Template "${template.name}" loaded!`, 'success');
        } else {
            // Reset selector
            this.elements.templateSelect.value = '';
        }
    }
    
    loadCodeSnippets() {
        if (!this.elements.snippetsList) return;
        
        const snippets = this.templateManager.getAllSnippets();
        this.renderSnippets(snippets);
    }
    
    renderSnippets(snippets, category = 'all') {
        if (!this.elements.snippetsList) return;
        
        const filteredSnippets = category === 'all' 
            ? snippets 
            : snippets.filter(snippet => snippet.type === category);
        
        this.elements.snippetsList.innerHTML = '';
        
        if (filteredSnippets.length === 0) {
            this.elements.snippetsList.innerHTML = `
                <div class="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    No snippets found for "${category}"
                </div>
            `;
            return;
        }
        
        filteredSnippets.forEach(snippet => {
            const snippetEl = document.createElement('div');
            snippetEl.className = 'snippet-item';
            snippetEl.innerHTML = `
                <h4>${snippet.title}</h4>
                <p>${snippet.description}</p>
                <div class="snippet-meta">
                    <span class="snippet-type ${snippet.type}">${snippet.type.toUpperCase()}</span>
                    <i data-lucide="plus" class="w-3 h-3"></i>
                </div>
            `;
            
            snippetEl.addEventListener('click', () => {
                this.insertSnippet(snippet);
            });
            
            this.elements.snippetsList.appendChild(snippetEl);
        });
        
        // Re-initialize icons
        if (window.lucide) {
            lucide.createIcons();
        }
    }
    
    insertSnippet(snippet) {
        if (!snippet || !this.editorManager) return;
        
        // Insert snippet code at cursor position
        this.editorManager.insertText('\n' + snippet.code + '\n');
        
        // Show toast
        this.showToast(`Snippet "${snippet.title}" inserted!`, 'success');
        
        // Focus editor
        if (this.editorManager.editor) {
            this.editorManager.editor.focus();
        }
    }
    
    // ==========================================================================
    // EVENT HANDLERS
    // ==========================================================================
    
    bindEvents() {
        // File tabs
        this.elements.fileTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchFile(tab.dataset.file);
            });
        });
        
        // Main controls
        if (this.elements.runBtn) {
            this.elements.runBtn.addEventListener('click', () => this.runCode());
        }
        
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        if (this.elements.livePreviewToggle) {
            this.elements.livePreviewToggle.addEventListener('click', () => this.toggleLivePreview());
        }
        
        if (this.elements.templateSelect) {
            this.elements.templateSelect.addEventListener('change', (e) => {
                this.loadTemplate(e.target.value);
            });
        }
        
        // More menu
        if (this.elements.moreBtn) {
            this.elements.moreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMoreMenu();
            });
        }
        
        // Menu actions
        const menuActions = {
            saveBtn: () => this.saveProject(),
            exportBtn: () => this.exportProject(),
            importBtn: () => this.importProject(),
            shareBtn: () => this.shareProject(),
            clearBtn: () => this.clearProject(),
            historyBtn: () => this.showHistory(),
            settingsBtn: () => this.showSettings()
        };
        
        Object.entries(menuActions).forEach(([btnId, handler]) => {
            const btn = this.elements[btnId];
            if (btn) {
                btn.addEventListener('click', handler);
            }
        });
        
        // Preview controls
        if (this.elements.refreshPreview) {
            this.elements.refreshPreview.addEventListener('click', () => this.updatePreview());
        }
        
        if (this.elements.openInNewTab) {
            this.elements.openInNewTab.addEventListener('click', () => this.openPreviewInNewTab());
        }
        
        if (this.elements.clearConsole) {
            this.elements.clearConsole.addEventListener('click', () => this.clearConsole());
        }
        
        // Device buttons
        this.elements.deviceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setPreviewMode(btn.dataset.device);
            });
        });
        
        // Snippet category buttons
        this.elements.snippetCategoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterSnippets(btn.dataset.category);
            });
        });
        
        // Editor controls
        if (this.elements.formatBtn) {
            this.elements.formatBtn.addEventListener('click', () => this.formatCode());
        }
        
        if (this.elements.findBtn) {
            this.elements.findBtn.addEventListener('click', () => this.showFind());
        }
        
        if (this.elements.wordWrapBtn) {
            this.elements.wordWrapBtn.addEventListener('click', () => this.toggleWordWrap());
        }
        
        // Global events
        document.addEventListener('click', (e) => this.handleGlobalClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        window.addEventListener('beforeunload', () => this.handleBeforeUnload());
        window.addEventListener('resize', () => this.handleResize());
        
        // File import
        if (this.elements.importInput) {
            this.elements.importInput.addEventListener('change', (e) => this.handleFileImport(e));
        }
        
        // Modal events
        this.bindModalEvents();
    }
    
    handleGlobalClick(e) {
        // Close more menu when clicking outside
        if (!e.target.closest('#moreBtn') && !e.target.closest('#moreMenu')) {
            this.hideMoreMenu();
        }
        
        // Close modals when clicking overlay
        if (e.target.classList.contains('modal-overlay')) {
            this.hideAllModals();
        }
    }
    
    handleKeyboardShortcuts(e) {
        // Prevent default browser shortcuts that we're overriding
        if ((e.ctrlKey || e.metaKey)) {
            switch (e.key.toLowerCase()) {
                case 's':
                    e.preventDefault();
                    this.saveProject();
                    break;
                case 'enter':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.runCode();
                    }
                    break;
                case 'f':
                    if (e.shiftKey) {
                        e.preventDefault();
                        this.formatCode();
                    }
                    break;
                case 'c':
                    if (e.shiftKey) {
                        e.preventDefault();
                        this.clearProject();
                    }
                    break;
            }
        }
        
        // Theme toggle with Ctrl+Shift+T
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            this.toggleTheme();
        }
    }
    
    handleBeforeUnload() {
        // Auto-save on page unload
        if (this.modifiedFiles.size > 0) {
            this.saveProject();
        }
    }
    
    handleResize() {
        // Handle responsive changes
        if (this.editorManager && this.editorManager.editor) {
            this.editorManager.editor.layout();
        }
    }
    
    // ==========================================================================
    // UI STATE MANAGEMENT
    // ==========================================================================
    
    updateUIState() {
        this.updateFileTabsActive();
        this.updateFileTabsIndicator();
        this.updateLanguageInfo();
        this.updatePreviewModeButtons();
        this.updateLivePreviewToggle();
        this.updateConsoleCount();
    }
    
    updateLanguageInfo() {
        if (this.elements.languageInfo) {
            const languages = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
            this.elements.languageInfo.textContent = languages[this.currentProject.activeFile] || 'Unknown';
        }
    }
    
    updateCursorPosition(e) {
        if (this.elements.cursorPosition && e.position) {
            this.elements.cursorPosition.textContent = `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
        }
    }
    
    updatePreviewModeButtons() {
        this.elements.deviceBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.device === this.settings.previewMode) {
                btn.classList.add('active');
            }
        });
    }
    
    updateLivePreviewToggle() {
        if (this.elements.livePreviewToggle) {
            if (this.settings.livePreview) {
                this.elements.livePreviewToggle.classList.add('text-primary-600', 'bg-primary-50', 'dark:bg-primary-900/20');
                this.elements.livePreviewToggle.classList.remove('text-gray-600', 'dark:text-gray-300');
            } else {
                this.elements.livePreviewToggle.classList.remove('text-primary-600', 'bg-primary-50', 'dark:bg-primary-900/20');
                this.elements.livePreviewToggle.classList.add('text-gray-600', 'dark:text-gray-300');
            }
        }
    }
    
    // ==========================================================================
    // HELPER METHODS
    // ==========================================================================
    
    showLoading(show) {
        if (this.elements.loadingScreen) {
            if (show) {
                this.elements.loadingScreen.classList.remove('hidden');
            } else {
                setTimeout(() => {
                    this.elements.loadingScreen.classList.add('hidden');
                }, 500);
            }
        }
        this.isLoading = show;
    }
    
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'check',
            error: 'x',
            warning: 'alert-triangle',
            info: 'info'
        };
        
        toast.innerHTML = `
            <i data-lucide="${icons[type] || 'info'}" class="toast-icon"></i>
            <div class="toast-content">
                <div class="toast-message">${this.escapeHtml(message)}</div>
            </div>
            <i data-lucide="x" class="toast-close"></i>
        `;
        
        // Add to container
        const container = document.getElementById('toastContainer') || document.body;
        container.appendChild(toast);
        
        // Initialize icons
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.removeToast(toast));
        }
        
        // Auto remove
        setTimeout(() => this.removeToast(toast), duration);
    }
    
    removeToast(toast) {
        if (toast && toast.parentNode) {
            toast.classList.add('removing');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // ==========================================================================
    // PLACEHOLDER METHODS (to be implemented)
    // ==========================================================================
    
    // Theme management
    initializeTheme() {
        const savedTheme = this.storageManager.getTheme();
        this.settings.theme = savedTheme;
        this.applyTheme(savedTheme);
    }
    
    toggleTheme() {
        const newTheme = this.settings.theme === 'light' ? 'dark' : 'light';
        this.settings.theme = newTheme;
        this.applyTheme(newTheme);
        this.saveSettings();
        this.showToast(`Switched to ${newTheme} theme`, 'info');
    }
    
    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Update editor theme
        if (this.editorManager) {
            this.editorManager.setTheme(theme);
        }
        
        // Store theme
        this.storageManager.setTheme(theme);
    }
    
    // Settings management
    loadSettings() {
        const saved = this.storageManager.getPreferences();
        if (saved) {
            this.settings = { ...this.settings, ...saved };
        }
    }
    
    saveSettings() {
        this.storageManager.setPreferences(this.settings);
    }
    
    setupAutoSave() {
        if (this.settings.autoSave) {
            this.storageManager.startAutoSave(() => {
                this.currentProject.files[this.currentProject.activeFile] = this.editorManager.getValue();
                return this.currentProject;
            });
        }
    }
    
    // More methods to be implemented in the next part...
    toggleMoreMenu() {
        if (this.elements.moreMenu) {
            this.elements.moreMenu.classList.toggle('hidden');
        }
    }
    
    hideMoreMenu() {
        if (this.elements.moreMenu) {
            this.elements.moreMenu.classList.add('hidden');
        }
    }
    
    toggleLivePreview() {
        this.settings.livePreview = !this.settings.livePreview;
        this.updateLivePreviewToggle();
        this.saveSettings();
        
        const message = this.settings.livePreview ? 'Live preview enabled' : 'Live preview disabled';
        this.showToast(message, 'info');
    }
    
    setPreviewMode(mode) {
        this.settings.previewMode = mode;
        this.updatePreviewModeButtons();
        
        if (this.elements.previewWrapper) {
            this.elements.previewWrapper.className = `preview-${mode} w-full h-full transition-all duration-300`;
        }
        
        this.saveSettings();
    }
    
    filterSnippets(category) {
        // Update active category button
        this.elements.snippetCategoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        // Filter and render snippets
        const snippets = this.templateManager.getAllSnippets();
        this.renderSnippets(snippets, category);
    }
    
    formatCode() {
        if (this.editorManager) {
            this.editorManager.formatDocument();
            this.showToast('Code formatted', 'success');
        }
    }
    
    showFind() {
        if (this.editorManager) {
            this.editorManager.find();
        }
    }
    
    toggleWordWrap() {
        if (this.editorManager) {
            this.editorManager.toggleWordWrap();
            this.showToast('Word wrap toggled', 'info');
        }
    }
    
    // Placeholder methods - implement in next iteration
    handleSharedProject() {
        // Check URL hash for shared projects
        const hash = window.location.hash;
        if (hash.startsWith('#share=')) {
            // Clear hash from URL
            window.history.replaceState(null, null, window.location.pathname);
        }
    }
    
    showWelcomeMessage() {
        setTimeout(() => {
            this.showToast('Welcome to Hafis Code Playground! 🚀', 'success', 5000);
        }, 1000);
    }
    
    // More methods to be implemented...
    importProject() { console.log('Import project - to be implemented'); }
    shareProject() { console.log('Share project - to be implemented'); }
    showHistory() { console.log('Show history - to be implemented'); }
    showSettings() { console.log('Show settings - to be implemented'); }
    openPreviewInNewTab() { console.log('Open in new tab - to be implemented'); }
    handleFileImport() { console.log('Handle file import - to be implemented'); }
    bindModalEvents() { console.log('Bind modal events - to be implemented'); }
    hideAllModals() { console.log('Hide all modals - to be implemented'); }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.playground = new HafisCodePlayground();
});

// Export for global access
window.HafisCodePlayground = HafisCodePlayground;