<?php
require('database/db.php');


$id = $_POST['id'];
$statement = $conn->prepare("SELECT * FROM pallets P  WHERE pallet_id = :id");
$statement->execute(array(
    ':id' => $id
));



?>
<?php while($r = $statement->fetch()){ ?>
    <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>Wijzig Pallet</h3>
                </div>
                <div class="card-body">
                    <form class="form-horizontal" action="php/wijzig_pallets.php" method="POST">
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" name="name" value="<?php  echo $r["name"] ?>"class="form-control" >
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="text" name="price" value="<?php  echo $r["price"] ?>" class="form-control" >
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="text" name="description" value="<?php  echo $r["description"] ?>" class="form-control" >
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="text" name="amount" value="<?php  echo $r["amount"] ?>" class="form-control" >
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="file" class="form-control" value="" accept="image/*" placeholder="Enter Product Image" name="image" >
                        </div>
                        <input type="hidden" value="<?= $r['pallet_id'] ?>" name="id">
                        <input type="submit" name="submit"  value="Wijzig" class="btn float-right login_btn">
                </div>
            </div>
            </form>
        </div>
    </div>
    </div>
    </div>
<?php } ?>
