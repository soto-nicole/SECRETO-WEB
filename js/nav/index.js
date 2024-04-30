/*
This function is executed when the DOM content is fully loaded. 
It checks the current URL path and adds the 'active' class to the corresponding navigation link, highlighting the active page in the navigation bar.
It also handles dropdown menus by adding the 'active' class to the parent dropdown button when its child link matches the current URL path.

Additionally, it sets up event listeners for keyboard interaction with dropdown buttons and for clicking outside of dropdown menus to close them.
*/
document.addEventListener('DOMContentLoaded', function () {
    // Get the current URL path
    const path = window.location.href;

    // Select all navigation links
    const navLinks = document.querySelectorAll('.nav-item-link, .dropdown-item');

    // Initialize variable to track active dropdown menu
    let activeDropdown = null;

    // Iterate through each navigation link
    navLinks.forEach(link => {
        if (link.href === path) {
            link.classList.add('active');
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                dropdownParent.querySelector('.dropdown-btn').classList.add('active');
            }
        }
    });

    // Select all dropdown buttons and set tabindex for keyboard navigation
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    dropdownButtons.forEach(button => {
        button.setAttribute('tabindex', '0');
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleDropdown(this);
                e.preventDefault();
            }
        });
    });

    // Add click event listener to close active dropdown menu when clicking outside of dropdown
    document.addEventListener('click', function (event) {
        if (activeDropdown && !event.target.closest('.dropdown')) {
            closeActiveDropdown();
        }
    });

    // Function to toggle dropdown visibility
    window.toggleDropdown = (element) => {
        const dropdownItemsContainer = element.nextElementSibling;

        // Toggle class to show/hide dropdown items
        dropdownItemsContainer.classList.toggle("show-dropdown-items-container");

        // Close active dropdown if another dropdown is opened
        if (activeDropdown && activeDropdown !== dropdownItemsContainer) {
            closeActiveDropdown();
        }
        // Update active dropdown variable
        activeDropdown = dropdownItemsContainer.classList.contains("show-dropdown-items-container") ? dropdownItemsContainer : null;
    };

    // Function to close active dropdown menu
    function closeActiveDropdown() {
        if (activeDropdown) {
            activeDropdown.classList.remove("show-dropdown-items-container");
            activeDropdown = null;
        }
    }
});

// Function to toggle mobile navigation menu visibility and lock scroll
function toggleNavItems() {
    var body = document.body;
    var navItems = document.querySelector('.nav-items-mobile');
    navItems.classList.toggle('show-nav-items');
    body.classList.toggle('lock-scroll');
}