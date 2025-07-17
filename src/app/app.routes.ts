import { Routes } from '@angular/router';
import {activateGuardGuard} from './guard/activate-guard-guard';
import { Home } from './components/pages/home/home';
import { SignIn } from './components/pages/sign-in/sign-in';
import { SignUp } from './components/pages/sign-up/sign-up';
import { Orders } from './components/pages/orders/orders';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';
import { Menu } from './components/pages/menu/menu';

export const routes: Routes = [
    {path: "home", component: Home, title: "Restaurant | Home"},
    {path: "orders", component: Orders, title: "Restaurant | Orders", canActivate: [activateGuardGuard]},
    {path: "menu", component: Menu, title: "Restaurant | Menu", canActivate: [activateGuardGuard]},
    {path: "sign-in", component: SignIn, title: "Restaurant | Sign In"},
    {path: "sign-up", component: SignUp, title: "Restaurant | Sign Up"},
    {path: '',redirectTo: "/home",pathMatch: 'full'},
    {path: '**',component: PageNotFound,title: 'Page Not Found 404 | SPA ',},

];
