/*
CaesarCipher class implements the Caesar cipher, a type of substitution cipher in which each letter in the plaintext is shifted a certain number of places down or up the alphabet.
*/
class CaesarCipher {

    // Method to set the shift value for encryption
    setShift(shift) {
        // Parse the shift value as an integer
        this.shift = parseInt(shift);
    }

    // Method to encrypt plaintext using the Caesar cipher
    encrypt(plainText) {
        let encryptedText = "";
        for (let i = 0; i < plainText.length; i++) {
            let char = plainText.charCodeAt(i);
            // Encrypt uppercase letters

            if (char >= 65 && char <= 90) {
                // Shift the character within the uppercase range (65-90) and wrap around if needed
                char = (char - 65 + this.shift) % 26 + 65;
            } else if (char >= 97 && char <= 122) {
                char = (char - 97 + this.shift) % 26 + 97;
            }
            // Convert the shifted character code back to its character representation and append to encryptedText
            encryptedText += String.fromCharCode(char);
        }
        // Return the encrypted text
        return encryptedText;
    }

    // Method to decrypt ciphertext using the Caesar cipher
    decrypt(cipherText) {
        let decryptedText = "";
        for (let i = 0; i < cipherText.length; i++) {
            let char = cipherText.charCodeAt(i);
            if (char >= 65 && char <= 90) {
                // Reverse the shift operation for uppercase letters and ensure wrapping around the alphabet
                char = (char - 65 - this.shift + 26) % 26 + 65;

                // Decrypt lowercase letters
            } else if (char >= 97 && char <= 122) {
                char = (char - 97 - this.shift + 26) % 26 + 97;
            }
            // Convert the shifted character code back to its character representation and append to decryptedText
            decryptedText += String.fromCharCode(char);
        }
        // Return the decrypted text
        return decryptedText;
    }
}