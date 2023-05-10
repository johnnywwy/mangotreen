import { defineComponent,PropType } from "vue";
import s from './ItemCreate.module.scss';

export const ItemCreate = defineComponent({
  props:{ 
   name:{ 
       type:String as PropType<string>,
     },
   },
  setup: (props, content) => {
    return () => (<div class={s.wrapper}>hh</div>);
  },
});