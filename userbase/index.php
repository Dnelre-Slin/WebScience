<?php
	session_start();
?>

<!DOCTYPE html>
<html>

<head>
<title>UserBase</title>
<link rel="stylesheet" type="text/css" href="ubStyle.css" />
</head>

<body>

<h1>UserBase</h1>

<?php
	if (empty($_SESSION)) {
		require_once 'includes/include_LoginScreen.php';
	} else {
		require_once 'includes/include_UserLoggedInScreen.php';
	}
	
?>

</body>

</html>