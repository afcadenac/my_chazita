

export const getFilteredProducts = (filter={},productFilter=[]) => {

    if(filter.name.length>0){
        console.log(filter.name);
        productFilter=productFilter.filter((product)=>{
            if(product.name.toLowerCase().includes(filter.name.toLowerCase())===true){
                return product;
            }
        });
    }

    switch (filter.order) {
        case "Ascendente":
            productFilter=productFilter.sort((x, y) => x.name.localeCompare(y.name));
            break;

        case "descendente":
            productFilter=productFilter.sort((x, y) => x.name.localeCompare(y.name)).reverse();
            break;
    
        default:
            break;
    }

    switch (filter.price) {
        case "menor a 1000":
            productFilter=productFilter.filter((product)=>product.price<1000);
            break;

        case "entre 1000 y 3000":
            productFilter=productFilter.filter((product)=>product.price>=1000 && product.price<=3000);
            break;

        case "entre 3000 y 5000":
            productFilter=productFilter.filter((product)=>product.price>=3000 && product.price<=5000);
            break;

        case "entre 5000 y 10000":
            productFilter=productFilter.filter((product)=>product.price>=5000 && product.price<=10000);
            break;

        case "mayor a 10000":
            productFilter=productFilter.filter((product)=>product.price>10000);
            break;
    
        default:
            break;
    }


    switch (filter.type) {
        case "bebida":
            productFilter=productFilter.filter((product)=>product.type==="bebida");
            break;

        case "comida":
            productFilter=productFilter.filter((product)=>product.type==="comida");
            break;

        case "servicio":
            productFilter=productFilter.filter((product)=>product.type==="servicio");
            break;

        case "otro":
            productFilter=productFilter.filter((product)=>product.type==="otro");
            break;
    
        default:
            break;
    }

    switch (filter.stock) {
        case "0 elementos":
            productFilter=productFilter.filter((product)=>product.stock===0);
            break;

        case "entre 1 y 5 elementos":
            productFilter=productFilter.filter((product)=>product.stock>=1 && product.stock<=5);
            break;

        case "entre 5 y 10 elementos":
            productFilter=productFilter.filter((product)=>product.stock>=5 && product.stock<=10);
            break;

        case "entre 10 y 20 elementos":
            productFilter=productFilter.filter((product)=>product.stock>=10 && product.stock<=20);
            break;

        case "mas 20 elementos":
            productFilter=productFilter.filter((product)=>product.stock>20);
            break;
    
        default:
            break;
    }

    return productFilter;
}
