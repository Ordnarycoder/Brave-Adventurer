// Get the buttons and status section from the DOM
const attackButton = document.getElementById("attack-btn");
const healthPotionButton = document.getElementById("health-btn");
const dodgeButton = document.getElementById("dodge-btn");
const statusSection = document.getElementById("status");
const divGame = document.getElementById("game");

class Game {
    constructor(monsterhp = 90, attackdmg = 10, playerhp = 50, potion_number = 3) {
        this.monsterhp = monsterhp;
        this.attackdmg = attackdmg;
        this.playerhp = playerhp;
        this.potion_number = potion_number;
    }

    attack = async () => {
        this.monsterhp -= this.attackdmg;
        this.addStatusMessage(`<div class="alert alert-primary">Player attacks!<br>Monster HP: ${this.monsterhp}</div>`);
        attackButton.style.display = "none";
        dodgeButton.style.display = "none";
        healthPotionButton.style.display = "none";
        await this.sleepNow(2000); // Wait for 2 seconds before the monster attacks
        attackButton.style.display = "inline-block";
        dodgeButton.style.display="inline-block";
        healthPotionButton.style.display = "inline-block";
        this.monsterAttack(); 
    }

    monsterAttack = () => {
        this.playerhp -= 10;
        this.addStatusMessage(`<div class="alert alert-danger">Monster attacks!<br>Player HP: ${this.playerhp}</div>`);
        this.controlMechanisma();
    }

    healthPotion = () => {
        if (this.potion_number === 0) {
            this.addStatusMessage("<div class='alert alert-warning'>You don't have any potions left!</div>");
        } else {
            this.playerhp += 10;
            this.potion_number -= 1;
            this.addStatusMessage(`<div class="alert alert-success">Player uses a potion!<br>Potions left: ${this.potion_number}<br>Player HP: ${this.playerhp}</div>`);
        }
        this.controlMechanisma();
    }

    dodge = async () => {
        if (this.playerhp <= 0) {
            this.addStatusMessage("<div class='alert alert-danger'>Unfortunately, you lost!<br>Do you want to play again?</div>");
            this.endGame();
        } else {
            let luck = this.getRandomInt(1, 2);
            if (luck === 1) {
                this.monsterhp -= this.attackdmg;
                this.addStatusMessage(`<div class="alert alert-info">You dodged the monster's attack!<br>It's attack time!<br>Monster HP: ${this.monsterhp}</div>`);
                if (this.monsterhp <= 0) {
                    this.winGame();
                }
            } else {
                this.addStatusMessage(`<div class="alert alert-warning">You couldn't dodge!</div>`);
                attackButton.style.display = "none";
                dodgeButton.style.display = "none";
                healthPotionButton.style.display = "none";
                await this.sleepNow(2000);
                attackButton.style.display = "inline-block";
                dodgeButton.style.display="inline-block";
                healthPotionButton.style.display = "inline-block";
                this.monsterAttack();
            }
        }
    }

    addStatusMessage = (message) => {
        statusSection.innerHTML = message; // Update the status message
    }

    createReplayButton = () => {
        const replayButton = document.createElement("button");
        replayButton.id = "replay-btn"; // Assign an id to the replay button
        replayButton.textContent = "Replay";
        replayButton.className = "btn btn-secondary"; // Add Bootstrap button class
        replayButton.addEventListener("click", () => this.resetGame());
        divGame.appendChild(replayButton);
    }

    resetGame = () => {
        this.monsterhp = 90;
        this.playerhp = 50;
        this.potion_number = 3;
        statusSection.innerHTML = "";  // Clear status messages
        attackButton.style.display = "inline-block";
        healthPotionButton.style.display = "inline-block";
        dodgeButton.style.display = "inline-block";
        document.getElementById("replay-btn")?.remove();  // Use id to remove the replay button
        this.addStatusMessage("<div class='alert alert-info'>The game has been reset!<br>Good luck!</div>");
    }

    endGame = () => {
        attackButton.style.display = "none";
        healthPotionButton.style.display = "none";
        dodgeButton.style.display = "none";
        this.createReplayButton();
    }

    winGame = async () => {
        attackButton.style.display = "none";
        healthPotionButton.style.display = "none";
        dodgeButton.style.display = "none";
        this.addStatusMessage("<div class='alert alert-success'>CONGRATULATIONS!<br>You killed the monster!</div>");
        await this.sleepNow(2000);
        this.createReplayButton();
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    controlMechanisma = async () => {
        if (this.monsterhp <= 0 && this.playerhp <= 0) {
            attackButton.style.display ="none";
            dodgeButton.style.display = "none";
            healthPotionButton.style.display = "none";
            this.addStatusMessage("<div class='alert alert-warning'>Easter egg!<br> It's a SURPRISE tie!</div>");
            await this.sleepNow(2000);
            this.endGame();
        } else if (this.playerhp <= 0) {
            this.addStatusMessage("<div class='alert alert-danger'>Unfortunately, you lost!<br>Do you want to play again?</div>");
            this.endGame();
        } else if (this.monsterhp <= 0) {
            this.winGame();
        }
    }
}   

// Create an instance of the Game class
const myGame = new Game();

// Attach event listeners to the buttons
attackButton.addEventListener("click", () => myGame.attack());
healthPotionButton.addEventListener("click", () => myGame.healthPotion());
dodgeButton.addEventListener("click", () => myGame.dodge());


