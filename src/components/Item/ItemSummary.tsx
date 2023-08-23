import { defineComponent, PropType, ref } from "vue";

// import s from './ItemSummary.module.scss';

export const ItemSummary = defineComponent({
  props: {
    startData: {
      type: String as PropType<string>,
      required: true,
    },
    endData: {
      type: String as PropType<string>,
      required: true,
    }
  },
  setup: (props, content) => {
    return () => (
     <div>summary</div>
    );
  },
});