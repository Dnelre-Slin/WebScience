<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="test1.css" />
</head>

<body>

<?php 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test1";

$ansUser = "";
$ansSalt = "";
$bAnswer = false;

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "Select userName, hashedPassword, salt FROM usertable";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		if ($row["userName"] == $_POST["userID"] and $row["hashedPassword"] == $_POST["psw"]) {
			$ansUser = $row["userName"];
			$ansSalt = $row["salt"];
			$bAnswer = true;
		}
	}
}

if ($bAnswer){
	echo "<p class='successText'>Welcome " . $ansUser . "!</p>" . "<p class='successText'>Your salt is: " . $ansSalt . "</p>";
} else {
	echo "<p class='errorText'>Not found</p>";
}

$conn->close();

?>

</body>
</html>