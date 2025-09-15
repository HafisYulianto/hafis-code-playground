/**
 * Templates and Code Snippets for Hafis Code Playground
 * Contains starter templates and reusable code snippets
 * Author: Hafis Yulianto
 */

class TemplateManager {
    constructor() {
        this.templates = this.initializeTemplates();
        this.snippets = this.initializeSnippets();
        console.log('📦 Template Manager initialized with', Object.keys(this.templates).length, 'templates and', this.snippets.length, 'snippets');
    }
    
    // ==========================================================================
    // STARTER TEMPLATES
    // ==========================================================================
    
    initializeTemplates() {
        return {
            blank: {
                name: "Blank Project",
                description: "Start with a clean slate - minimal HTML structure",
                category: "basic",
                difficulty: "beginner",
                files: {
                    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to Your Project!</h1>
    <p>Start coding here...</p>
    
    <script src="script.js"></script>
</body>
</html>`,
                    css: `/* Your CSS styles here */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    text-align: center;
    font-size: 18px;
}`,
                    js: `// Your JavaScript code here
console.log('Hello from Hafis Code Playground!');

// Add your interactive functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is ready!');
});`
                }
            },
            
            responsive_navbar: {
                name: "Responsive Navbar",
                description: "Modern responsive navigation bar with mobile hamburger menu",
                category: "component",
                difficulty: "intermediate",
                files: {
                    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Navbar</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <!-- Logo -->
            <div class="nav-logo">
                <a href="#" class="logo">🚀 YourBrand</a>
            </div>
            
            <!-- Navigation Menu -->
            <div class="nav-menu" id="navMenu">
                <a href="#home" class="nav-link active">Home</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#services" class="nav-link">Services</a>
                <a href="#portfolio" class="nav-link">Portfolio</a>
                <a href="#contact" class="nav-link">Contact</a>
            </div>
            
            <!-- Hamburger Menu -->
            <div class="hamburger" id="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>
    
    <!-- Main Content -->
    <main class="main-content">
        <section id="home" class="hero">
            <h1>Responsive Navigation Demo</h1>
            <p>This navbar adapts perfectly to all screen sizes with smooth animations.</p>
            <button class="cta-button">Get Started</button>
        </section>
        
        <section id="about" class="section">
            <h2>About Section</h2>
            <p>Click the navigation links to see smooth scrolling in action.</p>
        </section>
        
        <section id="services" class="section">
            <h2>Services Section</h2>
            <p>The hamburger menu appears on mobile devices for better UX.</p>
        </section>
        
        <section id="portfolio" class="section">
            <h2>Portfolio Section</h2>
            <p>All interactions are smooth and professional looking.</p>
        </section>
        
        <section id="contact" class="section">
            <h2>Contact Section</h2>
            <p>Perfect for modern websites and applications!</p>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>`,
                    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Navigation Styles */
.navbar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: #6366f1;
    text-decoration: none;
    transition: color 0.3s ease;
}

.logo:hover {
    color: #4f46e5;
}

.nav-menu {
    display: flex;
    gap: 2rem;
}

.nav-link {
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.active {
    color: #6366f1;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #6366f1;
    transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

/* Hamburger Menu */
.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 4px;
}

.bar {
    width: 25px;
    height: 3px;
    background: #374151;
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
}

/* Hamburger Animation */
.hamburger.active .bar:nth-child(2) {
    opacity: 0;
}

.hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

/* Main Content */
.main-content {
    margin-top: 70px;
}

.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease-out;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    animation: fadeInUp 1s ease-out 0.2s both;
}

.cta-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-button:hover {
    background: white;
    color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
}

.section:nth-child(even) {
    background: #f8fafc;
}

.section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #1f2937;
}

