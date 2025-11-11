// Ephemeral Scratchpad Application
class EphemeralPad {
    constructor() {
        this.currentMode = 'text';
        this.currentColor = '#000000';
        this.currentTool = 'pen';
        this.brushSize = 2;
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.fadeInterval = null;
        this.canvasHistory = [];
        this.historyIndex = -1;
        this.maxHistory = 20;

        // DOM elements
        this.body = document.body;
        this.durationSelect = document.getElementById('duration');
        this.customHoursInput = document.getElementById('customHours');
        this.themeToggle = document.getElementById('themeToggle');
        this.modeBtns = document.querySelectorAll('.mode-btn');
        this.textContainer = document.getElementById('textContainer');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.textArea = document.getElementById('textArea');
        this.canvas = document.getElementById('canvas');
        this.colorBtns = document.querySelectorAll('.color-btn');
        this.colorPicker = document.getElementById('colorPicker');
        this.fadeNotice = document.getElementById('fadeNotice');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.countdownTimer = document.getElementById('countdownTimer');

        // Canvas context
        this.ctx = this.canvas.getContext('2d');

        this.init();
    }

    init() {
        try {
            this.setupCanvas();
            this.loadData();
            this.setupEventListeners();
            this.startFadeTimer();
            this.updateUI();
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to initialize the application. Please refresh the page.');
        }
    }

    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineWidth = this.brushSize;

