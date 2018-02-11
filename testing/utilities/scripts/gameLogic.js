function getGuessColor(current_row, columns) {
	var guessColors = [];
	for (var i = 0; i < columns; i++) {
		var piece = $("#piece" + current_row + "_" + i);
		if (piece.attr("class").indexOf("is_empty") > -1) {
			guessColors[i] = "empty";
		} else {				
			guessColors[i] = piece.css("background-color");
		}
	}
	return guessColors;
}

function placeSmallPieces(currentRow, columns, answer) {
	var index = 0;
	for (var i = 0; i < answer.blacks; i++) {
		setColor("#smallPiece" + currentRow + "_" + index, "black");
		$("#smallPiece" + currentRow + "_" + index++).prop("title", "Black: Right color and right position.");
	}
	for (var i = 0; i < answer.whites; i++) {
		setColor("#smallPiece" + currentRow + "_" + index, "white");
		$("#smallPiece" + currentRow + "_" + index++).prop("title", "White: Right color, but in the wrong position.");
	}
}

function makeCurrentRowStatic(currentRow, columns) {
	for (var i = 0; i < columns; i++) {
		$("#piece" + currentRow + "_" + i).removeClass("dynamic_piece").addClass("static_piece"); //Make current row static.
	}
}
function makeNextRowDynamic(nextRow, columns) {
	for (var i = 0; i < columns; i++) {
		$("#piece" + nextRow + "_" + i).removeClass("static_piece").addClass("dynamic_piece"); //Make next row dynamic.
	}
}

function moveGuessButton(currentRow) {
	$("#arrowGrid" + currentRow).html("<div class='circle'></div>");
	$("#arrowGrid" + (currentRow + 1)).html("<div title='Guess' id='guessButton'><div class='circle'></div></button>");
}

function finalizeAnswerBox(answerColors) {
	$.each(answerColors, function(index, color) {
		setColor("#answerPiece" + index, color);
	});
}

function doGuess(vars) {
	//Check for illegal guess: To be implemented.
	
	var guessColors = getGuessColor(vars.data.currentRow, vars.data.columns);
	var answer = vars.data.gl.guess(guessColors);
	
	placeSmallPieces(vars.data.currentRow, vars.data.columns, answer);
	makeCurrentRowStatic(vars.data.currentRow, vars.data.columns);
	
	if (answer.blacks === vars.data.columns) { //Win
		finalizeAnswerBox(vars.data.gl.answerColors);
	} else if (vars.data.currentRow === vars.data.rows - 1) { //Out of rows. Lose.
		alert("You lose...");
		finalizeAnswerBox(vars.data.gl.answerColors);
	} else {
		moveGuessButton(vars.data.currentRow);
		vars.data.currentRow++;
		makeNextRowDynamic(vars.data.currentRow, vars.data.columns);
	}
};