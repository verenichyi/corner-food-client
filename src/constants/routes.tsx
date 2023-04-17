enum RoutesList {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  Home = '/',
  Favorite = '/favorite',
  Notification = '/notification',
  Account = '/profile/account',
  Payment = '/profile/payment',
  History = '/profile/history',
  FoodDetails = '/food-details',
  NOT_FOUND = '*',
}

export const profileNavBarItems = [
  {
    link: RoutesList.Account,
    content: 'Account',
  },
  {
    link: RoutesList.Payment,
    content: 'Payment',
  },
  {
    link: RoutesList.History,
    content: 'History',
  },
];

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
      link: RoutesList.Account,
      iconId: 'user',
    },
  ],
};

export default RoutesList;
