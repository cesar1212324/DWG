document.addEventListener("DOMContentLoaded", function(){
   const nombreInput = document.getElementById("nombre");
   const movilInput = document.getElementById("numCelular");
   const emailInput = document.getElementById("email");
   const guardarButton = document.getElementById("guardarBtn");
   const buscarButton = document.getElementById("buscarBtn");
   const eliminarButton = document.getElementById("eliminarBtn");
   const eliminarTodosButton = document.getElementById("eliminarTodosBtn");
   const contactosUL = document.getElementById("contactos");

   function guardarDatos(){
    const nombre = nombreInput.value;
    const movil = movilInput.value;
    const email = emailInput.value;

     const contacto = {
        movil: movil,
        email: email
    };

    localStorage.setItem(nombre,JSON.stringify(contacto));
    nombreInput.value= "";
    movilInput.value= "";
    emailInput.value= "";
    actualizarDatos();
}

function buscarDatos(){
    const nombre = nombreInput.value.trim();
    const contactoJSON = localStorage.getItem(nombre);

    if (contactoJSON !== null) {
        const contacto = JSON.parse(contactoJSON);
        movilInput.value = contacto.movil;
        emailInput.value = contacto.email;
    } else {
        alert("Contacto no encontrado");
        movilInput.value = "";
        emailInput.value = "";
    }
}

function eliminarDatos(){
    const nombre = nombreInput.value.trim();
    if (nombre === "") {
        alert("Por favor, ingresa el nombre del contacto a eliminar");
        return;
    }

    if (localStorage.getItem(nombre)) {
        localStorage.removeItem(nombre);
        alert("Contacto eliminado");
    } else {
        alert("El contacto no existe");
    }

    nombreInput.value = "";
    movilInput.value = "";
    emailInput.value = "";
    actualizarDatos();
}

function eliminarTodos(){
    if (confirm("¿Estás seguro que deseas eliminar todos los contactos?")) {
        localStorage.clear();
        actualizarDatos();
    }
}

function actualizarDatos(){
    let registro = "";

    if (localStorage.length === 0) {
        registro = "<li>Vacío</li>";
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i); // Este es el 'nombre'
            const contactoJSON = localStorage.getItem(key);
            const contacto = JSON.parse(contactoJSON); // Convertimos el texto en objeto

            registro += '<li>' +
                          '<span class="nom">' + key + '</span><br>' +
                          '<span class="nom">' + contacto.movil + '</span><br>' +
                          '<span class="nom">' + contacto.email + '</span>' +
                        '</li><br>';
        }
    }

    contactosUL.innerHTML = registro;
}
    guardarButton.addEventListener("click", guardarDatos);
   buscarButton.addEventListener("click", buscarDatos);
   eliminarButton.addEventListener("click", eliminarDatos);
   eliminarTodosButton.addEventListener("click", eliminarTodos);
   
   actualizarDatos();

})