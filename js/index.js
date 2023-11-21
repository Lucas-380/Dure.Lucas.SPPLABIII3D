//localStorage
let db = getMonstruos();

function generarId() {
    const monstruos = JSON.parse(localStorage.getItem("tipo")) || [];
    let id = Math.floor(Math.random() * 100) + 1;
    if(monstruos != []) {
        let ultimoMonstruo = monstruos[monstruos.length - 1];
        if(ultimoMonstruo != undefined) {
            id = ultimoMonstruo.id + 1;
        }
    }
    return id;
}

//form de altaMonstruo
document.getElementById("formMonstruo").addEventListener("submit", function(event) {
    event.preventDefault();

    let nombre = document.getElementById("txtNombre").value;
    let alias = document.getElementById("txtAlias").value;
    let defensa = (document.querySelector('input[name="rdbDefensa"]:checked')).value;
    let miedo = document.getElementById("rngMiedo").value;
    let tipo = document.getElementById("selectTipo").value;

    let enemigos = document.querySelectorAll('input[name="checkEnemigos"]:checked');
    let arrayEnemigos = [];
    enemigos.forEach(e => {
        arrayEnemigos.push(e.id);
    });
    if(enemigos.length != 0){
        let newMonstruo = new Monstruo(generarId(), nombre, tipo, alias, defensa, miedo, arrayEnemigos);
        postMonstruo(newMonstruo);
    }else{
        mostrarNotificacion("FALTA CARGAR ENEMIGOS")
    }

    btnCancelar.click();
});

//eventos
const tabla = document.getElementById("tablaDeMonstruos");
const btnEliminar = document.getElementById("btnEliminar");
const btnModificar = document.getElementById("btnModificar");
const btnCancelar = document.getElementById("btnCancelar");
const btnGuardar = document.getElementById("btnGuardar");
let idClickeado;

tabla.addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.tagName === "TD") {
        let fila = e.target.parentNode;
        document.getElementById("txtNombre").value = fila.cells[0].textContent;
        document.getElementById("txtAlias").value = fila.cells[1].textContent;
        document.getElementById(`${fila.cells[2].textContent}`).checked = true;
        document.getElementById("rngMiedo").value = fila.cells[3].textContent;
        document.getElementById("selectTipo").value = fila.cells[4].textContent;
        
        let arrayEnemigos = fila.cells[5].textContent.split(',');
        arrayEnemigos.forEach(enemigo => {
            document.getElementById(`${enemigo}`).checked = true;
        });

        btnModificar.hidden = false;
        btnCancelar.hidden = false;
        btnEliminar.hidden = false;
        btnGuardar.style.display = "none";
        idClickeado = fila.id;
    }
});

// BAJA
btnEliminar.addEventListener("click", () => {
    deleteMonstruo(idClickeado);
    btnCancelar.click();
    mostrarNotificacion("ELIMINANDO")
});


//MODIFICACION
btnModificar.addEventListener("click", () => {
    let nombre = document.getElementById("txtNombre").value;
    let alias = document.getElementById("txtAlias").value;
    let defensa = (document.querySelector('input[name="rdbDefensa"]:checked')).value;
    let miedo = document.getElementById("rngMiedo").value;
    let tipo = document.getElementById("selectTipo").value;

    let enemigos = document.querySelectorAll('input[name="checkEnemigos"]:checked');
    let arrayEnemigos = [];
    enemigos.forEach(e => {
        arrayEnemigos.push(e.id);
    });

    if(enemigos.length != 0){
        let newMonstruo = new Monstruo(idClickeado, nombre, tipo, alias, defensa, miedo, arrayEnemigos);
        updateMonstruo(newMonstruo);
        mostrarNotificacion("MODIFICADANDO");
    }else{
        mostrarNotificacion("FALTA CARGAR ENEMIGOS")
    }

    btnCancelar.click();
});


function mostrarNotificacion(mensaje) {
    let notificacion = document.getElementById("notificacion");
    let texto = document.createElement("p");
    texto.textContent = mensaje;
    notificacion.hidden = false;
    notificacion.appendChild(texto);

    setTimeout(() => {
        notificacion.hidden = true;
        texto.hidden = true;
    }, 2000);
}

btnCancelar.addEventListener("click", () => {
    btnModificar.hidden = true;
    btnCancelar.hidden = true;
    btnEliminar.hidden = true;
    btnGuardar.style.display = "block";
});


//filtro de tipo
// const selectFiltro = document.createElement("select");
// selectFiltro.id = "selectTipo";
// selectFiltro.classList.add("inputForm");

// tipo.forEach(function (opcion) {
//     const opcionDeFiltro = document.createElement("option");
//     opcionDeFiltro.text = opcion;
//     opcionDeFiltro.value = opcion;
//     selectFiltro.appendChild(opcionDeFiltro);
// });

// document.getElementById("filtroDeTipo").appendChild(selectFiltro);

// selectFiltro.addEventListener("change", function(e) {
//     const valorSeleccionado = e.target.value;
//     console.log(valorSeleccionado);
//     getMonstruos(valorSeleccionado);
// });
