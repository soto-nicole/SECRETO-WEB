/** 
 * Nav bar
 * This script has two functionalities: 
 * 1. Check the current active tab the user is on to improve the overall user experience
 * 2. Manages the dropdown menu by toggling their visibility as well as closing the dropdown if nothing was clicked from the menu, to avoid sticky behaviour
 */
document.addEventListener('DOMContentLoaded', function () {
    
    //is-active logic
    const path = window.location.href; 
    const navLinks = document.querySelectorAll('.nav-item-link, .dropdown-item');
    //Flag that checks if an active link was found
    let foundActive = false; 

    // Looking for current page
    navLinks.forEach(link => {
        if (link.href === path) {
            link.classList.add('active'); //If it's active, add it to the current link
            foundActive = true;

            // Workaround: if this is a dropdown item, set the parent dropdown button to active - as there is no pages for the two tabs that contains dropdowns
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                dropdownParent.querySelector('.dropdown-btn').classList.add('active');
            }
        }
    });

    //----------------------------------------------------------------------------------------------------------------
    // Dropdown toggling logic
    window.toggleDropdown = (element) => {
        //Getting element container
        const dropdownItemsContainer = element.nextElementSibling;

        //Toggling visibility 
        dropdownItemsContainer.classList.toggle("show-dropdown-items-container");

        // Close the previously active dropdown if a new one is opened - avoiding two open at the same time
        if (activeDropdown && activeDropdown !== dropdownItemsContainer) {
            closeActiveDropdown();
        }
        activeDropdown = dropdownItemsContainer.classList.contains("show-dropdown-items-container") ? dropdownItemsContainer : null;
    };

    // Avoid sticking behaviour - If there is a click outside of the dropdown menu, close the active dropdown
    let activeDropdown = null;
    document.addEventListener('click', function (event) {
        if (activeDropdown && !activeDropdown.contains(event.target) && !activeDropdown.previousElementSibling.contains(event.target)) {
            closeActiveDropdown();
        }
    });

    // Function to close the active dropdown
    const closeActiveDropdown = () => {
        if (activeDropdown) {
            activeDropdown.previousElementSibling.classList.remove("active-dropdown-button");
            activeDropdown.classList.remove("show-dropdown-items-container");
            activeDropdown = null;
        }
    };
});

//----------------------------------------------------------------------------------------------------------------
// Function to toggle mobile nav items
function toggleNavItems() {
    var body = document.body;
    var navItems = document.querySelector('.nav-items-mobile');
    navItems.classList.toggle('show-nav-items'); 
    body.classList.toggle('lock-scroll');  
}