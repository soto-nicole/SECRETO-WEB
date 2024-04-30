/*
RailFenceCipher class implements the Rail Fence cipher, a transposition cipher that arranges plaintext characters in a zigzag pattern on a rail-like grid, then reads off the ciphertext row by row.
*/
class RailFenceCipher {
    constructor() {
        // Default shift value for encryption
        this.shift = 3;
    }


    // Method to set the shift value for encryption
    setShift(shift) {
        this.shift = parseInt(shift);
        // After setting the new shift, update the grid.
        this.displayGrid(document.getElementById('plain-text').value);
    }

    // Method to encrypt plaintext using the Rail Fence cipher
    encrypt(plainText) {
        if (this.shift === 1) return plainText;

        // Initialize an array of arrays to represent the rails on the grid
        let rails = Array.from({ length: this.shift }, () => []);
        let currentRail = 0;
        let direction = 1;

        // Iterate through each character in the plaintext
        for (let char of plainText) {
            rails[currentRail].push(char);

            // Update direction to move the current rail up or down
            if (currentRail === 0 && direction === -1) {
                direction = 1;
            } else if (currentRail === this.shift - 1 && direction === 1) {
                direction = -1;
            }
            // Move to the next rail according to the direction
            currentRail += direction;
        }

        // Combine characters from all rails into a single string to form the encrypted text
        return rails.flat().join('');
    }

    // Method to decrypt ciphertext using the Rail Fence cipher
    decrypt(cipherText) {
        if (this.shift === 1) return cipherText;
        // Initialize an array of arrays to represent the rails on the grid
        let rails = Array.from({ length: this.shift }, () => []);
        let railLengths = Array(this.shift).fill(0);
        let currentRail = 0;
        let direction = 1;

        // Calculate the lengths of each rail
        for (let i = 0; i < cipherText.length; i++) {
            railLengths[currentRail]++;
            if (currentRail === 0 && direction === -1) {
                direction = 1;
            } else if (currentRail === this.shift - 1 && direction === 1) {
                direction = -1;
            }
            currentRail += direction;
        }

        // Split the ciphertext into segments for each rail
        let index = 0;
        for (let i = 0; i < this.shift; i++) {
            rails[i] = cipherText.slice(index, index + railLengths[i]).split('');
            index += railLengths[i];
        }

        // Reconstruct the plaintext by traversing the rails
        let result = '';
        currentRail = 0;
        direction = 1;

        for (let i = 0; i < cipherText.length; i++) {
            // Append the first character of the current rail to the result
            result += rails[currentRail].shift();

            // Update direction to move the current rail up or down
            if (currentRail === 0 && direction === -1) {
                direction = 1;
            } else if (currentRail === this.shift - 1 && direction === 1) {
                direction = -1;
            }
            // Move to the next rail according to the direction
            currentRail += direction;
        }

        // Return the decrypted plaintext
        return result;
    }


    // Method to display the rail fence grid for visualization
    displayGrid(plainText) {
        let gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';

        // Initialize an array of arrays to represent the rails on the grid
        let rails = Array.from({ length: this.shift }, () => []);
        let direction = 1;
        let currentRail = 0;

        // Populate the grid with spaces
        for (let i = 0; i < plainText.length; i++) {
            for (let j = 0; j < this.shift; j++) {
                rails[j].push(' ');
            }
        }

        // Fill the grid with the plaintext characters
        for (let i = 0, len = plainText.length; i < len; i++) {
            if (plainText[i] !== ' ') {
                rails[currentRail][i] = plainText[i];
            }

            // Update direction to move the current rail up or down
            if (currentRail === 0) {
                direction = 1;
            } else if (currentRail === this.shift - 1) {
                direction = -1;
            }

            // Move to the next rail according to the direction, handling edge cases
            currentRail += direction;
            if (currentRail >= this.shift) {
                currentRail = this.shift - 2;
                direction = -1;
            } else if (currentRail < 0) {
                currentRail = 1;
                direction = 1;
            }
        }

        // Create HTML elements to represent the grid and append them to the container
        rails.forEach(rail => {

            // Create a <div> element to represent a row in the grid
            let rowDiv = document.createElement('div');

            // Set the class name of the row <div> to 'grid-row' for styling purposes
            rowDiv.className = 'grid-row';

            // Iterate over each character (cell) in the rail
            rail.forEach(cellChar => {
                // Create a <span> element to represent a cell in the grid
                let cellSpan = document.createElement('span');
                // Set the class name of the cell <span> to 'grid-cell' for styling purposes
                cellSpan.className = 'grid-cell';

                // Set the text content of the cell <span> to the trimmed character (removing leading/trailing spaces)
                cellSpan.textContent = cellChar.trim();

                // Highlight cell if it contains a letter for better user experience
                if (cellChar.trim() !== '') {
                    cellSpan.classList.add('grid-cell-letter');
                }
                // Append the cell <span> to the row <div>
                rowDiv.appendChild(cellSpan);
            });
            // Append the row <div> to the grid container, representing a row in the grid
            gridContainer.appendChild(rowDiv);
        });
    }
}
