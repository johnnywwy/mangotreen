import { defineComponent } from 'vue'
import { Center } from './Center'
import s from './ComingSoon.module.scss'
import { Icon } from './Icon'
export const ComingSoon = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <Center class={s.logo_wrapper}>
          <Icon name="logo" class={s.logo} />
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    )
  }
})