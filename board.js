
// function resultOfGame(){
// 	console.log("Win")
// 	return 1
// }

class Board {
	constructor(level, row, col, totalTime, showTime){
		this.level = level
		this.row = row
		this.col = col
		this.totalTime = totalTime
		this.showTime = showTime
	}

	run(){
		console.log(this.level)
		timer = progressBar(this.totalTime)		
		level(this.row, this.col, this.totalTime, this.showTime);
		while(!timer && !goToNextLevel ){
		}
		console.log(timer, goToNextLevel)

		switch(goToNextLevel){
			case false:
				if(!timer){
					console.log("Thua")
					return 0
				}
			case true:
				console.log("Win")
				return 1;
			default: 
				throw new Error("Invalid")
		}
	}

}
