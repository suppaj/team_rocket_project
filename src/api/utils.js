export function combineCarts(localCart, dbCart) {
    const cart = [];
    for (let localitem of localCart) {
       let match = false;
        for (let dbitem of dbCart) {
            if (dbitem.prod_id === localitem.prod_id) {
                dbitem.cart_quantity += parseInt(localitem.cart_quantity);
                cart.push(dbitem);
                match=true
            } 
        }
        if (!match) { 
            cart.push(localitem);   
        }
    }
    for (let dbitem of dbCart) {
        let match = false;
        for (let item of cart) {
            if (dbitem.prod_id === item.prod_id) {
                match = true
            }
        }
        if (!match) {
            cart.push(dbitem);
        }
    }
    console.log('combined cart', cart)
    return cart;
}