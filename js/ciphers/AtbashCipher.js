class AtbashCipher {
    
    #alphabet;
    
    constructor() {
        this.#alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    }

    #runAtbashCipherOn(textToProcess) {
        let processedText = ""

        for(let i = 0; i < textToProcess.length; i++) {
            const character = textToProcess[i]
            let newChar = ""
            
            if(this.#alphabet.includes(character.toLowerCase())) {
                newChar = this.#alphabet[(this.#alphabet.length - 1) - this.#alphabet.indexOf(character.toLowerCase())]
                newChar = character === character.toUpperCase() ? newChar.toUpperCase() : newChar
            }
            else newChar = character

            processedText += newChar
        }

        return processedText
    }
    
    encrypt(textToEncrypt) {
        return this.#runAtbashCipherOn(textToEncrypt)
    }

    decrypt(textToDecrypt) {
        return this.#runAtbashCipherOn(textToDecrypt)
    }
}