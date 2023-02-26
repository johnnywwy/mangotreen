import { RouteRecordRaw } from "vue-router";

import { welcome } from "../views/Welcome";

import { first } from "../components/welcome/first";
import { second } from "../components/welcome/second";
import { third } from "../components/welcome/third";
import { forth } from "../components/welcome/forth";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: welcome,
    children: [
      { path: "", redirect: "/welcome/1" },
      { path: "1", component: first },
      { path: "2", component: second },
      { path: "3", component: third },
      { path: "4", component: forth },
    ],
  },
];
