
const barWidth = 500;
const barHeight = 10;

let started = false

// add a bar to the screen
function addBar(){
	createBar()

	if(!started){
		startNextBar()
	}

}

// draw the bar
function createBar(){
	let barContainer = d3.select("#bar-holder")
		.append("svg")
		.attr("width", barWidth)
		.attr("height", barHeight)
		.attr("class", "progress-bar")

	//background
	barContainer.append("rect")
		.attr("width", barWidth)
		.attr("height", barHeight)
		.attr("class", "bar-back")

	//main bar
	barContainer.append("rect")
		.attr("width", 0)
		.attr("height", barHeight)
		.attr("width", 0)
		.attr("class", "bar-main")
}

// begin the bar load animation
function startNextBar(){
	let bars = d3.select("#bar-holder").selectAll(".progress-bar").nodes()

	bars.map(function (d, i){ 
		let bar = d3.select(d)
		if(bar.classed("loaded")){

			startTransition(bars[i+1])
		}
		else{
			// initial bar
			startTransition(bars[0])
		}
		
	})
	function startTransition(bar){
		d3.select(bar).select(".bar-main")
				.transition().duration(2000)
					.on("end", function (d){ 
						d3.select(this.parentNode)
							.classed("loaded", true)
						startNextBar()
				})
				.attr("width", barWidth)
	}
}

