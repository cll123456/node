import {createRouter, createWebHistory} from 'vue-router'
import {routes} from "./routeList";

const router = createRouter({
    // use history mode router
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export {router}
