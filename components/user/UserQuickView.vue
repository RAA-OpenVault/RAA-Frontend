<script lang="ts" setup>
import { NFlex, NAvatar, NEllipsis, NButton } from "naive-ui";
import { useLoginStatus } from "~/api/hooks/user";

defineProps<{
  expanded: boolean;
}>();
const isLoggedIn = useLoginStatus();

async function navigateToLogin() {
  await navigateTo("/login");
}
</script>

<template>
  <NFlex class="flex-shrink-0 overflow-hidden p-3" align="center" :wrap="false">
    <template v-if="isLoggedIn">
      <NAvatar class="flex-shrink-0" size="large" />
      <Transition name="user-info">
        <NFlex
          v-show="expanded"
          class="flex-grow overflow-hidden"
          vertical
          size="small"
          align="flex-start"
        >
          <NEllipsis :line-clamp="1"> 这里是用户名12345678945612456 </NEllipsis>
          <NButton text size="tiny">详细信息&nbsp;&gt;</NButton>
        </NFlex>
      </Transition>
    </template>
    <template v-else>
      <NAvatar
        class="flex-shrink-0 cursor-pointer"
        size="large"
        @click="navigateToLogin"
      >
        登录
      </NAvatar>
      <Transition name="user-info">
        <NFlex
          v-show="expanded"
          class="flex-grow overflow-hidden"
          vertical
          size="small"
          align="flex-start"
        >
          <NEllipsis :line-clamp="1"> 您尚未登录 </NEllipsis>
          <NButton text size="tiny" @click="navigateToLogin">
            点击登录&nbsp;&gt;
          </NButton>
        </NFlex>
      </Transition>
    </template>
  </NFlex>
</template>

<style lang="scss" scoped>
.user-info-enter-active,
.user-info-leave-active {
  transition: opacity 0.3s ease;
}

.user-info-enter-from,
.user-info-leave-to {
  opacity: 0;
}
</style>
