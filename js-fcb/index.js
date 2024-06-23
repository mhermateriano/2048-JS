let board;
let score=0;
let row= 4;
let columns = 4;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;




function setGame(){
    board = [
		[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
	]
    for(let r=0;r<row;r++){
        for(let c=0;c<columns;c++){
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById('board').append(tile);
        }
    }
           
}   

function updateTile(tile, num){
    tile.innerText = '';
    tile.classList.value = '';
    tile.classList.add('tile');
    if(num>0){
        tile.innerText = num.toString();
        if(num <= 4096){
            tile.classList.add('x' + num.toString());
        }else{
            tile.classList.add('8192');
        }
    }
}

window.onload = function() {   setGame()   
    setTwo ();
    setTwo();  
 }

function handleSlide(event){
	console.log(event.code);

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        if(event.code == 'ArrowUp'){
            slideUp();
            setTwo();
        }else if(event.code == 'ArrowDown'){
            slideDown();
            setTwo();
        }else if(event.code == 'ArrowLeft'){ 
            slideLeft();
            setTwo();
        }else if(event.code == 'ArrowRight'){    
            slideRight();
            setTwo();
        }

        document.getElementById('score').innerText = score;0
        setTimeout(() => {
        checkWin();
        },1000);


        if(hasLost() == true){

           setTimeout(() => {
                alert("Game Over! Sadx :( You have lost the game. Game will restart");
                restartGame();
                alert("Click any arrow key to restart");
            }, 100)
            // setTimeout is used to delay the execution of the code inside the arrow function 
    
        }
    }
}

document.addEventListener("keydown", handleSlide);


function filterZeros(row){
    return row.filter(num => num != 0);
}  


function slide(row){
    row = filterZeros(row);
    for(let i = 0; i < row.length - 1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;

            score += row[i];
            document.getElementById('score').innerText = score;
        }
    }
    row = filterZeros(row);
    while(row.length < columns){
        row.push(0);
    }
    return row;
}


function slideLeft(){  
    for(let r = 0; r < row; r++){
        let row = board[r];

        let originalRow = row.slice();

        row = slide(row);
        board[r] = row;
        
        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if (originalRow[c] !== num && num !== 0){
                tile.style.animation = "slide-from-right 0.3s"

            	setTimeout(() => {

            		tile.style.animation = "";
            		
            	}, 300)
                }
            updateTile(tile, num);
        }
    }
}

function slideRight(){  
    for(let r = 0; r < row; r++){
        let row = board[r];

        let originalRow = row.slice();
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        
        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if (originalRow[c] !== num && num !== 0){
                tile.style.animation = "slide-from-left  0.3s"

            	setTimeout(() => {

            		tile.style.animation = "";
            		
            	}, 300)
                }

            updateTile(tile, num);
        }
    }
}

function slideUp(){  
    for(let c = 0; c < columns; c++){
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let originalCol = col.slice();
        col = slide(col);

        
        let changeIndeces = [];

        for(let r = 0; r < row; r++){
            if(originalCol[r] !== col[r]){
                changeIndeces.push(r);
            }
        }

        for(let r = 0; r < row; r++){
            board[r][c] = col[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if (changeIndeces.includes(r) && num !== 0){
                tile.style.animation = "slide-from-bottom 0.3s"

            	setTimeout(() => {

            		tile.style.animation = "";
            		
            	}, 300)
                }

            updateTile(tile, num);
        }
    }
}


function slideDown(){  
    for(let c = 0; c < columns; c++){
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let originalCol = col.slice();

        col.reverse();
        col = slide(col);
        col.reverse();

        
        let changeIndeces = [];

        for(let r = 0; r < row; r++){
            if(originalCol[r] !== col[r]){
                changeIndeces.push(r);
            }
        }
    
        for(let r = 0; r < row; r++){
            board[r][c] = col[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if (changeIndeces.includes(r) && num !== 0){
                tile.style.animation = "slide-from-top 0.3s"

            	setTimeout(() => {

            		tile.style.animation = "";
            		
            	}, 300)
                }

            updateTile(tile, num);
        }
    }
}

function hasEmptyTile(){    
    for(let r = 0; r < row; r++){
        for(let c = 0; c < columns; c++){   
            if(board[r][c] == 0){
                return true;            
            }   
        }    
    }
    return false;
}   

function setTwo(){
    if(hasEmptyTile()== false){
        return;
    }
    let found = false;
    while(found == false){
        let r = Math.floor(Math.random()*row);
        let c = Math.floor(Math.random()*columns);
        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = '2';
            tile.classList.add('x2');
            found = true;
        }
    }
}   


function checkWin(){
    for(let r = 0; r < row; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c] == 2048 && is2048Exist == false){
                alert('You won! You got 2048');
                is2048Exist = true;
            }
            if(board[r][c] == 4096 && is4096Exist == false){
                alert('You won! You got 4096');
                is4096Exist = true;
            }
            if(board[r][c] == 8192 && is8192Exist == false){
                alert('You won! You got 8192');
                is8192Exist = true;
            }
        }
    }
}

function hasLost(){
    
    for(let r = 0; r < row; r++){
        for(let c = 0; c < columns; c++){

                if(board[r][c] == 0){
                    return false; }
                    const currentTile = board[r][c];

            if(
				r > 0 && board[r-1][c] === currentTile ||
				r < row - 1 && board[r + 1][c] === currentTile ||

				c > 0 && board[r][c-1] === currentTile ||
				c < columns - 1 && board[r][c+1] === currentTile
			){
				// if we found a adjacent tile with the same value as the current tile, false, the use has not lost
				return false;
			}
        }
        }
        return true;
    }



    
    function restartGame(){
    for(let r = 0; r < row; r++){
        for(let c = 0; c < columns; c++){
            board[r][c] = 0;
        }
    }
    is2048Exist = false;
    is4096Exist = false;
    is8192Exist = false;
    setTwo();
    setTwo();
}

document.addEventListener('touchstart', (e) =>{
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) =>{  
    if(!e.target.className.includes('tile')){
        return
    }   
    e.preventDefault();
},{ passive: false});



document.addEventListener('touchend', (e) =>{
    if(!e.target.className.includes('tile')){
        return
    } 
    let diffX = startX - e.changedTouches[0].clientX;
    let diffY = startY - e.changedTouches[0].clientY;

    if(Math.abs(diffX) > Math.abs(diffY)){
        if(diffX > 0){
            slideLeft();
            setTwo();
        }else{
            slideRight();
            setTwo();
        }
    }else{
        if(diffY > 0){
            slideUp();
            setTwo();
        }else{
            slideDown();
            setTwo();
        }   
    }

    document.getElementById("score").innerText = score;

    checkWin();

    // Call hasLost() to check for game over conditions
    if (hasLost()) {
        // Use setTimeout to delay the alert
        setTimeout(() => {
        alert("Game Over! You have lost the game. Game will restart");
        restartGame();
        alert("Click any key to restart");
        // You may want to reset the game or perform other actions when the user loses.
        }, 100); // Adjust the delay time (in milliseconds) as needed   
    }   

});
