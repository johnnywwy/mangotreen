import { RouteRecordRaw } from "vue-router";

import { Foo } from "../views/Foo";
import { Bar } from "../views/Bar";
import { welcome } from "../views/Welcome";

import { first } from "../components/welcome/first";
import { second } from "../components/welcome/second";
import { third } from "../components/welcome/third";
import { forth } from "../components/welcome/forth";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Foo },
  { path: "/about", component: Bar },
  {
    path: "/welcome",
    component: welcome,
    children: [
      { path: "1", component: first },
      { path: "2", component: second },
      { path: "3", component: third },
      { path: "4", component: forth },
    ],
  },
];
