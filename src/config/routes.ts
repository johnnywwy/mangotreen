import { RouteRecordRaw } from "vue-router";

import { welcome } from "../views/Welcome";

import { First } from "../components/welcome/First";
import { FirstActions } from "../components/welcome/FirstActions";

import { Second } from "../components/welcome/Second";
import { SecondActions } from "../components/welcome/SecondActions";

import { Third } from "../components/welcome/Third";
import { ThirdActions } from "../components/welcome/ThirdActions";

import { Fourth } from "../components/welcome/Fourth";
import { FourthActions } from "../components/welcome/FourthActions";

import { StartPage } from "../views/StartPage";
import { ItemPage } from "../views/ItemPage";
import { ItemList } from "../components/item/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";

import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { TagPage } from "../views/TagPage";

import { SignInPage } from '../views/SignInPage'
import { StatisticsPage } from "../views/StatisticsPage";
import { http } from "../shared/Http";
import { ComingSoon } from "../shared/ComingSoon";

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
        components: { main: Fourth, footer: FourthActions },
      },
    ],
  },
  { path: "/start", component: StartPage, name: "start" },
  {
    path: "/item",
    component: ItemPage,
    children: [
      { path: "", component: ItemList, name: "ItemList" },
      { path: "create", component: ItemCreate, name: "ItemCreate" },
    ],
  },
  {
    path: "/tag",
    component: TagPage,
    redirect: '/tag/create',
    children: [
      { path: ":id/edit", component: TagEdit, name: "TagEdit" },
      { path: "create", component: TagCreate, name: "TagCreate" },
    ],
  },
  {
    path: "/sign_in",
    component: SignInPage
  },
  {
    path: "/statisticsPage",
    component: StatisticsPage
  },
  {
    path: '/export', component: ComingSoon
  }, {
    path: '/notify', component: ComingSoon
  }
];
