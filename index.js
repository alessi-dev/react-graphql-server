const { GraphQLServer } = require('graphql-yoga');

const messages = [];

const typeDefs = `
    type Message {
        id: ID!,
        user: String!,
        content: String!
    }

    type Query {
        messages: [Message!]
    }
    
    type Mutation {
        postMessage(user: String!, content: String!): Message!
    }
`

const resolvers = {
    Query: {
        messages: () => messages,
    },
    Mutation: {
        postMessage: (parent, {user, content}) => {
            const id = messages.length + 1;
            messages.push({
                id,
                user,
                content,
            });
            return {
                id: id,
                user: user,
                content: content,
            };
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({port}) => {
    console.log(`Server on http://localhost:${port}/`);
});