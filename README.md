# Faja's Pad - Ephemeral Scratchpad

![Faja's Pad](https://img.shields.io/badge/Faja's-Pad-667eea?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgMTcuMjVWMjFoMy43NUwxNy44MSA5Ljk0bC0zLjc1LTMuNzVMMiAzIDE3LjI1ek0yMC43MSA3LjA0Yy4zOS0uMzkuMzktMS4wMiAwLTEuNDFsLTIuMzQtMi4zNGMtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDBsLTEuODMgMS44MyAzLjc1IDMuNzUgMS44My0xLjgzeiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+)

A beautiful, ephemeral scratchpad that combines text writing and drawing with automatic content fading. Built with modern web technologies and inspired by Norwegian minimalist design.

![Ephemeral Scratchpad Demo](./demo.gif)

## ✨ Features

### 🎨 Dual Mode Interface
- **Text Mode**: Clean, distraction-free writing environment
- **Drawing Mode**: Full-featured canvas with pen and eraser tools

### 🌅 Norwegian-Inspired Design
- Minimalist aesthetic with glass-morphism effects
- Subtle gradients inspired by Nordic landscapes
- Smooth animations and transitions
- Light/Dark theme support

### ⏰ Ephemeral Experience
- Configurable content duration (1 hour to 1 week)
- Visual countdown timer
- Smooth fade-out animations
- Automatic content clearing

### 🎯 Advanced Drawing Tools
- Pressure-sensitive pen with adjustable brush size
- High-quality eraser tool
- Undo/Redo functionality (20-step history)
- Color picker with preset palette

### 💾 Export & Persistence
- Export drawings as PNG images
- Export text as downloadable files
- Automatic local storage saving
- Seamless session restoration

### ♿ Accessibility First
- Full ARIA label support
- Keyboard navigation shortcuts
- Screen reader compatibility
- High contrast focus indicators

### 📱 Responsive Design
- Mobile-optimized touch controls
- Adaptive layout for all screen sizes
- Touch-friendly interface elements

## 🚀 Quick Start

### Online Demo
Visit the live demo: [fajas-pad.vercel.app](https://fajas-pad.vercel.app)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fajas-pad.git
   cd fajas-pad
   ```

2. **Open in browser**
   ```bash
   # Using Python (recommended)
   python -m http.server 8000

   # Or using Node.js
   npx serve .

   # Or simply open index.html in your browser
   ```

3. **Start creating!**
   - Switch between Text and Drawing modes
   - Set your preferred duration
   - Start writing or drawing

## 🎮 Usage Guide

### Text Mode
- Click "📝 Text" or press `Ctrl+T`
- Start typing your thoughts
- Content automatically saves as you type
- Set duration from 1 hour to 1 week

### Drawing Mode
- Click "🎨 Draw" or press `Ctrl+D`
- Use mouse or touch to draw
- Adjust brush size with the slider
- Select colors from presets or custom picker
- Switch between pen and eraser tools

### Keyboard Shortcuts
- `Ctrl+T` - Switch to text mode
- `Ctrl+D` - Switch to drawing mode
- `Ctrl+S` - Export current content
- `Ctrl+Z` - Undo (drawing mode)
- `Ctrl+Shift+Z` or `Ctrl+Y` - Redo (drawing mode)
- `Escape` - Clear focus

### Theme Switching
- Click the theme toggle button (🌙/☀️)
- Automatically saves your preference
- Smooth transition between light and dark modes

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS with glass-morphism
- **Canvas**: HTML5 Canvas API with optimizations
- **Storage**: Browser localStorage with error handling
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Hardware acceleration and memory management

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment on Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fajas-pad)

### Manual Deployment

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel
   ```

2. **Configure Build Settings**
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (leave default)
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: `./` (leave default)

3. **Environment Variables** (Optional)
   - No environment variables required for basic functionality

4. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Configure DNS settings as instructed

### Vercel Configuration

Create `vercel.json` in your project root (optional):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
   - Test on multiple browsers
   - Test accessibility features
   - Test mobile responsiveness
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and naming conventions
- Add comments for complex logic
- Test accessibility features
- Ensure mobile compatibility
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 drwolfic (FowzanaSoft Solutions)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **Developed by**: drwolfic
- **Company**: FowzanaSoft Solutions
- Inspired by the beauty of Norwegian landscapes and minimalist design
- Built with modern web standards and best practices
- Special thanks to the open source community

## 📞 Support

If you find this project helpful, please:
- ⭐ Star the repository
- 🐛 Report bugs or request features
- 📢 Share with others who might find it useful

---

**Made with ❤️ by FowzanaSoft Solutions**
