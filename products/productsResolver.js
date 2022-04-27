const db = require('../db')
const uuid = require('uuid')

const Query = {
    products: () => db.products.list(),
}

const Mutation = {

    /*
    mutation{
        createProduct(name: "Marteau", description: "Enfonce des clous", reference: "MART0", prix: 10, stock: 75){
            productToken,
            name,
            description,
            reference,
            prix,
            stock
        }
    }
    */
    createProduct: (root, args, context, info) => {
        let productObj = db.products;
        const newProduct = {
            productToken: uuid.v4(),
            name: args.name,
            description: args.description,
            reference: args.reference,
            prix: args.prix,
            stock: args.stock,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        }
        productObj.create(newProduct);
        return newProduct
    },

    /*
    mutation{
        updateUser(id: "BypLAKUHq", firstName: "UpdateTest2", lastName: "UpdateTest", role: "UpdateTest"){
            userToken,
            firstName,
            lastName,
            role,
            created_at,
            updated_at
        }
    }
    */
    updateProduct: (root, args, context, info) => {
        let productList = db.products;
        let productData = productList.get(args.id)
        productList.update({
            id: args.id,
            productToken: productData.productToken,
            name: args.name ?? productData.name,
            description: args.description ?? productData.description,
            reference: args.reference ?? productData.reference,
            prix: args.prix ?? productData.prix,
            stock: args.stock ?? productData.stock,
            created_at: productData.created_at,
            updated_at: new Date().toLocaleString()
        });
        return productList.list()
    },

    deleteProduct: (root, args, context, info) => {
        let productList = db.products;
        productList.delete(args.id);
        return productList.list()
    }
}
module.exports = {
    Query,
    Mutation
}