<script setup lang="ts">
import {
  NCard,
  NFlex,
  NForm,
  NFormItem,
  NInput,
  NButton,
  type FormInst,
  type FormRules,
} from "naive-ui";
import {
  UserNameValidator,
  UserPasswordValidator,
  type UserLogin,
} from "~/api/models/user";

const formRef = ref<FormInst | null>(null);

const loginValue = ref<UserLogin>({
  username: "",
  password: "",
});

const loginRules: FormRules = {
  username: [
    {
      required: true,
      validator(_, value) {
        const result = UserNameValidator.safeParse(value);

        if (result.error) {
          return new Error(result.error.errors[0].message);
        }

        return true;
      },
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      validator(_, value) {
        const result = UserPasswordValidator.safeParse(value);

        if (result.error) {
          return new Error(result.error.errors[0].message);
        }

        return true;
      },
      trigger: "blur",
    },
  ],
};
</script>

<template>
  <NFlex class="h-full w-full overflow-hidden" align="center" justify="center">
    <NCard class="max-w-md" title="登录" bordered hoverable>
      <NForm ref="formRef" :model="loginValue" :rules="loginRules">
        <NFormItem label="用户名" path="username">
          <NInput v-model:value="loginValue.username" placeholder="用户名" />
        </NFormItem>
        <NFormItem label="密码" path="password">
          <NInput
            v-model:value="loginValue.password"
            type="password"
            placeholder="密码"
          />
        </NFormItem>
        <NFormItem>
          <NFlex class="w-full" align="center">
            <NButton block type="primary">登录</NButton>
            <NButton text>以游客身份浏览&nbsp;&gt;</NButton>
          </NFlex>
        </NFormItem>
      </NForm>
    </NCard>
  </NFlex>
</template>
