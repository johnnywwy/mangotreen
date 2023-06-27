import { defineComponent, PropType } from "vue";
import s from "./InputPad.module.scss";
import { Icon } from "../../shared/Icon";

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    const buttons = [
      { text: "1", onClick: () => {} },
      { text: "2", onClick: () => {} },
      { text: "3", onClick: () => {} },
      { text: "清空", onClick: () => {} },
      { text: "4", onClick: () => {} },
      { text: "5", onClick: () => {} },
      { text: "6", onClick: () => {} },
      { text: "删除", onClick: () => {} },
      { text: "7", onClick: () => {} },
      { text: "8", onClick: () => {} },
      { text: "9", onClick: () => {} },
      { text: "确定", onClick: () => {} },
      { text: "0", onClick: () => {} },
      { text: ".", onClick: () => {} },
    ];
    return () => (
      <div class={s.wrapper}>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="logo" class={s.icon}></Icon>
            <span>2023-06-24</span>
          </span>
          <span class={s.amount}>4999.23</span>
        </div>
        <div class={s.buttons}>
          {buttons.map((item) => (
            <button onClick={item.onClick}>{item.text}</button>
          ))}
        </div>
      </div>
    );
  },
});
