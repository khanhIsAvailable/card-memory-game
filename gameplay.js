class GamePlay{

	constructor(){
		this.level1 = new Board("Level 1", 2, 2, 1000000, 1000)
		this.level2 = new Board("Level 2", 3, 4, 30000, 1000)
		this.level3 = new Board("Level 3", 5, 6, 50000, 800)
		this.level4 = new Board("Level 4", 8, 8, 60000,	800)
		this.level5 = new Board("Level 5", 8, 8, 40000, 400)
	}

	run(){
		let level1 = this.level1.run();
		console.log(level1)
		// if(level1){
		// 	let level2 = this.level2.run();
		// 	if(level2){
		// 		let level3 = this.level3.run();
		// 		if(level3){
		// 			let level4 = this.level4.run();
		// 			if(level4){
		// 				let level5 = this.level5.run();
		// 				if(level5){
		// 					console.log("WINNNNNNNNNNNN")
		// 				}
		// 			}
		// 		}
		// 	}
		// }

	}

}