/*
StarWarsCipher class implements the Star Wars cipher, a substitution cipher that replaces each English alphabet character with its corresponding Aurebesh character from the Star Wars universe.
*/
class StarWarsCipher {

    // Private property to store the mapping of English alphabet characters to Aurebesh characters
    #englishToAurebesh

    constructor() {
        // Initialize the mapping of English alphabet characters to Aurebesh characters
        this.#englishToAurebesh = {
            "a": "aurek", "b": "besh", "c": "cresh",
            "d": "dorn", "e": "esk", "f": "forn",
            "g": "grek", "h": "herf", "i": "isk",
            "j": "jenth", "k": "krill", "l": "leth",
            "m": "mern", "n": "nern", "o": "osk",
            "p": "peth", "q": "qek", "r": "resh",
            "s": "senth", "t": "trill", "u": "usk",
            "v": "vev", "w": "wesk", "x": "xesh",
            "y": "yirt", "z": "zerek"
        }
    }

    // Method to encrypt plaintext using the Star Wars cipher
    encrypt(textToEncrypt) {
        let encryptedText = ""

        // Iterate through each character in the plaintext
        for (let i = 0; i < textToEncrypt.length; i++) {
            const character = textToEncrypt[i]
            let newChar = ""

            // Check if the character exists in the mapping
            if (Object.keys(this.#englishToAurebesh).includes(character.toLowerCase())) {
                // Replace the character with its Aurebesh equivalent and maintain case
                newChar = this.#englishToAurebesh[character.toLowerCase()]
                newChar = character === character.toUpperCase() ? newChar.charAt(0).toUpperCase() + newChar.substring(1) : newChar
            }
            else newChar = character

            // Append the new character to the encrypted text
            encryptedText += newChar
        }

        // Return the encrypted text
        return encryptedText
    }

    // Method to decrypt ciphertext using the Star Wars cipher
    decrypt(textToDecrypt) {
        let decryptedText = ""

        // Split the ciphertext into words
        const textToWords = textToDecrypt.split(" ")

        // Iterate through each word in the ciphertext
        textToWords.forEach((word, index) => {
            const wordLowerCase = word.toLowerCase()
            let initialIndex = 0
            let decryptedWord = ""

            // Iterate through each substring of the word
            for (let i = 0; i < wordLowerCase.length + 1; i++) {
                const value = wordLowerCase.substring(initialIndex, i)

                // Find the corresponding English alphabet character for the Aurebesh substring
                const decryptedLetter = Object.keys(this.#englishToAurebesh).find(key => this.#englishToAurebesh[key] === value)

                // Append non-Aurebesh characters to the decrypted word
                if (value.length === 1 && !Object.keys(this.#englishToAurebesh).includes(value)) {
                    decryptedWord += value
                    initialIndex += value.length
                }

                // Append decrypted Aurebesh characters (maintaining case) to the decrypted word
                if (decryptedLetter) {
                    decryptedWord += word.substring(initialIndex, initialIndex + 1) === word.substring(initialIndex, initialIndex + 1).toUpperCase() ? decryptedLetter.toLocaleUpperCase() : decryptedLetter
                    initialIndex += value.length
                }
            }

            // Append the decrypted word to the decrypted text, with space between words
            decryptedText += decryptedWord
            index === textToWords.length - 1 ? decryptedText += "" : decryptedText += " "
        })
        
        // Return the decrypted text
        return decryptedText
    }
}