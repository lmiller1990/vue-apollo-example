const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    title: 'tttThe Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!): Book
  }
`;

const ctx = {
  books
}

const resolvers = {
  Query: {
    books: (obj, arg, ctx) => ctx.books,
  },
  Mutation: {
    addBook: (obj, arg, ctx) => {
      ctx.books.push({
        title: arg.title,
        author: 'blah'
      })
      return books[books.length - 1]
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: ctx });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
