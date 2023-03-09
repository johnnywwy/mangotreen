import { RouteRecordRaw } from "vue-router";

import { welcome } from "../views/Welcome";

import { First } from "../components/welcome/First";
import { FirstActions } from "../components/welcome/FirstActions";

import { Second } from "../components/welcome/Second";
import { SecondActions } from "../components/welcome/SecondActions";

import { Third } from "../components/welcome/Third";
import { ThirdActions } from "../components/welcome/ThirdActions";

import { Forth } from "../components/welcome/Forth";
import { ForthActions } from "../components/welcome/ForthActions";

import { Start } from "../views/Start";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: welcome,
    children: [
      { path: "", redirect: "/welcome/1" },
      {
        path: "1",
        name: "First",
        components: { main: First, footer: FirstActions },
      },
      {
        path: "2",
        name: "Second",
        components: { main: Second, footer: SecondActions },
      },
      {
        path: "3",
        name: "Third",
        components: { main: Third, footer: ThirdActions },
      },
      {
        path: "4",
        name: "Forth",
        components: { main: Forth, footer: ForthActions },
      },
    ],
  },
  { path: "/start", component: Start, name: "start" },
];
