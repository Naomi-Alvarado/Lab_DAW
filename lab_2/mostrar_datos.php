<?php

// Conectar a la base de datos
$servername = "localhost";
$username = "root";
$password = "0403173";
$dbname = "formulario_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Configurar la paginación
$por_pagina = 10; // Número de registros por página
$pagina_actual = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
$offset = ($pagina_actual - 1) * $por_pagina;

// Consultar datos
$sql = "SELECT id, nombre, email, edad FROM usuarios LIMIT $por_pagina OFFSET $offset";
$result = $conn->query($sql);

// Consultar número total de registros que se tienen 
$sql_total = "SELECT COUNT(*) as total FROM usuarios";
$result_total = $conn->query($sql_total);
$total_registros = $result_total->fetch_assoc()['total'];
$total_paginas = ceil($total_registros / $por_pagina);

echo "<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Usuarios Registrados</title>
    <link rel='stylesheet' href='estilos.css'>
</head>
<body>";

if ($result->num_rows > 0) {
    echo "<h1>Usuarios Registrados</h1>";
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["id"] . "</td>";
        echo "<td>" . $row["nombre"] . "</td>";
        echo "<td>" . $row["email"] . "</td>";
        echo "<td>" . $row["edad"] . "</td>";
        echo "</tr>";
    }
    echo "</table>";

    // Crear enlaces de paginación
    echo "<div>";
    if ($pagina_actual > 1) {
        echo "<a href='?pagina=1'>Primera</a> ";
        echo "<a href='?pagina=" . ($pagina_actual - 1) . "'>Anterior</a> ";
    }

    if ($pagina_actual < $total_paginas) {
        echo "<a href='?pagina=" . ($pagina_actual + 1) . "'>Siguiente</a> ";
        echo "<a href='?pagina=$total_paginas'>Última</a>";
    }
    echo "</div>";

} else {
    echo "No hay usuarios registrados.";
}

// Cerrar la conexión
$conn->close();
?>





