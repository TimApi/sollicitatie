
<?php
require('../database/db.php');



$id = $_POST["id"];

$sql = "DELETE FROM pallets WHERE pallet_id = :id";
$query = $conn -> prepare($sql);


$query -> execute(array(
    ':id' => $id
));

$url = 'Location:http://localhost:8080/DORB_Logistics/index.php?page=home';
header($url);


