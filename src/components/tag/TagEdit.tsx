import { defineComponent, reactive } from "vue";
import s from "./Tag.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Rules, validate } from "../../shared/validate";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import { TagForm } from "./TagForm";

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
          title: () => "编辑标签",
          icon: () => <Icon name="left" onClick={() => { }} />,
          default: () => (
            <>
              <TagForm />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTag} onClick={() => { }}>删除标签</Button>
                <Button level="danger" class={s.removeTagAndItem} onClick={() => { }}>删除标签和记账</Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
