<div align="center">

# Global Timezone Dashboard

![Global Timezone Dashboard](assets/logo.png)

The Global Timezone Dashboard is an interactive visualization tool that displays current times across all major world timezones using a seven-segment LED display style. This application provides professionals and travelers with a clear, at-a-glance view of global times with a customizable interface.

</div>

## Features:
- Displays local time with large seven-segment digits
- Shows times for all UTC offsets from -12:00 to +14:00
- Includes popular city/country references for each timezone
- Customizable display color with 8 vibrant options
- Real-time updates with smooth animations
- Timezone filtering for quick location searches
- Responsive design that works on all device sizes
- Keyboard shortcuts for quick color changes
- Persistent color preference using localStorage

## Technical Implementation

### Frontend Components

- **Seven-Segment Display System:**
  - Pure CSS implementation of LED-style digits
  - Smooth transitions between number states
  - Animated blinking colon for time separator

- **Timezone Visualization:**
  - Grid layout showing all major UTC offsets
  - Each clock displays location name and UTC offset
  - Current date and time for each timezone
  - Filterable by location or offset

- **User Interface:**
  - Color selector with preview and keyboard controls
  - Timezone counter showing visible/matching results
  - Responsive design with mobile optimizations
  - Clean, dark theme for reduced eye strain

## Installation and Usage

### Requirements

- Modern web browser (Chrome, Firefox, Edge, Safari)
- No server or backend required (runs entirely client-side)

### Setup Instructions

1. **Clone or download the repository:**
   ```bash
   git clone https://github.com/yourusername/global-timezone-dashboard.git
   cd global-timezone-dashboard
   ```

2. **Open the application:**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required

3. **Alternative deployment:**
   - Deploy the entire directory to any web server
   - Works as a static site with no special requirements

## Configuration

You can customize the following aspects of the application:

- **Color Themes:** Modify the `colors` array in `script.js` to add or change display colors
- **Timezones:** Adjust the `utcOffsets` array in `script.js` to change displayed locations
- **Visual Style:** Customize sizes, spacing, and animations in `styles.css`
- **Behavior:** Modify update intervals and display formats in `script.js`

## Keyboard Shortcuts

- **Right Arrow:** Cycle to next display color
- **Left Arrow:** Cycle to previous display color

## License

This project is licensed under the GNU General Public License (GPL). This means you are free to:

- Use the software for any purpose
- Study how the software works and modify it
- Distribute copies
- Distribute modified versions

The full license text is included in the repository.

## About Cybersight Security

Cybersight Security is a leading provider of cybersecurity solutions, helping organizations protect their digital assets against evolving threats. Our Global Threat Map is part of our commitment to security awareness and education.

**Disclaimer:** All time calculations are performed client-side using the user's local system time. Daylight saving time adjustments are handled by the browser's JavaScript engine.
