import './App.css';
import MovieApp from "./components/MovieApp";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://tmdb.sandbox.zoosh.ie/dev/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MovieApp />
      </div>
    </ApolloProvider>
  );
}

export default App;
