import { defineComponent, PropType, ref } from "vue";
import s from "./InputPad.module.scss";
import { Icon } from "../../shared/Icon";
import { Popup, DatePicker } from "vant";
import { Time } from '../../shared/time';

export const InputPad = defineComponent({
  props: {
    happenAt: {
      type: String as PropType<string>,
    },
    amount: {
      type: Number as PropType<number>,
    },
    onSubmit: {
      type: Function as PropType<() => void>
    }
  },
  emits: ['update:happenAt', 'update:amount'],
  setup: (props, context) => {

    // const refAmount = ref(props.amount || '0'); //金额
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : '0')


    const refDatePickerVisible = ref(false); //日期选择器是否显示

    const currentDate = ref<string[]>([]);//当前日期
    // const currentDate = ref(props.happenAt!.split('T')[0].split("-"));//当前日期


    // 显示日期选择器
    const showDatePicker = () => refDatePickerVisible.value = true;

    // 隐藏日期选择器
    const hideDatePicker = () => refDatePickerVisible.value = false;

    // 设置当前时间
    const setDate = ({ selectedValues }: { selectedValues: string[] }) => {
      const dateStr = selectedValues.join('-')
      context.emit('update:happenAt', new Date(dateStr).toISOString())
      hideDatePicker()
    }

    // 获取当前时间
    const getCurrentDate = (date: string) => {
      currentDate.value = date.split('T')[0].split("-")
    }

    getCurrentDate(props.happenAt!)


    //输入金额
    const appendText = (n: number | string) => {
      // 1、情况1：0开头的数字，只能输入一次0
      if (n.toString() === "0" && refAmount.value === "0") return;
      // 2、情况2：小数点，只能输入一次
      if (n.toString() === "." && refAmount.value.includes(".")) return;
      // 3、情况3：小数点后面只能输入两位
      if (
        refAmount.value.includes(".") &&
        refAmount.value.split(".")[1].length >= 2
      )
        return;
      // 4、情况4：如果第一位是0，后面输入数字，不再显示0
      if (refAmount.value === "0") {
        refAmount.value = n.toString();
        return;
      }
      refAmount.value += n.toString();
    };

    // 按键
    const buttons = [
      { text: '1', onClick: () => { appendText(1) } },
      { text: '2', onClick: () => { appendText(2) } },
      { text: '3', onClick: () => { appendText(3) } },
      { text: '4', onClick: () => { appendText(4) } },
      { text: '5', onClick: () => { appendText(5) } },
      { text: '6', onClick: () => { appendText(6) } },
      { text: '7', onClick: () => { appendText(7) } },
      { text: '8', onClick: () => { appendText(8) } },
      { text: '9', onClick: () => { appendText(9) } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: '0', onClick: () => { appendText(0) } },
      { text: '清空', onClick: () => { refAmount.value = '0' } },
      {
        text: '提交',
        onClick: () => {
          context.emit('update:amount', parseFloat(refAmount.value) * 100)
          props.onSubmit?.()
        }
      }
    ];

    return () => (
      <div class={s.wrapper}>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="logo" class={s.icon}></Icon>
            <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
            <Popup
              v-model:show={refDatePickerVisible.value}
              position={"bottom"}
            >
              <DatePicker
                v-model={currentDate.value}
                modelValue={props.happenAt}
                type="data"
                title="选择年月日"
                onConfirm={setDate} onCancel={hideDatePicker}
              />
            </Popup>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
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
