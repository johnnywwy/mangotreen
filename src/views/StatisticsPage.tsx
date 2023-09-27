import { defineComponent } from "vue"
import { TimeTabsLayout } from "../layouts/TimeTabsLayout"
import { Charts } from "../components/statistics/Charts"
import s from "./StatisticsPage.module.scss"

export const StatisticsPage = defineComponent({
  setup: (props, content) => {
    return () =>
      <TimeTabsLayout rerenderOnChange={true} class={s.wrapper} component={Charts} title="统计页面" />
  },
});
