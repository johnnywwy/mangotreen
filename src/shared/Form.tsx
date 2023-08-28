import { DatePicker, Popup } from "vant";
import { computed, defineComponent, PropType, ref } from "vue";
import { EmojiSelected } from "./EmojiSelected";
import s from "./Form.module.scss";
import { Time } from "./time";

export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    }
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
        type: [String, Number]
      },
      type: {
        type: String as PropType<'text' | 'emojiSelect' | 'date'>,
      },
      error: {
        type: String
      },
      border: {
        type: Boolean,
        default: true
      }
  },
  setup: (props, context) => {
    const refDateVisible= ref(false)
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input]} />
        case 'emojiSelect':
          return <EmojiSelected
            modelValue={props.modelValue?.toString()}
            onUpdateModelValue={value => context.emit('update:modelValue', value)}
            class={[s.formItem]} />
        case 'date':
          return <>
           <input readonly={true} value={props.modelValue}
              onClick={() => { refDateVisible.value = true }}
              class={[s.formItem, s.input]} />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatePicker value={props.modelValue} type="date" title="选择年月日"
                onConfirm={(date: Date) => {
                  console.log(new Time(date));
                  // context.emit('update:modelValue', new Time(date).format())
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
           {/* {props.error == '' ? '1' : '2'} */}
           <div class={[
            s.formItem_value, 
            props.border && s.formItem_value_error, 
            props.error && s.fuvk]
            }>
             {content.value}
           </div>
           {
             <div class={s.formItem_errorHint}>
               <span>{props.error}</span>
             </div>
           }
         </label>
      </div>
    };
  },
});