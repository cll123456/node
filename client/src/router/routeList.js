import store from './../store'

export const routes = [
    {
        name: 'home',
        path: '/',
        component: () => import('./../views/home.vue')
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('./../views/login.vue'),

    }, {
        name: 'protect',
        path: '/protect',
        component: () => import('./../views/protect.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.userModule.data && !localStorage.getItem('data')) {
                next('/login')
            } else {
                next();
            }
            return false
        },
    },
]
