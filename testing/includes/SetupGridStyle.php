<?php
	function setupGrids($rows, $columns, $colors) {
		$colors_length = count($colors);
		$bigDiv = $columns * 2;
		$smallDiv = ceil($columns * 0.5);
		
		$poolFr = (($rows + 1) / $colors_length) * 4.4;
		$boardFr = ($columns + ($smallDiv / 2)) * 4.4;
		
		$result['#main_grid'] = "grid-template-columns: {$poolFr}fr {$boardFr}fr 4fr;";
		$result['#game_board'] = "grid-template-columns: {$bigDiv}fr {$smallDiv}fr;";
		
		$autos = "";
		for ($i = 0; $i < $columns; $i++) {
			$autos .= "auto ";
		}
		$result['.big_container'] = "grid-template-columns: {$autos};";
		
		$autos = "";
		for ($i = 0; $i < $smallDiv; $i++) {
			$autos .= "auto ";
		}
		$result['.small_container'] = "grid-template-columns: {$autos};";
		
		return $result;
	}
?>