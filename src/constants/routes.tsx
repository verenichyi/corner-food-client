enum RoutesList {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  Home = '/',
  NOT_FOUND = '*',
}

export const authNavBarItems = [
  {
    link: RoutesList.SIGN_IN,
    content: 'Login',
  },
  {
    link: RoutesList.SIGN_UP,
    content: 'Signup',
  },
];

export default RoutesList;
