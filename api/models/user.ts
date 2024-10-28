import { z } from "zod";

// 数据库中的id是uuidv1
export const UserIDValidator = z.string().uuid();

// 用户名，长度不超过50，不可为空
export const UserNameValidator = z
  .string()
  .max(50, "用户名长度不能超过50个字符")
  .min(1, "用户名不可为空");

// 哈希后密码长度为128，正常密码长度为6-20（前端要求），要求符合密码规范
export const UserPasswordValidator = z
  .string()
  .min(6, "密码长度不能小于6个字符")
  .max(20, "密码长度不能超过20个字符")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
    "密码必须包含至少一个小写字母、一个大写字母和一个数字",
  );

export const UserValidator = z.object({
  id: UserIDValidator,
  username: UserNameValidator,
  // 邮箱，长度不超过50，要求符合邮箱格式
  email: z.string().email().max(50),
  password: UserPasswordValidator,
  // 创建时间为标准UTC时间
  created_at: z.string().datetime(),
  // 学号长度为8，全部为数字
  student_id: z.string().length(8).regex(/^\d+$/),
  // 是否禁用
  disabled: z.boolean(),
});

export const UserInfoValidator = UserValidator.omit({ password: true });
export const UserCreateValidator = UserValidator.omit({
  id: true,
  created_at: true,
});
// 所有字段都是可选的
export const UserUpdateValidator = UserValidator.omit({
  id: true,
  created_at: true,
  password: true,
}).partial();

export const UserLoginValidator = z.object({
  username: UserNameValidator,
  password: UserPasswordValidator,
});

export const TokenValidator = z.object({
  access_token: z.string(),
  token_type: z.literal("bearer"),
});

export type User = z.infer<typeof UserValidator>;
export type UserInfo = z.infer<typeof UserInfoValidator>;
export type UserCreate = z.infer<typeof UserCreateValidator>;
export type UserUpdate = z.infer<typeof UserUpdateValidator>;

export type UserLogin = z.infer<typeof UserLoginValidator>;

export type Token = z.infer<typeof TokenValidator>;
