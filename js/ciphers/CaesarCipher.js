class CaesarCipher {
    constructor() {
        this.shift = 3;
    }
    
    setShift(shift) {
        this.shift = parseInt(shift); 
    }
    

    encrypt(plainText) {
        let encryptedText = "";
        for (let i = 0; i < plainText.length; i++) {
            let char = plainText.charCodeAt(i);
            if (char >= 65 && char <= 90) {
                char = (char - 65 + this.shift) % 26 + 65;
            } else if (char >= 97 && char <= 122) {
                char = (char - 97 + this.shift) % 26 + 97;
            }
            encryptedText += String.fromCharCode(char);
        }
        return encryptedText;
    }

    decrypt(cipherText) {
        let decryptedText = "";
        for (let i = 0; i < cipherText.length; i++) {
            let char = cipherText.charCodeAt(i);
            if (char >= 65 && char <= 90) {
                char = (char - 65 - this.shift + 26) % 26 + 65;
            } else if (char >= 97 && char <= 122) {
                char = (char - 97 - this.shift + 26) % 26 + 97;
            }
            decryptedText += String.fromCharCode(char);
        }
        return decryptedText;
    }
}