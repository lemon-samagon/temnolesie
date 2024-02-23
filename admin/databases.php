<?php
    require_once 'dbconfig.php';
    $conn = new mysqli($hostname, $username, $password, $database);
    if ($conn->connect_error) die("Обшивка");
#   $query = 'CREATE TABLE IF NOT EXISTS'
#   $result = $conn->query($query);
    $query = 'SELECT * FROM clients';
    $result = $conn->query($query);
    $rows = $result->num_rows;
    echo <<<_END
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin panel</title>
    </head>
    <body>
        <h1 style="text-align: center; font-size: 100px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">Панель администратора</h1>
        <h1 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">Клиенты банка:</h1>
        
    </body>
    </html>
    _END;
    for ($i = 0; $i < $rows; ++$i){
        $result->data_seek($i);
        echo 'Никнейм: ' .$result->fetch_assoc()['nickname'] . '<br>';
        $result->data_seek($i);
        echo 'ID клиента: ' .$result->fetch_assoc()['id'] . '<br>';
        $result->data_seek($i);
        echo 'Баланс: ' .$result->fetch_assoc()['balance'] . '<br>';
    }
?>