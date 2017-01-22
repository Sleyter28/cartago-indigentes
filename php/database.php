<?php
$servername = "mississippi.ic-itcr.ac.cr";
$username = "gubaldo";
$password = "gubaldo";
$dbname = "gubaldo";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
?>
