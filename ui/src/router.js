import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Player from "./pages/Player";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import MailSent from "./pages/MailSent";

/**
 *
 * Middleware types:
 * 'auth' - accessible if and only if the user is authenticated.
 * 'no-auth' - represents that the route is accessible in case the user isn't authenticated (e.g. login route - cannot be accessed if logged in)
 * in case the middleware key is omitted, the route will be accessible by anyone.
 *
 * navDisabled key:
 * responsible for displaying default navigation bar at the top of the page.
 *
 * @type {*[]}
 */
const routes = [
    {name: 'Landing', component: Landing, path: '/'},
    {name: 'Login', component: Login, path: '/login', middleware: 'no-auth'},
    {name: 'Register', component: Register, path: '/register', middleware: 'no-auth'},
    {name: 'Player', component: Player, path: '/player', middleware: 'auth', navDisabled: true},
    {name: 'Verify', component: Verify, path: '/verify/:key', middleware: 'auth', navDisabled: true},
    {name: 'ForgotPassword', component: ForgotPassword, path: '/forgotpassword', middleware: 'no-auth'},
    {name: 'MailSent', component: MailSent, path: '/mailsent'}
];

const isNavDisabled = (path) => {
    return routes.find((route) => route.navDisabled && route.path === path);
};

const redirectTo = (routeObj) => {
    const accessor = Object.keys(routeObj)[0];
    if(!accessor) throw `invalid object passed, refer to docs`;
    const val = routeObj[accessor];

    for(let i = 0; i < routes.length; i++) {
        if(routes[i][accessor] === val)
            return window.location = routes[i].path;
    }
    throw 'invalid accessor value';
};

export default {
    routes,
    isNavDisabled,
    redirectTo
};
