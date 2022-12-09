var timer = null

function shufle(row,col, from){
	let elements = []
	let table = []
	let nOfPair = row*col / 2


	let rowArray = new Array(nOfPair);
	for(let k = 0 ; k < nOfPair ; k++){
		rowArray[k] = k
	}

	for (let j = 0 ; j < nOfPair ; j ++){
		let idx = Math.floor(Math.random()*nOfPair)
		let temp = rowArray[idx];
		rowArray[idx] = rowArray[j];
		rowArray[j] = temp;
	}
	elements = rowArray.concat(rowArray)


	for(let i = 0 ; i < row*col ; i ++){
		let idx = Math.floor(Math.random()*col*row)
		let temp = elements[idx];
		elements[idx] = elements[i];
		elements[i] = temp;
	}

	for(let i = 0 ; i < row ; i++){
		table.push(elements.slice(0+i*col, (i+1)*col))
	}
	return table
}
function level (row, col, totalTime, showTime ){
	var table = shufle(row,col,0)
	
    // ///////
	console.log(table)

	var playBoard = initialPlayBoard(row,col);


	function initialPlayBoard(row, col){
		let res = []
		for(let i = 0 ; i < row ; i ++){
			let rowArray = [];
			for(let j = 0 ; j < col; j ++){
				rowArray.push(-1);
			}
			res.push(rowArray)
		}
		return res
	}

	const fullfill = (row, col, table = table, playBoard = playBoard) =>{
		if(table[row][col] === playBoard[row][col] ) return true
		return false
	}

	class Point {
		constructor(){
			this.x = -1;
			this.y = -1;
		}

		getCoordinates(){
			return {x: this.x, y: this.y}
		}

		setCoordinates(x,y){
			this.x = x;
			this.y = y;
		}

		setDefault(){
			this.x = -1;
			this.y = -1;
		}

		equal(point){
			let {x,y} = point.getCoordinates()
			if(this.x == x && this.y == y) return true;
			return false;
		}

		isPair(point, target = table, playBoard = playBoard){
			let {x,y } = point.getCoordinates();
			if(target[this.x][this.y] === target[x][y] && !fullfill(x,y,target,playBoard) && !fullfill(this.x,this.y,target,playBoard)){
				playBoard[x][y] = target[x][y] 
				playBoard[this.x][this.y] = target[x][y]
				return true
			}
			
			return false
		}

	}

	var prevPoint = new Point();
	var prevCard = null

	const wait = (showTime) =>{
		return new Promise((resolve)=>{
			setTimeout(resolve,showTime)
		})
	}


	const setDefault = () => {
		prevPoint.setDefault();
		prevCard = null;
	}

	const renderCards = (table) => {
		let container = document.querySelector(".container")
		for(let i = 0 ; i < table.length ; i ++){
			let row = document.createElement("div")
			row.classList.add("row")
			row.setAttribute("row", i)
			for(let j = 0 ; j < table[i].length; j ++){
				let cardDiv = document.createElement("div")
				cardDiv.classList.add("card")
				cardDiv.setAttribute("row", i)
				cardDiv.setAttribute("col", j)

				row.appendChild(cardDiv)
				cardDiv.innerHTML = `<div class=\"content\"><div class=\"front\">${table[i][j]}</div><div class=\"back\">Back</div></div>`;
			}

			container.appendChild(row);
		}
	}

	const check =  ()=>{
		for(let i = 0 ; i < row ; i ++){
			if(playBoard[i].includes(-1)) return false;
		}
		return true;
	}

	function addClass(card, prevCard, className){
		card.classList.add(className)
		prevCard.classList.add(className)
	}


	const matchingHandler  = (card) => {
		let currentPoint = new Point;
		let currentX = card.getAttribute("row");
		let currentY = card.getAttribute("col")
		currentPoint.setCoordinates(currentX,currentY)

		
		let {x,y} = prevPoint.getCoordinates();


		if (x == -1 && y == -1 )  {
			flip.flipToFront(card)
			prevPoint.setCoordinates(currentX, currentY);
			wait(300).then(()=>{
				prevCard = card

			})
		}
		else{
			if(currentPoint.equal(prevPoint)) {
				flip.flipToBack(card)
				setDefault()
			} 
			else if(currentPoint.isPair(prevPoint,  table, playBoard)){
				flip.flipToFront(card)
				wait(500).then(()=>{
					addClass(card,prevCard, "disappear")
					if(check()){
						clear(timer,document.querySelector("#clock"),true)
					}
					setDefault()
				})
				
					
			} else {
				flip.flipToFront(card)
				wait(showTime).then(()=>{
					flip.flipToBack(prevCard)
					flip.flipToBack(card)
					setDefault()
				})

			} 
			
		} 
	}

	class Flip {
		flipToFront(card){
			card.classList.add("clicked");
		}

		flipToBack(card){
			card.classList.remove("clicked");
		}	
	}

	const clickedCheck = (card) =>{
		return (card.classList.contains("clicked"))
	}


	var flip = new Flip;

	const clickCardHandler = () => {
		const cards = document.querySelectorAll(".card")
		
		cards.forEach((card, i)=>{
			card.addEventListener("click", ()=>{
				
				matchingHandler(card);	

			})

		})
	}






	renderCards(table)
	clickCardHandler();

}
