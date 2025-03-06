<?php
//Conectar a la base de datos
$servername = "localhost";
$username = "root";
$password = "0403173";
$dbname = "formulario_db";

$conn=new mysqli($servername, $username, $password, $dbname);

//Verificar conexión
if($conn->connect_error){
    die("Conexión fallida:".$conn->connect_error);
}
//Obtiene el id ingresado en el formulario 
$id = $_POST['id'];


//Eliminar un registro de usuario atraves del id del usuario 
$sql = "DELETE FROM usuarios WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "Registro eliminado correctamente.";
} else {
    echo "Error al eliminar el registro: " . $conn->error;
}

?>