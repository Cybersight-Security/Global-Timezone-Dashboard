// Configuration
const colors = [{
        name: 'Red',
        value: '#ff0000'
    },
    {
        name: 'Green',
        value: '#00ff00'
    },
    {
        name: 'Blue',
        value: '#0088ff'
    },
    {
        name: 'Cyan',
        value: '#00ffff'
    },
    {
        name: 'Orange',
        value: '#ff8800'
    },
    {
        name: 'Yellow',
        value: '#ffff00'
    },
    {
        name: 'Purple',
        value: '#aa00ff'
    },
    {
        name: 'Magenta',
        value: '#ff00ff'
    }
];

// UTC timezone offsets to display with popular cities/countries
const utcOffsets = [{
        offset: -12.00,
        displayName: "UTC−12:00",
        location: "Baker Island, US"
    },
    {
        offset: -11.00,
        displayName: "UTC−11:00",
        location: "Pago Pago, American Samoa"
    },
    {
        offset: -10.00,
        displayName: "UTC−10:00",
        location: "Honolulu, Hawaii"
    },
    {
        offset: -9.50,
        displayName: "UTC−09:30",
        location: "Marquesas Islands, French Polynesia"
    },
    {
        offset: -9.00,
        displayName: "UTC−09:00",
        location: "Anchorage, Alaska"
    },
    {
        offset: -8.00,
        displayName: "UTC−08:00",
        location: "Los Angeles, USA"
    },
    {
        offset: -7.00,
        displayName: "UTC−07:00",
        location: "Denver, USA"
    },
    {
        offset: -6.00,
        displayName: "UTC−06:00",
        location: "Mexico City, Mexico"
    },
    {
        offset: -5.00,
        displayName: "UTC−05:00",
        location: "New York, USA"
    },
    {
        offset: -4.00,
        displayName: "UTC−04:00",
        location: "Santiago, Chile"
    },
    {
        offset: -3.50,
        displayName: "UTC−03:30",
        location: "St. John's, Canada"
    },
    {
        offset: -3.00,
        displayName: "UTC−03:00",
        location: "Buenos Aires, Argentina"
    },
    {
        offset: -2.00,
        displayName: "UTC−02:00",
        location: "Fernando de Noronha, Brazil"
    },
    {
        offset: -1.00,
        displayName: "UTC−01:00",
        location: "Azores, Portugal"
    },
    {
        offset: 0.00,
        displayName: "UTC+00:00",
        location: "London, UK"
    },
    {
        offset: 1.00,
        displayName: "UTC+01:00",
        location: "Paris, France"
    },
    {
        offset: 2.00,
        displayName: "UTC+02:00",
        location: "Cairo, Egypt"
    },
    {
        offset: 3.00,
        displayName: "UTC+03:00",
        location: "Moscow, Russia"
    },
    {
        offset: 3.50,
        displayName: "UTC+03:30",
        location: "Tehran, Iran"
    },
    {
        offset: 4.00,
        displayName: "UTC+04:00",
        location: "Dubai, UAE"
    },
    {
        offset: 4.50,
        displayName: "UTC+04:30",
        location: "Kabul, Afghanistan"
    },
    {
        offset: 5.00,
        displayName: "UTC+05:00",
        location: "Karachi, Pakistan"
    },
    {
        offset: 5.50,
        displayName: "UTC+05:30",
        location: "New Delhi, India"
    },
    {
        offset: 5.75,
        displayName: "UTC+05:45",
        location: "Kathmandu, Nepal"
    },
    {
        offset: 6.00,
        displayName: "UTC+06:00",
        location: "Dhaka, Bangladesh"
    },
    {
        offset: 6.50,
        displayName: "UTC+06:30",
        location: "Yangon, Myanmar"
    },
    {
        offset: 7.00,
        displayName: "UTC+07:00",
        location: "Bangkok, Thailand"
    },
    {
        offset: 8.00,
        displayName: "UTC+08:00",
        location: "Beijing, China"
    },
    {
        offset: 9.00,
        displayName: "UTC+09:00",
        location: "Tokyo, Japan"
    },
    {
        offset: 9.50,
        displayName: "UTC+09:30",
        location: "Adelaide, Australia"
    },
    {
        offset: 10.00,
        displayName: "UTC+10:00",
        location: "Sydney, Australia"
    },
    {
        offset: 10.50,
        displayName: "UTC+10:30",
        location: "Lord Howe Island, Australia"
    },
    {
        offset: 11.00,
        displayName: "UTC+11:00",
        location: "Noumea, New Caledonia"
    },
    {
        offset: 12.00,
        displayName: "UTC+12:00",
        location: "Auckland, New Zealand"
    },
    {
        offset: 13.00,
        displayName: "UTC+13:00",
        location: "Nuku'alofa, Tonga"
    },
    {
        offset: 14.00,
        displayName: "UTC+14:00",
        location: "Kiritimati, Kiribati"
    }
];

