function compara(){ 
    var a = 3;
        var b = 3;
        if (a==b ) {
            alert("A y B son iguales");
        } else {
            alert("A y B son diferentes");
        } 
}

function resta(x,y){ 
   var rest = x - y;
   document.writeln("<h2> La resta es: " + rest + "</h2>");
}

function suma(a,b){ 
   var sum = a + b;
   document.getElementById("sumar").innerHTML = " La suma es: " + sum;// en el contenido de la etiqueta coloca 
}

function escribir(){ 
   valor= document.getElementById("entrada").value; // capturando lo que ingresas en la variable valor
   document.getElementById("contenido").innerHTML=valor;
}
