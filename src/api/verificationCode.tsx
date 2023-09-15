import { http } from "../shared/Http";

// 发送验证码
export const sendValidationCodes = (email: string) => http.post('/validation_codes', { email })