import { defineComponent } from "vue";

export const App = defineComponent({
  setup() {
    return () => (
      <>
        <header>
          导航
          <ul>
            <li>
              <router-link to="/">Foo</router-link>
            </li>
            <li>
              <router-link to="/about">bar</router-link>
            </li>
          </ul>
        </header>
        <div>
          <routerView></routerView>
        </div>
        <footer>页脚</footer>
      </>
    );
  },
});
