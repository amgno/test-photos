// Get DOM elements
const worksList = document.querySelector('.works-list');
const yearFilter = document.getElementById('year-filter');
const titleFilter = document.getElementById('title-filter');

// Function to process directory name
function processDirectoryName(dirname) {
    const parts = dirname.split('-');
    const year = parts[0];
    const month = parts[1];
    const location = parts.slice(2).join(' ');
    
    return {
        year: year,
        month: month,
        location: location,
        path: `/img/${dirname}`,
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
        const row = document.createElement('div');
        row.className = 'work-row';
        
        row.innerHTML = `
            <span class="title">${work.location}</span>
            <span class="month-year">
                <em>${work.month}</em>
                ${work.year}
            </span>
        `;
        
        row.addEventListener('click', (e) => {
            e.preventDefault();
            showGallery(work.path);
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
    // Get directories from the imagePaths
    const directories = [...new Set(imagePaths.map(path => {
        const parts = path.split('/');
        return parts[2]; // Get the directory name
    }))];
    
    const works = directories.map(processDirectoryName);
    populateFilters(works);
    displayWorks(works);
}

// Start the application
initialize();

function showGallery(folderPath, initialPhotoIndex = 0) {
    console.log('Showing gallery for:', folderPath);
    const galleryView = document.querySelector('.gallery-view');
    const photoGrid = galleryView.querySelector('.photo-grid');
    const photoCounter = document.querySelector('.photo-counter');
    
    // Store current folder for sharing
    photoGrid.dataset.currentFolder = folderPath;
    
    // Clear existing content
    photoGrid.innerHTML = '';
    
    // Get folder info and images
    const folderInfo = imageData.folders.find(f => f.path === folderPath);
    const folderImages = imageData.images.filter(img => img.folder === folderPath);
    const totalImages = folderImages.length;
    
    console.log('Total images:', totalImages);
    
    // Create photo items
    folderImages.forEach((image, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <div class="image-wrapper">
                <img src="{{ site.baseurl }}${image.path}" loading="lazy" alt="Photo ${index + 1}">
                <div class="photo-info">
                    <div class="location">${folderInfo.location}</div>
                    <div class="year">${folderInfo.year}</div>
                </div>
            </div>
        `;
        photoGrid.appendChild(photoItem);
    });
    
    // Navigation functions
    const updateCounter = (index) => {
        console.log('Updating counter:', index + 1, totalImages);
        photoCounter.textContent = `${index + 1}/${totalImages}`;
    };
    
    const navigateToImage = (index) => {
        if (index >= 0 && index < totalImages) {
            const photoItem = photoGrid.children[index];
            if (photoItem) {
                photoItem.scrollIntoView({ behavior: 'smooth' });
                updateCounter(index);
            }
        }
    };
    
    // Setup navigation
    const prevButton = document.querySelector('.gallery-nav .prev');
    const nextButton = document.querySelector('.gallery-nav .next');
    
    prevButton.onclick = (e) => {
        e.preventDefault();
        const currentIndex = Math.floor(photoGrid.scrollLeft / photoGrid.offsetWidth);
        navigateToImage(currentIndex - 1);
    };
    
    nextButton.onclick = (e) => {
        e.preventDefault();
        const currentIndex = Math.floor(photoGrid.scrollLeft / photoGrid.offsetWidth);
        navigateToImage(currentIndex + 1);
    };
    
    // Update counter on scroll
    photoGrid.addEventListener('scroll', () => {
        const currentIndex = Math.floor(photoGrid.scrollLeft / photoGrid.offsetWidth);
        updateCounter(currentIndex);
    });
    
    // Set initial state and navigate to initial photo
    updateCounter(initialPhotoIndex);
    setTimeout(() => {
        navigateToImage(initialPhotoIndex);
    }, 100);
    
    // Show gallery
    galleryView.classList.add('active');
    document.body.style.overflow = 'hidden';
} 