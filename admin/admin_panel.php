<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="admin_styles.css">
        <title>Admin panel</title>
    </head>
    <body>
        <div class="panel_label"><a href="http://26.146.14.96:3000/" target="_blank" class="exchange"><h2>Биржа</h2></a><h1>Панель администратора</h1><a href="requests.php"><h2>Заявления</h2></a></div>
        <form method="post" action="admin_panel.php" class="query">
            <h2 style="margin-left: 10px;">Создать запрос (использовать с осторожностью)</h2>
            <input type="text" name="make_query" size="50px" style=" border-radius: 5px; font-size: 60px; font-family: consolas; margin-left: 10px;">
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
        echo '<script>window.location.replace("admin_panel.php");</script>';
    }
    $conn->close();

?>
        <h1 style="margin-left: 10px;">Клиенты банка:</h1>

<?php
#   $query = 'CREATE TABLE IF NOT EXISTS'
#   $result = $conn->query($query);
    require_once 'dbconfig.php';
    $conn = new mysqli($hostname, $username, $password, $database);
    if ($conn->connect_error) die("Обшивка");
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
        echo '<h2>Баланс: ' .$result->fetch_assoc()['balance'] . ' АР</h2>';
        echo '</div>';
        
    }
    $conn->close();
?>
        <div class="control_panel">
            <h2>Введите ID клиента:</h2>
            <input type="text" name="id_to_control">
            <h2>Выберите действие:</h2>
            <h3>Проверить историю платежей<h3>
            <input type="radio" name="check_actions" value="1" checked="checked">
            <input type="radio" name="check_actions" value="2">
            <input type="radio" name="check_actions" value="3">
            <input type="radio" name="check_actions" value="4">

        </div>