/*
AtbashCipher class implements the Atbash cipher, a simple substitution cipher that replaces each letter with its reverse in the alphabet.
*/
class AtbashCipher {
    
    #alphabet;
    
    constructor() {
        this.#alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    }

    // Private method to run Atbash cipher on a given text
    #runAtbashCipherOn(textToProcess) {
        let processedText = ""

        for(let i = 0; i < textToProcess.length; i++) {
            const character = textToProcess[i]
            let newChar = ""
            
            if(this.#alphabet.includes(character.toLowerCase())) {
              // Find the index of the character in the alphabet, reverse it, and get the corresponding character
                newChar = this.#alphabet[(this.#alphabet.length - 1) - this.#alphabet.indexOf(character.toLowerCase())]
                // Preserve original character's case
                newChar = character === character.toUpperCase() ? newChar.toUpperCase() : newChar
            }
            else newChar = character

            processedText += newChar
        }

        return processedText
    }
    
    // Method to encrypt text using Atbash cipher
    encrypt(textToEncrypt) {
        return this.#runAtbashCipherOn(textToEncrypt)
    }
    
    // Method to decrypt text using Atbash cipher (since Atbash is its own inverse, decryption is the same as encryption)
    decrypt(textToDecrypt) {
        return this.#runAtbashCipherOn(textToDecrypt)
    }
}