const traerProductos = async() => {
  const lista = document.getElementById("listado");

  try{
    const response = await fetch('../json/productos.json');
    const productos = await response.json();

    productos.forEach(producto => {
      const li = document.createElement("li");
      li.innerHTML = `
            <h4>${producto.titulo}</h4>
            <img src="${producto.img}" alt="">
            <h5 class="precio"><span>$ ${producto.precio}</span></h5>
            <p>Detalle: ${producto.detalle}</p>
            <a href="#" class=" button-primary button input agregar-carrito" data-id="${producto.dataId}" >Agregar Al Carrito</a>
        `;
  
      lista.append(li);
    });
  }catch (error){
    console.log(error);
  }
}

traerProductos();
