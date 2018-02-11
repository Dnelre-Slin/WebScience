<div class="loginDiv">

<div id="loginHeadings">
	<h3>Username:</h3>
	<h3>Password:</h3>
</div>

<form action="" method="post">
	<input id="iUserID" type="text" name="userID" />
	<input id="iPswd" type="password" name="pswd" />
	<input id="lButton" name="loginBtn" type="submit" value="Log In" />
</form>

</div>

<div class="signUpDiv">
<h2>Create account:</h2>

<p class="wMsg">* Required fields</p>

<form action="" method="post">
	<input id="iUsername" type="text" name="userName" placeholder="Username" />
	<p id="pUsername" class="wMsg">*</p>
	<br />
	<input id="iEmail" type="text" name="email" placeholder="Email" />
	<p id="pEmail" class="wMsg">*</p>
	<br />
	<input id="iPswd1" type="password" name="pswd1" placeholder="Password" />
	<p id="pPswd1" class="wMsg">*</p>
	<br />
	<input id="iPswd2" type="password" name="pswd2" placeholder="Repeat Password" />
	<p id="pPswd2" class="wMsg">*</p>
	<br />
	<textarea id="iExtra" name="extra" cols="40" rows="5" placeholder="Extra info..."></textarea>
	<br />
	<input id="sButton" name="signBtn" type="submit" value="Sign Up" />
</form>

<form name='fr' action='/userbase/loggedin' method='post'>
	<input type='hidden' name='userName' value='Nils' />
</form>

<?php

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		require_once 'includes/include_Functions.php';
		$conn = setupConn("userbase");
		if (isset($_POST['signBtn'])) {
			$boolAdmit = true;
			if (empty($_POST["userName"])) {
				echo "<script>document.getElementById('pUsername').innerHTML = '* This field is required!'</script>";
				$boolAdmit = false;
			} else {
				$userName = fix_input($conn, $_POST["userName"]);
				echo "<script>document.getElementById('iUsername').value = '$userName';</script>";
				if (!usernameAvailable($userName, $conn)) {
					echo "<script>document.getElementById('pUsername').innerHTML = '* Username already taken.'</script>";
					$boolAdmit = false;
				}
			}
			if (empty($_POST["email"])) {
				echo "<script>document.getElementById('pEmail').innerHTML = '* This field is required!'</script>";
				$boolAdmit = false;
			} else {
				$email = fix_input($conn, $_POST["email"]);
				echo "<script>document.getElementById('iEmail').value = '$email';</script>";
				if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
					echo "<script>document.getElementById('pEmail').innerHTML = '* This is an invalid email address.'</script>";
					$boolAdmit = false;
				}
			}
			if (empty($_POST["pswd1"])) {
				echo "<script>document.getElementById('pPswd1').innerHTML = '* This field is required!'</script>";
				$boolAdmit = false;
			} else {
				$password1 = fix_input($conn, $_POST["pswd1"]);
				$password2 = fix_input($conn, $_POST["pswd2"]);
				if ($password1 != $password2) {
					echo "<script>document.getElementById('pPswd2').innerHTML = '* Passwords do not match!'</script>";
					$boolAdmit = false;
				}
			}
			$extra = "";
			if (!empty($_POST["extra"])) {
				$extra = fix_input($conn, $_POST["extra"]);
				$nls = array("\r\n", "\n", "\r",);
				$extra = str_replace($nls, '&#13;&#10;', $extra);
				echo "<script>document.getElementById('iExtra').innerHTML = '" . $extra . "';</script>";
			}
			if ($boolAdmit) {
				storeInDB($conn, $userName, $email, $password1, $extra);
				gotoUserSite("/userbase", $userName);
			}
		} else {
			$userName = fix_input($conn, $_POST["userID"]);
			$password = fix_input($conn, $_POST["pswd"]);
			$result = attemptLogin($conn, $userName, $password);
			if ($result == 0) {
				gotoUserSite("/userbase", $userName);
			} else if ($result == -1) { //Username not found.
				echo "<script>document.getElementById('iUserID').placeholder = 'Incorrect username';</script>";
			} else if ($result == -2) { //Password not matching Username.
				echo "<script>document.getElementById('iPswd').placeholder = 'Wrong password';</script>";
				echo "<script>document.getElementById('iUserID').value = '" . stripslashes($userName) . "';</script>";
				echo "<p>HERE 2: " . stripslashes($userName) . "</p>";
			}
		}
		$conn->close();
	}

?>