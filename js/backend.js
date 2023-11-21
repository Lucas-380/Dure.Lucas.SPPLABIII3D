function loader(){
    let listado = document.getElementById("listadoDeMonstruos");
    let spinners = document.getElementById("loading");

    if(spinners === null){
        let spinner = document.createElement("img");
        const src = "./assets/Spider.png";
        spinner.id = "loading";
        spinner.src = src;
        listado.appendChild(spinner);
    }else{
        listado.removeChild(spinners);
    }
}

const URL = "http://localhost:3000/monstruos";


function getMonstruos() {
    loader();

    fetch(URL)
        .then((res) => ( res.ok ? res.json(): Promise.reject(res)))
        .then((data)=> {
            console.log(data)
            data.forEach(m => {
                monstruo = new Monstruo(m.id, m.nombre, m.tipo, m.alias, m.defensa, m.miedo, m.enemigos);
                let tablaBody = document.getElementById("listaMonstruo");
                let tr = document.createElement("tr");
                tr.id = monstruo.id;
                let atributos = [monstruo.nombre, monstruo.alias, monstruo.defensa, monstruo.miedo, monstruo.tipo, monstruo.enemigos];
            
                for (let i = 0; i < 6; i++) {
                    let atributo = document.createElement("td");
                    atributo.textContent = atributos[i];
                    tr.appendChild(atributo);
                }
                tablaBody.appendChild(tr);
            });
            localStorage.setItem('monstruos', JSON.stringify(data));
            return data;
        })
        .catch((res)=> console.error(`Error ${res.status}: ${res.statusText}`))
        .finally( ()=> loader())
}



async function getMonstruo(id){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () =>{ //Se ejecuta 5 veces (por cada estado)
        if( xhr.readyState == 4) {

            if(xhr.status >= 200 && xhr.status < 300) {
                //respuesta ok
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }else{
                //caso de error
                console.error(`Error ${xhr.status}: ${xhr.statusText}`); //fallo a nivel servidor
            }
            loader();            
        }
    }

    // open peticion
    xhr.open("GET", URL + `/${id}`, true);

    // enviar
    try {
        xhr.send();
    } catch (err) {
        console.error(err); //fallo a nivel pagina web
    }
}

function postMonstruo(monstruo){
    const xhr = new XMLHttpRequest();

    loader();

    xhr.onreadystatechange = () =>{
        if( xhr.readyState == 4) 
        {
            if(xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }else{
                console.error(`Error ${xhr.status}: ${xhr.statusText}`); 
            }
            loader();            
        }
    }
    
    // open peticion
    xhr.open("POST", URL, true);

    // seteo la cabecera - Tipo de archivo que manejamos
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 

    // enviar
    try {
        xhr.send(JSON.stringify(monstruo));
    } catch (err) {
        console.error(err); //fallo a nivel pagina web
    }
}


function deleteMonstruo(id){
    loader();

    axios.delete(URL + "/"+id)   
    .then(({data}) => {
        console.log(data);
    })
    .catch(({message}) => {
        console.error(message);
    })
    .finally(() => {
        loader();
    })
}


function updateMonstruo(monstruo) {
    const xhr = new XMLHttpRequest();

    loader();

    xhr.onreadystatechange = () =>{
        if( xhr.readyState == 4) 
        {
            if(xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }else{
                console.error(`Error ${xhr.status}: ${xhr.statusText}`); 
            }
            loader();         
        }
    }
    
    // open peticion
    xhr.open("PUT", URL+"/"+monstruo.id, true);

    // seteo la cabecera - Tipo de archivo que manejamos
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 

    // enviar
    try {
        xhr.send(JSON.stringify(monstruo));
    } catch (err) {
        console.error(err); //fallo a nivel pagina web
    }
}