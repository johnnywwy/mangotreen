import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";

export const SkipFeatures = defineComponent({
  setup: () => {
    const onClick = () => {
      localStorage.setItem('skipFeatures', 'yes')
    }
    return () => (
      <span onClick={onClick}>
        <RouterLink to='/start'>跳过</RouterLink>
      </span>
    );
  },
});