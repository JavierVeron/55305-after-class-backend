const createCart = async () => {
    try {
        if (!localStorage.getItem("cart")) {
            const response = await fetch("/api/carts/", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
            
            const data = await response.json();
            localStorage.setItem("cart", JSON.stringify(data));
        }
    } catch(error) {
        console.log("Error en Crear el Carrito! " + error);
    }
}

createCart();