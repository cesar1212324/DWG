// document ready asegura que se vea la pagina
document.addEventListener("DOMContentLoaded", function(){ // siempre cargar el DOM antes de 
   //definir las variables
   const nombreInput = document.getElementById("nombre");
   const telefonoInput = document.getElementById("telefono");
   const guardarButton = document.getElementById("guardarBtn");
   const recuperarButton = document.getElementById("recuperarBtn");
   const listaUL = document.getElementById("lista");

   //definir las funciones

   //guardar los datos
   function guardarDatos() {
     localStorage.nombre = nombreInput.value;
     localStorage.telefono = telefonoInput.value;
   }

   // recuperar los datos

   function recuperarDatos(){
      if (localStorage.nombre !=undefined && localStorage.telefono !=undefined) {
          listaUL.innerHTML += "<li>" + localStorage.nombre + " - " + localStorage.telefono + "</li>";
      } else {
          listaUL.innerHTML = "<li>No hay datos guardados</li>";
      }
   }

   //asignar los eventos
   guardarButton.addEventListener("click", guardarDatos);
   recuperarButton.addEventListener("click", recuperarDatos);
})