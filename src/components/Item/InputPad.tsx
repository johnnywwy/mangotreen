import { defineComponent, PropType, ref } from "vue";
import s from "./InputPad.module.scss";
import { Icon } from "../../shared/Icon";
import dayjs from "dayjs";
import { Button, Popup, DatePicker } from "vant";
import type { DatePickerProps, DatePickerColumnType } from "vant";

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    const today = ref(dayjs().format("YYYY-MM-DD"));
    const refDatePickerVisible = ref(false); //日期选择器是否显示
    //拆分年月日
    const { year, month, day } = {
      year: dayjs().format("YYYY"),
      month: dayjs().format("MM"),
      day: dayjs().format("DD"),
    };
    //获取当前日期
    const refDate = ref([year, month, day]);
    const refAmount = ref("0");
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
    const buttons = [
      {
        text: "1",
        onClick: () => {
          appendText(1);
        },
      },
      {
        text: "2",
        onClick: () => {
          appendText(2);
        },
      },
      {
        text: "3",
        onClick: () => {
          appendText(3);
        },
      },
      {
        text: "清空",
        onClick: () => {
          refAmount.value = "0";
        },
      },
      {
        text: "4",
        onClick: () => {
          appendText(4);
        },
      },
      {
        text: "5",
        onClick: () => {
          appendText(5);
        },
      },
      {
        text: "6",
        onClick: () => {
          appendText(6);
        },
      },
      {
        text: "删除",
        onClick: () => {
          console.log("删除", refAmount.value, refAmount.value.length);

          if (refAmount.value.length == 1) {
            refAmount.value = "0";
            return;
          }
          refAmount.value = refAmount.value.slice(0, -1);
        },
      },
      {
        text: "7",
        onClick: () => {
          appendText(7);
        },
      },
      {
        text: "8",
        onClick: () => {
          appendText(8);
        },
      },
      {
        text: "9",
        onClick: () => {
          appendText(9);
        },
      },
      {
        text: "确定",
        onClick: () => {
          console.log("确定", refAmount.value);
        },
      },
      {
        text: "0",
        onClick: () => {
          appendText(0);
        },
      },
      {
        text: ".",
        onClick: () => {
          appendText(".");
        },
      },
    ];

    const showDatePicker = () => {
      refDatePickerVisible.value = true;
    };
    const hideDatePicker = () => {
      refDatePickerVisible.value = false;
    };

    return () => (
      <div class={s.wrapper}>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="logo" class={s.icon}></Icon>
            <span onClick={showDatePicker}>{today.value}</span>
            <Popup
              v-model:show={refDatePickerVisible.value}
              position={"bottom"}
            >
              <DatePicker
                v-model={refDate.value}
                type="data"
                title="选择年月日"
                onConfirm={({ selectedValues }: any) => {
                  today.value = selectedValues.join("-");
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
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
