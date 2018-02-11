//Various helper functions and classes.

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

//Set color on pieces
function setColor(piece, color) {
	if (color === $(piece).css("background-color")) {
		return;
	}
	if ($(piece).attr("class").indexOf("is_empty") > -1) {
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
			$(piece).css({"background-color": color, "border-color": color});
			$(piece).children().css("background-color", color);
		}
	}
}
//End of set color