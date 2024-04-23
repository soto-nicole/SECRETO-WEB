const cipherFactory = new CipherFactory()


document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-item-link'); 
    const currentUrl = window.location.href; 

    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active'); 
        }
    });
});


let activeDropdown = null; 

const toggleDropdown = (element) => {
    const dropdownItemsContainer = element.nextElementSibling;
    const dropdownIcon = element.querySelector('.dropdown-icon');

    if (activeDropdown && activeDropdown !== dropdownItemsContainer) {
        closeActiveDropdown(); 
    }

    dropdownIcon.classList.toggle("active-dropdown-button");
    dropdownItemsContainer.classList.toggle("show-dropdown-items-container");

    activeDropdown = dropdownItemsContainer.classList.contains("show-dropdown-items-container") ? dropdownItemsContainer : null;
};



const closeActiveDropdown = () => {
    if (activeDropdown) {
        const dropdownBtn = activeDropdown.previousElementSibling.querySelector('.dropdown-icon');
        dropdownBtn.classList.remove("active-dropdown-button");
        activeDropdown.classList.remove("show-dropdown-items-container");
        activeDropdown = null;
    }
};
document.addEventListener('click', function (event) {
    if (activeDropdown && !activeDropdown.contains(event.target) && !activeDropdown.previousElementSibling.contains(event.target)) {
        closeActiveDropdown();
    }
});



const toggleSidebar = (element) => {
    element.classList.toggle("mirror-on-x-axis")
    element.parentElement.parentElement.classList.toggle("shift-left")
    element.parentElement.parentElement.parentElement.children[0].classList.toggle("show-sidebar")
}

const encrypt = async (element) => {
    try {
        console.log("Encrypt function called");
        const textToEncrypt = document.getElementById("plain-text").value;
        const cipher = cipherFactory.createCipher(element.name);

        const keyInput = document.getElementById("key-input");
        const shift = keyInput ? parseInt(keyInput.value) : null;
        if ((element.name === "rail-fence-cipher" || element.name === "caesar-cipher") && (shift === null || isNaN(shift))) {
            showModal();
            return;
        }
        if (shift !== null && (element.name === "rail-fence-cipher" || element.name === "caesar-cipher")) {
            cipher.setShift(shift);
        }

        const encryptedText = cipher.encrypt(textToEncrypt);
        document.getElementById("cipher-text").value = encryptedText;

        if (element.name === "morse-code-cipher") {
            await cipher.playSound(encryptedText);
        }

        if (element.name === "star-wars-cipher") {
            readCipherText(encryptedText);
        }

    } catch (error) {
        console.error("Encryption error:", error);
    }
};

const decrypt = async (element) => {
    try {
        console.log("Decrypt function called");
        const textToDecrypt = document.getElementById("cipher-text").value;
        const cipher = cipherFactory.createCipher(element.name); 

        const keyInput = document.getElementById("key-input");
        const shift = keyInput ? parseInt(keyInput.value) : null;
        if ((element.name === "rail-fence-cipher" || element.name === "caesar-cipher") && (shift === null || isNaN(shift))) {
            showModal();
            return;
        }
        if (shift !== null && (element.name === "rail-fence-cipher" || element.name === "caesar-cipher")) {
            cipher.setShift(shift);
        }

        const decryptedText = cipher.decrypt(textToDecrypt);
        document.getElementById("plain-text").value = decryptedText;

    } catch (error) {
        console.error("Decryption error:", error);
    }
};


async function generateRandomPlainText() {
    const apiUrl = 'https://random-word-api.herokuapp.com/word?number=10';
    try {
        const response = await fetch(apiUrl);
        const words = await response.json();
        document.getElementById('plain-text').value = words.join(' ');
    } catch (error) {
        console.error('Error fetching random words:', error);
        document.getElementById('plain-text').value = "Error fetching text.";
    }
}


async function generateRandomCipherText(cipherType) {
    const apiUrl = 'https://random-word-api.herokuapp.com/word?number=10';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
        }
        const words = await response.json();
        const randomText = words.join(' ');
        const cipher = cipherFactory.createCipher(cipherType);
        const encodedText = cipher.encrypt(randomText);
        document.getElementById('cipher-text').value = encodedText;
    } catch (error) {
        console.error('Error fetching or encoding text:', error);
        document.getElementById('cipher-text').value = "Error fetching or encoding text: " + error.message;
    }
}

function handleCipherClick(event, url) {
    event.preventDefault(); 

    const lockLogo = document.getElementById('lock-logo');
    lockLogo.classList.add('rotate'); 
    setTimeout(() => {
        if (lockLogo.src.includes('lock.png')) {
            lockLogo.src = './assets/unlock.png';
        } else {
            lockLogo.src = './assets/lock.png';
        }
    }, 400); 

    setTimeout(() => {
        lockLogo.classList.remove('rotate'); 
        window.location.href = url; 
    }, 800); 
}


function toggleNavItems() {
    var body = document.body;
    var navItems = document.querySelector('.nav-items-mobile');
    navItems.classList.toggle('show-nav-items'); 
    body.classList.toggle('lock-scroll'); 
}


function showModal() {
    const modal = document.getElementById("error-modal");
    modal.style.display = "block";
    
    const closeButton = document.querySelector(".close-button");
    closeButton.onclick = function() {
        modal.style.display = "none";
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function readCipherText(encryptedText) {
    function setupAndSpeak(voices, text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const preferredVoice = voices.find(voice => voice.name.includes('Google') && voice.lang === 'en-US')
                            || voices.find(voice => voice.lang === 'en-US');

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.pitch = 0.2; 
        utterance.rate = 1.1; 

        speechSynthesis.speak(utterance);
    }

    function ensureVoicesLoaded() {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            setupAndSpeak(voices, encryptedText);
        } else {
            speechSynthesis.onvoiceschanged = function() {
                speechSynthesis.onvoiceschanged = null; 
                ensureVoicesLoaded();
            };
        }
    }

    ensureVoicesLoaded();
}