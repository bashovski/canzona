import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Player from "./pages/Player";

/**
 *
 * Middleware types:
 * 'auth' - accessible if and only if the user is authenticated.
 * 'no-auth' - represents that the route is accessible in case the user isn't authenticated (e.g. login route - cannot be accessed if logged in)
 * in case the middleware key is omitted, the route will be accessible by anyone.
 *
 * @type {*[]}
 */
const routes = [
    {name: 'Home', component: Home, path: '/'},
    {name: 'Login', component: Login, path: '/login', middleware: 'no-auth'},
    {name: 'Register', component: Register, path: '/register', middleware: 'no-auth'},
    {name: 'Player', component: Player, path: '/player', middleware: 'auth'}
];

const redirects = {
    'auth': '/login',
    'no-auth': '/'
};

export default {
    routes,
    redirects
};
