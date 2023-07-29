//对用户名和密码的限制
export const usernameRegex = /^[A-Za-z0-9_]+$/
export const usernameRule = [{ required: true, message: '请输入用户名' },
{ match: usernameRegex, message: "用户名只能由字母、数字、下划线组成" },
{ minLength: 5, message: '用户名长度至少为5个字符' },
{ maxLength: 16, message: '用户名长度至多为16个字符' }]
export const passwordRule = [{ required: true, message: '请输入密码' },
{ minLength: 8, message: '密码长度至少为8个字符' },
{ maxLength: 16, message: '密码长度至多为16个字符' }]