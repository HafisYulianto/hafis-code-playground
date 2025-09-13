/**
 * Monaco Editor Configuration for Hafis Code Playground
 * Handles editor setup, themes, language support, and advanced features
 * Author: Hafis Yulianto
 */

class EditorManager {
    constructor() {
        this.editor = null;
        this.currentFile = 'html';
        this.container = document.getElementById('editorContainer');
        this.isInitialized = false;
        this.onChangeCallback = null;
        this.onCursorChangeCallback = null;
        
        // Editor configuration
        this.config = {
            fontSize: 14,
            fontFamily: 'Fira Code, Monaco, Cascadia Code, Roboto Mono, monospace',
            tabSize: 2,
            wordWrap: 'on',
            theme: 'vs-dark',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            formatOnPaste: true,
            formatOnType: true,
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoSurround: 'brackets',
            folding: true,
            showFoldingControls: 'mouseover',
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            snippetSuggestions: 'top',
            quickSuggestions: {
                other: true,
                comments: false,
                strings: false
            },
            bracketPairColorization: { enabled: true },
            guides: {
                bracketPairs: true,
                bracketPairsHorizontal: true,
                highlightActiveIndentation: true,
                indentation: true
            },
            hover: { enabled: true, delay: 300 },
            parameterHints: { enabled: true },
            contextmenu: true,
            mouseWheelZoom: true,
            multiCursorModifier: 'alt',
            selectionHighlight: true,
            occurrencesHighlight: true,
            renderLineHighlight: 'all',
            highlightActiveIndentGuide: true
        };
        
        // Language configurations
        this.languages = {
            html: 'html',
            css: 'css',
            js: 'javascript'
        };
        
        // Theme configurations
        this.themes = {
            light: 'vs',
            dark: 'vs-dark'
        };
        
        // Custom themes
        this.customThemes = {};
        
        this.init();
    }
    
    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    
    async init() {
        try {
            console.log('🎨 Initializing Monaco Editor...');
            
            // Load Monaco Editor
            await this.loadMonaco();
            
            // Configure Monaco
            await this.configureMonaco();
            
            // Create editor instance
            await this.createEditor();
            
            // Setup features
            this.setupLanguageFeatures();
            this.setupKeyboardShortcuts();
            this.setupCustomThemes();
            
            this.isInitialized = true;
            console.log('✅ Monaco Editor initialized successfully!');
            
        } catch (error) {
            console.error('❌ Failed to initialize Monaco Editor:', error);
            this.fallbackToTextarea();
        }
    }
    
    loadMonaco() {
        return new Promise((resolve, reject) => {
            // Check if Monaco is already loaded
            if (window.monaco) {
                resolve();
                return;
            }
            
            // Configure require.js
            require.config({ 
                paths: { 
                    'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs'
                },
                'vs/nls': {
                    availableLanguages: {
                        '*': 'en'
                    }
                }
            });
            
            // Load Monaco Editor main module
            require(['vs/editor/editor.main'], () => {
                console.log('📦 Monaco Editor modules loaded');
                resolve();
            }, (error) => {
                console.error('Failed to load Monaco Editor:', error);
                reject(error);
            });
        });
    }
    
