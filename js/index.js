// Class responsible for creating cipher objects based on a specified type.
// This factory class is crucial for the instantiation of different cipher classes dynamically based on the user's choice.
const cipherFactory = new CipherFactory()


// Asynchronous function to encrypt text. It retrieves user input, determines the cipher to use based on the clicked element,
// sets the cipher shift if necessary, performs the encryption, and handles special actions like playing sounds for Morse code
// or invoking custom actions for the Star Wars cipher.
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
// Asynchronous function to decrypt text. It retrieves encrypted text from the user, determines the cipher to use based on the clicked element,
// sets the cipher shift if necessary, performs the decryption, and updates the UI to show the decrypted text.
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

// Function to toggle UI elements for displaying or hiding the sidebar.
// This provides a dynamic UI experience, allowing the sidebar to be shown or hidden based on user interaction.
const toggleSidebar = (element) => {
    element.classList.toggle("mirror-on-x-axis")
    element.parentElement.parentElement.classList.toggle("shift-left")
    element.parentElement.parentElement.parentElement.children[0].classList.toggle("show-sidebar")
}

// Function to show a modal for user interaction, particularly used when an error occurs or specific user feedback is required.
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

//Show grid for rail fence
function showGridModal() {
    let modal = document.getElementById('grid-modal');
    modal.style.display = 'block';

}

function closeGridModal() {
    let modal = document.getElementById('grid-modal');
    modal.style.display = 'none';
}

// Asynchronous function to generate random plaintext by fetching words from an API.
// It updates the plaintext input field with these words or displays an error message if the fetch fails.
//https://dmitripavlutin.com/javascript-fetch-async-await/
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

// Asynchronous function to generate random ciphertext by fetching words from an API and encrypting them using a specified cipher.
// It displays the encrypted text or an error message in the ciphertext input field.
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

// Event handler for cipher clicks, providing an animated transition (lock logo rotation) and redirecting to a specified URL after the animation.
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


function handleKeyPress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) { 
        toggleLock();
    }
}



// Initiates the reading of encrypted text using the Web Speech API's speech synthesis capabilities.
// This function ensures that the available voices are loaded and selects the most appropriate voice,which in this case by modifiying the 
// pitch and rate of the voice I am attempting to make it sound like a robot - this is only used in the star wars cipher
// [reference: https://www.heartinternet.uk/blog/5-things-you-didnt-know-a-browser-could-do/]
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
