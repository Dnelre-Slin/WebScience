// $(document).ready(function() {
function main(vars) {
	// var rows = 10;
	// var columns = 4;
	
	// var colors = {
		// red:"rgb(255, 0, 0)", 
		// yellow:"rgb(255, 255, 0)", 
		// lime:"rgb(0, 255, 0)", 
		// blue:"rgb(0, 0, 255)", 
		// black:"rgb(0, 0, 0)", 
		// white:"rgb(255, 255, 255)"/*, 
		// orange:"rgb(255, 165, 0)"/*, 
		// purple:"rgb(128, 0, 128)", 
		// cyan:"rgb(0, 255, 255)", 
		// magenta:"rgb(255, 0, 255)"*/};
		
	
	var rows = vars["rows"];
	var columns = vars["columns"];
	var colors = JSON.parse(vars["colors"]);
	var allowEmpty = vars["allowEmpty"];
	var repeatColors = vars["repeatColors"];
		
	var currentRow = 0;
	
	var hPiece = new HeldPiece();
	var bPiece = new BoardPiece();
	
	var gameLogic = new LogicHandler(rows, columns, colors, allowEmpty, repeatColors);
	gameLogic.setup();
	
	//initGameBoard(rows, columns);
	//initPieceBoard(colors);
	// setupGrids(rows, columns, colors);
	
	makeNextRowDynamic(currentRow, columns);
	
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
		if (e.button === 0 && hPiece.isHolding()) { //Left mouse button up on a dynamic piece.
			bPiece.placePiece(this);
		}
	});
	
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
	// $(".arrow_grid").on("click", "#guessButton", {_currentRow: currentRow, _rows: rows, _columns: columns, gl: gameLogic}, doGuess);
	$(".arrow_grid").on("click", "#guessButton", {currentRow: currentRow, rows: rows, columns: columns, gl: gameLogic}, doGuess);
}