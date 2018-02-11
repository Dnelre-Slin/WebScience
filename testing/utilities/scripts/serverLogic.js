function toArray(colors) {
	var i = 0;
	var colorArray = []
	$.each(colors, function(index, color) {
		colorArray[i++] = color;
	});
	return colorArray;
}
	
//Class LogicHandler
function LogicHandler(rows, columns, colors, allowEmpty, repeatColors) {
	
	this.rows = rows;
	this.columns = columns;
	this.colors = toArray(colors);
	this.emptyAllowed = allowEmpty;
	this.repeatColors = repeatColors;
	
	this.answerColors = [];
	
	this.score = 0;
	
	
	this.randomizeWithoutRepeat = function() {
		this.colors.sort(function(a, b){return 0.5 - Math.random()});
		this.answerColors = this.colors.slice(0,this.columns);
		
	}
	this.randomizeWithRepeat = function(colors, columns) {
		for (var i = 0; i < this.columns; i++) {
			this.answerColors[i] = this.colors[Math.floor(Math.random() * this.colors.length)]; //Random number from 0 to "colors.length"-value.
		}
	}
	
	this.setup = function() {
		if (this.emptyAllowed) {
			this.colors.push("empty");
		}
		if (this.repeatColors){
			this.randomizeWithRepeat(this.colors, this.columns);
		} else {
			this.randomizeWithoutRepeat(this.colors, this.columns);
		}
	}
	
	this.guess = function(guessColors) {
		var guessCopy = guessColors.slice();
		var ansCopy = this.answerColors.slice();
		var colorNPos = 0;
		var colorOnly = 0;
		for (var i = 0; i < guessCopy.length; i++) { //Check for correct color and correct position.
			if (guessCopy[i] === ansCopy[i]) {
				colorNPos++;
				guessCopy[i] = ansCopy[i] = "blanked"; //Use for blacks. Blanked for white check latter.
			}
		}
		for (var i = 0; i < guessCopy.length; i++) { //Check for correct color, but wrong position.
			for (var j = 0; j < ansCopy.length; j++) {
				if (guessCopy[i] !== "blanked" && guessCopy[i] === ansCopy[j]) {
					colorOnly++;
					ansCopy[j] = "blanked";
					break;
				}
			}
		}
		
		if (colorNPos === this.columns) { // Win!
			//Do win function!.
		}
		
		var returnVal = {
			blacks: colorNPos,
			whites: colorOnly,
		}
		return returnVal;
	}
}