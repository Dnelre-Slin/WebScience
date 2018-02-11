<?php
	//Piece Board:
	function initPieceBoard($colors) {
		echo "<div id='piece_board' class='noselect'>"; //Piece board div.
		$i = 0;
		foreach($colors as $key => $value) {
			echo "<div id='selecePiece$i' class='big_piece pool_piece' style='background-color: $value'>
			<div class='circle'></div>
			</div>";
			$i++;
		}
		echo "</div>"; //Close piece board div.
	}
	//End of Piece Board.
	
	//Game Board:
	function initAnswerBox($columns) {
		echo "<div id='answerBox' class='big_container'>"; //Answer box div.
		for ($i = 0; $i < $columns; $i++) {
			echo "<div id='answerPiece$i' class='big_piece not_empty game_piece' style='border-color: darkgreen'>
			<div id='answerInnerRing$i' class='inner_ring circle' style='background-color: darkgreen'></div>
			</div>";
		}
		echo "</div>"; //Close answer box div.
		echo "<div id='blankZone'></div>"; //Blank Zone div.
	}
	
	function initBigContainer($columns, $parentIndex) {
		echo "<div id='bigDiv$parentIndex' class='big_container'>"; //Big container div.
		for ($i = 0; $i < $columns; $i++) {
			echo "<div id='piece{$parentIndex}_$i' class='big_piece game_piece is_empty static_piece' oncontextmenu='return false;'>
			<div id='innerRing{$parentIndex}_$i' class='inner_ring circle'></div>
			</div>";
		}
		echo "</div>"; //Close big container div.
	}
	
	function initSmallContainer($columns, $parentIndex) {
		echo "<div id='smallDiv$parentIndex' class='small_container'>"; //Small container div.
		for ($i = 0; $i < $columns; $i++) {
			echo "<div id='smallPiece{$parentIndex}_$i' class='small_piece game_piece is_empty'>
			<div id='smallInnerRing{$parentIndex}_$i' class='inner_ring circle'></div>
			</div>";
		}
		echo "</div>"; //Close small container.
	}
	
	function initRow($columns, $parentIndex) {
		initBigContainer($columns, $parentIndex);
		initSmallContainer($columns, $parentIndex);
	}
	
	function initGameBoard($rows, $columns) {
		echo "<div id='game_board' class='noselect'>"; //Game Board div.
		initAnswerBox($columns);
		for ($i = $rows - 1; $i >= 0; $i--) {
			initRow($columns, $i);
		}
		echo"</div>"; //Close game board div.
	}
	//End of Game Board.
	
	//ArrowGrid
	function initArrowGrid($rows) {
		echo "<div id='arrowGrid' class='noselect'>"; //Arrow grid div.
		for ($i = $rows; $i > 0; $i--) {
			echo "<div id='arrowGrid$i' class='arrow_grid'><div class='circle'></div></div>";
		}
		echo "<div id='arrowGrid0' class='arrow_grid'><div title='Guess' id='guessButton'><div class='circle'></div></div></div>";
		echo "</div>"; //Close arrow grid div.
	}
	//End of Arrow Grid.
?>