<?php
//Conectar a la base de datos 
$servername = "localhost";
$username = "root"; //Usuario por defecto de XAMPP
$password = "0403173"; //Contraseña por defecto de XAMPP
$dbname = "formulario_db";

$conn = new mysqli($servername, $username, $password, $dbname);

//Verificar la conexión
if($conn->connect_error){
    die("Conexión fallida:".$conn->connect_error);
}

//Obtener datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$edad = $_POST['edad'];

//Insertar datos en la base de datos
$sql = "INSERT INTO usuarios(nombre, email, edad)VALUES('$nombre', '$email', $edad)";

if($conn->query($sql)== TRUE){
    echo "Registro exitoso.";
}else {
    echo "Error:".$sql."<br>".$conn->error;
}


//Cerrar la conexión
$conn->close()
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(!empty($_POST["nombre"]) && !empty($_POST["email"]) && !empty($_POST["edad"])){
        $nombre = htmlspecialchars($_POST["nombre"]);
        $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
        $edad = $_POST["edad"];

        if ($edad > 0 && filter_var($email, FILTER_VALIDATE_EMAIL)){
            echo "<h2>Datos Recibidos:</h2>";
            echo "<p>Nombre: $nombre</p>";
            echo "<p>Correo: $email</p>";
            echo "<p>Edad: $edad</p>";
        } else {
            if ($edad <= 0) {
                echo "<p>Edad inválida. Debe ser un número positivo.</p>";
            } else {
                echo "<p>Correo inválido.</p>";
            }
        }
    } else {
        echo "<p>Todos los campos son obligatorios.</p>";
    }
} else {
    echo "<h2>Acceso no permitido</h2>";
}
        
?>
