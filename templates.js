/**
 * TemplateManager
 * Mengelola template project dan code snippets
 */
class TemplateManager {
    constructor() {
        this.templates = [
            {
                id: 'blank',
                name: 'Blank Project',
                files: {
                    html: '',
                    css: '',
                    js: ''
                }
            },
            {
                id: 'simple-html',
                name: 'Simple HTML',
                files: {
                    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Simple HTML</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>',
                    css: 'body { font-family: sans-serif; background: #f9f9f9; }',
                    js: 'console.log("Hello World!");'
                }
            },
            {
                id: 'responsive-page',
                name: 'Responsive Page',
                files: {
                    html: '<!DOCTYPE html>\n<html>\n<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Responsive</title>\n</head>\n<body>\n  <div class="container">\n    <h2>Responsive Layout</h2>\n    <p>This is a responsive starter template.</p>\n  </div>\n</body>\n</html>',
                    css: '.container { max-width: 600px; margin: 2rem auto; padding: 2rem; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }',
                    js: ''
                }
            }
        ];

        this.snippets = [
            {
                id: 'console-log',
                category: 'js',
                name: 'Console Log',
                code: 'console.log("Hello World!");',
                description: 'Print ke console',
                type: 'js'
            },
            {
                id: 'html-button',
                category: 'html',
                name: 'HTML Button',
                code: '<button class="btn">Click Me</button>',
                description: 'Tombol HTML sederhana',
                type: 'html'
            },
            {
                id: 'css-center',
                category: 'css',
                name: 'CSS Center',
                code: '.center { display: flex; justify-content: center; align-items: center; }',
                description: 'Flexbox center',
                type: 'css'
            }
        ];
    }

    getAllTemplates() {
        return this.templates;
    }
    getTemplate(id) {
        return this.templates.find(t => t.id === id);
    }
    getAllSnippets() {
        return this.snippets;
    }
    getSnippetsByCategory(category) {
        if (category === 'all') return this.snippets;
        return this.snippets.filter(s => s.category === category);
    }
    getSnippet(id) {
        return this.snippets.find(s => s.id === id);
    }
}

window.TemplateManager = TemplateManager;
