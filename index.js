const  ProductManager = require('./managers/ProductManager');

const manager = new ProductManager('./data/Products.json');

const productsManager = async () => {
    try {
        console.log("Primera consulta");
        let products = await manager.getProducts();
        console.log(products);
    
        console.log("Creando producto 1");
        const newProduct1 = {          
          title: "Hamburguesa",
          description: "Sencilla",
          price: 10000,
          thumbnail: "none",
          code: 132456,
          stock: 3
        };
        const product1Result = await manager.addProduct(newProduct1);
        console.log(product1Result);
    
        console.log("Segunda consulta");
        products = await manager.getProducts();
        console.log(products);
    
        console.log("Creando producto 2");
        const newProduct2 = {          
          title: "Hamburguesa",
          description: "Doble",
          price: 16000,
          thumbnail: "none",
          code: 132457,
          stock: 12
        };
        const product2Result = await manager.addProduct(newProduct2);
        console.log(product2Result);
    
        console.log("Tercera consulta");
        products = await manager.getProducts();
        console.log(products);

        console.log("Creando producto 3");
        const newProduct3 = {          
          title: "Hamburguesa",
          description: "triple",
          price: 22000,
          thumbnail: "none",
          code: 132458,
          stock: 2
        };
        const product3Result = await manager.addProduct(newProduct3);
        console.log(product3Result);

        console.log("buscando producuto")
        const searchProduct01 = await manager.getProductById(2);
        console.log(searchProduct01);
        
      }
      catch(error) {
        console.log(error);
      }
    } 
    
    productsManager();