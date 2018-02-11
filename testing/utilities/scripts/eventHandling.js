$(document).ready(function() {
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
});