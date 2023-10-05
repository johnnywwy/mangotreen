import { defineComponent, onMounted, PropType, ref } from "vue";
import s from "./OverLay.module.scss";
import { Icon } from "./Icon";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { mePromise } from "./me";
import { User } from "../type/tags";
import { Email } from "./Email";
import { Dialog, showConfirmDialog } from "vant";

export const OverLay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, content) => {
    const route = useRoute()
    const router = useRouter()
    const close = () => {
      props.onClose?.();
    };
    const onLoginOut = async () => {
      const res = await showConfirmDialog({
        title: '确认',
        message:
          '是否退出登录?',
      })
      if (res !== 'confirm') return

      localStorage.removeItem('jwt')
      router.push('/sign_in')
    };

    const me = ref<User>()

    onMounted(async () => {
      const response = await mePromise
      me.value = response.data.resource
    })

    return () => (
      <div>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {
              me.value ?
                <div>
                  <h2>用户：<Email value={me.value.email} /></h2>
                  <br />
                  <p onClick={onLoginOut}>点击这里退出登录</p>
                </div> :
                <RouterLink to={`/sign_in?redirect=${route.fullPath}`}>
                  <h2>未登录用户</h2>
                  <br />
                  <p>点击这里进行登录</p>
                </RouterLink>
            }

          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statisticsPage" class={s.action}>
                  <Icon name="statistics" class={s.icon} />
                  <span>统计图表</span>
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
        </div >
      </div >
    );
  },
});
