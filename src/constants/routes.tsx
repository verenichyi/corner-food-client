enum RoutesList {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  Home = '/',
  Favorite = '/favorite',
  Notification = '/notification',
  Profile = '/profile',
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

export const appNavBarItems = {
  left: [
    {
      link: RoutesList.Home,
      iconId: 'home',
    },
    {
      link: RoutesList.Favorite,
      iconId: 'book',
    },
  ],
  right: [
    {
      link: RoutesList.Notification,
      iconId: 'bell',
    },
    {
      link: RoutesList.Profile,
      iconId: 'user',
    },
  ],
};

export default RoutesList;
