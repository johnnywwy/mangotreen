import { FunctionalComponent } from "vue";
import { RouterLink } from "vue-router";
import { SkipFeatures } from "../../shared/SkipFeatures";
import s from "./Welcome.module.scss";

const onClick = () => {
  localStorage.setItem('skipFeatures', 'yes')
}
export const FourthActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <span onClick={onClick}>
      <RouterLink to="/start">完成</RouterLink>

    </span>
    <SkipFeatures />
  </div>
);
FourthActions.displayName = "FourthActions";
