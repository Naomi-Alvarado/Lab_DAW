<?php
include 'conexion.php';

$nombre = "Maria Jose Alvarado";
$correo = "choche@email.com";

$sql = "INSERT INTO usuarios (nombre, correo) VALUES ('$nombre', '$correo')";

if ($conexion->query($sql) === TRUE){
    echo " Usuario registrado correctamente.";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>