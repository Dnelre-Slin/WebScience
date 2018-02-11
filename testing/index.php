<?php
	require_once 'includes/SetupGameScreen.php';
	require_once 'includes/SetupGridStyle.php';
	
	$colors = array(		
		"red"=>"rgb(255, 0, 0)", 
		"yellow"=>"rgb(255, 255, 0)", 
		"lime"=>"rgb(0, 255, 0)", 
		"blue"=>"rgb(0, 0, 255)", 
		"black"=>"rgb(0, 0, 0)", 
		"white"=>"rgb(255, 255, 255)"/*, 
		"orange"=>"rgb(255, 165, 0)")*/);
		
	$rows = 10;
	$columns = 4;
	
	$repeatColors = true;
	$allowEmpty = true;
	
	$mainVars = json_encode(array(	"rows" => $rows, "columns" => $columns, "colors" => json_encode($colors), 
									"allowEmpty" => $allowEmpty, "repeatColors" => $repeatColors));
	
	$gridStyles = setupGrids($rows, $columns, $colors);
?>
<!DOCTYPE html>
<html>

<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="utilities/scripts/helpers.js"></script>
<script src="utilities/scripts/serverLogic.js"></script>
<script src="utilities/scripts/gameLogic.js"></script>
<script src="utilities/scripts/main.js"></script>

<script>
$(document).ready(function() {
	main(<?= $mainVars ?>);	
});
</script>

<title>Master Mind</title>
<link rel="stylesheet" type="text/css" href="utilities/styles/styles.css" />

<style>
#main_grid {
	<?= $gridStyles['#main_grid']; ?>
}
#game_board {
	<?= $gridStyles['#game_board']; ?>
}
.big_container {
	<?= $gridStyles['.big_container']; ?>
}
.small_container {
	<?= $gridStyles['.small_container']; ?>
}
</style>

</head>

<body>

<div id="main_grid">
	<?php 
	initPieceBoard($colors);
	initGameBoard($rows,$columns);
	initArrowGrid($rows);
	?>
</div>
<div id="box"><div class='circle'></div></div>

</body>

</html>