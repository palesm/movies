import {gql} from "@apollo/client";

export const GET_MOVIES = gql`
    query SearchMovies($query: String!) {
        searchMovies(query: $query) {
            id
            name
            genres {
                id
                name
            }
            score
        }
    }
`;