// Get saved color preference or use default
let currentColorIndex = parseInt(localStorage.getItem('colorIndex') || '0');

// Element references - will be populated after DOM loads
let prevColorBtn;
let nextColorBtn;
let colorNameEl;
let filterInput;
let timezoneCountEl;

// Seven-segment display configuration
const segmentConfig = {
    '0': [1, 1, 1, 1, 1, 1, 0],
    '1': [0, 1, 1, 0, 0, 0, 0],
    '2': [1, 1, 0, 1, 1, 0, 1],
    '3': [1, 1, 1, 1, 0, 0, 1],
    '4': [0, 1, 1, 0, 0, 1, 1],
    '5': [1, 0, 1, 1, 0, 1, 1],
    '6': [1, 0, 1, 1, 1, 1, 1],
    '7': [1, 1, 1, 0, 0, 0, 0],
    '8': [1, 1, 1, 1, 1, 1, 1],
    '9': [1, 1, 1, 1, 0, 1, 1],
    ' ': [0, 0, 0, 0, 0, 0, 0],
    '-': [0, 0, 0, 0, 0, 0, 1]
};

// Update color theme
function updateColor() {
    const color = colors[currentColorIndex];
    document.documentElement.style.setProperty('--display-color', color.value);

    // Only update the color name element if it exists
    if (colorNameEl) {
        colorNameEl.textContent = color.name;
    }

    localStorage.setItem('colorIndex', currentColorIndex.toString());
}

// Format a date for a specific UTC offset
function getDateWithOffset(date, offsetHours) {
    // Create a new date object with the UTC time
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    // Add the offset hours to UTC time (in milliseconds)
    const offsetMillis = offsetHours * 3600000;
    const offsetDate = new Date(utcDate.getTime() + offsetMillis);

    return offsetDate;
}

// Format a date for display
function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    return `${day}, ${month} ${dayOfMonth}, ${year}`;
}

// Format a time as HH:MM:SS (24-hour format)
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

// Update local time display
function updateLocalTime(now) {
    const localTimeEl = document.getElementById('local-time');

    const localTimeString = formatTime(now);
    const localDateString = formatDate(now);

    // Create or update local time display
    if (localTimeEl.querySelector('.time')) {
        // Just update the existing elements
        localTimeEl.querySelector('.date').textContent = localDateString;
        updateDigits(localTimeEl.querySelector('.time'), localTimeString);
    } else {
        // Create the full display
        localTimeEl.innerHTML = '';

        const localHeader = document.createElement('h1');
        localHeader.textContent = 'Local Time';
        localTimeEl.appendChild(localHeader);

        const localDateEl = document.createElement('div');
        localDateEl.className = 'date';
        localDateEl.textContent = localDateString;
        localTimeEl.appendChild(localDateEl);

        const localTimeDisplayEl = document.createElement('div');
        localTimeDisplayEl.className = 'time';
        createTimeDisplay(localTimeDisplayEl, localTimeString);
        localTimeEl.appendChild(localTimeDisplayEl);
    }
}

// Update a UTC timezone clock
function updateUtcClock(clockEl, offsetHours, now) {
    const offsetDate = getDateWithOffset(now, offsetHours);
    const timeString = formatTime(offsetDate);
    const dateString = formatDate(offsetDate);

    const dateEl = clockEl.querySelector('.date');
    dateEl.textContent = dateString;

    const timeEl = clockEl.querySelector('.time');
    // Check if the time display has been initialized with digits
    if (timeEl.children.length === 0) {
        createTimeDisplay(timeEl, timeString);
    } else {
        updateDigits(timeEl, timeString);
    }
}

// Create a time display with digits and colons
function createTimeDisplay(container, timeString) {
    const digits = timeString.replace(/:/g, '');
    for (let i = 0; i < digits.length; i++) {
        container.appendChild(createDigitElement(digits[i]));
        if (i === 1 || i === 3) {
            container.appendChild(createColon());
        }
    }
}

// Create a seven-segment display for a digit
function createDigitElement(digit) {
    const config = segmentConfig[digit] || segmentConfig[' '];
    const digitContainer = document.createElement('div');
    digitContainer.className = 'digit-container';

    const segmentNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    segmentNames.forEach((name, index) => {
        const segment = document.createElement('div');
        segment.className = `segment segment-${name}`;
        if (config[index]) {
            segment.classList.add('on');
        }
        digitContainer.appendChild(segment);
    });

    return digitContainer;
}

