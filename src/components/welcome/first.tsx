import { defineComponent, ref } from "vue";

export const first = defineComponent({
  setup() {
    return () => (
      <>
        <div>first</div>
      </>
    );
  },
});
