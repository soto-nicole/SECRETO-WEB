/*
MorseCodeCipher class implements the Morse code cipher, a method of encoding text characters as sequences of dots and dashes, which are then played as audio signals.
*/
class MorseCodeCipher {
    // Private properties to store the Morse code mappings and audio objects

    #englishToMorse
    #dotSound
    #dashSound

    constructor() {
        // Initialize the Morse code mappings for English alphabets, digits, and special characters

        this.#englishToMorse = {
            "a": ".-", "b": "-...",
            "c": "-.-.", "d": "-..", "e": ".",
            "f": "..-.", "g": "--.", "h": "....",
            "i": "..", "j": ".---", "k": "-.-",
            "l": ".-..", "m": "--", "n": "-.",
            "o": "---", "p": ".--.", "q": "--.-",
            "r": ".-.", "s": "...", "t": "-",
            "u": "..-", "v": "...-", "w": ".--",
            "x": "-..-", "y": "-.--", "z": "--..",
            "1": ".----", "2": "..---", "3": "...--",
            "4": "....-", "5": ".....", "6": "-....",
            "7": "--...", "8": "---..", "9": "----.",
            "0": "-----", ",": "--..--", ".": ".-.-.-",
            "?": "..--..", "/": "-..-.", "-": "-....-",
            "(": "-.--.", ")": "-.--.-"
        }
        // Initialize audio objects for dot and dash sounds

        this.#dotSound = new Audio('/SECRETO-WEB/assets/sounds/dot.mp3');
        this.#dashSound = new Audio('/SECRETO-WEB/assets/sounds/dash.mp3');
    }
    // Method to play Morse code as audio signals

    async playSound(morseCode) {
        for (let i = 0; i < morseCode.length; i++) {
            let symbol = morseCode[i]

            // Play dot sound for dot symbol
            if (symbol === '.') {
                this.#dotSound.play();

                // Play dash sound for dash symbol
            } else if (symbol === '-') {
                this.#dashSound.play();
            }
            // Pause between symbols
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    // Method to encrypt text into Morse code

    encrypt(textToEncrypt) {
        let encryptedText = "";
        // Iterate through each character in the text
        for (let i = 0; i < textToEncrypt.length; i++) {
            const currentLetter = textToEncrypt[i].toLowerCase();
            // Check if the character exists in the Morse code mappings
            const morseSymbol = Object.keys(this.#englishToMorse).includes(currentLetter) ? this.#englishToMorse[currentLetter] : currentLetter;
            // Append Morse code symbol to the encrypted text, with space between symbols
            encryptedText += morseSymbol;
            if (currentLetter != " " && i !== textToEncrypt.length - 1) encryptedText += " ";
        }

        return encryptedText;
    }

    // Method to decrypt Morse code into text
    decrypt(textToDecrypt) {
        let decryptedText = ""
        // Split the Morse code text by spaces to get individual Morse code symbols
        textToDecrypt.split(" ").forEach(morseLetter => {
            // Find the corresponding English letter for the Morse code symbol
            let decryptedLetter = Object.keys(this.#englishToMorse).find(key => this.#englishToMorse[key] === morseLetter)
            // If the Morse code symbol is not found in the mappings, append it as is (for space or unknown characters)
            if (!decryptedLetter) decryptedLetter = morseLetter === "" ? " " : morseLetter
            // Append the decrypted letter to the decrypted text
            decryptedText += decryptedLetter
        })

        return decryptedText
    }
}