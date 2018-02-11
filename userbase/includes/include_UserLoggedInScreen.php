<form action="" method="POST">
	<input id="iLogoutButton" name="nLogoutButton" type="submit" value="Log Out" />
</form>

<?php

	if ((($_SERVER['REQUEST_METHOD'] === 'POST') and (isset($_POST['nLogoutButton']))) or (($_SESSION['time'] + 60) < time())) {
		session_unset();
		session_destroy();
		$url = "/userbase";
		header("Location: $url");
	}
	$_SESSION['time'] = time();
	require_once 'includes/include_Functions.php';
	$username = $_SESSION['userName'];
	$conn = setupConn("userbase");
	//Use connection to database here:
	$info = retriveFromDB($conn, $username);
	
	//Close connection to database.
	$conn->close();
	//
	
?>


<h2>Welcome <?= stripslashes($username);?>!</h2>
<p>Your email is: <?= $info['email']?></p>
<p>Some extra info:</p>
<p id='extraInfo'><?= str_replace('&#13;&#10;', '<br />', $info['extra'])?></p>

<div id="allUsersBox"><p>Testing</p></div>