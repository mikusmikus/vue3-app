import { createWebHistory, createRouter } from "vue-router";
import home from "../pages/home.vue";
import characters from "../pages/characters.vue";
import about from "../pages/about.vue";
import character from "../pages/character.vue";
import todo from "../pages/todo.vue";
import contacts from "../pages/contacts.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/characters",
    name: "characters",
    component: characters,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/todo",
    name: "todo",
    component: todo,
  },
  {
    path: "/contacts",
    name: "contacts",
    component: contacts,
  },
  {
    path: "/character:id",
    name: "character",
    component: character,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
