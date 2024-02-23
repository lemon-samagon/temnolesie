<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="admin_styles.css">
        <title>Admin panel</title>
    </head>
    <body>
        <h1 class="panel_label">Панель администратора</h1>
        <form method="post" action="databases.php">
            <h2>Создать запрос</h2>
            <input type="text" name="make_query">
            <input type="submit">
        </form>
<?php
    require_once 'dbconfig.php';
    $conn = new mysqli($hostname, $username, $password, $database);
    if ($conn->connect_error) die("Обшивка");
    if (isset($_POST['make_query'])){
        $make_query = $_POST['make_query'];
        $result = $conn->query($make_query);
        if (!$result) echo '<h2>Ошибка в запросе</h2>';
        else echo '<h2>Успешно</h2>';
    }
    $conn->close();

?>
        <h1>Клиенты банка:</h1>
        <form method="post" action="databases.php" id='load'>
            <input type="submit" name="submit" value="Загрузить">
        </form>
    </body>
    </html>

<?php
#   $query = 'CREATE TABLE IF NOT EXISTS'
#   $result = $conn->query($query);
    require_once 'dbconfig.php';
    $conn = new mysqli($hostname, $username, $password, $database);
    if ($conn->connect_error) die("Обшивка");
    if (isset($_POST['submit'])) {
        $query = 'SELECT * FROM clients';
        $result = $conn->query($query);
        $rows = $result->num_rows;
        for ($i = 0; $i < $rows; ++$i){
            echo '<div class="client">'; 
            $result->data_seek($i);
            echo '<h2>Никнейм: ' .$result->fetch_assoc()['nickname'] . '</h2>';
            $result->data_seek($i);
            echo '<h2>ID клиента: ' .$result->fetch_assoc()['id'] . '</h2>';
            $result->data_seek($i);
            echo '<h2>Баланс: ' .$result->fetch_assoc()['balance'] . '</h2>';
            echo '</div>';
        }
        echo '<script> document.getElementById("load").remove()</script>';
    }
    $conn->close();
?>