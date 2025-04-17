/* Se obtienen referencia a los elementos del DOM que necesitarás manipular, 
como el campo de entreda de texto, el botón de agregar la tarea y la lista de tareas*/

const entradaTarea = document.getElementById("tarea");
const botonTarea = document.getElementById("agregarTarea");
const listaTareas = document.getElementById("listaTareas");

/* Esta función toma el texto del campo de entrada, crear un nuevo
elemento de lista (<li>) y lo agrega a la lista de tareas. */

function agregarElemento() {
    const textoTarea = entradaTarea.value;

    if (textoTarea.trim() !== "") {
        const nuevaTarea = document.createElement("li");
        
        const textoElemento = document.createElement("span");
        textoElemento.textContent = textoTarea;
        //nuevaTarea.textContent = textoTarea;

        //Botón de eliminar
        const botonEliminar = document.createElement("span");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "eliminar";

        //Evento para marcar tarea completada
        textoElemento.addEventListener("click", function() {
            this.classList.toggle("completada");
        });

        //Eliminar tarea
        botonEliminar.addEventListener("click", function(){
            this.parentElement.remove();
        });

        //Contrucción de elementos li
        nuevaTarea.appendChild(textoElemento);
        nuevaTarea.appendChild(botonEliminar);
        listaTareas.appendChild(nuevaTarea);

        //Limpiar el campo de entrada
        entradaTarea.value = "";
    }

}

/* Se agrega un listener para el boton */
botonTarea.addEventListener("click", agregarElemento);

//Presionar enter
entradaTarea.addEventListener("keypress", function(e) {
    if (e.key == "Enter")  {
        agregarElemento();
    }
});