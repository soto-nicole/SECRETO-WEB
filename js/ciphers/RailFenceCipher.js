class RailFenceCipher {
    constructor() {
        this.shift = 3; 
    }

    setShift(shift) { 
        this.shift = parseInt(shift); 
    }

    encrypt(plainText) {
        if (this.shift === 1) return plainText;

        let rails = Array.from({ length: this.shift }, () => []);
        let currentRail = 0;
        let direction = 1;

        for (let char of plainText) {
            rails[currentRail].push(char);

            if (currentRail === 0 && direction === -1) {
                direction = 1;
            } else if (currentRail === this.shift - 1 && direction === 1) {
                direction = -1;
            }
            currentRail += direction;
        }

        return rails.flat().join('');
    }


    decrypt(cipherText) {
        if (this.shift === 1) return cipherText; 

        let rails = Array.from({ length: this.shift }, () => []);
        let railLengths = Array(this.shift).fill(0);
        let currentRail = 0;
        let direction = 1;

        for (let i = 0; i < cipherText.length; i++) {
            railLengths[currentRail]++;
            if (currentRail === 0 && direction === -1) {
                direction = 1;
            } else if (currentRail === this.shift - 1 && direction === 1) {
                direction = -1;
            }
            currentRail += direction;
        }

        let index = 0;
        for (let i = 0; i < this.shift; i++) {
            rails[i] = cipherText.slice(index, index + railLengths[i]).split('');
            index += railLengths[i];
        }

        let result = '';
        currentRail = 0;
        direction = 1;

        for (let i = 0; i < cipherText.length; i++) {
            if (rails[currentRail] === undefined) {
                console.error('Invalid rail index accessed:', currentRail);
                continue;
            }
            result += rails[currentRail].shift();
            if (currentRail === 0 && direction === -1) {
                direction = 1;
            } else if (currentRail === this.shift - 1 && direction === 1) {
                direction = -1;
            }
            currentRail += direction;
        }

        return result;
    }
}