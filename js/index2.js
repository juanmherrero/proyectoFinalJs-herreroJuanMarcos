const carrito = document.getElementById('carrito');
const prods = document.getElementById('listaProds');
const listaProds = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

eventslisteners();

function eventslisteners() 
{
    //agregar al carrito
    prods.addEventListener('click', comprarProd);

    //eliminar producto del carrito
    carrito.addEventListener('click', eliminarProd);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarcarrito);

    //mostrar lista de productos en carrito
    document.addEventListener('DOMContentLoaded', leerLS)

}

function comprarProd(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const prod = e.target.parentElement;
        console.log(prod);
          //enviar el producto seleccionado para tomar sus datos
        leerDatosProd(prod);
    }    
}


//leer datos del producto
function leerDatosProd(prod) {
    const infoProd = {
        imagen: prod.querySelector('img').src,
        titulo: prod.querySelector('h4').textContent,
        precio: prod.querySelector('.precio span').textContent,
        id: prod.querySelector('a').getAttribute('data-id')
    }
    insertarProd(infoProd);
}

// insertar producto en el carrito
function insertarProd(prod) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${prod.imagen}" width="100"></td>
        <td>${prod.titulo}</td>
        <td>${prod.precio}</td>
        <td><a href="#" class="borrarProd" data-id="${prod.id}">X</a></td>    
    `;
    listaProds.appendChild(row);
    guardarProdLocalStorage(prod);

}

//eliminar producto del carrito en el DOM
function eliminarProd(e) 
{
    e.preventDefault();
    let prod, prodId;
    if (e.target.classList.contains('borrarProd')) {
        e.target.parentElement.parentElement.remove(); 
    }  
    prod = e.target.parentElement.parentElement;
    prodId = prod.querySelector('a').getAttribute('data-id');   
    eliminarProdLS(prodId);
}

//vaciar carrito

function vaciarcarrito() {
    Swal.fire({
        title: '¿Vaciar carrito?',
        text: "No será posible revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar'
    }).then((result) => {
        if (result.isConfirmed) {
            while (listaProds.firstChild) {
                listaProds.removeChild(listaProds.firstChild);
            }
    //vaciar carrito  de LS
        vaciarLs();
            Swal.fire(
                '',
                'El carrito ha sido vaciado.',
                'success'
            )
        }
    })
    return false;
}

//almacenar producto al LS
function guardarProdLocalStorage(prod)
{
    let prods;
    prods = obtenerProdsLocalStorage();
    //El producto seleccionado se agrega al Array
    prods.push(prod);
    localStorage.setItem('prods', JSON.stringify(prods));
}


//comprobar que hayan elementos en el LS
function obtenerProdsLocalStorage() 
{
    let prodsLS;
    // si no hay nada o es nulo, se crea el array vacío
    if (localStorage.getItem('prods') === null) {
        prodsLS = [];        
    } else {
        prodsLS = JSON.parse(localStorage.getItem('prods'));
    }
    return prodsLS;
}


function leerLS() 
{
    let prodsLS;
    prodsLS = obtenerProdsLocalStorage();
    prodsLS.forEach(function (prod) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${prod.imagen}" width="100"></td>
        <td>${prod.titulo}</td>
        <td>${prod.precio}</td>
        <td><a href="#" class="borrarProd" data-id="${prod.id}">X</a></td>    
    `;
        listaProds.appendChild(row);
    })
}

//eliminar producto del LS
function eliminarProdLS(prod) 
{
    let prodsLS;
    //obtner el arreglo con los productos
    prodsLS = obtenerProdsLocalStorage();
    // buscar coincidencias y eliminar
    prodsLS.forEach(function(prodLS, index) {
    if (prodLS.id === prod) {
        prodsLS.splice(index, 1);
    }
    });
    localStorage.setItem('prods', JSON.stringify(prodsLS));
}

//eliminar todos los productos del LS
function vaciarLs() {
    localStorage.clear();
}