// Create a blinking colon
function createColon() {
    const colonContainer = document.createElement('div');
    colonContainer.className = 'colon';
    colonContainer.textContent = ':';
    return colonContainer;
}

// Update existing digits without recreating them
function updateDigits(container, timeString) {
    const digits = timeString.replace(/:/g, '');
    const digitElements = container.querySelectorAll('.digit-container');

    for (let i = 0; i < digits.length && i < digitElements.length; i++) {
        const config = segmentConfig[digits[i]] || segmentConfig[' '];
        const segments = digitElements[i].querySelectorAll('.segment');

        segments.forEach((segment, segmentIndex) => {
            if (config[segmentIndex]) {
                segment.classList.add('on');
            } else {
                segment.classList.remove('on');
            }
        });
    }
}

// Update all clocks
function updateClocks() {
    const now = new Date();

    // Update local time display
    updateLocalTime(now);

    // Update all UTC timezone clocks
    document.querySelectorAll('.clock').forEach(clock => {
        const offsetHours = parseFloat(clock.getAttribute('data-offset'));
        updateUtcClock(clock, offsetHours, now);
    });
}

// Populate timezone grid with UTC offsets
function populateTimezones() {
    const grid = document.getElementById('timezone-grid');

    // Clear existing content
    grid.innerHTML = '';

    // Create clocks for each UTC offset
    utcOffsets.forEach(tz => {
        const clockEl = document.createElement('div');
        clockEl.className = 'clock';
        clockEl.setAttribute('data-offset', tz.offset);

        const titleEl = document.createElement('div');
        titleEl.className = 'clock-title';
        titleEl.textContent = tz.location;
        clockEl.appendChild(titleEl);

        const subtitleEl = document.createElement('div');
        subtitleEl.className = 'clock-subtitle';

        // Format the offset for subtitle display (e.g., "UTC+08:00") - Fixed from GMT to UTC
        const offsetSign = tz.offset >= 0 ? '+' : '−';
        const offsetHours = Math.floor(Math.abs(tz.offset));
        const offsetMinutes = Math.round((Math.abs(tz.offset) % 1) * 60);
        const formattedOffset = `UTC${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

        subtitleEl.textContent = formattedOffset;
        clockEl.appendChild(subtitleEl);

        const dateEl = document.createElement('div');
        dateEl.className = 'date';
        clockEl.appendChild(dateEl);

        const timeEl = document.createElement('div');
        timeEl.className = 'time';
        clockEl.appendChild(timeEl);

        grid.appendChild(clockEl);
    });

    // Initial update of clocks
    updateClocks();

    // Update timezone count
    if (timezoneCountEl) {
        timezoneCountEl.textContent = `${utcOffsets.length} timezones`;
    }
}

// Initialize the app after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial color
    updateColor();

    // Get DOM elements
    prevColorBtn = document.getElementById('prev-color');
    nextColorBtn = document.getElementById('next-color');
    colorNameEl = document.getElementById('color-name');
    filterInput = document.getElementById('timezone-filter');
    timezoneCountEl = document.getElementById('timezone-count');

    // Setup color change button event listeners
    if (prevColorBtn) {
        prevColorBtn.addEventListener('click', function() {
            currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
            updateColor();
        });
    }

    if (nextColorBtn) {
        nextColorBtn.addEventListener('click', function() {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            updateColor();
        });
    }

    // Setup keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            updateColor();
        } else if (event.key === 'ArrowLeft') {
            currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
            updateColor();
        }
    });

    // Setup filter event listener
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            const filterText = this.value.toLowerCase();
            const clocks = document.querySelectorAll('.clock');
            let visibleCount = 0;

            clocks.forEach(clock => {
                const displayName = clock.querySelector('.clock-title').textContent.toLowerCase();
                const offsetString = clock.querySelector('.clock-subtitle').textContent.toLowerCase();

                if (displayName.includes(filterText) || offsetString.includes(filterText)) {
                    clock.style.display = '';
                    visibleCount++;
                } else {
                    clock.style.display = 'none';
                }
            });

            if (timezoneCountEl) {
                timezoneCountEl.textContent = `${visibleCount} of ${utcOffsets.length} timezones`;
            }
        });
    }

    // Initialize the clocks
    populateTimezones();

    // Start the clock update interval
    setInterval(updateClocks, 1000);
});