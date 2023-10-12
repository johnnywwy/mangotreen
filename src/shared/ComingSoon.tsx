import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from './Button'
import { Center } from './Center'
import s from './ComingSoon.module.scss'
import { Icon } from './Icon'
export const ComingSoon = defineComponent({
  setup: (props, context) => {
    const router = useRouter()
    const onClick = () => {
      router.back()
    }
    return () => (
      <div>
        <Center class={s.logo_wrapper}>
          <Icon name="logo" class={s.logo} />
        </Center>
        <p class={s.text}>敬请期待</p>
        <p class={s.button} >
          <Button onClick={onClick}>返回</Button>
        </p>
      </div>
    )
  }
})