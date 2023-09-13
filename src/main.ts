import { createApp } from "vue";
import { App } from "./App";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import { history } from "./shared/history";
import "@svgstore";
// 2. 引入组件样式
import 'vant/lib/index.css';
import { http } from "./shared/Http";
const router = createRouter({ history, routes });


const promise = http.get('/me')
router.beforeEach(async (to, from) => {
  if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path === '/start') {
    return true
  } else {
    const path = await promise.then(
      () => true,
      () => '/sign_in?redirect=' + to.path
    )
    return path
  }
})
const app = createApp(App);
app.use(router);
app.mount("#app");
