class MorseCodeCipher {

    #englishToMorse
    #dotSound
    #dashSound

    constructor() {
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
            "(": "-.--.", ")" :"-.--.-"
        }

        this.#dotSound = new Audio('../../assets/sounds/dot.mp3');
        this.#dashSound = new Audio('../../assets/sounds/dash.mp3');
    }

    async playSound(morseCode) {
        for(let i = 0; i < morseCode.length; i++) {
            let symbol = morseCode[i]

            if (symbol === '.') {
                this.#dotSound.play();
            } else if (symbol === '-') {
                this.#dashSound.play();
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    encrypt(textToEncrypt) {
        let encryptedText = "";

        for (let i = 0; i < textToEncrypt.length; i++) {
            const currentLetter = textToEncrypt[i].toLowerCase();
            const morseSymbol = Object.keys(this.#englishToMorse).includes(currentLetter) ? this.#englishToMorse[currentLetter] : currentLetter;
            encryptedText += morseSymbol;
            if (currentLetter != " " && i !== textToEncrypt.length - 1) encryptedText += " ";
        }

        return encryptedText;
    }

    decrypt(textToDecrypt) {
        let decryptedText = ""

        textToDecrypt.split(" ").forEach(morseLetter => {
            let decryptedLetter = Object.keys(this.#englishToMorse).find(key => this.#englishToMorse[key] === morseLetter)

            if(!decryptedLetter) decryptedLetter = morseLetter === "" ? " " : morseLetter

            decryptedText += decryptedLetter
        })

        return decryptedText
    }
}