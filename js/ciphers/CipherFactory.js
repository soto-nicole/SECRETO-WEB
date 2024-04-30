/*
CipherFactory class creates instances of various cipher classes based on the given cipher name.
*/
class CipherFactory {
    // Method to create a cipher instance based on the given cipher name

    createCipher(cipherName) {
        switch (cipherName.toLowerCase()) {
            // For Atbash cipher, create an instance of AtbashCipher class
            case "atbash-cipher":
                return new AtbashCipher();

            // For Star Wars cipher, create an instance of StarWarsCipher class... same with the other cipher names
            case "star-wars-cipher":
                return new StarWarsCipher();
            case "dancing-men-cipher":
                return new DancingMenCipher();
            case "morse-code-cipher":
                return new MorseCodeCipher();
            case "caesar-cipher":
                return new CaesarCipher();
            case "rail-fence-cipher":
                return new RailFenceCipher();
            default:
                throw new Error("Unknown");
        }
    }
}