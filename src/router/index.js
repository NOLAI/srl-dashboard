import { createWebHistory, createRouter } from "vue-router";
// const ASSET_BASE_PATH = process.env.ASSET_URL || '';

const routes =  [
    {
        path: "/login",
        component: () => import('../components/LoginView.vue'),
    },
    {
        path: "/",
        component: () => import('../components/MainView.vue'),
    },

]

const router = createRouter({
    history: createWebHistory("/dashboard"),
    routes: routes,
    linkActiveClass: 'active'
})



export default router;