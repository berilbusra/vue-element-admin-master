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

export const CREATE_CUISINE_MUTATION = gql`
  mutation createCuisine($name: String!, $icon: String!, $order: Int!, $id: Int!) {
    createCuisine(
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

export const UPDATE_CUISINE_MUTATION = gql`
  mutation updateCuisine($name: String!, $icon: String!, $order: Int!, $id: Int!) {
    updateCuisine(
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

export const DELETE_CUISINE_MUTATION = gql`
  mutation deleteCuisine($id:Int!){
    deleteCuisine(id:$id){
      cuisine{
        id
      }
    }
  }
`

export const ALL_MENUS_QUERY = gql`query{
  menus {
    id
    name
    description
    language
    restaurants {
      name
    }
    approveStatus
  }
}`

export const CREATE_MENU_MUTATION = gql`
  mutation createMenu( $id: Int!, $name: String!, $description: String!, $language: LanguageCodes, $approveStatus: ApproveStatuses) {
    createMenu(
      id:$id,
      name: $name,
      description: $description,
      language: LanguageCodes,
      approveStatus: ApproveStatuses      
    ) {
      id
      name
      description
      language
      approveStatus
    }
  }
`

export const UPDATE_MENU_MUTATION = gql`
  mutation updateMenu( $id: Int!, $name: String!, $description: String!, $language: LanguageCodes, $approveStatus: ApproveStatuses) {
    updateMenu(
      id:$id,
      name: $name,
      description: $description,
      language: LanguageCodes,
      approveStatus: ApproveStatuses      
    ) {
      id
      name
      description
      language
      approveStatus
    }
  }
`

export const DELETE_MENU_MUTATION = gql`
  mutation deleteMenu($id:Int!){
    deleteMenu(id:$id){
      menu{
        id
      }
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser( $id: ID!,$firstName: String!,$lastName: String!,,$email: String!,$password: String!){
    updateUSer(
      id:$id,
      firstName:$firstName,
      lastName:$lastName,
      email:$email,
      password:$password
    ){
      id
      firstName
      lastName
      email
      password
    }
  }
`
