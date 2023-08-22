import { defineComponent, reactive } from "vue";
import s from "./Tag.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { EmojiSelected } from "../../shared/EmojiSelected";
import { Rules, validate } from "../../shared/validate";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: "",
      sign: "",
    });

    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});

    //提交表单
    const onSubmit = (e: Event) => {
      e.preventDefault();

      const rules: Rules<typeof formData> = [
        { key: "name", type: "required", message: "必填" },
        {
          key: "name",
          type: "pattern",
          message: "最多 1 ～ 4 个字符",
          regExp: /^.{1,4}$/,
        },
        {
          key: "sign",
          message: "必填",
          type: "required",
        },
      ];
      // 重置错误信息
      Object.assign(errors, {
        name: [],
        sign: [],
      });

      // 验证表单
      Object.assign(errors, validate(formData, rules));
      console.log(errors);
    };

    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <Icon name="left" class={s.icon} onClick={() => {}} />,
          default: () => (
            <form class={s.form} onSubmit={onSubmit}>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>标签名</span>
                  <div class={s.formItem_value}>
                    <input
                      v-model={formData.name}
                      class={[s.formItem, s.input, s.error]}
                    ></input>
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span class={s.formItem_errorHint_text}>
                      {errors["name"]?.[0]}
                    </span>
                  </div>
                </label>
              </div>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>符号 {formData.sign}</span>
                  <div class={s.formItem_value}>
                    <EmojiSelected
                      v-model={formData.sign}
                      class={[s.formItem, s.emojiList, s.error]}
                    />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span class={s.formItem_errorHint_text}>
                      {errors["sign"]?.[0]}
                    </span>
                  </div>
                </label>
              </div>
              <p class={s.tips}>记账时长按标签即可进行编辑</p>
              <div class={s.formRow}>
                <div class={s.formItem_value}>
                  <Button class={[s.formItem, s.button]}>确定</Button>
                </div>
              </div>
            </form>
          ),
        }}
      </MainLayout>
    );
  },
});
