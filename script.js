// Get DOM elements
const worksList = document.querySelector('.works-list');
const yearFilter = document.getElementById('year-filter');
const titleFilter = document.getElementById('title-filter');

// Function to process directory name
function processDirectoryName(dirname) {
    const parts = dirname.split('-');
    const year = parts[0];
    const title = parts.slice(1).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return {
        year: parseInt(year),
        title: title,
        dirname: dirname
    };
}

// Function to get works from directory structure
function getWorks() {
    // Get directories from the global variable
    const directories = window.directoryStructure || [];
    
    // Convert to work objects
    const works = directories.map(dirname => {
        return processDirectoryName(dirname);
    });
    
    return works.sort((a, b) => b.year - a.year);
}

// Populate filters
function populateFilters(works) {
    // Clear existing options
    yearFilter.innerHTML = '<option value="">YEAR ▾</option>';
    titleFilter.innerHTML = '<option value="">TITLE ▾</option>';

    // Get unique years and sort them
    const years = [...new Set(works.map(work => work.year))].sort((a, b) => b - a);
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    // Get unique titles and sort them
    const titles = [...new Set(works.map(work => work.title))].sort();
    titles.forEach(title => {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        titleFilter.appendChild(option);
    });
}

// Display works
function displayWorks(filteredWorks) {
    worksList.innerHTML = '';
    filteredWorks.forEach(work => {
        const yearSpan = document.createElement('span');
        yearSpan.className = 'year';
        yearSpan.textContent = work.year;

        const titleSpan = document.createElement('span');
        titleSpan.className = 'title';
        titleSpan.textContent = work.title;

        // Make the row clickable
        const row = document.createElement('div');
        row.className = 'work-row';
        row.appendChild(yearSpan);
        row.appendChild(titleSpan);
        
        // Add click event to show directory contents
        row.addEventListener('click', () => {
            window.location.href = `img/${work.dirname}/index.html`;
        });

        worksList.appendChild(row);
    });
}

// Filter works
function filterWorks(works) {
    const selectedYear = yearFilter.value;
    const selectedTitle = titleFilter.value;
    let filtered = works;
    
    if (selectedYear) {
        filtered = filtered.filter(work => work.year === parseInt(selectedYear));
    }
    
    if (selectedTitle) {
        filtered = filtered.filter(work => work.title === selectedTitle);
    }

    displayWorks(filtered);
}

// Initialize the page
function initialize() {
    const works = getWorks();
    populateFilters(works);
    displayWorks(works);

    // Event listeners
    yearFilter.addEventListener('change', () => filterWorks(works));
    titleFilter.addEventListener('change', () => filterWorks(works));
}

// Start the application
initialize(); 