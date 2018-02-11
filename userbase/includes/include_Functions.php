<?php
	function setupConn($dbname, $servername = "localhost", $username = "root", $password = "") {		
		$conn = new mysqli($servername, $username, $password, $dbname);
		
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
		
		return $conn;
	}

	function fix_input($conn, $data) {
		$data = trim($data);
		/*$data = stripslashes($data);*/
		$data = htmlspecialchars($data);
		$data = $conn->real_escape_string($data);
		return $data;
	}
	
	function usernameAvailable($uName, $conn) {
		/*$uName = $conn->real_escape_string($uName);*/
		$sql = "SELECT * FROM `users` WHERE userName = '$uName'";
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0) {
			return false;
		} else {
			return true;
		}
	}
	
	function storeInDB($conn, $uName, $email, $pswd, $extra) {
		/*$uName = $conn->real_escape_string($uName);
		$email = $conn->real_escape_string($email);
		$pswd = $conn->real_escape_string($pswd);
		$extra = $conn->real_escape_string($extra);*/
		
		$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
		$salt = "$5\$rounds=5000$" . $salt . "$";
		
		$hPswd = crypt($pswd, $salt);
		
		$sql = "INSERT INTO `users` VALUES('$uName', '$hPswd', '$salt', '$email', '$extra')";
		$conn->query($sql);
	}
	
	function retriveFromDB($conn, $uName) {
		/*$uName = $conn->real_escape_string($uName);*/
		
		$sql = "SELECT * FROM `users` WHERE userName = '$uName'";
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$info["userName"] = $row["userName"];
			$info["email"] = $row["email"];
			$info["extra"] = $row["extra"];
			
			return $info;
		}
		return NULL;
	}
	
	function gotoUserSite($siteName, $uName) {
		/*echo "<p>HERE: " . $uName . "</p>";*/
		$_SESSION["userName"] = $uName;
		$_SESSION["time"] = time();
		header ( "Location: $siteName" );
	}
	
	function attemptLogin($conn, $uName, $pswd) {
		/*$uName = $conn->real_escape_string($uName);
		$pswd = $conn->real_escape_string($pswd);*/
		
		$sql = "SELECT * FROM `users` WHERE userName = '$uName'";
		
		$result = $conn->query($sql);
		
		if ($result->num_rows <= 0) {
			return -1; //Username not in database.
		} else {
			$row = $result->fetch_assoc();
			$hash = crypt($pswd, $row["salt"]);
			if ($hash != $row["hPassword"]) {
				return -2; //Username found, but password did not match.
			} else {
				return 0; //Username and password found and matches.
			}
		}
	}
?>