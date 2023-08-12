const socket = io();
const content = document.getElementById("content");

socket.on("realTimeProducts", (data) => {
    let salida = ``;

    data.forEach(item => {
        salida += `<div class="col-md-4">
            <div class="card border-0 mb-3">
                <img src="${item.thumbnails}" class="img-fluid" alt="${item.title}">
                <div class="card-body text-center">
                    <p class="card-text">${item.title}<br><span class="text-success">$${item.price}</span></p>
                </div>
            </div>
        </div>`;
    });

    content.innerHTML = salida;
});

const agregarProducto = () => {
    const title = document.getElementById("title").value;
    const thumbnails = document.getElementById("thumbnails").value;
    const price = document.getElementById("price").value;
    const product = {title:title, thumbnails:thumbnails, price:price};

    socket.emit("nuevoProducto", product);
}

const btnAgregarProducto = document.getElementById("btnAgregarProducto");
btnAgregarProducto.onclick = agregarProducto;

const eliminarProducto = () => {
    const idProduct = document.getElementById("idProduct").value;

    socket.emit("eliminarProducto", idProduct);
}

const btnEliminarProducto = document.getElementById("btnEliminarProducto");
btnEliminarProducto.onclick = eliminarProducto;