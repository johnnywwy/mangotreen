import { createApp } from "vue";
import { App } from "./App";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import { history } from "./shared/history";
import "@svgstore";
// 2. 引入组件样式
import 'vant/lib/index.css';
import { mePromise, fetchMe } from "./shared/me";

// 引入pinia
import { createPinia } from 'pinia'

const router = createRouter({ history, routes });
const pinia = createPinia()


fetchMe()

const whiteList: Record<'exac' | 'startsWith', string[]> = {
  'exac': ['/', '/start'],
  'startsWith': ['/welcome', '/sign_in']
}

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

  return mePromise.then(
    () => true,
    () => '/sign_in?redirect=' + to.path
  )

})
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount("#app")
