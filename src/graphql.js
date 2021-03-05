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
  mutation createCuisine($data: CreateCuisineInput!) {
    createCuisine(data: $data) {
      cuisine{
        id
        name
        icon
        order
      }
    }
  }
`

export const UPDATE_CUISINE_MUTATION = gql`
  mutation updateCuisine($data: UpdateCuisineInput!) {
    updateCuisine(data: $data) {
      cuisine{
        id
        name
        icon
        order
      }
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
  mutation createMenu( $data: CreateMenuInput! ) {
    createMenu(
      data: $data    
    ) {
      menu{
        id  
        name
        description
        order
        restaurants{
          name
        }
        photo
      }
    }
  }
`

export const UPDATE_MENU_MUTATION = gql`
  mutation updateMenu($data: UpdateMenuInput!) {
  updateMenu(data: $data) {
    menu {
      id
      name
      description
      order
      restaurants{
        name
      }
      photo
    }
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
