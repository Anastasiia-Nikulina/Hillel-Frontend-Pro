class Table {
    countCellsOpen = 0;
    countBobms = 0;

    constructor(table, numberOfLives, game) {
        this.table = table;
        this.numberOfLives = numberOfLives;
        this.game = game;

        this.render();
        this.listen();

        const info = document.createElement("div");
        info.classList.add("info-div");
        const lives = document.createElement("p");
        const moves = document.createElement("p");
        const bombs = document.createElement("p");
        info.appendChild(lives);
        info.appendChild(moves);
        info.appendChild(bombs);
        document.body.appendChild(info);

        this.lives = lives;
        this.moves = moves;
        this.bombs = bombs;
        this.checkStatus();
        this.game.gameRestart.onclick = this.game.reset.bind(this.game);       
    }

    isBomb(target) {
        return Boolean(Number(target.dataset.state));
    }

    mouseover({target}) {
        if (target.innerText === "") {
            target.innerText = "🤞🏻";   
        }
          
    }

    mouseout({target}) {
        if (target.innerText === "🤞🏻") {
            target.innerText = "";   
        }
    }

    mark = ({ target }) => {

        if (this.isBomb(target)) {
            this.countBobms--;
            this.numberOfLives--;
            target.innerText = "💣";

        } else {
            this.countCellsOpen--;
            target.innerText = "❎";
        }
        this.checkStatus();       
    };

    checkStatus() {
        this.lives.innerText = `Your lives: ${this.numberOfLives}`;
        this.moves.innerText = `Remaining safe cells: ${this.countCellsOpen}`; 
        this.bombs.innerText = `Remaining bombs: ${this.countBobms}`; 


        if (this.countCellsOpen === 0) {
            confirm("WIN");
            const clearElems = document.querySelector("info-div");
            clearElems.removeChild(this.lives);
            clearElems.removeChild(this.moves);
            clearElems.removeChild(this.bombs);
        }
        if (this.numberOfLives === 0) {
            const isRestart = confirm("GAME OVER");

            if(isRestart) {
                this.game.reset();
                this.game.gameRestart.hide2();
                
            } else {
                alert("ByeBye");
                this.game.reset();
            }
        }        
    }

    renderRow() {
        const element = document.createElement("div");

        element.classList.add("table__row");

        return element;
    }

    renderCell(x, y) {
        const element = document.createElement("div");

        element.dataset.x = x;
        element.dataset.y = y;
        element.dataset.state = this.getRandomIntInclusive(0, 1);
        if (this.isBomb(element)) {
            this.countBobms++;
        } else {
            this.countCellsOpen++;
        }

        element.classList.add("table__cell");

        return element;
    }

    listen() {
        this.table.addEventListener("click", this.mark);
        this.table.addEventListener("mouseover", this.mouseover);
        this.table.addEventListener("mouseout", this.mouseout);
    }

    render() {
        const rows = [];

        for (let y = 0; y < 5; y++) {
            const row = this.renderRow();

            for (let x = 0; x < 5; x++) {
                const cell = this.renderCell(x, y);

                row.append(cell);
            }

            rows.push(row);
        }

        const table = this.table.cloneNode();

        table.append(...rows);

        this.table.replaceWith(table);

        this.table = table;
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}


class Game {

    constructor() {

        const btnWrap = document.createElement("div");
        this.btnWrap = btnWrap;
        btnWrap.classList.add("btnWrap");
        btnWrap.innerHTML = "Choose your level:";
        document.body.appendChild(btnWrap);
       
        const gameEasy = new Button("Easy", btnWrap, this);
        const gameMedium = new Button("Medium", btnWrap, this);
        const gameHard = new Button("Hard", btnWrap, this);
        const gameRestart = new Button ("Restart",document.body,this);

        this.gameRestart = gameRestart;      
    }

    reset() {
        const myNode = document.querySelector(".table");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }

        this.btnWrap.style.display = "block";
       
        const clearElems = document.querySelector(".info-div");
        
        while (clearElems !== null && clearElems.firstChild) {
            clearElems.removeChild(clearElems.lastChild);
        }
        if (clearElems !== null) {
            document.body.removeChild(clearElems);
        }  
        
    }

    newGame(gamelevel) {
        this.btnWrap.style.display = "none";
        let numberOfLives = 0;

        switch (gamelevel) {
            case "Easy":
                numberOfLives = 3;
                break;

            case "Medium":
                numberOfLives = 2;
                break;

            case "Hard":
                numberOfLives = 1;
                break
        }
        const newGame = new Table(document.querySelector(".table"), numberOfLives, this);
    }
}


class Button {
    constructor(text, parent, game) {
        const button = document.createElement("button");
        button.innerHTML = text;
        parent.appendChild(button);
        this.gamelevel = text;
        this.button = button;
        if (text === "Restart") {
            button.onclick = this.hide.bind(this, button,game);  
            this.hide(button,game);
        } else {
            button.onclick = this.click.bind(this, game);      
        }
    }

    click(game) {
        game.newGame(this.gamelevel);
        game.gameRestart.unhide();
    }

    hide(element, game) {
        element.hidden = true;
        game.reset();
    }
    hide2 () {
        this.button.hidden = true;
    }
    unhide() {
        this.button.hidden = false;
    }
}


const game = new Game();


const header = document.getElementsByTagName("h1");
header[0].innerText = "Minesweeper game";

const pref = document.getElementById("pref");
pref.hidden = true;


