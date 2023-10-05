import { http } from "../shared/Http";

// 发送验证码
export const sendValidationCodes = (email: string, _autoLoading: boolean) =>
  http.post('/validation_codes', { email }, { _autoLoading })