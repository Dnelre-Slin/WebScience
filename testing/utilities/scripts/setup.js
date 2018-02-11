//Setup game_board and piece_board.
function initAddSmalls(columns, parentIndex) {
	$("#game_board").append("<div id='smallDiv" + parentIndex + "' class='small_container'></div>");
	for (var i = 0; i < columns; i++) {
		$("#smallDiv" + parentIndex).append("<div id='smallPiece" + parentIndex + "_" + i + "' class='small_piece game_piece is_empty'><div id='smallInnerRing" + parentIndex + "_" +
		i + "' class='inner_ring circle'></div></div>");
	}
}

function initAddRow(columns, parentIndex) {
	$("#game_board").append("<div id='bigDiv" + parentIndex + "' class='big_container'></div>");
	for (var i = 0; i < columns; i++) {
		$("#bigDiv" + parentIndex).append("<div id='piece" + parentIndex + "_" + i + 
		"' class='big_piece game_piece is_empty static_piece' oncontextmenu='return false;'><div id='innerRing" + parentIndex + "_" + i + "' class ='inner_ring circle'></div></div>");
	}
	initAddSmalls(columns, parentIndex);
}

function initAddAnswerBox(columns) {
	$("#game_board").append("<div id='answerBox' class='big_container'></div>");
	for (var i = 0; i < columns; i++) {
		$("#answerBox").append("<div id='answerPiece" + i + "' class='big_piece not_empty game_piece' style='background-color: darkgreen; border-color: darkgreen'><div id='answerInnerRing" + i + 
		"' class='inner_ring circle' style='background-color: darkgreen'></div></div>");
	}
	$("#game_board").append("<div id='blankZone'></div>"); //Make grid align, since answer row has no small piece box.
}

function initArrowGrid(rows) {
	for (var i = rows; i >= 0; i--) {
		$("#arrowGrid").append("<div id='arrowGrid" + i + "' class='arrow_grid'><div class='circle'></div></div>");			
	}
	$("#arrowGrid0").html("<div title='Guess' id='guessButton'><div class='circle'></div></button>");
}

function setupGrids(rows, columns, colors) {
	var colors_length = $.map(colors, function(n, i) {return i; }).length;
	var bigDiv = columns * 2;
	var smallDiv = Math.ceil(columns * 0.5);
	
	var poolFr = ((rows + 1) / colors_length) * 4.4;
	var boardFr = (columns + (smallDiv / 2)) * 4.4;
	
	$("#main_grid").css("grid-template-columns", poolFr + "fr " + boardFr + "fr 4fr");
	$("#game_board").css("grid-template-columns", bigDiv + "fr " + smallDiv + "fr");
	
	var str = "";
	for (var i = 0; i < columns; i++) {
		str += "auto ";
	}
	$(".big_container").css("grid-template-columns", str);

	str = "";
	for (var i = 0; i < smallDiv; i++) {
		str += "auto ";
	}
	$(".small_container").css("grid-template-columns", str);
}

function initGameBoard(rows, columns) {
	initAddAnswerBox(columns);
	for (var i = rows - 1; i >= 0; i--) {
		initAddRow(columns, i);
	}
	initArrowGrid(rows);
}

function initPieceBoard(colors) {
	var i = 0;
	$.each(colors, function(index, value) {
		$("#piece_board").append("<div id='selectPiece" + i++ + "' class='big_piece not_empty pool_piece' style='background-color: " + value + "'><div class='circle'></div></div>");
	});
}