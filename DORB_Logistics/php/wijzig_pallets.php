<?php
require('../database/db.php');
session_start();

if (isset($_POST["submit"])) {
$id = $_POST["id"];
$name = $_POST["name"];
$price = $_POST["price"];
$description = $_POST["description"];
$amount = $_POST['amount'];
$image = $_POST['image'];


$sql = "UPDATE pallets SET name=:name, price=:price, description=:description, amount=:amount, image=:image  WHERE pallet_id=:pallet_id";
$query = $conn->prepare($sql);


$query->execute(array(
':pallet_id' => $id,
':name' => $name,
':price' => $price,
':description' => $description,
':amount' => $amount,
':image' => $image
));

$url = 'Location:http://localhost:8080/DORB_Logistics/index.php?page=home';
header($url);
}

?>
