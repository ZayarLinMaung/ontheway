<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "user_management";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if(mysqli_connect_error()){
        die("Error : ". mysqli_connect_error());
    }
?>