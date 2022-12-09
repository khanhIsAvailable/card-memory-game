function  start(bar, clock, time){
	let timer = null
	let i = 0;
	let sec = time/1000
	let step = time / 1000
	let nOfStepPerSec = 1000/step
	let count = nOfStepPerSec;
	clock.innerHTML = `${sec}s`
	timer = setInterval(()=>{
		if(i<1000){
			i++
			bar.style.width = `${i/10}%`	
			count--;
		} else {
			clear(timer, clock, false)
		}

		// countdown and write to HTML
		if(count <0){
			sec--;
			count = nOfStepPerSec;
			clock.innerHTML = `${sec}s`
		}

	}, step)

	return timer
}


function clear(timer,clock,isWinner = false){
	clearTimeout(timer)
	if(isWinner){
		clock.innerHTML = "You Won"	
	}
	else{
		clock.innerHTML = "You Lost"	
	}

	clock.parentNode.classList.add("result")

}


function progressBar(totalTime){
	var timer = null
	const bar = document.querySelector("#progress")
	const clock = document.querySelector("#clock")
	timer = start(bar, clock, totalTime)
	return timer;
}
