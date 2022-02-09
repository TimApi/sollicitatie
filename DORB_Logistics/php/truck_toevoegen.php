<?php
require('../database/db.php');
session_start();


if (isset($_POST["submit"])) {
    $category = $_POST['category'];
    $name = $_POST["category"]["category_name"];
    $discription = $_POST['discription'];
    $image = $_POST['image'];
    $palets = $_POST['amount'];
    $kosten = 0;


    var_dump($category = $_POST['category']);
    $sql = "INSERT INTO `trucks` (category_id, name, description,image ,amount) VALUES (:category_id, :name, :description, :image,:amount)";
    $query = $conn->prepare($sql);


    $query->execute(array(
        ':category_id' => $category,
        ':name' => $name,
        ':description' => $discription,
        ':image' => $image,
        ':amount' => $palets
    ));

    $url = 'Location:http://localhost:8080/DORB_Logistics/index.php?page=trucks';
    header($url);

}
else{

    $url = 'Location:http://localhost:8080/DORB_Logistics/index.php?page=pallets_toevoegen';
    header($url);
}

?>






