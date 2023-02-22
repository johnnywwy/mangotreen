import { defineComponent, ref } from "vue";

export const second = defineComponent({
  setup() {
    return () => (
      <>
        <div>second</div>
      </>
    );
  },
});