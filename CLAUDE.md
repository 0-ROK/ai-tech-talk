# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive web presentation about AI memory systems, titled "AIX 0µ : LLM T¨¬ \Ä@ ø˜ D¤M˜" (The Art of AI Memory: LLM Memory Limitations and Future Architectures). It's built as a static website using Reveal.js for presentation functionality.

## Key Commands

### Development & Testing
```bash
# Start local development server
npm start
# or
python3 -m http.server 8000

# Access at http://localhost:8000
```

### Build & Deployment
```bash
# No build step required (static site)
npm run build

# Deploy to GitHub Pages
npm run deploy

# Generate PDF from presentation
npm run pdf
```

## Architecture & Structure

### Core Components

**Presentation Framework**
- Built on Reveal.js 5.0.4 with custom themes and plugins
- Main entry point: `index.html` with nested `<section>` elements for slides
- 5 main sections covering LLM memory evolution from limitations to future architectures

**Visualization System**
- `js/visualizations.js`: Contains all chart and diagram generation functions
- Uses Chart.js for interactive charts (context windows, scaling laws, evaluation metrics)
- Custom CSS animations for architecture diagrams (RAG, GraphRAG, JEPA, memory systems)
- Responsive design with percentage-based positioning instead of fixed pixels

**Event Management**
- `js/main.js`: Reveal.js configuration and global event handling
- Handles slide changes, chart resizing, keyboard shortcuts, and touch gestures
- Automatic visualization initialization and responsive chart updates

### Content Architecture

The presentation follows a specific narrative flow:
1. **Current Dilemma**: LLM context window limitations and scaling law constraints
2. **Harness Era**: RAG, GraphRAG, model routers as temporary solutions
3. **Memory Research Journey**: History from Neural Turing Machines to modern systems
4. **Future Bifurcation**: Yann LeCun's JEPA vs gradual evolution approaches
5. **Conclusion**: GraphRAG evaluation as 80% harness, 20% future prototype

### Visualization Functions

Each section has dedicated visualization functions in `visualizations.js`:
- `createContextWindowChart()`: Bar chart showing LLM context evolution
- `createScalingChart()`: Line chart showing scaling law limitations
- `createRAGArchitecture()`: Dynamic diagram of RAG components
- `createGraphRAGArchitecture()`: Complex GraphRAG flow visualization
- `createJEPAViz()`: JEPA architecture with animated components
- `createMemoryTimeline()`: Historical timeline of memory research

### Responsive Design Patterns

All visualizations use responsive units:
- Container heights: `60vh` with `min-height` and `max-height` constraints
- Positions: Percentage-based (`left: 15%`) instead of fixed pixels
- Chart.js instances automatically resize on window/slide changes
- Touch gesture support for mobile navigation

### Key Technical Considerations

**Chart Management**: Charts are created once and resized on slide changes rather than recreated
**Memory Management**: Visualization functions check for element existence before manipulation
**Error Handling**: Graceful degradation when Chart.js or DOM elements are unavailable
**Performance**: Lazy initialization with timeouts to ensure Reveal.js loads completely

## Customization Patterns

**Adding New Slides**: Insert `<section>` elements within existing section containers in `index.html`
**Creating Visualizations**: Add functions to `visualizations.js` following the existing pattern of element checking and responsive positioning
**Styling Changes**: Modify `css/custom.css` which overrides Reveal.js default themes with custom color schemes and animations

## PDF Export

The presentation supports PDF generation via:
- URL parameter: `?print-pdf` for browser-based PDF creation
- Decktape integration via `npm run pdf` for high-quality output