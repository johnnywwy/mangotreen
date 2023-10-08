import { createApp } from "vue";
import { createPinia } from 'pinia'
import { App } from "./App";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import { history } from "./shared/history";
import "@svgstore";
// 2. 引入组件样式
import 'vant/lib/index.css';
import { useMeStore } from "./store/use";

// 引入pinia

const router = createRouter({ history, routes });
const pinia = createPinia()



const whiteList: Record<'exac' | 'startsWith', string[]> = {
  'exac': ['/', '/start'],
  'startsWith': ['/welcome', '/sign_in']
}


const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");



const meStore = useMeStore()

meStore.fetchMe()


router.beforeEach((to, from) => {
  for (let key in whiteList) {
    if (key === 'exac') {
      if (whiteList[key].includes(to.path)) {
        return true;
      }
    }
    if (key === 'startsWith') {
      if (whiteList[key].some(path => to.path.startsWith(path))) {
        return true;
      }
    }
  }

  return meStore.mePromise!.then(
    () => true,
    () => '/sign_in?redirect=' + to.path
  )
})