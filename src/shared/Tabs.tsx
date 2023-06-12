import { defineComponent, PropType } from "vue";
import s from "./Tabs.module.scss";

export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<string>,
    },
    onUpdateSelected: {
      type: Function as PropType<(name: string) => void>,
    },
  },
  setup: (props, content) => {
    return () => {
      const tabs = content.slots.default?.();
      if (!tabs) return () => null;
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].type === "Tab") {
          throw new Error("<Tabs> 组件的子组件必须是 <Tab>");
        }
      }
      return (
        <div class={s.tabs}>
          <ol class={s.tabs_nav}>
            {tabs.map((item) => (
              <li
                class={item.props?.name === props.selected ? s.selected : ""}
                onClick={() => {
                  content.emit("update:selected", item.props?.name);
                  console.log("切换tabs了");
                }}
              >
                {item.props?.name}
              </li>
            ))}
          </ol>
          <div>{tabs.find((item) => item.props?.name === props.selected)}</div>
        </div>
      );
    };
  },
});

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    return () => <div>{content.slots.default?.()}</div>;
  },
});
