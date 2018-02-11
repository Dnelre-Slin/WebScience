<!DOCTYPE html>
<html>
<body>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT userName, hashedPassword, salt FROM usertable";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<br> id: ". $row["userName"]. " - Name: ". $row["hashedPassword"]. " " . $row["salt"] . "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?> 

</body>
</html>