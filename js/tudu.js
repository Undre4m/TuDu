var c;
var i;

function obtenerTareas() {
    return JSON.parse(localStorage.getItem("tareas"));
}

function guardarTareas() {
    var tareas = [];
    var lista = document.getElementById("tareas");

    for (c = 1; c < lista.children.length; c++) {
        var estado = lista.children[c].value;
        var nombre = lista.children[c].children[2].innerHTML;
        var descripcion = lista.children[c].children[3].innerHTML;

        //var tar = ;
        tareas.push({
            "nombre": nombre,
            "descripcion": descripcion,
            "estado": estado
        });
    }

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Construct List-Items and append to DOM Structure 

function cargarTareas() {

    var tareas = obtenerTareas();
    if (tareas !== null) {

        for (i = 0; i < tareas.length; i++) {
            var lista = document.getElementById("tareas");
            if (tareas[i].estado) {

                lista.appendChild(constructItemDone(tareas[i].nombre, tareas[i].descripcion));

            } else {

                lista.appendChild(constructItemNotDone(tareas[i].nombre, tareas[i].descripcion));

            }
        }

        bindEventsBadges();
    }
}

function constructItemDone(nombre, descripcion) {
    /*    return "<li class='list-group-item done' value='1'><span class='badge eliminar'><span class='glyphicon glyphicon-trash'></span></span><span class='badge expandir'><span class='glyphicon glyphicon-search'></span></span><strong>"+nombre+"</strong><div class='hidden'>"+descripcion+"</div></li>"  */
    var newElement = document.createElement("li");
    newElement.className = "list-group-item done";
    newElement.value = 1;
    newElement.innerHTML = "<span class='badge eliminar'><span class='glyphicon glyphicon-trash'></span></span><span class='badge expandir'><span                               class='glyphicon glyphicon-search'></span></span><strong>" + nombre + "</strong><div class='hidden'>" + descripcion + "</div>";
    return newElement;
}

function constructItemNotDone(nombre, descripcion) {
    /*    return "<li class='list-group-item' value='0'><span class='badge do'><span class='glyphicon glyphicon-ok'></span></span><span class='badge expandir'><span class='glyphicon glyphicon-search'></span></span><strong>"+nombre+"</strong><div class='hidden'>"+descripcion+"</div></li>"    */
    var newElement = document.createElement("li");
    newElement.className = "list-group-item";
    newElement.value = 0;
    newElement.innerHTML = "<span class='badge do'><span class='glyphicon glyphicon-ok'></span></span><span class='badge expandir'><span                                       class='glyphicon glyphicon-search'></span></span><strong>" + nombre + "</strong><div class='hidden'>" + descripcion + "</div>";
    return newElement;
}

// Add Tarea to Structure

function agregarTarea() {
    var txtN = document.getElementById('txtNombre');
    var txtD = document.getElementById('txtDescripcion');

    if (txtN.checkValidity()) {

        var lee = constructItemNotDone(txtN.value, txtD.value);
        txtN.value = "";
        txtD.value = "";
        document.getElementById('tareas').appendChild(lee);

        bindEventsDo(lee.firstElementChild);
        bindEventsExpandir(lee.firstElementChild.nextSibling);
    }
}


// Bind Events to Do Badges

function bindEventsDo(obj) {
    "use strict";
    obj.addEventListener('click', (function () {
        return function () {
            var new_element = this.cloneNode(true);
            this.parentNode.replaceChild(new_element, this);

            new_element.parentElement.value = "1";
            new_element.parentElement.className = "list-group-item done";
            new_element.className = "badge eliminar";
            new_element.firstChild.className = "glyphicon glyphicon-trash";

            bindEventsEliminar(new_element);
        };
    })(), false);

    obj.addEventListener('mouseover', (function () {
        return function () {
            this.style.color = "#B2FF58";
        };
    })(), false);

    obj.addEventListener('mouseout', (function () {
        return function () {
            this.style.color = "#FFF";
        };
    })(), false);
}

// Bind Events to Eliminar Badges

function bindEventsEliminar(obj) {
    "use strict";
    obj.addEventListener('click', (function (i) {
        return function () {
            var new_element = this.cloneNode(true);
            this.parentNode.replaceChild(new_element, this);
            // Clone element, replace it, let GC handle mem leaks.
            // the bye-bye kinda looks black
            new_element.parentElement.parentElement.removeChild(new_element.parentElement);
        };
    }()), false);

    obj.addEventListener('mouseover', (function (i) {
        return function () {
            this.style.color = "#FFEB3B";
        };
    }()), false);

    obj.addEventListener('mouseout', (function (i) {
        return function () {
            this.style.color = "#FFF";
        };
    }()), false);
}

// Bind Events to Expandir Badges

function bindEventsExpandir(obj) {
    "use strict";
    var desc = obj.nextElementSibling.nextElementSibling;

    if (desc.innerHTML !== "") {
        obj.addEventListener('click', (function () {
            return function () {
                if (desc.className === "") {
                    desc.className = "hidden";
                } else {
                    desc.className = "";
                }
            };
        })(), false);

        obj.addEventListener('mouseover', (function () {
            return function () {
                this.style.color = "#00C5FF";
            };
        })(), false);

        obj.addEventListener('mouseout', (function () {
            return function () {
                this.style.color = "#FFF";
            };
        })(), false);
    } else {
        obj.style.backgroundColor = "#777";
    }
}


// Asign Behaviour and Function to Badges

function bindEventsBadges() {
    "use strict";
    var badges;
    /* Event binding to do badges */
    badges = document.getElementsByClassName("do");

    for (i = 0; i < badges.length; i++) {
        bindEventsDo(badges[i]);
    }

    /* Event binding to eliminar badges */
    badges = document.getElementsByClassName("eliminar");
    for (i = 0; i < badges.length; i++) {
        bindEventsEliminar(badges[i]);
    }

    /* Event binding to expandir badges */
    badges = document.getElementsByClassName("expandir");
    for (i = 0; i < badges.length; i++) {
        bindEventsExpandir(badges[i]);
    }
}