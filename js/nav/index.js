document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.href;
    const navLinks = document.querySelectorAll('.nav-item-link, .dropdown-item');
    let activeDropdown = null;

    navLinks.forEach(link => {
        if (link.href === path) {
            link.classList.add('active');
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                dropdownParent.querySelector('.dropdown-btn').classList.add('active');
            }
        }
    });

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

    document.addEventListener('click', function (event) {
        if (activeDropdown && !event.target.closest('.dropdown')) {
            closeActiveDropdown();
        }
    });

    window.toggleDropdown = (element) => {
        const dropdownItemsContainer = element.nextElementSibling;
        dropdownItemsContainer.classList.toggle("show-dropdown-items-container");
        if (activeDropdown && activeDropdown !== dropdownItemsContainer) {
            closeActiveDropdown();
        }
        activeDropdown = dropdownItemsContainer.classList.contains("show-dropdown-items-container") ? dropdownItemsContainer : null;
    };

    function closeActiveDropdown() {
        if (activeDropdown) {
            activeDropdown.classList.remove("show-dropdown-items-container");
            activeDropdown = null;
        }
    }
});

function toggleNavItems() {
    var body = document.body;
    var navItems = document.querySelector('.nav-items-mobile');
    navItems.classList.toggle('show-nav-items'); 
    body.classList.toggle('lock-scroll');  
}