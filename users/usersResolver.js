const db = require('../db')
const uuid = require('uuid')

const Query = {
    users: () => db.users.list(),
}

const Mutation = {

    /*
    mutation{
        createUser(firstName: "Eloi", lastName: "Peloux", role: "Developper"){
            userToken,
            firstName,
            lastName,
            role
        }
    }
    */
    createUser: (root, args, context, info) => {
        let userObj = db.users;
        const newUser = {
            userToken: uuid.v4(),
            firstName: args.firstName,
            lastName: args.lastName,
            role: args.role,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        }
        userObj.create(newUser);
        return newUser
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
    updateUser: (root, args, context, info) => {
        let userList = db.users;
        let userData = userList.get(args.id)
        console.log(userData);
        userList.update({
            id: args.id,
            userToken: userData.userToken,
            firstName: args.firstName ?? userData.firstName,
            lastName: args.lastName ?? userData.lastName,
            role: args.role ?? userData.role,
            created_at: userData.created_at,
            updated_at: new Date().toLocaleString()
        });
        return userList.list()
    },

    /*
    mutation{
        deleteUser(id: "BypLAKUHq"){
            id
        }
    }
    */

    deleteUser: (root, args, context, info) => {
        let userList = db.users;
        userList.delete(args.id);
        return userList.list()
    }
}
module.exports = {
    Query,
    Mutation
}