    async configureMonaco() {
        if (!window.monaco) throw new Error('Monaco not available');
        
        // Configure JavaScript/TypeScript defaults
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
            noSuggestionDiagnostics: false
        });
        
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            allowJs: true,
            lib: ['ES2020', 'DOM'],
            typeRoots: ['node_modules/@types']
        });
        
        // Add extra libraries for better IntelliSense
        const extraLibs = [
            // DOM types
            `declare var document: Document;
declare var window: Window;
declare var console: Console;
declare var localStorage: Storage;
declare var sessionStorage: Storage;`,
            
            // Common JavaScript APIs
            `declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
declare function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
declare function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
declare function clearTimeout(handle?: number): void;
declare function clearInterval(handle?: number): void;`
        ];
        
        extraLibs.forEach((lib, index) => {
            monaco.languages.typescript.javascriptDefaults.addExtraLib(
                lib,
                `ts:lib.extra${index}.d.ts`
            );
        });
        
        console.log('⚙️ Monaco Editor configured');
    }
    
    async createEditor() {
        if (!this.container) throw new Error('Editor container not found');
        
        this.editor = monaco.editor.create(this.container, {
            value: '',
            language: this.languages[this.currentFile],
            theme: this.config.theme,
            ...this.config
        });
        
        console.log('📝 Editor instance created');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Focus editor
        setTimeout(() => {
            if (this.editor) {
                this.editor.focus();
            }
        }, 100);
    }
    
    setupEventListeners() {
        if (!this.editor) return;
        
        // Content change
        this.editor.onDidChangeModelContent((e) => {
            if (this.onChangeCallback) {
                this.onChangeCallback(e);
            }
        });
        
        // Cursor position change
        this.editor.onDidChangeCursorPosition((e) => {
            if (this.onCursorChangeCallback) {
                this.onCursorChangeCallback(e);
            }
        });
        
        // Focus events
        this.editor.onDidFocusEditorWidget(() => {
            console.log('Editor focused');
        });
        
        this.editor.onDidBlurEditorWidget(() => {
            console.log('Editor blurred');
        });
    }
    
    // ==========================================================================
    // LANGUAGE FEATURES & CODE COMPLETION
    // ==========================================================================
    
    setupLanguageFeatures() {
        this.setupHTMLFeatures();
        this.setupCSSFeatures();
        this.setupJavaScriptFeatures();
        console.log('🌐 Language features configured');
    }
    
    setupHTMLFeatures() {
        // Custom HTML snippets and completions
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };
                
                const suggestions = [
                    {
                        label: 'html5',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            '<!DOCTYPE html>',
                            '<html lang="en">',
                            '<head>',
                            '    <meta charset="UTF-8">',
                            '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
                            '    <title>${1:Document}</title>',
                            '    <style>',
                            '        ${2}',
                            '    </style>',
                            '</head>',
                            '<body>',
                            '    ${3}',
                            '    <script>',
                            '        ${4}',
                            '    </script>',
                            '</body>',
                            '</html>'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete HTML5 boilerplate',
                        range: range
                    },
                    {
                        label: 'div.class',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div class="${1:className}">\n    ${2}\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Div element with class',
                        range: range
                    },
                    {
                        label: 'div#id',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div id="${1:idName}">\n    ${2}\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Div element with ID',
                        range: range
                    },
                    {
                        label: 'button',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<button type="${1:button}" onclick="${2:handleClick()}">\n    ${3:Click me}\n</button>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Interactive button element',
                        range: range
                    },
                    {
                        label: 'form',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            '<form action="${1:#}" method="${2:post}" onsubmit="${3:handleSubmit(event)}">',
                            '    <div class="form-group">',
                            '        <label for="${4:inputId}">${5:Label}</label>',
                            '        <input type="${6:text}" id="${4:inputId}" name="${7:inputName}" required>',
                            '    </div>',
                            '    <button type="submit">${8:Submit}</button>',
                            '</form>'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Form with input and submit button',
                        range: range
                    },
                    {
                        label: 'nav',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            '<nav class="${1:navbar}">',
                            '    <div class="${2:nav-container}">',
                            '        <a href="#" class="${3:logo}">${4:Logo}</a>',
                            '        <ul class="${5:nav-menu}">',
                            '            <li><a href="#" class="${6:nav-link}">${7:Home}</a></li>',
                            '            <li><a href="#" class="${6:nav-link}">${8:About}</a></li>',
                            '            <li><a href="#" class="${6:nav-link}">${9:Contact}</a></li>',
                            '        </ul>',
                            '    </div>',
                            '</nav>'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Navigation bar structure',
                        range: range
                    }
                ];
                
                return { suggestions };
            }
        });
        
        // HTML formatting provider
        monaco.languages.registerDocumentFormattingEditProvider('html', {
            provideDocumentFormattingEdits: (model) => {
                // Basic HTML formatting - Monaco has built-in formatting
                return [];
            }
        });
    }
    
    setupCSSFeatures() {
        // Custom CSS snippets and completions
        monaco.languages.registerCompletionItemProvider('css', {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };
                
                const suggestions = [
                    {
                        label: 'flexcenter',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'display: flex;',
                            'align-items: center;',
                            'justify-content: center;'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox center alignment',
                        range: range
                    },
                    {
                        label: 'flexbetween',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'display: flex;',
                            'align-items: center;',
                            'justify-content: space-between;'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox space-between alignment',
                        range: range
                    },
                    {
                        label: 'gradient',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'background: linear-gradient(${1:135deg}, ${2:#667eea} ${3:0%}, ${4:#764ba2} ${5:100%});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Linear gradient background',
                        range: range
                    },
                    {
                        label: 'transition',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'transition: ${1:all} ${2:0.3s} ${3:ease};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS transition',
                        range: range
                    },
                    {
                        label: 'animation',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'animation: ${1:animationName} ${2:1s} ${3:ease-in-out} ${4:infinite};',
                            '',
                            '@keyframes ${1:animationName} {',
                            '    0% {',
                            '        ${5:transform: scale(1);}',
                            '    }',
                            '    50% {',
                            '        ${6:transform: scale(1.1);}',
                            '    }',
                            '    100% {',
                            '        ${5:transform: scale(1);}',
                            '    }',
                            '}'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS animation with keyframes',
                        range: range
                    },
                    {
                        label: 'grid',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'display: grid;',
                            'grid-template-columns: ${1:repeat(3, 1fr)};',
                            'gap: ${2:1rem};'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Grid layout',
                        range: range
                    },
                    {
                        label: 'shadow',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'box-shadow: ${1:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Box shadow',
                        range: range
                    },
                    {
                        label: 'responsive',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            '/* Mobile First */',
                            '@media (min-width: ${1:768px}) {',
                            '    ${2:/* Tablet styles */}',
                            '}',
                            '',
                            '@media (min-width: ${3:1024px}) {',
                            '    ${4:/* Desktop styles */}',
                            '}'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Responsive media queries',
                        range: range
                    }
                ];
                
                return { suggestions };
            }
        });
    }
    
    setupJavaScriptFeatures() {
        // Custom JavaScript snippets and completions
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };
                
                const suggestions = [
                    {
                        label: 'addEventListener',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: "addEventListener('${1:click}', (${2:event}) => {\n    ${3:// Handle event}\n});",
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Add event listener',
                        range: range
                    },
                    {
                        label: 'querySelector',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: "const ${1:element} = document.querySelector('${2:#id}');",
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Query selector',
                        range: range
                    },
                    {
                        label: 'querySelectorAll',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: "const ${1:elements} = document.querySelectorAll('${2:.class}');\n${1:elements}.forEach(${3:element} => {\n    ${4:// Process each element}\n});",
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Query selector all with forEach',
                        range: range
                    },
                    {
                        label: 'fetch',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            "fetch('${1:https://api.example.com/data}')",
                            "    .then(response => {",
                            "        if (!response.ok) {",
                            "            throw new Error('Network response was not ok');",
                            "        }",
                            "        return response.json();",
                            "    })",
                            "    .then(data => {",
                            "        ${2:console.log('Success:', data);}",
                            "    })",
                            "    .catch(error => {",
                            "        ${3:console.error('Error:', error);}",
                            "    });"
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Fetch API with error handling',
                        range: range
                    },
                    {
                        label: 'asyncfetch',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            "async function ${1:fetchData}() {",
                            "    try {",
                            "        const response = await fetch('${2:https://api.example.com/data}');",
                            "        if (!response.ok) {",
                            "            throw new Error('Network response was not ok');",
                            "        }",
                            "        const data = await response.json();",
                            "        ${3:console.log('Success:', data);}",
                            "        return data;",
                            "    } catch (error) {",
                            "        ${4:console.error('Error:', error);}",
                            "        throw error;",
                            "    }",
                            "}"
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Async/await fetch function',
                        range: range
                    },
                    {
                        label: 'domready',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            "document.addEventListener('DOMContentLoaded', () => {",
                            "    ${1:// DOM is fully loaded and parsed}",
                            "});"
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'DOM content loaded event',
                        range: range
                    },
                    {
                        label: 'class',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            "class ${1:ClassName} {",
                            "    constructor(${2:parameters}) {",
                            "        ${3:this.property = parameters;}",
                            "    }",
                            "",
                            "    ${4:methodName}() {",
                            "        ${5:// Method implementation}",
                            "    }",
                            "}"
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'ES6 class definition',
                        range: range
                    },
                    {
                        label: 'arrow',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: "const ${1:functionName} = (${2:parameters}) => {\n    ${3:return}\n};",
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Arrow function',
                        range: range
                    },
                    {
                        label: 'promise',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            "new Promise((resolve, reject) => {",
                            "    ${1:// Async operation}",
                            "    if (${2:condition}) {",
                            "        resolve(${3:result});",
                            "    } else {",
                            "        reject(${4:new Error('Something went wrong')});",
                            "    }",
                            "})"
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Promise constructor',
                        range: range
                    },
                    {
                        label: 'tryCatch',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            "try {",
                            "    ${1:// Code that might throw an error}",
                            "} catch (error) {",
                            "    ${2:console.error('Error:', error);}",
                            "} finally {",
                            "    ${3:// Optional cleanup code}",
                            "}"
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Try-catch-finally block',
                        range: range
                    }
                ];
                
                return { suggestions };
            }
        });
    }
    
    // ==========================================================================
    // KEYBOARD SHORTCUTS
    // ==========================================================================
    
    setupKeyboardShortcuts() {
        if (!this.editor) return;
        
        // Custom keyboard shortcuts
        const shortcuts = [
            {
                key: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
                handler: () => this.triggerRun(),
                description: 'Run code'
            },
            {
                key: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                handler: () => this.triggerSave(),
                description: 'Save project'
            },
            {
                key: monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyC,
                handler: () => this.triggerClear(),
                description: 'Clear project'
            },
            {
                key: monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF,
                handler: () => this.formatDocument(),
                description: 'Format document'
            },
            {
                key: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash,
                handler: () => this.toggleComment(),
                description: 'Toggle comment'
            },
            {
                key: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD,
                handler: () => this.duplicateLine(),
                description: 'Duplicate line'
            },
            {
                key: monaco.KeyMod.Alt | monaco.KeyCode.UpArrow,
                handler: () => this.moveLinesUp(),
                description: 'Move lines up'
            },
            {
                key: monaco.KeyMod.Alt | monaco.KeyCode.DownArrow,
                handler: () => this.moveLinesDown(),
                description: 'Move lines down'
            }
        ];
        
        shortcuts.forEach(shortcut => {
            this.editor.addCommand(shortcut.key, shortcut.handler);
        });
        
        console.log('⌨️ Keyboard shortcuts configured');
    }
    
    // ==========================================================================
    // CUSTOM THEMES
    // ==========================================================================
    
    setupCustomThemes() {
        // Hafis Dark Theme
        monaco.editor.defineTheme('hafis-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
                { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
                { token: 'type', foreground: '4EC9B0' },
                { token: 'class', foreground: '4EC9B0' },
                { token: 'function', foreground: 'DCDCAA' },
                { token: 'variable', foreground: '9CDCFE' },
                { token: 'tag', foreground: '569CD6' },
                { token: 'attribute.name', foreground: '92C5F7' },
                { token: 'attribute.value', foreground: 'CE9178' },
                { token: 'delimiter.html', foreground: '808080' },
                { token: 'delimiter.xml', foreground: '808080' }
            ],
            colors: {
                'editor.background': '#0f172a',
                'editor.foreground': '#e2e8f0',
                'editor.lineHighlightBackground': '#1e293b',
                'editor.selectionBackground': '#334155',
                'editor.inactiveSelectionBackground': '#1e293b',
                'editorCursor.foreground': '#6366f1',
                'editorLineNumber.foreground': '#64748b',
                'editorLineNumber.activeForeground': '#6366f1',
                'editor.selectionHighlightBackground': '#334155',
                'editor.wordHighlightBackground': '#475569',
                'editor.findMatchBackground': '#6366f1',
                'editor.findMatchHighlightBackground': '#4f46e5',
                'editorBracketMatch.background': '#475569',
                'editorBracketMatch.border': '#6366f1'
            }
        });
        
        // Hafis Light Theme
        monaco.editor.defineTheme('hafis-light', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '008000', fontStyle: 'italic' },
                { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'string', foreground: 'A31515' },
                { token: 'number', foreground: '098658' },
                { token: 'type', foreground: '267F99' },
                { token: 'class', foreground: '267F99' },
                { token: 'function', foreground: '795E26' },
                { token: 'variable', foreground: '001080' },
                { token: 'tag', foreground: '800000' },
                { token: 'attribute.name', foreground: 'FF0000' },
                { token: 'attribute.value', foreground: '0000FF' }
            ],
            colors: {
                'editor.background': '#ffffff',
                'editor.foreground': '#000000',
                'editor.lineHighlightBackground': '#f0f4f8',
                'editor.selectionBackground': '#b3d4fc',
                'editorCursor.foreground': '#6366f1',
                'editorLineNumber.foreground': '#6b7280',
                'editorLineNumber.activeForeground': '#6366f1',
                'editor.selectionHighlightBackground': '#e5e7eb',
                'editor.wordHighlightBackground': '#d1d5db',
                'editor.findMatchBackground': '#6366f1',
                'editor.findMatchHighlightBackground': '#4f46e5'
            }
        });
        
        this.customThemes = {
            'hafis-dark': 'hafis-dark',
            'hafis-light': 'hafis-light'
        };
        
        console.log('🎨 Custom themes configured');
    }
    
    // ==========================================================================
    // PUBLIC API METHODS
    // ==========================================================================
    
    // Content management
    setValue(content) {
        if (this.editor) {
            this.editor.setValue(content || '');
        }
    }
    
    getValue() {
        return this.editor ? this.editor.getValue() : '';
    }
    
    insertText(text) {
        if (!this.editor) return;
        
        const selection = this.editor.getSelection();
        const id = { major: 1, minor: 1 };
        const op = { 
            identifier: id, 
            range: selection, 
            text: text, 
            forceMoveMarkers: true 
        };
        
        this.editor.executeEdits('insert-text', [op]);
        this.editor.focus();
    }
    
    // File management
    switchFile(fileType) {
        if (!this.editor || fileType === this.currentFile) return;
        
        this.currentFile = fileType;
        const language = this.languages[fileType];
        
        if (language) {
            monaco.editor.setModelLanguage(this.editor.getModel(), language);
        }
        
        console.log(`Switched to ${fileType} (${language})`);
    }
    
    // Theme management
    setTheme(theme) {
        if (!this.editor) return;
        
        let monacoTheme;
        
        switch (theme) {
            case 'dark':
                monacoTheme = 'hafis-dark';
                break;
            case 'light':
                monacoTheme = 'hafis-light';
                break;
            default:
                monacoTheme = this.themes[theme] || 'vs-dark';
        }
        
        monaco.editor.setTheme(monacoTheme);
        this.config.theme = monacoTheme;
    }
    
    // Editor actions
    formatDocument() {
        if (this.editor) {
            this.editor.trigger('keyboard', 'editor.action.formatDocument', {});
        }
    }
    
    find() {
        if (this.editor) {
            this.editor.trigger('keyboard', 'actions.find', {});
        }
    }
    
    replace() {
        if (this.editor) {
            this.editor.trigger('keyboard', 'editor.action.startFindReplaceAction', {});
        }
    }
    
    toggleComment() {
        if (this.editor) {
            this.editor.trigger('keyboard', 'editor.action.commentLine', {});
        }
    }
    
    duplicateLine() {
        if (this.editor) {
            this.editor.trigger('keyboard', 'editor.action.copyLinesDownAction', {});
        }
    }
    
    moveLinesUp() {
        if (this.editor) {
            this.editor.trigger('keyboard', 'editor.action.moveLinesUpAction', {});
        }
    }
    
    moveLinesDown() {
        if (this.editor) {
            this.editor.trigger('keyboard', 'editor.action.moveLinesDownAction', {});
        }
    }
    
    toggleWordWrap() {
        if (!this.editor) return;
        
        const currentWrap = this.editor.getOption(monaco.editor.EditorOption.wordWrap);
        const newWrap = currentWrap === 'on' ? 'off' : 'on';
        
        this.editor.updateOptions({ wordWrap: newWrap });
        this.config.wordWrap = newWrap;
    }
    
    // Font size management
    increaseFontSize() {
        if (!this.editor) return;
        
        const currentSize = this.config.fontSize;
        const newSize = Math.min(currentSize + 2, 32);
        
        this.editor.updateOptions({ fontSize: newSize });
        this.config.fontSize = newSize;
    }
    
    decreaseFontSize() {
        if (!this.editor) return;
        
        const currentSize = this.config.fontSize;
        const newSize = Math.max(currentSize - 2, 10);
        
        this.editor.updateOptions({ fontSize: newSize });
        this.config.fontSize = newSize;
    }
    
    // Event handlers
    onChange(callback) {
        this.onChangeCallback = callback;
    }
    
    onCursorPositionChanged(callback) {
        this.onCursorChangeCallback = callback;
    }
    
    // Trigger methods (called by keyboard shortcuts)
    triggerRun() {
        const runBtn = document.getElementById('runBtn');
        if (runBtn) runBtn.click();
    }
    
    triggerSave() {
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) saveBtn.click();
    }
    
    triggerClear() {
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) clearBtn.click();
    }
    
    // Utility methods
    getCursorPosition() {
        if (!this.editor) return null;
        return this.editor.getPosition();
    }
    
    getSelection() {
        if (!this.editor) return null;
        return this.editor.getSelection();
    }
    
    focus() {
        if (this.editor) {
            this.editor.focus();
        }
    }
    
    layout() {
        if (this.editor) {
            this.editor.layout();
        }
    }
    
    // ==========================================================================
    // FALLBACK IMPLEMENTATION
    // ==========================================================================
    
    fallbackToTextarea() {
        console.warn('⚠️ Monaco Editor failed to load, using textarea fallback');
        
        if (!this.container) return;
        
        this.container.innerHTML = `
            <textarea 
                id="fallbackEditor" 
                class="w-full h-full p-4 border-0 font-code text-sm resize-none bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none"
                placeholder="Monaco Editor failed to load. You can still write code here..."
                spellcheck="false"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
            ></textarea>
        `;
        
        this.fallbackEditor = document.getElementById('fallbackEditor');
        
        // Implement basic functionality for fallback
        this.setValue = (content) => {
            if (this.fallbackEditor) {
                this.fallbackEditor.value = content || '';
            }
        };
        
        this.getValue = () => {
            return this.fallbackEditor ? this.fallbackEditor.value : '';
        };
        
        this.insertText = (text) => {
            if (!this.fallbackEditor) return;
            
            const start = this.fallbackEditor.selectionStart;
            const end = this.fallbackEditor.selectionEnd;
            const value = this.fallbackEditor.value;
            
            this.fallbackEditor.value = value.slice(0, start) + text + value.slice(end);
            this.fallbackEditor.selectionStart = this.fallbackEditor.selectionEnd = start + text.length;
            this.fallbackEditor.focus();
        };
        
        this.focus = () => {
            if (this.fallbackEditor) {
                this.fallbackEditor.focus();
            }
        };
        
        // Setup change events
        if (this.fallbackEditor) {
            this.fallbackEditor.addEventListener('input', () => {
                if (this.onChangeCallback) {
                    this.onChangeCallback();
                }
            });
            
            // Basic tab handling
            this.fallbackEditor.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = e.target.selectionStart;
                    const end = e.target.selectionEnd;
                    
                    e.target.value = e.target.value.substring(0, start) + '  ' + e.target.value.substring(end);
                    e.target.selectionStart = e.target.selectionEnd = start + 2;
                }
            });
        }
        
        this.isInitialized = true;
    }
    
    // Cleanup
    dispose() {
        if (this.editor) {
            this.editor.dispose();
        }
    }
}

// Export for global use
window.EditorManager = EditorManager;