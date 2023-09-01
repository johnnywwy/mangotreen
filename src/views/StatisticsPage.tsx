import { defineComponent, PropType } from "vue"
import { TimeTabsLayout } from "../layouts/TimeTabsLayout"
import { Charts } from "../components/charts/Charts"
import s from "./StatisticsPage.module.scss"

export const StatisticsPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    return () => 
        <TimeTabsLayout class={s.wrapper} component={Charts} />
  },
});
