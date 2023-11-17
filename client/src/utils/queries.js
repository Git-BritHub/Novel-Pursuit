import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
    query me($_id: ID!, $username: String!) {
        me(_id: $_id, username: $username ) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;