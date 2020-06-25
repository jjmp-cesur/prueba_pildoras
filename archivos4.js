//  JavaScript Document

function comenzar() {
    zona_datos = document.getElementById("zonaDatos");
    var boton = document.getElementById("boton");

    boton.addEventListener("click", crear, false);

    navigator.webkitPersistentStorage.requestQuota(5 * 1024 * 1024, acceso);
}

function acceso() {
    window.webkitRequestFileSystem(PERSISTENT, 5 * 1024 * 1024, crearSistema, darErrores);
}

function crearSistema(sistema) {
    espacio = sistema.root;

    ruta = "";

    mostrar();
}

function crear() {
    var nombre_archivo = document.getElementById("entrada").value;

    if (nombre_archivo != "") {
        nombre_archivo = ruta + nombre_archivo;

        espacio.getFile(nombre_archivo, { create: true, exclusive: false }, mostrar, darErrores);
    }
}

function mostrar() {
    document.getElementById("entrada").value = "";

    zona_datos.innerHTML = "";

    espacio.getDirectory(ruta, null, leerdir, darErrores);
}

function leerdir(dir) {
    lector = dir.createReader();

    leer();
}

function leer() {
    lector.readEntries(function(archivos) {
        if (archivo.length) {
            listar(archivos);
        }
    }, darErrores);
}

function listar(archivos) {
    for (var i = 0; i < archivos.length; i++) {
        if (archivos[i].isFile) {
            zona_datos.innerHTML += archivos[i].name + "<br>";
        } else if (archivos[i].isdirectory) {
            zona_datos.innerHTML += "<span onClick='cambiardir(/"
            " + archivos[i].name + " / ")' class='directorio'>" + archivos[i].name + "</span><br>";
        }
    }
}

function cambiardir(nuevaruta) {
    ruta = ruta + nuevaruta + "/";

    mostrar();
}

function darErrores(e) {
    alert("Ha habido un error: " + e.code);
}

window.addEventListener("load", comenzar, false);