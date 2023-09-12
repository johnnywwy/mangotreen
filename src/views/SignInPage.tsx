import { defineComponent, PropType, reactive, ref } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import s from "./SignInPage.module.scss";
import { Rules, validate } from "../shared/validate";
import axios from "axios";
import { http } from "../shared/Http";

export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {

    const validationCode = ref<any>()
    const refValidationCodeDisabled = ref(false)

    const formData = reactive({
      email: "johnnywwy@163.com",
      code: "",
    });

    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});

    const onsubmit = (e: Event) => {
      e.preventDefault();
      const rules: Rules<typeof formData> = [
        { key: "email", type: "required", message: "必填" },
        {
          key: "email",
          type: "pattern",
          message: "请输入正确的邮箱地址",
          regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+./,
        },
        {
          key: "code",
          message: "必填",
          type: "required",
        }
      ];

      // 重置错误信息
      Object.assign(errors, {
        email: [],
        code: []
      });

      // 验证表单
      Object.assign(errors, validate(formData, rules));
    }

    // 报错
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }

    const onClickSendValidationCode = async () => {
      refValidationCodeDisabled.value = true
      const response = await http
        .post('/validation_codes', { email: formData.email })
        .catch(onError)
        .finally(() => {
          refValidationCodeDisabled.value = false
        })

      validationCode.value.startCount()

    }

    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="login" class={s.icon} />,
          default: () =>
            <div class={s.wrapper}>
              <header>
                <svg class={s.logo}>
                  <use xlinkHref="#logo"></use>
                </svg>
                <h2>蛋黄记账</h2>
              </header>
              <Form onSubmit={onsubmit}>
                <FormItem label="邮箱地址"
                  error={errors.email?.[0]}
                  v-model={formData.email}
                  placeholder="请输入邮箱地址"
                  type="text" />
                <FormItem label="验证码"
                  ref={validationCode}
                  countForm={10}
                  disabled={refValidationCodeDisabled.value}
                  error={errors.code?.[0]}
                  v-model={formData.code}
                  placeholder="请输入验证码"
                  type="validationCode"
                  onClick={onClickSendValidationCode}
                />
                <FormItem class={s.actions}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
        }}
      </MainLayout>
    );
  },
});