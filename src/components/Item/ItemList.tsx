import { defineComponent } from "vue";
import { TimeTabsLayout } from "../../layouts/TimeTabsLayout";
import { ItemSummary } from "./ItemSummary";

export const ItemList = defineComponent({
  setup: (props, content) => {
   return () => (
      <TimeTabsLayout component={ItemSummary}/>
    );
  },
});