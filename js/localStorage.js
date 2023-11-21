//Guardo el array en el localStorage
const guardarTipo = ["Esqueleto", "Zombie", "Vampiro", "Bruja", "Hombre Lobo"];
localStorage.setItem("tipo", JSON.stringify(guardarTipo));
// Obtener array
const tipo = JSON.parse(localStorage.getItem("tipo")) || [];

//select del form
const select = document.createElement("select");
select.id = "selectTipo";
select.classList.add("inputForm");

tipo.forEach(function (opcion) {
    const option = document.createElement("option");
    option.text = opcion;
    option.value = opcion;
    select.appendChild(option);
});

document.getElementById("menuDeTipos").appendChild(select);