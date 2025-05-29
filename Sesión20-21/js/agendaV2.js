document.addEventListener("DOMContentLoaded", function(){
   const nombreInput = document.getElementById("nombre");
   const movilInput = document.getElementById("numCelular");
   const guardarButton = document.getElementById("guardarBtn");
   const buscarButton = document.getElementById("buscarBtn");
   const eliminarButton = document.getElementById("eliminarBtn");
   const eliminarTodosButton = document.getElementById("eliminarTodosBtn");
   const contactosUL = document.getElementById("contactos");

   function guardarDatos(){
    const nombre = nombreInput.value;
    const movil = movilInput.value;
    localStorage.setItem(nombre,movil);
    nombreInput.value= "";
    movilInput.value= "";
    actualizarDatos();
}

function buscarDatos(){
    const nombre = nombreInput.value;
    const movilRecuperado= localStorage.getItem(nombre);
    if (movilRecuperado !== null) {
        movilInput.value= movilRecuperado;
    } else {
        alert("Contacto no encontrado");
        movilInput.value = "";
    }
}

function eliminarDatos(){
   const nombre = nombreInput.value.trim();
   if (nombre==="") {
    alert("Por favor, ingrerse el nombre del contacto eliminar");
    return;
   }
   localStorage.removeItem(nombre);
    nombreInput.value= "";
    movilInput.value= "";
    actualizarDatos();
}

function eliminarTodos(){
if (confirm("¿Estas seguro que deseas eliminar todos los contactos?")) {
    localStorage.clear();
    actualizarDatos();
 }
}

function actualizarDatos(){
   let registro = "";
   if (localStorage.length === 0) {
     registro = "<li> Vacio </li>";
   } else {
       for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          registro += '<li>' + '<span class= "nom">' + key + '</span>' + '<span class= "nom">' + localStorage.getItem(key) + '</span>' + '</li><br>';
        
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

