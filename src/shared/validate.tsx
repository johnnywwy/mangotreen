// FData 类型是一个对象，key 是字符串，value 是字符串或者数字
// type FData = Record<string, string | number | null | undefined>;

interface FData {
  [k: string]: string | number | null | undefined | FData;
}

type Rule<T> = {
  key: keyof T;
  message: string;
} & ({ type: "required" } | { type: "pattern"; regExp: RegExp });

type Rules<T> = Rule<T>[];

export type { FData, Rule, Rules };

export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[];
  };

  const errors: Errors = {};

  rules.map((rule) => {
    const { key, type, message } = rule;
    const value = formData[key];

    switch (type) {
      case "required":
        if (value === null || value === undefined || value === "") {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      case "pattern":
        if (value && !rule.regExp.test(value.toString())) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      default:
        return;
    }
  });
  return errors;
};

// 判断Error是否为空
export function hasError(errors: Record<string, string[]>) {
  let result = false
  for (let key in errors) {
    if (errors[key].length > 0) {
      result = true
      break
    }
  }
  return result
}