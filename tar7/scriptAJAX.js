// Elementos del DOM
const entradaTarea = document.getElementById("tarea");
const botonTarea = document.getElementById("agregarTarea");
const listaTareas = document.getElementById("listaTareas");

// URL de la API falsa (JSONPlaceholder)
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Cargar tareas al iniciar
document.addEventListener("DOMContentLoaded", cargarTareas);

// Función para cargar tareas desde la API
function cargarTareas() {
    fetch(API_URL + "?_limit=5")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar las tareas");
            }
            return response.json();
        })
        .then(data => {
            data.forEach(tarea => {
                crearElementoTarea(tarea.title, tarea.id, tarea.completed);
            });
        })
        .catch(error => {
            console.error("Error:", error);
            listaTareas.innerHTML = `<li style="color: red;">Error al cargar tareas: ${error.message}</li>`;
        });
}

// Función para agregar nueva tarea
function agregarTarea() {
    const textoTarea = entradaTarea.value.trim();

    if (textoTarea !== "") {
        const nuevaTarea = {
            title: textoTarea,
            completed: false,
            userId: 1
        };

        fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(nuevaTarea),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al agregar la tarea");
            }
            return response.json();
        })
        .then(data => {
            crearElementoTarea(data.title, data.id, data.completed);
            entradaTarea.value = "";
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`Error al agregar tarea: ${error.message}`);
        });
    }
}

// Función para crear elementos de tarea en el DOM
function crearElementoTarea(texto, id, completada = false) {
    const nuevaTarea = document.createElement("li");
    nuevaTarea.dataset.id = id;
    
    const textoElemento = document.createElement("span");
    textoElemento.textContent = texto;
    if (completada) {
        textoElemento.classList.add("completada");
    }

    const botonEliminar = document.createElement("span");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "eliminar";

    // Evento para marcar tarea completada
    textoElemento.addEventListener("click", function() {
        const completada = this.classList.toggle("completada");
        actualizarTareaEnServidor(id, completada);
    });

    // Evento para eliminar tarea
    botonEliminar.addEventListener("click", function() {
        eliminarTareaDelServidor(id, nuevaTarea);
    });

    nuevaTarea.appendChild(textoElemento);
    nuevaTarea.appendChild(botonEliminar);
    listaTareas.appendChild(nuevaTarea);
}

// Función para actualizar estado de tarea en el servidor
function actualizarTareaEnServidor(id, completada) {
    fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: completada }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al actualizar la tarea");
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error:", error);
        alert(`Error al actualizar tarea: ${error.message}`);
    });
}

// Función para eliminar tarea del servidor
function eliminarTareaDelServidor(id, elemento) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al eliminar la tarea");
        }
        elemento.remove();
    })
    .catch(error => {
        console.error("Error:", error);
        alert(`Error al eliminar tarea: ${error.message}`);
    });
}

// Event Listeners
botonTarea.addEventListener("click", agregarTarea);
entradaTarea.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        agregarTarea();
    }
});