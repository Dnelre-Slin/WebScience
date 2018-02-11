$(document).ready(function() {
	
	//Setup game_board and piece_board.

	function initAddSmalls(columns, parentIndex) {
		$("#game_board").append("<div id='smallDiv" + parentIndex + "' class='small_container'></div>");
		for (var i = 0; i < columns; i++) {
			$("#smallDiv" + parentIndex).append("<div id='smallPiece" + parentIndex + "_" + i + "' class='small_piece game_piece is_empty'><div id='smallInnerRing" + parentIndex + "_" +
			i + "' class='inner_ring circle'></div></div>");
		}
	}

	function initAddRow(columns, parentIndex) {
		//$("#game_board").append("<div id='row" + parentIndex + "' class='rowClass'></div>");
		//$("#row" + parentIndex).append("<div id='bigDiv" + parentIndex + "' class='bigDiv'></div>");
		$("#game_board").append("<div id='bigDiv" + parentIndex + "' class='big_container'></div>");
		for (var i = 0; i < columns; i++) {
			$("#bigDiv" + parentIndex).append("<div id='piece" + parentIndex + "_" + i + 
			"' class='big_piece game_piece is_empty static_piece' oncontextmenu='return false;'><div id='innerRing" + parentIndex + "_" + i + "' class ='inner_ring circle'></div></div>");
		}
		initAddSmalls(columns, parentIndex);
	}
	// function initAddRow(columns, parentIndex) {
		// //$("#game_board").append("<div id='row" + parentIndex + "' class='rowClass'></div>");
		// //$("#row" + parentIndex).append("<div id='bigDiv" + parentIndex + "' class='bigDiv'></div>");
		// $("#game_board").append("<div id='bigDiv" + parentIndex + "' class='big_container'></div>");
		// for (var i = 0; i < columns; i++) {
			// $("#bigDiv" + parentIndex).append("<div id='piece" + parentIndex + "_" + i + 
			// "' class='big_piece game_piece is_empty static_piece' oncontextmenu='return false;'><div id='middleRing" + parentIndex + "_" + i +
			// "' class='middle_ring'><div id='innerRing" + parentIndex + "_" + i + "' class ='inner_ring circle'></div></div></div>");
		// }
		// initAddSmalls(columns, parentIndex);
	// }
	// function initAddRow(columns, parentIndex) {
		// //$("#game_board").append("<div id='row" + parentIndex + "' class='rowClass'></div>");
		// //$("#row" + parentIndex).append("<div id='bigDiv" + parentIndex + "' class='bigDiv'></div>");
		// $("#game_board").append("<div id='bigDiv" + parentIndex + "' class='big_container'></div>");
		// for (var i = 0; i < columns; i++) {
			// $("#bigDiv" + parentIndex).append("<div id='piece" + parentIndex + "_" + i + "' class='big_piece game_piece is_empty static_piece' oncontextmenu='return false;'><div class='circle'></div></div>");
		// }
		// initAddSmalls(columns, parentIndex);
	// }
	
	function initAddAnswerBox(columns) {
		$("#game_board").append("<div id='answerBox' class='big_container'></div>");
		for (var i = 0; i < columns; i++) {
			$("#answerBox").append("<div id='answerPiece" + i + "' class='big_piece not_empty game_piece' style='background-color: darkgreen; border-color: darkgreen'><div id='answerInnerRing" + i + 
			"' class='inner_ring circle' style='background-color: darkgreen'></div></div>");
		}
		$("#game_board").append("<div id='blankZone'></div>"); //Make grid align, since answer row has no small piece box.
	}
	
	// function initArrowGrid(row) {
		// $("#game_board").append("<div id='ag_" + row + "' class='ag'><div class='circle'></div></div>");
	// }
	
	function initArrowGrid(rows) {
		for (var i = rows; i >= 0; i--) {
			$("#arrowGrid").append("<div id='arrowGrid" + i + "' class='arrow_grid'><div class='circle'></div></div>");			
		}
		// $("#arrowGrid0").html("<button title='Guess' id='guessButton'></button>");
		$("#arrowGrid0").html("<div title='Guess' id='guessButton'><div class='circle'></div></button>");
	}
	
	function setupGrids(rows, columns, colors) {
		var colors_length = $.map(colors, function(n, i) {return i; }).length;
		var bigDiv = columns * 2;
		var smallDiv = Math.ceil(columns * 0.5);
		
		var poolFr = ((rows + 1) / colors_length) * 4.4;
		// console.log(colors_length);
		var boardFr = (columns + (smallDiv / 2)) * 4.4;
		$("#main_grid").css("grid-template-columns", poolFr + "fr " + boardFr + "fr 4fr");
		// grid-template-columns: 8.8fr 53.125fr 4fr;
		// grid-template-columns: 20fr 5fr;
		$("#game_board").css("grid-template-columns", bigDiv + "fr " + smallDiv + "fr");
		// grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
		var str = "";
		for (var i = 0; i < columns; i++) {
			str += "auto ";
		}
		console.log(str);
		$(".big_container").css("grid-template-columns", str);
		// grid-template-columns: auto auto auto auto auto;
		str = "";
		for (var i = 0; i < smallDiv; i++) {
			str += "auto ";
		}
		console.log(str);
		$(".small_container").css("grid-template-columns", str);
	}

	function initGameBoard(rows, columns) {
		initAddAnswerBox(columns);
		// initArrowGrid();
		for (var i = rows - 1; i >= 0; i--) {
			initAddRow(columns, i);
			// initArrowGrid(i);
		}
		initArrowGrid(rows);
		// $("#ag_0").html("<button title='Guess' id='guessButton' class='noselect'></button>");
	}

	function initPieceBoard(colors) {
		var i = 0;
		$.each(colors, function(index, value) {
			$("#piece_board").append("<div id='selectPiece" + i++ + "' class='big_piece not_empty pool_piece' style='background-color: " + value + "'><div class='circle'></div></div>");
		});
	}
	//End of setup.

	//Class HeldPiece
	function HeldPiece() {
		this.b_isHeld = false;
		
		this.show = function(e) {
			this.b_isHeld = true;
			$("#box").show();
		}
		
		this.hide = function() {
			this.b_isHeld = false;
			$("#box").hide();
		}
		
		this.unClick = function(e) {
			if (this.b_isHeld && $(e.target).closest(".dynamic_piece, .static_piece").length === 0) {
				this.hide();
			}
		}
		
		this.pickUp = function(e, piece) {
			$("#box").css("background-color", $(piece).css("background-color"));
			this.show(e);
			this.updatePos(e);
		}
		
		this.release = function() {
			this.hide();
		}
		
		this.updatePos = function(e) {
			if (this.b_isHeld) {
				$("#box").css({"left": e.pageX + $("#box").width() / 2, "top": e.pageY + $("#box").height() / 2});
			}
		}
		
		this.isHolding = function() {
			return this.b_isHeld;
		}
	}
	//End of ShowBox class.
	
	//Class BoardPiece
	function BoardPiece() {
		
		this.isEmpty = function(piece) {
			if ($(piece).attr("class").indexOf("not_empty") > -1) {
				return false;
			}
			return true;
		}
		
		this.removePiece = function(piece) {
			setColor(piece, "empty");
		}
		
		this.placePiece = function(piece) {
			setColor(piece, $("#box").css("background-color"));
		}
		
		this.swap = function(piece) {
			var hColor = $("#box").css("background-color");
			$("#box").css("background-color", $(piece).css("background-color"));
			setColor(piece, hColor);
		}

	}
	//End of BoardPiece class.
	
	function toArray(colors) {
		var i = 0;
		var colorArray = []
		$.each(colors, function(index, color) {
			colorArray[i++] = color;
		});
		return colorArray;
	}
	
	//Class LogicHandler
	function LogicHandler(colors, rows, columns) {
		
		this.colors = toArray(colors);
		this.rows = rows;
		this.columns = columns;
		this.emptyAllowed = true;
		this.repeatColors = true;
		
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
	//End of LogicHandler class.
	
	//Set color on pieces
	function setColor(piece, color) {
		if (color === $(piece).css("background-color")) {
			return;
		}
		if (bPiece.isEmpty(piece)) {
			if (color !== "empty") {
				$(piece).removeClass("is_empty").addClass("not_empty");
				$(piece).css({"background-color": color, "border-color": color});
				$(piece).children().css("background-color", color);
			}
		} else { 
			if (color === "empty") {
				$(piece).removeClass("not_empty").addClass("is_empty");
				$(piece).css({"background-color": "darkgreen", "border-color": "black"});
				$(piece).children().css("background-color", "black");
			} else {
				console.log(rows);
				$(piece).css({"background-color": color, "border-color": color});
				$(piece).children().css("background-color", color);
			}
		}
	}
	//End of set color
	
	//Finalize answer box
	// function finalizeAnswerBox(answerColors) {
		// $.each(answerColors, function(index, color) {
			// setColor("#answerPiece" + index, color);
			// // if (color == "empty"){
				// // $("#answerPiece" + index).css("background-color", "black").removeClass("not_empty").addClass("is_empty");				
			// // } else {
				// // $("#answerPiece" + index).css("background-color", color);
			// // }
		// });
	// }
	//End of answer box finalization.
	
	// //Initiate dynamic pieces
	// function makeFirstRowDynamic(columns) {
		// for (var i = 0; i < columns; i++) {
			// $("#piece0_" + i).removeClass("static_piece").addClass("dynamic_piece"); //Make first row dynamic.
			// console.log("yep");
		// }
	// }
	// //End of dynamic piece initiation.
	
	//Scroll color:
	function scrollColor(e, colors) {
		if (e.keyCode === 37 || e.keyCode === 39) {// 37 = Left arrow. 39 = Right arrow.
			var adder = 0;
			if (e.keyCode === 37) { //Left Arrow.
				adder = -1;
			} else { //Right Arrow.
				adder = 1;
			}
			var hColor = $("#box").css("background-color");
			$.each(colors, function(index, color) {
				if (hColor === color) {
					$("#box").css("background-color",colors[(index + adder) % colors.length]);
				}
			});
		}
	}
	//End of scroll color.
	
	//Initialization:
	
	var rows = 10;
	var columns = 4;
	
	var currentRow = 0;

	//var colors = ["red","lime","blue","yellow","white","black"];
	
	var colors = {
		red:"rgb(255, 0, 0)", 
		yellow:"rgb(255, 255, 0)", 
		lime:"rgb(0, 255, 0)", 
		blue:"rgb(0, 0, 255)", 
		black:"rgb(0, 0, 0)", 
		white:"rgb(255, 255, 255)", 
		orange:"rgb(255, 165, 0)"/*, 
		purple:"rgb(128, 0, 128)", 
		cyan:"rgb(0, 255, 255)", 
		magenta:"rgb(255, 0, 255)"*/};
		
	var hPiece = new HeldPiece();
	var bPiece = new BoardPiece();
	
	var gameLogic = new LogicHandler(colors, rows, columns);
	gameLogic.setup();
	
	//console.log(gameLogic.colors);
	//console.log(gameLogic.answerColors);
	
	initGameBoard(rows, columns);
	initPieceBoard(colors);
	setupGrids(rows, columns, colors);
	
	// moveGuessButton(currentRow);
	// makeFirstRowDynamic(columns);
	makeNextRowDynamic(currentRow, columns);
	
	// gameLogic.answerColors = ["rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 255, 0)"];
	// console.log(gameLogic.answerColors);
	// finalizeAnswerBox(gameLogic.answerColors);
	
	//End of initialization.
	
	//Event handling:
	
	/*$(".game_piece").mousedown(function(e){
		if ($(this).attr("class").indexOf("dynamic_piece") > -1) { //Is a dynamic piece.
			if (e.button === 0 && !bPiece.isEmpty(this)) { //Left mouse button down on a dynamic piece.
				hPiece.pickUp(e,this);
				bPiece.removePiece(this);
			} else if (e.button === 2) { //Right mouse down on a dynamic piece.
				if (hPiece.isHolding() && !bPiece.isEmpty(this)) { //Holding piece, and piece on board. Do swap.
					bPiece.swap(this);				
				} else if (hPiece.isHolding() && bPiece.isEmpty(this)) { //Holding piece, but empty board. Paste piece, don't lose holding.
					bPiece.placePiece(this);
				} else if (!hPiece.isHolding() && !bPiece.isEmpty(this)) { //Not holding, but piece on board. Remove piece from board, don't pick up.
					bPiece.removePiece(this);
				}
			}
		} else {// Is static
			if (e.button === 0 && $(this).attr("class").indexOf("not_empty") > -1) {
				hPiece.pickUp(e,this);			
			}
		}
	});*/
	
	$(".big_container").on("mousedown", ".dynamic_piece", function(e) {
		if (e.button === 0 && !bPiece.isEmpty(this)) { //Left mouse button down on a dynamic piece.
			hPiece.pickUp(e,this);
			bPiece.removePiece(this);
		} else if (e.button === 2) { //Right mouse down on a dynamic piece.
			if (hPiece.isHolding() && !bPiece.isEmpty(this)) { //Holding piece, and piece on board. Do swap.
				bPiece.swap(this);				
			} else if (hPiece.isHolding() && bPiece.isEmpty(this)) { //Holding piece, but empty board. Paste piece, don't lose holding.
				bPiece.placePiece(this);
			} else if (!hPiece.isHolding() && !bPiece.isEmpty(this)) { //Not holding, but piece on board. Remove piece from board, don't pick up.
				bPiece.removePiece(this);
			}
		}
	});
	
	$(".big_container").on("mouseup", ".dynamic_piece", function(e) {
		console.log("chick");
		if (e.button === 0 && hPiece.isHolding()) { //Left mouse button up on a dynamic piece.
			bPiece.placePiece(this);
		}
	});
	
	// $(".small_piece").mousedown(function(e) {
		// if (e.button === 0) {
			// $(this).css("background-color", "white").removeClass("s_empty").addClass("s_not_empty");
		// }
	// });
	
	$(".big_container").on("mousedown", ".static_piece", function(e){
		if (e.button === 0 && !bPiece.isEmpty(this)) {
			hPiece.pickUp(e,this);			
		}
	});
	
	$(".pool_piece").mousedown(function(e) {
		if (e.button === 0) {
			hPiece.pickUp(e,this);			
		}
	});
	
	$(document).mouseup(function(e) {
		if (e.button === 0) { //Left mouse button up anywhere.			
			hPiece.release();
		}
	});
	
	$(document).mousedown(function(e) {
		if (e.button === 2 && $(e.target).closest('.dynamic_piece').length === 0) { //Right mouse down anywhere other than a dynamic_piece
			hPiece.release();
		}
		//console.log("down");
	});
	
	$(document).mousemove(function(e) {
		hPiece.updatePos(e);
	});

	$(document).mouseleave(function() {
		hPiece.hide();
	});
	
	$(document).on("keypress", function(e) {
		if (e.key === "Enter") { //Enter key pressed.
			$("#guessButton").trigger("click");
		}
	});
	
	$(".arrow_grid").on("click", "#guessButton", {_currentRow: currentRow, _rows: rows, _columns: columns, gl: gameLogic}, doGuess);
	
	// $("#guessButton").click({_currentRow: currentRow, _rows: rows, _columns: columns, gl: gameLogic}, doGuess);
	
	//End of event handling.
	
	//Game logic:
	
	//Functions for logic handling
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
			// $("#smallPiece" + currentRow + "_" + index++).css("background-color","black").removeClass("s_empty").addClass("s_not_empty");
			setColor("#smallPiece" + currentRow + "_" + index++, "black");
		}
		for (var i = 0; i < answer.whites; i++) {
			// $("#smallPiece" + currentRow + "_" + index++).css("background-color","white").removeClass("s_empty").addClass("s_not_empty");
			setColor("#smallPiece" + currentRow + "_" + index++, "white");
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
	
	function moveGuessButtonOld(currentRow) {
		var gb = $("#bigDiv" + currentRow).offset().top;
		var leftgb = $("#bigDiv" + currentRow).offset().left;
		$("#guessButton").css("top", gb + "px");
		$("#guessButton").css("left", (leftgb) + $("#game_board").width() + "px");
		// $("#arrow").css("top", gb + "px");
		console.log(gb);
		//console.log(gb);
	}
	
	// function moveGuessButton(currentRow) {
		// $("#ag_" + currentRow).html("<div class='circle'></div>");
		// $("#ag_" + (currentRow + 1)).html("<button title='Guess' id='guessButton' class='noselect'></button>");
	// }	
	function moveGuessButton(currentRow) {
		$("#arrowGrid" + currentRow).html("<div class='circle'></div>");
		$("#arrowGrid" + (currentRow + 1)).html("<div title='Guess' id='guessButton'><div class='circle'></div></button>");
	}
	
	function finalizeAnswerBox(answerColors) {
		$.each(answerColors, function(index, color) {
			setColor("#answerPiece" + index, color);
			// if (color == "empty"){
				// $("#answerPiece" + index).css("background-color", "black").removeClass("not_empty").addClass("is_empty");				
			// } else {
				// $("#answerPiece" + index).css("background-color", color);
			// }
		});
	}
	
	//End of logic functions.
	
	//$("#guessButton").click(function(){
	function doGuess(vars) {
		//Check for illegal guess: To be implemented.
		var currentRow = vars.data._currentRow;
		var rows = vars.data._rows;
		var columns = vars.data._columns;
		
		var guessColors = getGuessColor(currentRow, columns);
		var answer = gameLogic.guess(guessColors);
		console.log(answer);
		placeSmallPieces(currentRow, columns, answer);
		makeCurrentRowStatic(currentRow, columns);
		if (answer.blacks === columns) { //Win
			finalizeAnswerBox(vars.data.gl.answerColors);
		} else if (currentRow === rows - 1) { //Out of rows. Lose.
			alert("You lose...");
			finalizeAnswerBox(vars.data.gl.answerColors);
		} else {
			moveGuessButton(vars.data._currentRow);
			vars.data._currentRow++;
			makeNextRowDynamic(vars.data._currentRow, columns);
		}
	};
	//End of game logic.

});