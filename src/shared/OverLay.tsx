import { defineComponent, PropType } from "vue";
import s from "./OverLay.module.scss";
import { Icon } from "./Icon";

export const OverLay = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    return () => (
      <div class={s.wrapper}>
        <section>
          <h2>未登录用户</h2>
          <p>点击这里进行登录</p>
        </section>
        <nav>
          <ul>
            <li>
              <Icon name="statistics"></Icon>
              <span>统计图表</span>
            </li>
            <li>
              <Icon name="export"></Icon>
              <span>导出数据</span>
            </li>
            <li>
              <Icon name="notice"></Icon>
              <span>记账提醒</span>
            </li>
          </ul>
        </nav>
      </div>
    );
  },
});