.section p {
    font-size: 1.1rem;
    color: #6b7280;
    max-width: 600px;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Styles */
@media (max-width: 768px) {
    .nav-container {
        padding: 0 1rem;
    }
    
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        padding: 2rem 0;
        gap: 1rem;
    }

    .nav-menu.active {
        left: 0;
    }

    .hamburger {
        display: flex;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero p {
        font-size: 1rem;
    }
    
    .section h2 {
        font-size: 2rem;
    }
}

@media (max-width: 480px) {
    .nav-container {
        height: 60px;
    }
    
    .main-content {
        margin-top: 60px;
    }
    
    .nav-menu {
        top: 60px;
    }
    
    .logo {
        font-size: 1.5rem;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
}`,
                    js: `// Responsive Navbar with Smooth Scrolling
class ResponsiveNavbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.handleActiveLink();
        console.log('🧭 Responsive Navbar initialized');
    }
    
    bindEvents() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMobileMenu();
                this.smoothScroll(link.getAttribute('href'));
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Add scrolled class for navbar styling
        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        this.updateActiveLink();
    }
    
    updateActiveLink() {
        let current = '';
        
        this.navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.getBoundingClientRect().top + window.scrollY - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    current = link.getAttribute('href');
                }
            }
        });
        
        // Update active class
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    handleActiveLink() {
        // Set initial active link
        if (this.navLinks.length > 0) {
            this.navLinks[0].classList.add('active');
        }
    }
    
    smoothScroll(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Button interactions
class ButtonAnimations {
    constructor() {
        this.ctaButton = document.querySelector('.cta-button');
        this.init();
    }
    
    init() {
        if (this.ctaButton) {
            this.ctaButton.addEventListener('click', () => {
                this.handleCTAClick();
            });
        }
    }
    
    handleCTAClick() {
        // Add click animation
        this.ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.ctaButton.style.transform = '';
        }, 150);
        
        // Show success message
        this.showMessage('Thanks for clicking! 🎉');
    }
    
    showMessage(text) {
        // Create temporary message
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = \`
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            z-index: 1001;
            font-size: 14px;
            animation: fadeInOut 3s ease-in-out forwards;
        \`;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            }
        \`;
        document.head.appendChild(style);
        
        document.body.appendChild(message);
        
        // Remove after animation
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveNavbar();
    new ButtonAnimations();
    
    console.log('🚀 Responsive Navbar Demo loaded successfully!');
});

// Add some interactive console messages
console.log('Try resizing your browser window to see the responsive behavior!');
console.log('The navbar will switch to a hamburger menu on mobile devices.');`
                }
            },
            
            dark_mode_toggle: {
                name: "Dark Mode Toggle",
                description: "Smooth dark/light theme switcher with localStorage persistence",
                category: "feature",
                difficulty: "intermediate",
                files: {
                    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dark Mode Toggle Demo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header with Theme Toggle -->
    <header class="header">
        <div class="container">
            <h1 class="logo">🌙 DarkMode Demo</h1>
            <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                <span class="theme-icon sun-icon">☀️</span>
                <span class="theme-icon moon-icon">🌙</span>
                <div class="toggle-slider"></div>
            </button>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <!-- Hero Section -->
            <section class="hero">
                <h2 class="hero-title">Experience the Dark Side</h2>
                <p class="hero-subtitle">Toggle between light and dark themes with smooth transitions</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="showDemo()">Try Demo</button>
                    <button class="btn btn-secondary" onclick="showFeatures()">View Features</button>
                </div>
            </section>
            
            <!-- Features Grid -->
            <section class="features" id="featuresSection">
                <h3 class="section-title">Features</h3>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🎨</div>
                        <h4>Smooth Transitions</h4>
                        <p>All elements transition smoothly between themes with optimized animations.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">💾</div>
                        <h4>Persistent Storage</h4>
                        <p>Your theme preference is saved and restored automatically on page reload.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">♿</div>
                        <h4>Accessible Design</h4>
                        <p>Respects system preferences and includes proper ARIA labels for screen readers.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">⚡</div>
                        <h4>Performance Optimized</h4>
                        <p>Lightweight implementation with minimal impact on page performance.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">📱</div>
                        <h4>Mobile Friendly</h4>
                        <p>Works perfectly on all devices with touch-friendly toggle controls.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">🔧</div>
                        <h4>Easy Integration</h4>
                        <p>Simple to integrate into existing projects with minimal code changes.</p>
                    </div>
                </div>
            </section>
            
            <!-- Demo Section -->
            <section class="demo-section" id="demoSection">
                <h3 class="section-title">Interactive Demo</h3>
                <div class="demo-content">
                    <div class="demo-card">
                        <h4>Theme Information</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Current Theme:</span>
                                <span class="info-value" id="currentTheme">Light</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">System Preference:</span>
                                <span class="info-value" id="systemTheme">Light</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Storage Support:</span>
                                <span class="info-value">✅ Available</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Last Changed:</span>
                                <span class="info-value" id="lastChanged">Never</span>
                            </div>
                        </div>
                        
                        <div class="demo-controls">
                            <button class="btn btn-outline" onclick="resetToSystem()">Reset to System</button>
                            <button class="btn btn-outline" onclick="clearStorage()">Clear Storage</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Dark Mode Demo. Built with ❤️ for developers.</p>
            <p>Use <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> for quick theme toggle!</p>
        </div>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
                    css: `/* CSS Variables for Theme Management */
:root {
    /* Light theme colors */
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;
    --accent-primary: #6366f1;
    --accent-secondary: #8b5cf6;
    --border-color: #e5e7eb;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --card-bg: #ffffff;
    
    /* Transition settings */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}

/* Dark theme colors */
[data-theme="dark"] {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --accent-primary: #818cf8;
    --accent-secondary: #a78bfa;
    --border-color: #475569;
    --shadow-color: rgba(0, 0, 0, 0.3);
    --card-bg: #1e293b;
}

/* Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    transition: background-color var(--transition-normal), color var(--transition-normal);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Header Styles */
.header {
    background: var(--card-bg);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: all var(--transition-normal);
    backdrop-filter: blur(10px);
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--accent-primary);
    transition: color var(--transition-normal);
}

/* Theme Toggle Styles */
.theme-toggle {
    position: relative;
    width: 60px;
    height: 30px;
    background: var(--bg-tertiary);
    border: 2px solid var(--border-color);
    border-radius: 50px;
    cursor: pointer;
    transition: all var(--transition-normal);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
}

.theme-toggle:hover {
    transform: scale(1.05);
    border-color: var(--accent-primary);
}

.theme-toggle:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.theme-icon {
    font-size: 14px;
    transition: all var(--transition-normal);
    z-index: 2;
    position: relative;
}

.sun-icon {
    opacity: 1;
    transform: translateX(0);
}

.moon-icon {
    opacity: 0;
    transform: translateX(-10px);
}

[data-theme="dark"] .sun-icon {
    opacity: 0;
    transform: translateX(10px);
}

[data-theme="dark"] .moon-icon {
    opacity: 1;
    transform: translateX(0);
}

.toggle-slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 22px;
    height: 22px;
    background: var(--accent-primary);
    border-radius: 50%;
    transition: transform var(--transition-normal);
    box-shadow: 0 2px 4px var(--shadow-color);
}

[data-theme="dark"] .toggle-slider {
    transform: translateX(26px);
}

/* Main Content */
.main-content {
    padding: 4rem 0;
}

/* Hero Section */
.hero {
    text-align: center;
    padding: 4rem 0;
}

.hero-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: all var(--transition-normal);
}

.hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    transition: color var(--transition-normal);
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

/* Button Styles */
.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-normal);
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background: var(--accent-primary);
    color: white;
}

.btn-primary:hover {
    background: var(--accent-secondary);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover {
    background: var(--bg-tertiary);
    transform: translateY(-2px);
}

.btn-outline {
    background: transparent;
    color: var(--accent-primary);
    border: 1px solid var(--accent-primary);
}

.btn-outline:hover {
    background: var(--accent-primary);
    color: white;
}

/* Sections */
.section-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-primary);
    transition: color var(--transition-normal);
}

/* Features Grid */
.features {
    padding: 4rem 0;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    text-align: center;
    transition: all var(--transition-normal);
    box-shadow: 0 4px 6px var(--shadow-color);
}

.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px var(--shadow-color);
    border-color: var(--accent-primary);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
}

.feature-card h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
    transition: color var(--transition-normal);
}

.feature-card p {
    color: var(--text-secondary);
    transition: color var(--transition-normal);
}

/* Demo Section */
.demo-section {
    padding: 4rem 0;
    background: var(--bg-secondary);
    border-radius: 12px;
    margin: 2rem 0;
    transition: background-color var(--transition-normal);
}

.demo-content {
    display: flex;
    justify-content: center;
}

.demo-card {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all var(--transition-normal);
    width: 100%;
    max-width: 600px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}

.info-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
    transition: border-color var(--transition-normal);
}

.info-label {
    color: var(--text-secondary);
    transition: color var(--transition-normal);
}

.info-value {
    color: var(--text-primary);
    font-weight: 500;
    transition: color var(--transition-normal);
}

.demo-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
}

/* Footer */
.footer {
    background: var(--bg-secondary);
    padding: 2rem 0;
    text-align: center;
    border-top: 1px solid var(--border-color);
    margin-top: 4rem;
    transition: all var(--transition-normal);
}

.footer p {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    transition: color var(--transition-normal);
}

kbd {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    font-size: 0.8rem;
    color: var(--text-primary);
    transition: all var(--transition-normal);
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeInUp 0.6s ease-out;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 0 1rem;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .info-grid {
        grid-template-columns: 1fr;
    }
    
    .demo-controls {
        flex-direction: column;
        align-items: center;
    }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}`,
                    js: `/**
 * Advanced Dark Mode Toggle with System Preference Detection
 * Features: localStorage persistence, system preference detection, keyboard shortcuts
 */

class ThemeManager {
    constructor() {
        this.theme = this.getInitialTheme();
        this.systemTheme = this.getSystemPreference();
        
        // DOM elements
        this.toggleButton = document.getElementById('themeToggle');
        this.currentThemeSpan = document.getElementById('currentTheme');
        this.systemThemeSpan = document.getElementById('systemTheme');
        this.lastChangedSpan = document.getElementById('lastChanged');
        
        this.init();
    }
    
    init() {
        // Apply initial theme
        this.applyTheme(this.theme);
        
        // Update UI
        this.updateThemeInfo();
        
        // Bind events
        this.bindEvents();
        
        console.log(\`🌙 Theme Manager initialized with \${this.theme} theme\`);
        this.logThemeInfo();
    }
    
    getInitialTheme() {
        // Check localStorage first
        const savedTheme = localStorage.getItem('preferred-theme');
        if (savedTheme) {
            console.log(\`📱 Loaded saved theme: \${savedTheme}\`);
            return savedTheme;
        }
        
        // Fall back to system preference
        const systemPreference = this.getSystemPreference();
        console.log(\`🖥️ Using system preference: \${systemPreference}\`);
        return systemPreference;
    }
    
    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    bindEvents() {
        // Toggle button click
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+T for quick toggle
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
                e.preventDefault();
                this.toggleTheme();
                this.showKeyboardShortcutFeedback();
            }
        });
        
        // Listen for system preference changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                this.systemTheme = e.matches ? 'dark' : 'light';
                this.updateThemeInfo();
                
                // If user hasn't set a preference, follow system
                if (!localStorage.getItem('preferred-theme')) {
                    this.setTheme(this.systemTheme);
                    this.showNotification(\`Theme updated to match system preference: \${this.systemTheme}\`, 'info');
                }
            });
        }
        
        // Focus/blur events for accessibility
        if (this.toggleButton) {
            this.toggleButton.addEventListener('focus', () => {
                this.toggleButton.style.transform = 'scale(1.05)';
            });
            
            this.toggleButton.addEventListener('blur', () => {
                this.toggleButton.style.transform = '';
            });
        }
    }
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add toggle animation
        this.addToggleAnimation();
        
        // Show feedback
        this.showNotification(\`Switched to \${newTheme} theme\`, 'success');
        
        console.log(\`🎨 Theme toggled to: \${newTheme}\`);
    }
    
    setTheme(theme) {
        this.theme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        this.updateThemeInfo();
        this.updateLastChanged();
    }
    
    applyTheme(theme) {
        // Set data attribute for CSS
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'dark' ? '#0f172a' : '#ffffff';
    }
    
    saveTheme(theme) {
        try {
            localStorage.setItem('preferred-theme', theme);
            localStorage.setItem('theme-last-changed', new Date().toISOString());
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }
    
    updateThemeInfo() {
        if (this.currentThemeSpan) {
            this.currentThemeSpan.textContent = this.capitalizeFirst(this.theme);
        }
        
        if (this.systemThemeSpan) {
            this.systemThemeSpan.textContent = this.capitalizeFirst(this.systemTheme);
        }
        
        // Update toggle button aria-label
        if (this.toggleButton) {
            const nextTheme = this.theme === 'light' ? 'dark' : 'light';
            this.toggleButton.setAttribute('aria-label', \`Switch to \${nextTheme} theme\`);
        }
    }
    
    updateLastChanged() {
        if (this.lastChangedSpan) {
            const lastChanged = localStorage.getItem('theme-last-changed');
            if (lastChanged) {
                const date = new Date(lastChanged);
                this.lastChangedSpan.textContent = date.toLocaleString();
            } else {
                this.lastChangedSpan.textContent = 'Just now';
            }
        }
    }
    
    addToggleAnimation() {
        if (this.toggleButton) {
            this.toggleButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.toggleButton.style.transform = '';
            }, 150);
        }
    }
    
    showKeyboardShortcutFeedback() {
        this.showNotification('Keyboard shortcut used! ⌨️', 'info');
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.theme-notification');
        existing.forEach(el => el.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = \`theme-notification theme-notification-\${type}\`;
        notification.textContent = message;
        
        // Styles
        notification.style.cssText = \`
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            backdrop-filter: blur(10px);
        \`;
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            info: '#3b82f6',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Slide out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2500);
    }
    
    // Public API methods
    getCurrentTheme() {
        return this.theme;
    }
    
    getSystemTheme() {
        return this.systemTheme;
    }
    
    resetToSystem() {
        localStorage.removeItem('preferred-theme');
        this.setTheme(this.systemTheme);
        this.showNotification(\`Reset to system preference: \${this.systemTheme}\`, 'info');
        console.log('🔄 Theme reset to system preference');
    }
    
    clearStorage() {
        localStorage.removeItem('preferred-theme');
        localStorage.removeItem('theme-last-changed');
        this.updateThemeInfo();
        this.showNotification('Theme storage cleared', 'warning');
        console.log('🗑️ Theme storage cleared');
    }
    
    // Utility methods
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    logThemeInfo() {
        console.log('📊 Theme Information:');
        console.log(\`  Current: \${this.theme}\`);
        console.log(\`  System: \${this.systemTheme}\`);
        console.log(\`  Storage: \${localStorage.getItem('preferred-theme') || 'Not set'}\`);
    }
}

// Interactive Demo Functions
function showDemo() {
    const demoSection = document.getElementById('demoSection');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
        demoSection.classList.add('fade-in');
    }
    
    themeManager.showNotification('Demo section activated! 🎯', 'success');
}

function showFeatures() {
    const featuresSection = document.getElementById('featuresSection');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
        
        // Add staggered animation to feature cards
        const cards = featuresSection.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }
    
    themeManager.showNotification('Features highlighted! ✨', 'info');
}

function resetToSystem() {
    if (themeManager) {
        themeManager.resetToSystem();
    }
}

function clearStorage() {
    if (themeManager) {
        const confirmed = confirm('Are you sure you want to clear theme storage?');
        if (confirmed) {
            themeManager.clearStorage();
        }
    }
}

// Initialize Theme Manager
let themeManager;

document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    
    // Add some entrance animations
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('fade-in');
    }
    
    console.log('🚀 Dark Mode Toggle Demo loaded successfully!');
    console.log('💡 Try using Ctrl+Shift+T for quick theme switching!');
    console.log('🎨 Check the demo section for more interactive features!');
});

// Export for external use
window.themeManager = themeManager;`
                }
            },
            
            form_validation: {
                name: "Form Validation",
                description: "Interactive form with real-time validation and error handling",
                category: "component",
                difficulty: "advanced",
                files: {
                    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Form Validation</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Form Header -->
        <div class="form-header">
            <h1>🚀 Contact Form</h1>
            <p>Experience real-time validation with smooth animations</p>
        </div>
        
        <!-- Main Form -->
        <form id="contactForm" class="contact-form" novalidate>
            
            <!-- Name Field -->
            <div class="form-group">
                <label for="fullName" class="form-label">
                    Full Name *
                    <span class="field-hint">(At least 2 characters)</span>
                </label>
                <div class="input-wrapper">
                    <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        class="form-input"
                        placeholder="Enter your full name"
                        autocomplete="name"
                        required
                    >
                    <span class="input-icon success-icon">✓</span>
                    <span class="input-icon error-icon">✗</span>
                </div>
                <div class="field-feedback">
                    <span class="error-message" id="fullNameError"></span>
                    <span class="success-message">Looks good!</span>
                </div>
            </div>
            
            <!-- Email Field -->
            <div class="form-group">
                <label for="email" class="form-label">
                    Email Address *
                    <span class="field-hint">(We'll never share your email)</span>
                </label>
                <div class="input-wrapper">
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        class="form-input"
                        placeholder="your.email@example.com"
                        autocomplete="email"
                        required
                    >
                    <span class="input-icon success-icon">✓</span>
                    <span class="input-icon error-icon">✗</span>
                </div>
                <div class="field-feedback">
                    <span class="error-message" id="emailError"></span>
                    <span class="success-message">Valid email address!</span>
                </div>
            </div>
            
            <!-- Subject Field -->
            <div class="form-group">
                <label for="subject" class="form-label">
                    Subject *
                    <span class="field-hint">(What is this about?)</span>
                </label>
                <div class="input-wrapper">
                    <select id="subject" name="subject" class="form-input form-select" required>
                        <option value="">Please select a subject...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="business">Business Partnership</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                    </select>
                    <span class="input-icon success-icon">✓</span>
                    <span class="input-icon error-icon">✗</span>
                </div>
                <div class="field-feedback">
                    <span class="error-message" id="subjectError"></span>
                    <span class="success-message">Subject selected!</span>
                </div>
            </div>
            
            <!-- Message Field -->
            <div class="form-group">
                <label for="message" class="form-label">
                    Message *
                    <span class="field-hint">(Tell us more about your inquiry)</span>
                </label>
                <div class="input-wrapper">
                    <textarea 
                        id="message" 
                        name="message" 
                        class="form-input form-textarea"
                        placeholder="Please describe your message in detail..."
                        rows="5"
                        required
                        maxlength="1000"
                    ></textarea>
                    <span class="input-icon success-icon">✓</span>
                    <span class="input-icon error-icon">✗</span>
                </div>
                <div class="field-feedback">
                    <span class="error-message" id="messageError"></span>
                    <span class="success-message">Great message!</span>
                </div>
                <div class="char-counter">
                    <span id="messageCount">0</span>/1000 characters
                </div>
            </div>
            
            <!-- Privacy Agreement -->
            <div class="form-group">
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="privacy" name="privacy" class="form-checkbox" required>
                    <label for="privacy" class="checkbox-label">
                        <span class="checkmark"></span>
                        I agree to the <a href="#" class="link">Privacy Policy</a> and <a href="#" class="link">Terms of Service</a> *
                    </label>
                </div>
                <div class="field-feedback">
                    <span class="error-message" id="privacyError"></span>
                </div>
            </div>
            
            <!-- Newsletter Subscription -->
            <div class="form-group">
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="newsletter" name="newsletter" class="form-checkbox">
                    <label for="newsletter" class="checkbox-label">
                        <span class="checkmark"></span>
                        Subscribe to our newsletter for updates and tips
                    </label>
                </div>
            </div>
            
            <!-- Form Actions -->
            <div class="form-actions">
                <button type="reset" class="btn btn-secondary" id="resetBtn">
                    Reset Form
                </button>
                <button type="submit" class="btn btn-primary" id="submitBtn">
                    <span class="btn-text">Send Message</span>
                    <span class="btn-loading">
                        <span class="spinner"></span>
                        Sending...
                    </span>
                </button>
            </div>
            
            <!-- Form Summary -->
            <div class="form-summary">
                <div class="summary-item">
                    <span class="summary-label">Fields Completed:</span>
                    <span class="summary-value">
                        <span id="completedFields">0</span> / <span id="totalFields">4</span>
                    </span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Validation Status:</span>
                    <span class="summary-value" id="validationStatus">Incomplete</span>
                </div>
            </div>
        </form>
        
        <!-- Success Modal -->
        <div class="modal-overlay" id="successModal">
            <div class="modal">
                <div class="modal-content">
                    <div class="success-animation">
                        <div class="checkmark-circle">
                            <div class="checkmark">✓</div>
                        </div>
                    </div>
                    <h2>Message Sent Successfully! 🎉</h2>
                    <p>Thank you for your message. We'll get back to you within 24 hours.</p>
                    <button class="btn btn-primary" onclick="closeSuccessModal()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
                    css: `/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* CSS Variables */
:root {
    /* Colors */
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --primary-light: #a5b4fc;
    --success: #10b981;
    --error: #ef4444;
    --warning: #f59e0b;
    
    /* Neutrals */
    --white: #ffffff;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    
    /* Spacing */
    --space-xs: 0.5rem;
    --space-sm: 0.75rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    
    /* Typography */
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 2rem;
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    
    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-base: 0.2s ease;
    --transition-slow: 0.3s ease;
}

/* Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: 1.6;
    color: var(--gray-700);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: var(--space-xl);
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    overflow: hidden;
}

/* Form Header */
.form-header {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: var(--white);
    text-align: center;
    padding: var(--space-2xl);
}

.form-header h1 {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    margin-bottom: var(--space-sm);
}

.form-header p {
    font-size: var(--font-size-lg);
    opacity: 0.9;
}

/* Form Styles */
.contact-form {
    padding: var(--space-2xl);
}

.form-group {
    margin-bottom: var(--space-xl);
    position: relative;
}

.form-label {
    display: block;
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-sm);
}

.field-hint {
    font-weight: 400;
    color: var(--gray-500);
    font-size: 0.75rem;
}

.input-wrapper {
    position: relative;
}

.form-input {
    width: 100%;
    padding: var(--space-md);
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    font-family: inherit;
    transition: all var(--transition-base);
    background: var(--white);
}

.form-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input.valid {
    border-color: var(--success);
    background: #f0fdf4;
}

.form-input.invalid {
    border-color: var(--error);
    background: #fef2f2;
}

.form-textarea {
    resize: vertical;
    min-height: 120px;
}

.form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 40px;
}

/* Input Icons */
.input-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
    font-size: 1.2rem;
    opacity: 0;
    transition: all var(--transition-base);
    pointer-events: none;
}

.success-icon {
    color: var(--success);
}

.error-icon {
    color: var(--error);
}

.form-input.valid ~ .success-icon {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
}

.form-input.invalid ~ .error-icon {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
}

/* Field Feedback */
.field-feedback {
    margin-top: var(--space-xs);
    min-height: 20px;
}

.error-message,
.success-message {
    font-size: var(--font-size-sm);
    opacity: 0;
    transform: translateY(-5px);
    transition: all var(--transition-base);
    display: block;
}

.error-message {
    color: var(--error);
}

.success-message {
    color: var(--success);
}

.error-message.show,
.success-message.show {
    opacity: 1;
    transform: translateY(0);
}

/* Character Counter */
.char-counter {
    text-align: right;
    font-size: 0.75rem;
    color: var(--gray-500);
    margin-top: var(--space-xs);
    transition: color var(--transition-base);
}

.char-counter.warning {
    color: var(--warning);
}

.char-counter.danger {
    color: var(--error);
    font-weight: 600;
}

/* Checkbox Styles */
.checkbox-wrapper {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
}

.form-checkbox {
    opacity: 0;
    position: absolute;
    pointer-events: none;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    cursor: pointer;
    font-size: var(--font-size-sm);
    line-height: 1.5;
    color: var(--gray-600);
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid var(--gray-300);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
    flex-shrink: 0;
    background: var(--white);
}

.checkmark::after {
    content: '✓';
    color: var(--white);
    font-size: 12px;
    opacity: 0;
    transform: scale(0);
    transition: all var(--transition-base);
}

.form-checkbox:checked + .checkbox-label .checkmark {
    background: var(--primary);
    border-color: var(--primary);
}

.form-checkbox:checked + .checkbox-label .checkmark::after {
    opacity: 1;
    transform: scale(1);
}

.link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
}

.link:hover {
    text-decoration: underline;
}

/* Buttons */
.btn {
    padding: var(--space-md) var(--space-xl);
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
}

.btn-primary {
    background: var(--primary);
    color: var(--white);
}

.btn-primary:hover:not(:disabled) {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background: var(--gray-100);
    color: var(--gray-700);
    border: 1px solid var(--gray-300);
}

.btn-secondary:hover {
    background: var(--gray-200);
    transform: translateY(-1px);
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.btn-loading {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity var(--transition-base);
}

.btn.loading .btn-text {
    opacity: 0;
}

.btn.loading .btn-loading {
    opacity: 1;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid var(--white);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: var(--space-sm);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Form Actions */
.form-actions {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-xl);
    flex-wrap: wrap;
}

.form-actions .btn {
    flex: 1;
    min-width: 120px;
}

/* Form Summary */
.form-summary {
    background: var(--gray-50);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    margin-top: var(--space-xl);
    border: 1px solid var(--gray-200);
}

.summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-sm);
}

.summary-item:last-child {
    margin-bottom: 0;
}

.summary-label {
    font-size: var(--font-size-sm);
    color: var(--gray-600);
}

.summary-value {
    font-weight: 600;
    color: var(--gray-800);
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-slow);
    z-index: 1000;
    padding: var(--space-lg);
}

.modal-overlay.show {
    opacity: 1;
    visibility: visible;
}

.modal {
    background: var(--white);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    max-width: 400px;
    width: 100%;
    transform: scale(0.9) translateY(20px);
    transition: transform var(--transition-slow);
}

.modal-overlay.show .modal {
    transform: scale(1) translateY(0);
}

.modal-content {
    padding: var(--space-2xl);
    text-align: center;
}

.success-animation {
    margin-bottom: var(--space-lg);
}

.checkmark-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--success);
    margin: 0 auto var(--space-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: scaleIn 0.5s ease-out;
}

.checkmark-circle .checkmark {
    color: var(--white);
    font-size: 2rem;
    font-weight: bold;
    animation: checkmarkIn 0.5s ease-out 0.2s both;
}

@keyframes scaleIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes checkmarkIn {
    0% {
        transform: scale(0) rotate(45deg);
        opacity: 0;
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}

.modal h2 {
    color: var(--gray-800);
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-md);
}

.modal p {
    color: var(--gray-600);
    margin-bottom: var(--space-xl);
}

/* Responsive Design */
@media (max-width: 640px) {
    body {
        padding: var(--space-md);
    }
    
    .form-header {
        padding: var(--space-xl);
    }
    
    .form-header h1 {
        font-size: var(--font-size-2xl);
    }
    
    .contact-form {
        padding: var(--space-lg);
    }
    
    .form-actions {
        flex-direction: column;
    }
    
    .form-actions .btn {
        width: 100%;
    }
}

/* Focus Management */
.form-input:focus,
.btn:focus {
    outline: none;
}

/* Animation Classes */
.fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`,
                    js: `/**
 * Advanced Form Validation with Real-time Feedback
 * Features: Field validation, error handling, success animations, accessibility
 */

class FormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.fields = this.initializeFields();
        this.completedFields = new Set();
        this.totalRequiredFields = 4; // fullName, email, subject, message, privacy
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateSummary();
        this.initializeCharacterCounter();
        
        console.log('📝 Advanced Form Validator initialized');
        console.log('🎯 Features: Real-time validation, smooth animations, accessibility');
    }
    
    initializeFields() {
        return {
            fullName: {
                element: document.getElementById('fullName'),
                errorElement: document.getElementById('fullNameError'),
                validators: ['required', 'minLength:2'],
                required: true
            },
            email: {
                element: document.getElementById('email'),
                errorElement: document.getElementById('emailError'),
                validators: ['required', 'email'],
                required: true
            },
            subject: {
                element: document.getElementById('subject'),
                errorElement: document.getElementById('subjectError'),
                validators: ['required'],
                required: true
            },
            message: {
                element: document.getElementById('message'),
                errorElement: document.getElementById('messageError'),
                validators: ['required', 'minLength:10', 'maxLength:1000'],
                required: true
            },
            privacy: {
                element: document.getElementById('privacy'),
                errorElement: document.getElementById('privacyError'),
                validators: ['required'],
                required: true
            }
        };
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetForm());
        
        // Real-time validation for all fields
        Object.values(this.fields).forEach(field => {
            if (field.element) {
                // Validate on blur
                field.element.addEventListener('blur', () => {
                    this.validateField(field);
                });
                
                // Clear errors on input
                field.element.addEventListener('input', () => {
                    this.clearFieldError(field);
                    
                    // Debounced validation
                    clearTimeout(field.validationTimeout);
                    field.validationTimeout = setTimeout(() => {
                        this.validateField(field);
                    }, 500);
                });
                
                // Handle focus for better UX
                field.element.addEventListener('focus', () => {
                    this.handleFieldFocus(field);
                });
            }
        });
        
        // Checkbox handling
        const privacyCheckbox = this.fields.privacy.element;
        if (privacyCheckbox) {
            privacyCheckbox.addEventListener('change', () => {
                this.validateField(this.fields.privacy);
            });
        }
        
        console.log('📎 Event listeners attached to all form fields');
    }
    
    initializeCharacterCounter() {
        const messageField = this.fields.message.element;
        const counter = document.getElementById('messageCount');
        
        if (messageField && counter) {
            const updateCounter = () => {
                const length = messageField.value.length;
                counter.textContent = length;
                
                const counterElement = counter.parentElement;
                counterElement.classList.remove('warning', 'danger');
                
                if (length > 800) {
                    counterElement.classList.add('danger');
                } else if (length > 600) {
                    counterElement.classList.add('warning');
                }
            };
            
            messageField.addEventListener('input', updateCounter);
            updateCounter(); // Initial count
        }
    }
    
    validateField(field) {
        if (!field || !field.element) return false;
        
        const value = this.getFieldValue(field);
        let isValid = true;
        let errorMessage = '';
        
        // Run validators
        for (const validator of field.validators) {
            const result = this.runValidator(validator, value, field);
            if (!result.isValid) {
                isValid = false;
                errorMessage = result.message;
                break;
            }
        }
        
        // Update field UI
        this.updateFieldUI(field, isValid, errorMessage);
        
        // Update completed fields tracking
        if (isValid && (value || field.element.type === 'checkbox')) {
            this.completedFields.add(field.element.name);
        } else {
            this.completedFields.delete(field.element.name);
        }
        
        // Update summary
        this.updateSummary();
        
        return isValid;
    }
    
    runValidator(validator, value, field) {
        const [rule, parameter] = validator.split(':');
        
        switch (rule) {
            case 'required':
                if (field.element.type === 'checkbox') {
                    return {
                        isValid: field.element.checked,
                        message: 'This field is required'
                    };
                }
                return {
                    isValid: value.length > 0,
                    message: 'This field is required'
                };
                
            case 'email':
                if (value.length === 0) return { isValid: true };
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                return {
                    isValid: emailRegex.test(value),
                    message: 'Please enter a valid email address'
                };
                
            case 'minLength':
                const minLength = parseInt(parameter);
                return {
                    isValid: value.length === 0 || value.length >= minLength,
                    message: \`Minimum \${minLength} characters required\`
                };
                
            case 'maxLength':
                const maxLength = parseInt(parameter);
                return {
                    isValid: value.length <= maxLength,
                    message: \`Maximum \${maxLength} characters allowed\`
                };
                
            default:
                return { isValid: true };
        }
    }
    
    getFieldValue(field) {
        if (!field.element) return '';
        
        if (field.element.type === 'checkbox') {
            return field.element.checked;
        }
        
        return field.element.value.trim();
    }
    
    updateFieldUI(field, isValid, errorMessage) {
        const element = field.element;
        const errorElement = field.errorElement;
        const value = this.getFieldValue(field);
        
        // Update input styling
        element.classList.remove('valid', 'invalid');
        if (value || element.type === 'checkbox') {
            element.classList.add(isValid ? 'valid' : 'invalid');
        }
        
        // Update error message
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.toggle('show', !isValid && errorMessage);
        }
        
        // Update success/error messages
        const wrapper = element.closest('.form-group');
        if (wrapper) {
            const successMessage = wrapper.querySelector('.success-message');
            const errorMsg = wrapper.querySelector('.error-message');
            
            if (successMessage) {
                successMessage.classList.toggle('show', isValid && (value || element.type === 'checkbox'));
            }
            
            if (errorMsg) {
                errorMsg.classList.toggle('show', !isValid && errorMessage);
            }
        }
    }
    
    clearFieldError(field) {
        if (field.element && field.element.classList.contains('invalid')) {
            field.element.classList.remove('invalid');
            
            if (field.errorElement) {
                field.errorElement.classList.remove('show');
            }
            
            const wrapper = field.element.closest('.form-group');
            if (wrapper) {
                const errorMsg = wrapper.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.classList.remove('show');
                }
            }
        }
    }
    
    handleFieldFocus(field) {
        // Add focus styling or animations if needed
        console.log(\`Field focused: \${field.element.name}\`);
    }
    
    updateSummary() {
        const completedSpan = document.getElementById('completedFields');
        const totalSpan = document.getElementById('totalFields');
        const statusSpan = document.getElementById('validationStatus');
        
        if (completedSpan) {
            const requiredCompleted = Array.from(this.completedFields).filter(fieldName => {
                const field = Object.values(this.fields).find(f => f.element?.name === fieldName);
                return field?.required;
            }).length;
            
            completedSpan.textContent = requiredCompleted;
        }
        
        if (totalSpan) {
            totalSpan.textContent = this.totalRequiredFields;
        }
        
        if (statusSpan) {
            const requiredCompleted = Array.from(this.completedFields).filter(fieldName => {
                const field = Object.values(this.fields).find(f => f.element?.name === fieldName);
                return field?.required;
            }).length;
            
            const isComplete = requiredCompleted >= this.totalRequiredFields;
            statusSpan.textContent = isComplete ? 'Complete ✓' : 'Incomplete';
            statusSpan.style.color = isComplete ? 'var(--success)' : 'var(--error)';
        }
        
        // Update submit button state
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            const isFormValid = this.isFormValid();
            submitBtn.disabled = !isFormValid;
        }
    }
    
    isFormValid() {
        // Check if all required fields are completed and valid
        const requiredFieldNames = Object.entries(this.fields)
            .filter(([, field]) => field.required)
            .map(([name]) => name);
        
        return requiredFieldNames.every(fieldName => {
            const field = this.fields[fieldName];
            return this.validateField(field);
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        console.log('📤 Form submission initiated');
        
        // Validate all fields
        let isFormValid = true;
        Object.values(this.fields).forEach(field => {
            if (!this.validateField(field) && field.required) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please fix the errors above', 'error');
            this.focusFirstErrorField();
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await this.simulateFormSubmission();
            
            // Show success
            this.showSuccessModal();
            this.resetForm();
            
            console.log('✅ Form submitted successfully');
            
        } catch (error) {
            console.error('❌ Form submission failed:', error);
            this.showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }
    
    simulateFormSubmission() {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(resolve, 2000);
        });
    }
    
    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('show');
            
            // Focus management for accessibility
            const closeButton = modal.querySelector('.btn');
            if (closeButton) {
                closeButton.focus();
            }
        }
    }
    
    resetForm() {
        this.form.reset();
        
        // Clear all validation states
        Object.values(this.fields).forEach(field => {
            if (field.element) {
                field.element.classList.remove('valid', 'invalid');
                
                const wrapper = field.element.closest('.form-group');
                if (wrapper) {
                    wrapper.querySelectorAll('.error-message, .success-message').forEach(msg => {
                        msg.classList.remove('show');
                    });
                }
            }
        });
        
        // Reset tracking
        this.completedFields.clear();
        this.updateSummary();
        
        // Reset character counter
        const counter = document.getElementById('messageCount');
        if (counter) {
            counter.textContent = '0';
            counter.parentElement.classList.remove('warning', 'danger');
        }
        
        console.log('🔄 Form reset successfully');
    }
    
    focusFirstErrorField() {
        const firstErrorField = Object.values(this.fields).find(field => {
            return field.element && field.element.classList.contains('invalid');
        });
        
        if (firstErrorField) {
            firstErrorField.element.focus();
        }
    }
    
    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = \`notification notification-\${type}\`;
        notification.textContent = message;
        
        notification.style.cssText = \`
            position: fixed;
            top: 20px;
            right: 20px;
            background: \${type === 'error' ? 'var(--error)' : 'var(--primary)'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-lg);
        \`;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Modal Management
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Accessibility: Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSuccessModal();
    }
});

// Initialize Form Validator
let formValidator;

document.addEventListener('DOMContentLoaded', () => {
    formValidator = new FormValidator();
    
    // Add entrance animation to form
    const form = document.querySelector('.contact-form');
    if (form) {
        form.classList.add('fade-in');
    }
    
    console.log('🚀 Interactive Form Validation Demo loaded!');
    console.log('💡 Features:');
    console.log('  • Real-time validation with smooth animations');
    console.log('  • Character counter for message field');
    console.log('  • Accessibility support with proper focus management');
    console.log('  • Success modal with animations');
    console.log('  • Form summary with completion tracking');
});`
                }
            }
        };
    }
    
    // ==========================================================================
    // CODE SNIPPETS
    // ==========================================================================
    
    initializeSnippets() {
        return [
            // HTML Snippets
            {
                id: 'html-card',
                title: 'Card Component',
                description: 'Responsive card with image and content',
                type: 'html',
                category: 'component',
                code: `<div class="card">
    <img src="https://via.placeholder.com/300x200" alt="Card image" class="card-image">
    <div class="card-content">
        <h3 class="card-title">Card Title</h3>
        <p class="card-text">This is a sample card component with image and content.</p>
        <button class="card-btn">Learn More</button>
    </div>
</div>`
            },
            {
                id: 'html-modal',
                title: 'Modal Dialog',
                description: 'Accessible modal with backdrop',
                type: 'html',
                category: 'component',
                code: `<div class="modal-overlay" id="myModal">
    <div class="modal">
        <div class="modal-header">
            <h2>Modal Title</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <p>Modal content goes here...</p>
        </div>
        <div class="modal-footer">
            <button onclick="closeModal()">Cancel</button>
            <button class="btn-primary">Confirm</button>
        </div>
    </div>
</div>`
            },
            {
                id: 'html-hero',
                title: 'Hero Section',
                description: 'Landing page hero with CTA buttons',
                type: 'html',
                category: 'layout',
                code: `<section class="hero">
    <div class="hero-content">
        <h1 class="hero-title">Welcome to Our Platform</h1>
        <p class="hero-subtitle">Create amazing experiences with our tools</p>
        <div class="hero-buttons">
            <button class="btn btn-primary">Get Started</button>
            <button class="btn btn-secondary">Learn More</button>
        </div>
    </div>
</section>`
            },
            
            // CSS Snippets  
            {
                id: 'css-flexcenter',
                title: 'Flex Center',
                description: 'Perfect centering with flexbox',
                type: 'css',
                category: 'layout',
                code: `.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}`
            },
            {
                id: 'css-gradient',
                title: 'Gradient Background',
                description: 'Beautiful linear gradient',
                type: 'css',
                category: 'styling',
                code: `.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}`
            },
            {
                id: 'css-glassmorphism',
                title: 'Glassmorphism Card',
                description: 'Modern glass effect design',
                type: 'css',
                category: 'styling',
                code: `.glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    transition: all 0.3s ease;
}

.glass-card:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px);
}`
            },
            {
                id: 'css-button-hover',
                title: 'Animated Button',
                description: 'Button with hover effects',
                type: 'css',
                category: 'component',
                code: `.animated-btn {
    background: #6366f1;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.animated-btn:hover {
    background: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.animated-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.animated-btn:hover::before {
    left: 100%;
}`
            },
            {
                id: 'css-loading',
                title: 'Loading Spinner',
                description: 'Smooth CSS loading animation',
                type: 'css',
                category: 'animation',
                code: `.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #6366f1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.pulse-loader {
    width: 40px;
    height: 40px;
    background: #6366f1;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
}`
            },
            {
                id: 'css-grid-layout',
                title: 'CSS Grid Layout',
                description: 'Responsive grid system',
                type: 'css',
                category: 'layout',
                code: `.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.grid-item {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.grid-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}`
            },
            {
                id: 'css-dark-mode',
                title: 'Dark Mode Toggle',
                description: 'CSS variables for theme switching',
                type: 'css',
                category: 'theming',
                code: `:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --accent-color: #6366f1;
    --border-color: #e5e7eb;
}

[data-theme="dark"] {
    --bg-color: #1f2937;
    --text-color: #f9fafb;
    --accent-color: #818cf8;
    --border-color: #374151;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}`
            },
            
            // JavaScript Snippets
            {
                id: 'js-dom-ready',
                title: 'DOM Ready',
                description: 'Wait for DOM to be fully loaded',
                type: 'js',
                category: 'basics',
                code: `document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is ready!');
    // Your code here
});

// Alternative modern approach
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // Your initialization code
}`
            },
            {
                id: 'js-fetch-api',
                title: 'Fetch API Request',
                description: 'Modern AJAX with error handling',
                type: 'js',
                category: 'async',
                code: `async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const data = await response.json();
        console.log('Success:', data);
        return data;
        
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Usage
fetchData('https://api.example.com/data')
    .then(data => {
        // Handle successful response
    })
    .catch(error => {
        // Handle error
    });`
            },
            {
                id: 'js-event-delegation',
                title: 'Event Delegation',
                description: 'Efficient event handling for dynamic content',
                type: 'js',
                category: 'events',
                code: `// Event delegation - handle events for dynamic elements
document.addEventListener('click', (event) => {
    // Handle button clicks
    if (event.target.matches('.dynamic-button')) {
        handleButtonClick(event.target);
    }
    
    // Handle link clicks
    if (event.target.matches('.dynamic-link')) {
        event.preventDefault();
        handleLinkClick(event.target);
    }
});

function handleButtonClick(button) {
    console.log('Button clicked:', button.textContent);
}

function handleLinkClick(link) {
    console.log('Link clicked:', link.href);
}`
            },
            {
                id: 'js-debounce',
                title: 'Debounce Function',
                description: 'Limit function execution frequency',
                type: 'js',
                category: 'utils',
                code: `function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((value) => {
    console.log('Searching for:', value);
    // Perform search
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});`
            },
            {
                id: 'js-local-storage',
                title: 'LocalStorage Helper',
                description: 'Safe localStorage operations',
                type: 'js',
                category: 'storage',
                code: `class StorageHelper {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }
    
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
    
    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
}

// Usage
StorageHelper.set('user', { name: 'John', age: 30 });
const user = StorageHelper.get('user', {});
console.log(user);`
            },
            {
                id: 'js-form-validation',
                title: 'Form Validation',
                description: 'Client-side form validation',
                type: 'js',
                category: 'forms',
                code: `class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let error = '';
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            error = 'This field is required';
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email';
            }
        }
        
        // Min length validation
        else if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (value.length < minLength) {
                error = \`Minimum \${minLength} characters required\`;
            }
        }
        
        this.setError(field, error);
        return !error;
    }
    
    setError(field, error) {
        const errorElement = this.form.querySelector(\`#\${field.name}Error\`);
        
        if (error) {
            this.errors[field.name] = error;
            field.classList.add('error');
            if (errorElement) errorElement.textContent = error;
        } else {
            delete this.errors[field.name];
            field.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
        }
    }
    
    clearError(field) {
        this.setError(field, '');
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            console.log('Form is valid - submitting...');
            // Submit form
        } else {
            console.log('Form has errors:', this.errors);
        }
    }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    if (form) {
        new FormValidator(form);
    }
});`
            },
            {
                id: 'js-modal-manager',
                title: 'Modal Manager',
                description: 'Reusable modal system',
                type: 'js',
                category: 'ui',
                code: `class ModalManager {
    constructor() {
        this.activeModal = null;
        this.bindEvents();
    }
    
    show(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        this.activeModal = modal;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstFocusable = modal.querySelector('button, input, select, textarea, [href]');
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        // Auto-close timer
        if (options.autoClose) {
            setTimeout(() => this.hide(modalId), options.autoClose);
        }
    }
    
    hide(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = '';
        this.activeModal = null;
    }
    
    hideAll() {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
        this.activeModal = null;
    }
    
    bindEvents() {
        // Close on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') && this.activeModal) {
                this.hide(this.activeModal.id);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.hide(this.activeModal.id);
            }
        });
        
        // Handle close buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-modal-close]')) {
                const modalId = e.target.getAttribute('data-modal-close');
                this.hide(modalId);
            }
        });
    }
}

// Usage
const modalManager = new ModalManager();

// Show modal
modalManager.show('myModal', { autoClose: 5000 });

// Hide modal
modalManager.hide('myModal');`
            },
            {
                id: 'js-scroll-animation',
                title: 'Scroll Animation',
                description: 'Animate elements on scroll',
                type: 'js',
                category: 'animation',
                code: `class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            this.observer.observe(element);
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateElement(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
            element.style.opacity = '1';
            
            switch (animationType) {
                case 'fade-up':
                    element.style.transform = 'translateY(0)';
                    break;
                case 'fade-down':
                    element.style.transform = 'translateY(0)';
                    break;
                case 'fade-left':
                    element.style.transform = 'translateX(0)';
                    break;
                case 'fade-right':
                    element.style.transform = 'translateX(0)';
                    break;
                case 'scale-up':
                    element.style.transform = 'scale(1)';
                    break;
                default:
                    element.style.transform = 'none';
            }
            
            element.classList.add('animated');
        }, delay);
    }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimator();
});

// HTML usage:
// <div data-animate="fade-up" data-delay="200">Content</div>`
            },
            {
                id: 'js-theme-switcher',
                title: 'Theme Switcher',
                description: 'Dark/light mode toggle',
                type: 'js',
                category: 'theming',
                code: `class ThemeSwitcher {
    constructor() {
        this.theme = this.getStoredTheme();
        this.init();
    }
    
    init() {
        this.applyTheme(this.theme);
        this.bindEvents();
        console.log(\`Theme initialized: \${this.theme}\`);
    }
    
    getStoredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
        
        // Update toggle buttons
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            button.textContent = theme === 'dark' ? '☀️' : '🌙';
            button.setAttribute('aria-label', \`Switch to \${theme === 'dark' ? 'light' : 'dark'} mode\`);
        });
        
        // Emit custom event
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme }
        }));
    }
    
    toggle() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Add transition effect
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }
    
    bindEvents() {
        // Handle toggle buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-theme-toggle]')) {
                this.toggle();
            }
        });
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Keyboard shortcut (Ctrl+Shift+T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggle();
            }
        });
    }
    
    getCurrentTheme() {
        return this.theme;
    }
    
    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.applyTheme(theme);
        }
    }
}

// Usage
const themeSwitcher = new ThemeSwitcher();

// Listen for theme changes
document.addEventListener('themeChanged', (e) => {
    console.log('Theme changed to:', e.detail.theme);
});

// HTML usage:
// <button data-theme-toggle>🌙</button>`
            }
        ];
    }
    
    // ==========================================================================
    // PUBLIC API METHODS
    // ==========================================================================
    
    // Template methods
    getTemplate(templateId) {
        const template = this.templates[templateId];
        if (!template) {
            console.warn(`Template "${templateId}" not found`);
            return null;
        }
        
        console.log(`📋 Loading template: ${template.name}`);
        return template;
    }
    
    getAllTemplates() {
        return Object.entries(this.templates).map(([id, template]) => ({
            id,
            ...template
        }));
    }
    
    getTemplatesByCategory(category) {
        return this.getAllTemplates().filter(template => template.category === category);
    }
    
    getTemplatesByDifficulty(difficulty) {
        return this.getAllTemplates().filter(template => template.difficulty === difficulty);
    }
    
    // Snippet methods
    getSnippet(snippetId) {
        const snippet = this.snippets.find(s => s.id === snippetId);
        if (!snippet) {
            console.warn(`Snippet "${snippetId}" not found`);
            return null;
        }
        
        console.log(`📝 Loading snippet: ${snippet.title}`);
        return snippet;
    }
    
    getAllSnippets() {
        return this.snippets;
    }
    
    getSnippetsByType(type) {
        return this.snippets.filter(snippet => snippet.type === type);
    }
    
    getSnippetsByCategory(category) {
        return this.snippets.filter(snippet => snippet.category === category);
    }
    
    searchSnippets(query) {
        const searchTerm = query.toLowerCase();
        return this.snippets.filter(snippet => 
            snippet.title.toLowerCase().includes(searchTerm) ||
            snippet.description.toLowerCase().includes(searchTerm) ||
            snippet.code.toLowerCase().includes(searchTerm)
        );
    }
    
    // Utility methods
    getAvailableCategories() {
        const templateCategories = [...new Set(this.getAllTemplates().map(t => t.category))];
        const snippetCategories = [...new Set(this.snippets.map(s => s.category))];
        
        return {
            templates: templateCategories,
            snippets: snippetCategories,
            all: [...new Set([...templateCategories, ...snippetCategories])]
        };
    }
    
    getAvailableTypes() {
        return [...new Set(this.snippets.map(s => s.type))];
    }
    
    getStats() {
        const categories = this.getAvailableCategories();
        const types = this.getAvailableTypes();
        
        return {
            templates: {
                total: Object.keys(this.templates).length,
                categories: categories.templates.length,
                byCategory: categories.templates.reduce((acc, cat) => {
                    acc[cat] = this.getTemplatesByCategory(cat).length;
                    return acc;
                }, {})
            },
            snippets: {
                total: this.snippets.length,
                categories: categories.snippets.length,
                types: types.length,
                byType: types.reduce((acc, type) => {
                    acc[type] = this.getSnippetsByType(type).length;
                    return acc;
                }, {}),
                byCategory: categories.snippets.reduce((acc, cat) => {
                    acc[cat] = this.getSnippetsByCategory(cat).length;
                    return acc;
                }, {})
            }
        };
    }
    
    // Export/Import methods
    exportTemplates() {
        return {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            templates: this.templates
        };
    }
    
    exportSnippets() {
        return {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            snippets: this.snippets
        };
    }
    
    exportAll() {
        return {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            templates: this.templates,
            snippets: this.snippets,
            stats: this.getStats()
        };
    }
    
    importTemplates(data) {
        try {
            if (data.templates) {
                this.templates = { ...this.templates, ...data.templates };
                console.log('📥 Templates imported successfully');
                return true;
            }
        } catch (error) {
            console.error('Failed to import templates:', error);
        }
        return false;
    }
    
    importSnippets(data) {
        try {
            if (data.snippets && Array.isArray(data.snippets)) {
                // Merge with existing snippets, avoiding duplicates
                const existingIds = this.snippets.map(s => s.id);
                const newSnippets = data.snippets.filter(s => !existingIds.includes(s.id));
                this.snippets = [...this.snippets, ...newSnippets];
                
                console.log(`📥 ${newSnippets.length} new snippets imported`);
                return true;
            }
        } catch (error) {
            console.error('Failed to import snippets:', error);
        }
        return false;
    }
    
    // Custom template/snippet creation
    addTemplate(id, template) {
        if (this.templates[id]) {
            console.warn(`Template "${id}" already exists`);
            return false;
        }
        
        // Validate template structure
        if (!template.name || !template.files) {
            console.error('Invalid template structure');
            return false;
        }
        
        this.templates[id] = {
            category: 'custom',
            difficulty: 'beginner',
            ...template,
            created: new Date().toISOString()
        };
        
        console.log(`➕ Template "${template.name}" added successfully`);
        return true;
    }
    
    addSnippet(snippet) {
        // Validate snippet structure
        if (!snippet.id || !snippet.title || !snippet.code || !snippet.type) {
            console.error('Invalid snippet structure');
            return false;
        }
        
        // Check for duplicate ID
        if (this.snippets.find(s => s.id === snippet.id)) {
            console.warn(`Snippet "${snippet.id}" already exists`);
            return false;
        }
        
        this.snippets.push({
            category: 'custom',
            ...snippet,
            created: new Date().toISOString()
        });
        
        console.log(`➕ Snippet "${snippet.title}" added successfully`);
        return true;
    }
    
    removeTemplate(id) {
        if (this.templates[id]) {
            delete this.templates[id];
            console.log(`🗑️ Template "${id}" removed`);
            return true;
        }
        return false;
    }
    
    removeSnippet(id) {
        const index = this.snippets.findIndex(s => s.id === id);
        if (index !== -1) {
            this.snippets.splice(index, 1);
            console.log(`🗑️ Snippet "${id}" removed`);
            return true;
        }
        return false;
    }
    
    // Helper method for code formatting
    formatCode(code, type) {
        // Basic code formatting - in a real implementation, you might use libraries like Prettier
        switch (type) {
            case 'html':
                return this.formatHTML(code);
            case 'css':
                return this.formatCSS(code);
            case 'js':
                return this.formatJavaScript(code);
            default:
                return code;
        }
    }
    
    formatHTML(html) {
        // Basic HTML formatting
        return html.replace(/></g, '>\n<').replace(/^\s+|\s+$/gm, '');
    }
    
    formatCSS(css) {
        // Basic CSS formatting
        return css.replace(/;/g, ';\n').replace(/{/g, ' {\n').replace(/}/g, '\n}\n');
    }
    
    formatJavaScript(js) {
        // Basic JS formatting
        return js.replace(/;/g, ';\n').replace(/{/g, ' {\n').replace(/}/g, '\n}\n');
    }
}

// Export for global use
window.TemplateManager = TemplateManager;