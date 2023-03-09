import { defineComponent, FunctionalComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useSwipe } from "../../hooks/useSwipe";
import s from "./Welcome.module.scss";

export const First = defineComponent({
  setup() {
    const div = ref<HTMLDivElement>();
    const { swiping, direction } = useSwipe(div, {
      beforeStart: (e) => e.preventDefault(),
    });
    const router = useRouter();
    watchEffect(() => {
      if (swiping.value && direction.value === "left") {
        console.log("123456");

        router.push("/welcome/2");
      }
    });
    return () => (
      <div class={s.card} ref={div}>
        <svg>
          <use xlinkHref="#pig"></use>
        </svg>
        <h2 class={s.text}>
          会挣钱 <br />
          还会省钱
        </h2>
      </div>
    );
  },
});
