import { defineComponent, PropType, reactive, toRaw } from 'vue';
import { Button } from "../../shared/Button";
// import { EmojiSelected } from "../../shared/EmojiSelected";
import { Form, FormItem } from "../../shared/Form";
import { Rules, validate } from "../../shared/validate";
import s from "./Tag.module.scss";
export const TagForm = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
        },

    },
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
            console.log('99898888', errors);

        };

        return () => (
            <Form onSubmit={onSubmit}>
                <FormItem label='标签名'
                    type="text"
                    v-model={formData.name}
                    error={errors['name']?.[0]} />
                <FormItem label={'符号 ' + formData.sign}
                    type="emojiSelect" v-model={formData.sign}
                    error={errors['sign']?.[0]} />
                <FormItem>
                    <p class={s.tips}>记账时长按标签即可进行编辑</p>
                </FormItem>
                <FormItem>
                    <Button class={[s.button]} type="submit">确定</Button>
                </FormItem>
            </Form>
        )
    }
})
