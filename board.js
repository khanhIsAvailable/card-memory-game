
class Board {
	constructor(level, row, col, totalTime, showTime){
		this.level = level
		this.row = row
		this.col = col
		this.totalTime = totalTime
		this.showTime = showTime
	}

	runGame(){
		level(this.row, this.col, this.totalTime, this.showTime);
		timer = progressBar(this.totalTime)	
	}

}
