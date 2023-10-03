import { defineComponent, PropType } from "vue";
import s from './Bars.module.scss';


type Tag = { name: string, value: number, sign: number }

export const Bars = defineComponent({
	props: {
		data: {
			type: Array as PropType<{ tag: Tag, amount: number, percent: number }[]>,
		},
	},
	setup: (props, content) => {

		return () => (
			<div class={s.wrapper}>
				{
					(props.data && props.data.length > 0)
						? props.data.map(({ tag, amount, percent }) => {
							return (
								<div class={s.topItem}>
									<div class={s.sign}>
										{tag.sign}
									</div>
									<div class={s.bar_wrapper}>
										<div class={s.bar_text}>
											<span> {tag.name} - {percent} </span>
											<span> ￥{amount} </span>
										</div>
										<div class={s.bar}>
											<div class={s.bar_inner} style={{ width: `${percent}%` }}></div>
										</div>
									</div>
								</div>
							)
						})
						: <div>没有数据</div>
				}
			</div>
		);
	},
});