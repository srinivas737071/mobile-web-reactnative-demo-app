import Home from '../components/home';
import Login from '../components/login';

var routeNavigators = [
  {
    name: 'Login',
    path:'/',
    component: Login,
  },
  {
    name: 'Home',
    path:'/home',
    component: Home,
  },
];
export default routeNavigators;
