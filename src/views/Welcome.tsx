import { defineComponent, ref, Transition, VNode, watchEffect } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";

import s from "./Welcome.module.scss";
import { useSwipe } from "../hooks/useSwipe";
import { throttle } from "../shared/throttle";

const pushMap: Record<string, string> = {
  First: "/welcome/2",
  Second: "/welcome/3",
  Third: "/welcome/4",
  Forth: "/start",
};
export const welcome = defineComponent({
  setup() {
    const main = ref<HTMLElement>();
    const { direction, swiping } = useSwipe(main, {
      beforeStart: (e) => e.preventDefault(),
    });
    const route = useRoute();
    const router = useRouter();

    const push = throttle(() => {
      const name = (route.name || "first").toString();
      router.replace(pushMap[name]);
    }, 500);

    watchEffect(() => {
      if (swiping.value && direction.value === "left") {
        console.log("下一页");
        push();
      }
    });
    return () => (
      <>
        <div class={s.wrapper}>
          <header>
            <svg>
              <use xlinkHref="#logo"></use>
            </svg>
            <h1>蛋黄记账</h1>
          </header>
          <main class={s.main} ref={main}>
            <RouterView name="main">
              {({
                Component: X,
                route: R,
              }: {
                Component: VNode;
                route: RouteLocationNormalizedLoaded;
              }) => (
                <Transition
                  enterFromClass={s.slide_fade_enter_from}
                  enterActiveClass={s.slide_fade_enter_active}
                  leaveToClass={s.slide_fade_leave_to}
                  leaveActiveClass={s.slide_fade_leave_active}
                >
                  {X}
                </Transition>
              )}
            </RouterView>
          </main>
          <footer>
            <RouterView name="footer" />
          </footer>
        </div>
      </>
    );
  },
});