        // Apply performance optimizations
        this.optimizeCanvas();
    }

    setupEventListeners() {
        // Duration change
        this.durationSelect.addEventListener('change', () => this.handleDurationChange());
        this.customHoursInput.addEventListener('input', () => this.handleCustomHoursChange());

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Mode toggle
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
        });

        // Text area
        this.textArea.addEventListener('input', () => this.saveTextData());

        // Color controls
        this.colorBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setColor(btn.dataset.color));
        });
        this.colorPicker.addEventListener('input', () => this.setColor(this.colorPicker.value));

        // Undo/Redo controls
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');
        if (undoBtn) undoBtn.addEventListener('click', () => this.undo());
        if (redoBtn) redoBtn.addEventListener('click', () => this.redo());

        // Export controls
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportContent());

        // Tool controls
        const toolBtns = document.querySelectorAll('.tool-btn');
        toolBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setTool(btn.dataset.tool));
        });

        // Brush size control
        const brushSizeSlider = document.getElementById('brushSize');
        const brushSizeValue = document.getElementById('brushSizeValue');
        brushSizeSlider.addEventListener('input', (e) => {
            this.brushSize = parseInt(e.target.value);
            brushSizeValue.textContent = this.brushSize + 'px';
            this.ctx.lineWidth = this.brushSize;
        });

        // Canvas events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.stopDrawing());

        // Window resize
        window.addEventListener('resize', () => {
            if (this.currentMode === 'scribble') {
                this.setupCanvas();
                this.loadCanvasData();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Performance monitoring
        this.performanceMonitor = {
            startTime: Date.now(),
            operations: 0,
            lastCleanup: Date.now()
        };
    }

    // Duration handling
    handleDurationChange() {
        if (this.durationSelect.value === 'custom') {
            this.customHoursInput.style.display = 'inline-block';
            this.customHoursInput.focus();
        } else {
            this.customHoursInput.style.display = 'none';
            this.saveData();
        }
    }

    handleCustomHoursChange() {
        this.saveData();
    }

    getCurrentDuration() {
        if (this.durationSelect.value === 'custom') {
            const hours = parseFloat(this.customHoursInput.value);
            return isNaN(hours) || hours <= 0 ? 24 : hours;
        }
        return parseFloat(this.durationSelect.value);
    }

    // Theme toggle
    toggleTheme() {
        this.body.classList.toggle('light');
        this.body.classList.toggle('dark');
        const isDark = this.body.classList.contains('dark');
        this.themeToggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
        this.saveData();
    }

    // Mode switching
    switchMode(mode) {
        this.currentMode = mode;
        this.modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        const drawingTools = document.getElementById('drawingTools');
        const drawingTools2 = document.getElementById('drawingTools2');
        const brushControls = document.getElementById('brushControls');
        const exportControls = document.getElementById('exportControls');

        if (mode === 'text') {
            this.textContainer.style.display = 'block';
            this.canvasContainer.style.display = 'none';
            drawingTools.style.display = 'none';
            drawingTools2.style.display = 'none';
            brushControls.style.display = 'none';
            exportControls.style.display = 'block';
            this.textArea.focus();
        } else {
            this.textContainer.style.display = 'none';
            this.canvasContainer.style.display = 'block';
            drawingTools.style.display = 'block';
            drawingTools2.style.display = 'block';
            brushControls.style.display = 'block';
            exportControls.style.display = 'block';
            this.setupCanvas();
            this.loadCanvasData();
            this.setTool(this.currentTool); // Apply current tool setting
            this.clearCanvasHistory(); // Reset history when switching to draw mode
        }

        this.saveData();
    }

    // Color handling
    setColor(color) {
        this.currentColor = color;
        this.colorPicker.value = color;
        this.ctx.strokeStyle = color;
        this.textArea.style.color = color;
        this.saveData();
    }

    // Tool handling
    setTool(tool) {
        this.currentTool = tool;
        const toolBtns = document.querySelectorAll('.tool-btn');
        toolBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tool === tool);
        });

        if (tool === 'eraser') {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.strokeStyle = 'rgba(0,0,0,1)';
            this.ctx.lineWidth = Math.max(this.brushSize * 2, 8); // Eraser is 2x pen size, minimum 8px
            this.canvas.classList.add('eraser-cursor');
            this.canvas.classList.remove('pen-cursor');
        } else {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.strokeStyle = this.currentColor;
            this.ctx.lineWidth = this.brushSize;
            this.canvas.classList.add('pen-cursor');
            this.canvas.classList.remove('eraser-cursor');
        }
    }

    // Text handling
    saveTextData() {
        this.saveData();
    }

    // Canvas drawing
    startDrawing(e) {
        this.isDrawing = true;
        [this.lastX, this.lastY] = this.getCanvasCoordinates(e);
        // Save state before starting to draw
        this.saveCanvasState();
    }

    draw(e) {
        if (!this.isDrawing) return;
        const [x, y] = this.getCanvasCoordinates(e);

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        [this.lastX, this.lastY] = [x, y];
        this.saveCanvasData();
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    // Undo/Redo functionality
    saveCanvasState() {
        // Save current canvas state
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        // Remove any history after current index (for when user draws after undo)
        this.canvasHistory = this.canvasHistory.slice(0, this.historyIndex + 1);

        // Add new state
        this.canvasHistory.push(imageData);

        // Limit history size
        if (this.canvasHistory.length > this.maxHistory) {
            this.canvasHistory.shift();
        } else {
            this.historyIndex++;
        }

        this.updateUndoRedoButtons();
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreCanvasState();
            this.updateUndoRedoButtons();
        }
    }

    redo() {
        if (this.historyIndex < this.canvasHistory.length - 1) {
            this.historyIndex++;
            this.restoreCanvasState();
            this.updateUndoRedoButtons();
        }
    }

    restoreCanvasState() {
        if (this.canvasHistory[this.historyIndex]) {
            this.ctx.putImageData(this.canvasHistory[this.historyIndex], 0, 0);
            this.saveCanvasData(); // Save the restored state
        }
    }

    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');

        if (undoBtn) {
            undoBtn.disabled = this.historyIndex <= 0;
        }
        if (redoBtn) {
            redoBtn.disabled = this.historyIndex >= this.canvasHistory.length - 1;
        }
    }

    clearCanvasHistory() {
        this.canvasHistory = [];
        this.historyIndex = -1;
        this.updateUndoRedoButtons();
    }

    // Export functionality
    exportContent() {
        try {
            if (this.currentMode === 'text') {
                this.exportText();
            } else {
                this.exportCanvas();
            }
        } catch (error) {
            console.error('Export failed:', error);
            this.showError('Failed to export content. Please try again.');
        }
    }

    exportCanvas() {
        // Create a temporary canvas to export with white background
        const exportCanvas = document.createElement('canvas');
        const exportCtx = exportCanvas.getContext('2d');

        exportCanvas.width = this.canvas.width;
        exportCanvas.height = this.canvas.height;

        // Fill with white background
        exportCtx.fillStyle = '#ffffff';
        exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

        // Draw the current canvas content
        exportCtx.drawImage(this.canvas, 0, 0);

        // Create download link
        const link = document.createElement('a');
        link.download = `ephemeral-drawing-${new Date().toISOString().split('T')[0]}.png`;
        link.href = exportCanvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    exportText() {
        const text = this.textArea.value;
        if (!text.trim()) {
            this.showError('No text to export.');
            return;
        }

        // Create blob with text content
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

        // Create download link
        const link = document.createElement('a');
        link.download = `ephemeral-text-${new Date().toISOString().split('T')[0]}.txt`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the object URL
        URL.revokeObjectURL(link.href);
    }

    getCanvasCoordinates(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        let x, y;
        if (e.touches) {
            x = (e.touches[0].clientX - rect.left) * scaleX;
            y = (e.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (e.clientX - rect.left) * scaleX;
            y = (e.clientY - rect.top) * scaleY;
        }

        return [x, y];
    }

    handleTouchStart(e) {
        e.preventDefault();
        this.startDrawing(e);
    }

    handleTouchMove(e) {
        e.preventDefault();
        this.draw(e);
    }

    // Data persistence with error handling
    saveData() {
        try {
            const data = {
                mode: this.currentMode,
                duration: this.getCurrentDuration(),
                theme: this.body.classList.contains('dark') ? 'dark' : 'light',
                color: this.currentColor,
                timestamp: Date.now()
            };

            if (this.currentMode === 'text') {
                data.text = this.textArea.value;
            }

            localStorage.setItem('ephemeral_data', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save data:', error);
            this.showError('Failed to save your work. Please check your browser storage settings.');
        }
    }

    saveCanvasData() {
        try {
            const data = {
                mode: 'scribble',
                duration: this.getCurrentDuration(),
                theme: this.body.classList.contains('dark') ? 'dark' : 'light',
                color: this.currentColor,
                timestamp: Date.now(),
                imageData: this.canvas.toDataURL()
            };

            localStorage.setItem('ephemeral_data', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save canvas data:', error);
            this.showError('Failed to save your drawing. Please check your browser storage settings.');
        }
    }

    loadData() {
        try {
            const saved = localStorage.getItem('ephemeral_data');
            if (!saved) return;

            const data = JSON.parse(saved);

            // Restore settings
            this.currentMode = data.mode || 'text';
            this.currentColor = data.color || '#000000';

            // Restore theme
            if (data.theme === 'dark') {
                this.body.classList.remove('light');
                this.body.classList.add('dark');
                this.themeToggle.textContent = '☀️ Light';
            }

            // Restore duration
            if ([1, 6, 12, 24, 48, 168].includes(data.duration)) {
                this.durationSelect.value = data.duration.toString();
            } else {
                this.durationSelect.value = 'custom';
                this.customHoursInput.value = data.duration;
                this.customHoursInput.style.display = 'inline-block';
            }

            // Load content based on mode
            if (data.mode === 'text' && data.text) {
                this.textArea.value = data.text;
            } else if (data.mode === 'scribble' && data.imageData) {
                this.loadCanvasData(data.imageData);
            }

            // Apply color
            this.textArea.style.color = this.currentColor;
            this.ctx.strokeStyle = this.currentColor;

            // Calculate and apply fade
            this.updateFade(data.timestamp, data.duration);
        } catch (error) {
            console.error('Failed to load data:', error);
            this.showError('Failed to load saved data. Starting with a clean slate.');
            localStorage.removeItem('ephemeral_data');
        }
    }

    loadCanvasData(imageData) {
        if (!imageData) return;

        const img = new Image();
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
        img.src = imageData;
    }

    // Fade functionality
    startFadeTimer() {
        this.fadeInterval = setInterval(() => {
            try {
                const saved = localStorage.getItem('ephemeral_data');
                if (!saved) {
                    this.timerDisplay.style.display = 'none';
                    return;
                }

                const data = JSON.parse(saved);
                this.updateFade(data.timestamp, data.duration);
                this.updateCountdown(data.timestamp, data.duration);
            } catch (error) {
                console.error('Error in fade timer:', error);
                this.timerDisplay.style.display = 'none';
            }
        }, 1000); // Update every second
    }

    updateFade(timestamp, duration) {
        const elapsed = Date.now() - timestamp;
        const durationMs = duration * 60 * 60 * 1000; // Convert hours to milliseconds
        const progress = Math.min(elapsed / durationMs, 1);

        const opacity = 1 - progress;

        if (this.currentMode === 'text') {
            this.textContainer.style.opacity = opacity;
        } else {
            this.canvasContainer.style.opacity = opacity;
        }

        // Show fade notice when content starts fading
        if (progress > 0.1 && opacity > 0.1) {
            this.fadeNotice.classList.add('visible');
            setTimeout(() => this.fadeNotice.classList.remove('visible'), 3000);
        }

        // Clear content when fully faded
        if (opacity <= 0.01) {
            this.clearContent();
        }
    }

    updateCountdown(timestamp, duration) {
        const elapsed = Date.now() - timestamp;
        const durationMs = duration * 60 * 60 * 1000;
        const remaining = Math.max(0, durationMs - elapsed);

        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        this.countdownTimer.textContent = timeString;
        this.timerDisplay.style.display = remaining > 0 ? 'block' : 'none';
    }

    clearContent() {
        if (this.currentMode === 'text') {
            this.textArea.value = '';
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        localStorage.removeItem('ephemeral_data');
    }

    // UI updates
    updateUI() {
        this.modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === this.currentMode);
        });

        const drawingTools = document.getElementById('drawingTools');
        const drawingTools2 = document.getElementById('drawingTools2');
        const brushControls = document.getElementById('brushControls');
        const exportControls = document.getElementById('exportControls');

        if (this.currentMode === 'text') {
            this.textContainer.style.display = 'block';
            this.canvasContainer.style.display = 'none';
            drawingTools.style.display = 'none';
            drawingTools2.style.display = 'none';
            brushControls.style.display = 'none';
            exportControls.style.display = 'block';
        } else {
            this.textContainer.style.display = 'none';
            this.canvasContainer.style.display = 'block';
            drawingTools.style.display = 'block';
            drawingTools2.style.display = 'block';
            brushControls.style.display = 'block';
            exportControls.style.display = 'block';
        }
    }

    // Keyboard navigation
    handleKeyboard(e) {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            return;
        }

        switch (e.key.toLowerCase()) {
            case 't':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.switchMode('text');
                }
                break;
            case 'd':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.switchMode('scribble');
                }
                break;
            case 's':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.exportContent();
                }
                break;
            case 'z':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                }
                break;
            case 'y':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.redo();
                }
                break;
            case 'escape':
                // Clear focus from any focused element
                document.activeElement.blur();
                break;
        }
    }

    // Performance optimizations
    optimizeCanvas() {
        // Enable image smoothing for better quality
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        // Use hardware acceleration hints
        this.canvas.style.transform = 'translateZ(0)';

        // Throttle save operations
        this.throttleSave = this.throttle(() => this.saveCanvasData(), 100);
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();

            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Memory management
    cleanupMemory() {
        // Clear old canvas history if too large
        if (this.canvasHistory.length > this.maxHistory) {
            this.canvasHistory = this.canvasHistory.slice(-this.maxHistory);
        }

        // Force garbage collection hint (if available)
        if (window.gc) {
            window.gc();
        }
    }

    // Error handling
    showError(message) {
        // Create a temporary error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1001;
            max-width: 300px;
            role: alert;
            aria-live: assertive;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EphemeralPad();
});
