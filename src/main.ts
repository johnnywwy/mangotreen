import { createApp } from "vue";
import { App } from "./App";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import { history } from "./shared/history";
import "@svgstore";
// 2. 引入组件样式
import 'vant/lib/index.css';
import { http } from "./shared/Http";
import { mePromise, fetchMe } from "./shared/me";
const router = createRouter({ history, routes });


fetchMe()

const whiteList: Record<'exac' | 'startsWith', string[]> = {
  'exac': ['/', '/start'],
  'startsWith': ['/welcome', '/sign_in']
}

router.beforeEach(async (to, from) => {

  for (let key in whiteList) {
    console.log('key', key);
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
const app = createApp(App);
app.use(router);
app.mount("#app");
