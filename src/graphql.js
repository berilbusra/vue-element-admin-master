import gql from 'graphql-tag'

export const ALL_CUISINES_QUERY = gql`query{
  cuisines{
    id
    name
    icon
    order
      restaurants{
        id
        name
        address
    }
  }
}`

export const UPDATECUISINE_MUTATION = gql`
  mutation UpdateCuisine($name: String, $icon: String, $order: Int, $id: Int!) {
    createUser(
      name: $name,
      icon: $icon,
      order: $order,
      id:$id
    ) {
      id
      name
      order
      icon
    }
  }
`

