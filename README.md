# Projet API - GraphQL

Ce projet a été réalisé par Eloi PELOUX, étudiant en Master 2 à WebTech Bordeaux. Il a été découpé en module par fonctionnalité, soit un resolver pour les *Users* et un pour les *Products*.

Les langages utilisés sont le GraphQL, Node, avec un serveur Express (apollo).

## Initialisation

Ouvrer votre terminal.

Clonez le projet.

Lancez l'installation du projet.
> `npm i --legacy-peer-deps`

L'option `--legacy-pee-deps` empêche certaines fonctionnalité de bloquer l'installation.

Deux options s'offrent à vous :

- Vous pouvez vous rendre sur l'adresse suivante `http://localhost:9000/graphql` pour tester les différentes requêtes via **Postman**
- `http://localhost:9000/graphiql` vous permet d'avoir l'interface **Graphiql**, pour exécuter l'ensemble des requêtes GraphQL

## Requêtes

Il est possible de faire les manipulations classiques d'un CRUD.

### Users

Visualiser l'ensemble des utilisateurs 
```
{ users
  {
    firstName,
    lastName,
    role
  }
}
```

Créer un nouveau utilisateur
```
mutation {
  createUser(firstName: "Eloi", lastName: "Peloux", role: "Développeur"){
    userToken,
    firstName,
    lastName,
    role,
    created_at,
  }
}
```
    
Éditer un utilisateur (vous pouvez update l'ensemble des champs excepté l'id, le token et les dates)
```
mutation {
  updateUser(id: "123", firstName: "Eloi updated", lastName: "Peloux", role: "Développeur"){
    userToken,
    firstName,
    lastName,
    role,
    updated_at,
  }
}
```
    
Supprimer un utilisateur
```
mutation {
  deleteUser(id: "123"){
    firstName,
    lastName,
    role
  }
}
```

### Products

Visualiser l'ensemble des produits

>
```
{ products
  {
    name,
    description,
    prix,
    reference
  }
}
```

Créer un nouveau produit
```
mutation {
  createProduct(name: "monProduit", description: "Mon nouveau produit", reference: "ABC123", prix: 12, stock: 1){
    productToken,
    name,
    description,
    reference,
    prix,
    stock
  }
}
```
    
Éditer un produit (vous pouvez update l'ensemble des champs excepté l'id, le token et les dates)
```
mutation {
  updateProduct(id:"123", name: "monProduitUpdate", prix: 45){
    productToken,
    name,
    description,
    reference,
    prix
  }
}
```

Supprimer un produit
```
mutation {
  deleteProduct(id: "123"){
    name,
    description,
    reference
  }
 }
 ```
