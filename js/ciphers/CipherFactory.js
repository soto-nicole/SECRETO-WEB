class CipherFactory {

    createCipher(cipherName) {
        switch (cipherName.toLowerCase()) {
            case "atbash-cipher":
                return new AtbashCipher(); 
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