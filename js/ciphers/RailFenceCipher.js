class RailFenceCipher {
    constructor() {
        this.shift = 3; 
    }

    // setShift(shift) { 
    //     this.shift = parseInt(shift); 
    // }

    setShift(shift) { 
        this.shift = parseInt(shift); 
        // After setting the new shift, we should update the grid.
        this.displayGrid(document.getElementById('plain-text').value);
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



  displayGrid(plainText) {
    let gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = ''; 

    let rails = Array.from({ length: this.shift }, () => []);
    let direction = 1;
    let currentRail = 0;

    for (let i = 0; i < plainText.length; i++) {
        for (let j = 0; j < this.shift; j++) {
            rails[j].push(' ');
        }
    }

 
for (let i = 0, len = plainText.length; i < len; i++) {
    if (plainText[i] !== ' ') { 
        rails[currentRail][i] = plainText[i];
    }

    if (currentRail === 0) {
        direction = 1;
    } else if (currentRail === this.shift - 1) {
        direction = -1;
    }

    currentRail += direction;
    if (currentRail >= this.shift) {
        currentRail = this.shift - 2;
        direction = -1;
    } else if (currentRail < 0) {
        currentRail = 1;
        direction = 1;
    }
}

rails.forEach(rail => {
    let rowDiv = document.createElement('div');
    rowDiv.className = 'grid-row';
    rail.forEach(cellChar => {
        let cellSpan = document.createElement('span');
        cellSpan.className = 'grid-cell';
        cellSpan.textContent = cellChar.trim();

        if (cellChar.trim() !== '') {
            cellSpan.classList.add('grid-cell-letter'); 
        }

        rowDiv.appendChild(cellSpan);
    });
    gridContainer.appendChild(rowDiv);
});
  }
}
