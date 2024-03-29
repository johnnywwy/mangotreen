import { DatePicker, Popup } from "vant";
import { computed, defineComponent, PropType, ref } from "vue";
import { Button } from "./Button";
import { EmojiSelected } from "./EmojiSelected";
import s from "./Form.module.scss";
import { Time } from "./time";

export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
    // onCancel: {
    //   type: Function as PropType<(e: Event) => void>,
    // }
  },
  setup: (props, content) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {content.slots.default?.()}
      </form>
    );
  },
});

export const FormItem = defineComponent({
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: [String]
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode' | 'select'>,
    },
    error: {
      type: String
    },
    border: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    options: Array as PropType<Array<{ value: string, text: string }>>,
    onClick: Function as PropType<() => void>,
    countForm: {
      type: Number,
      default: 60
    },
    disabled: Boolean
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false)

    const timer = ref<number>()
    const count = ref<number>(props.countForm)

    const isCounting = computed(() => !!timer.value)
    const currentDate = ref()

    const startCount = () => {
      timer.value = setInterval(() => {
        count.value -= 1
        if (count.value === 0) {
          clearInterval(timer.value)
          timer.value = undefined
          count.value = props.countForm
        }
      }, 1000)
    }

    context.expose({ startCount })

    // 获取当前时间
    const getCurrentDate = (date: string) => {
      return date.split("-")
    }
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            placeholder={props.placeholder}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input]} />
        case 'emojiSelect':
          return <EmojiSelected
            modelValue={props.modelValue?.toString()}
            onUpdateModelValue={value => context.emit('update:modelValue', value)}
            class={[s.formItem, s.emojiList]} />
        case "validationCode":
          return <>
            <input
              onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
              class={[s.formItem, s.input, s.validationCodeInput]}
              placeholder={props.placeholder} />
            <Button disabled={isCounting.value || props.disabled} onClick={props.onClick} class={[s.formItem, s.button, s.validationCodeButton]}>
              {isCounting.value ? `${count.value}秒后重置` : '发送验证码'}
            </Button>
          </>
        case 'select':
          return <select class={[s.formItem, s.select]} value={props.modelValue}
            onChange={(e: any) => { context.emit('update:modelValue', e.target.value) }}>
            {props.options?.map(option =>
              <option value={option.value}>{option.text}</option>
            )}
          </select>
        case 'date':
          return <>
            <input readonly={true} value={props.modelValue}
              onClick={() => { refDateVisible.value = true }}
              class={[s.formItem, s.input]} />
            {/* {props.modelValue} */}
            <Popup position='bottom' v-model:show={refDateVisible.value}
              closeOnClickOverlay={false}>
              <DatePicker
                modelValue={getCurrentDate(props.modelValue!)}
                type="date" title="选择年月日"
                onConfirm={({ selectedValues }: any) => {
                  const date = selectedValues.join('-')
                  context.emit('update:modelValue', new Time(date).format())
                  refDateVisible.value = false
                }}
                onCancel={() => refDateVisible.value = false} />
            </Popup>
          </>
        case undefined:
          return context.slots.default?.()
      }

    })

    return () => {
      return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={[
            s.formItem_value,
            props.error && [s.formItem_error, s.formItem_fuvk]]
          }>
            {content.value}
          </div>
          <div class={s.formItem_errorHint}>
            <span>{props.error ?? '　'}</span>
          </div>
        </label>
      </div>
    };
  },
});