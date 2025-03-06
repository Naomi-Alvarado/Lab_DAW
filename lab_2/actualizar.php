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

//Obtener datos del formulario para la actualización
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$edad = $_POST['edad'];

//Actualización de un registro

$sql = "UPDATE usuarios SET nombre='$nombre', email='$email', edad=$edad WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Registro actualizado correctamente.";
    } else {
        echo "Error al actualizar el registro: " . $conn->error;
    }