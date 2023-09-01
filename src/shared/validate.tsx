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
        console.log('测试啦啦啦阿里', value, key);
        
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
