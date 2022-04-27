const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs')

const { makeExecutableSchema } = require('graphql-tools')
const { mergeResolvers } = require('@graphql-tools/merge')

// SERVER
const port = process.env.PORT || 9000;
const app = express();

// RESOLVERS
const usersResolver = require('./users/usersResolver')
const productsResolver = require('./products/productsResolver')
const arrayResolvers = [usersResolver, productsResolver]
const resolvers = mergeResolvers(arrayResolvers)

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' })
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors(), bodyParser.json());

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);