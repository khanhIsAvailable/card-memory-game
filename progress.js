
var timer = null

function  start(timer, bar, clock, time){
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
			clear(timer, clock)
		}

		// countdown and write to HTML
		if(count <0){
			sec--;
			count = nOfStepPerSec;
			clock.innerHTML = `${sec}s`
		}



	}, step)
}


function clear(timer,clock){
	if(timer){
		clearTimeout(timer)
		clock.innerHTML = "TIMEOUT"
	}
}


function progressBar(){
	const bar = document.querySelector("#progress")
	const clock = document.querySelector("#clock")
	start(timer,bar, clock, 3000)
}
