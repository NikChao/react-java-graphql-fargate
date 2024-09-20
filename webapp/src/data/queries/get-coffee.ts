import { gql } from '@apollo/client';

export const GET_COFFEE = gql`
  query GetCoffee {
    hotCoffee: coffee(type: HOT) {
      title
    }
    icedCoffee: coffee(type: ICED) {
      title
    }
  }
`;