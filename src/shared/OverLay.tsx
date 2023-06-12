import { defineComponent, PropType } from "vue";
import s from "./OverLay.module.scss";
import { Icon } from "./Icon";
import { RouterLink } from "vue-router";

export const OverLay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, content) => {
    const close = () => {
      props.onClose?.();
    };
    const onClickSignIn = () => {};

    return () => (
      <div>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser} onClick={onClickSignIn}>
            <h2>未登录用户</h2>
            <p>点击这里进行登录</p>
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="statistics" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notice" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  },
});