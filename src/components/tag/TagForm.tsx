import { showToast } from 'vant';
import { defineComponent, onMounted, PropType, reactive, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createTag, getTags, updateTag } from '../../api/api';
import { Button } from "../../shared/Button";
// import { EmojiSelected } from "../../shared/EmojiSelected";
import { Form, FormItem } from "../../shared/Form";
import { hasError, Rules, validate } from "../../shared/validate";
import { TagDTO } from '../../type/tags';
import s from "./Tag.module.scss";
export const TagForm = defineComponent({
    props: {
        id: Number
    },
    setup: (props, context) => {
        const route = useRoute()
        const router = useRouter()
        const formData = reactive<Partial<TagDTO>>({
            id: undefined,
            name: "",
            sign: "",
            kind: route.query.kind!.toString() as "expenses" | "income",
        });
        const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
        // 创建tags
        const onCreateTags = async (formData: any) => {
            const res = await createTag(formData, true)
            if (res.data) {
                showToast({
                    message: '创建成功', icon: 'success', duration: 800,
                    onClose: () => { router.back() }
                });
            }
        }

        // 修改tag
        const onUpdateTag = async (id: number) => {

            const res = await updateTag(id, formData)
            if (res.data) {
                showToast({
                    message: '修改成功', icon: 'success', duration: 800,
                    onClose: () => { router.back() }
                });
            }
        }
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

            if (!hasError(errors)) {
                console.log('12221');

                if (!formData.id) {
                    onCreateTags(formData)
                } else {
                    onUpdateTag(formData.id)
                }
            }
        };
        onMounted(async () => {
            if (!props.id) return
            const response = await getTags(props.id)
            Object.assign(formData, response.data.resource)
        })

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
