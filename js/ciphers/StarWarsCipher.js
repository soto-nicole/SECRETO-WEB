class StarWarsCipher {

    #englishToAurebesh

    constructor() {
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

    encrypt(textToEncrypt) {
        let encryptedText = ""

        for(let i = 0; i < textToEncrypt.length; i++) {
            const character = textToEncrypt[i]
            let newChar = ""

            if(Object.keys(this.#englishToAurebesh).includes(character.toLowerCase())) {
                newChar = this.#englishToAurebesh[character.toLowerCase()]
                newChar = character === character.toUpperCase() ? newChar.charAt(0).toUpperCase() + newChar.substring(1) : newChar
            }
            else newChar = character

            encryptedText += newChar
        }

        return encryptedText
    }

    decrypt(textToDecrypt) {
        let decryptedText = ""
        const textToWords = textToDecrypt.split(" ")

        textToWords.forEach((word, index) => {
            const wordLowerCase = word.toLowerCase()
            let initialIndex = 0
            let decryptedWord = ""

            for(let i = 0; i < wordLowerCase.length + 1; i++) {
                const value = wordLowerCase.substring(initialIndex, i)

                const decryptedLetter = Object.keys(this.#englishToAurebesh).find(key => this.#englishToAurebesh[key] === value)
                
                if(value.length === 1 && !Object.keys(this.#englishToAurebesh).includes(value)) {
                    decryptedWord += value
                    initialIndex += value.length
                }
                
                if(decryptedLetter) {
                    decryptedWord += word.substring(initialIndex, initialIndex + 1) === word.substring(initialIndex, initialIndex + 1).toUpperCase() ? decryptedLetter.toLocaleUpperCase() : decryptedLetter
                    initialIndex += value.length
                }
            }

            decryptedText += decryptedWord
            index === textToWords.length - 1 ? decryptedText += "" : decryptedText += " "
        })

        return decryptedText
    }
}