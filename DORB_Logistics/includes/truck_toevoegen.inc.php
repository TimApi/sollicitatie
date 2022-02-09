<?php
require('database/db.php');


$id = $_POST['id'];
$statement = $conn->prepare("SELECT T.truck_id, T.name, T.amount,T.description, C.category_name, C.category_id  FROM trucks T LEFT JOIN category C ON T.category_id = C.category_id");
$statement->execute(array(
));



?>
<?php while($r = $statement->fetch()){ ?>
    <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>Truck toevoegen</h3>
                </div>
                <div class="card-body">
                    <form class="form-horizontal" action="php/truck_toevoegen.php" method="POST">
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" name="amount" value=""class="form-control" placeholder="amount">
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" name="discription" value=""class="form-control" placeholder="discription">
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="file" class="form-control" id="images" value="" accept="image/*" placeholder="Enter Product Image" name="image" >
                        </div>
                        <select class="form-control" name="category">
                            <?php while($r = $statement->fetch()){ ?>
                                <option value="<?= $r["category_id"] ?>"><?= $r["category_name"] ?></option>
                            <?php } ?>
                        </select>
                        <input type="submit" name="submit"  value="Add" class="btn float-right login_btn">
                </div>
            </div>
            </form>
        </div>
    </div>
    </div>
    </div>
<?php } ?>