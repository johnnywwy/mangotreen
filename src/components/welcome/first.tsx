import { FunctionalComponent } from "vue";
import s from "./Welcome.module.scss";

export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref="#pig"></use>
      </svg>
      <h2 class={s.text}>
        会挣钱 <br />
        还会省钱
      </h2>
    </div>
  );
};

First.displayName = "First";