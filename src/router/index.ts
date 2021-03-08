import { createWebHistory, createRouter } from "vue-router";
import home from "../pages/home.vue";
import characters from "../pages/characters.vue";
import about from "../pages/about.vue";
import character from "../pages/character.vue";
import todo from "../pages/todo.vue";
import contacts from "../pages/contacts.vue";

const routes = [
  {
    path: "/vue3-app/",
    name: "home",
    component: home,
  },
  {
    path: "/vue3-app/characters",
    name: "characters",
    component: characters,
  },
  {
    path: "/vue3-app/about",
    name: "about",
    component: about,
  },
  {
    path: "/vue3-app/todo",
    name: "todo",
    component: todo,
  },
  {
    path: "/vue3-app/contacts",
    name: "contacts",
    component: contacts,
  },
  {
    path: "/vue3-app/character:paramsId",
    name: "character",
    component: character,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
