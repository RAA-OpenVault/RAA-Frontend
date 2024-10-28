<script setup lang="ts">
import AppRouterLink from "./components/AppRouterLink.vue";
import {
  HomeOutline as HomeIcon,
  CubeOutline as ProjectOverviewIcon,
  PersonOutline as UserOverviewIcon,
  PeopleOutline as OrganizationOverviewIcon,
} from "@vicons/ionicons5";
import {
  NConfigProvider,
  NElement,
  NFlex,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NMenu,
  darkTheme,
  type MenuOption,
} from "naive-ui";

const route = useRoute();

const collapsed = ref(false);

const menuOptions: MenuOption[] = [
  {
    label: () => renderRouterLink("/home", "首页"),
    key: "home",
    icon: () => renderIcon(HomeIcon),
  },
  {
    label: () => renderRouterLink("/project", "项目"),
    key: "project",
    icon: () => renderIcon(ProjectOverviewIcon),
  },
  {
    label: () => renderRouterLink("/user", "用户"),
    key: "user",
    icon: () => renderIcon(UserOverviewIcon),
  },
  {
    label: () => renderRouterLink("/organization", "组织"),
    key: "organization",
    icon: () => renderIcon(OrganizationOverviewIcon),
  },
];

function renderIcon(icon: Component) {
  return h(NIcon, null, { default: () => h(icon) });
}

function renderRouterLink(to: string, label: string) {
  return h(AppRouterLink, { to }, { default: () => label });
}

const expanded = computed(() => !collapsed.value);
const currentPath = computed(() => {
  const findPaths = (paths: string[], options: MenuOption[]) => {
    for (const option of options) {
      if (option.key === paths[0]) {
        if (paths.length === 1 || !option.children) return option.key;
        return findPaths(paths.slice(1), option.children);
      }
    }
    return null;
  };

  const routerPaths = route.path.split("/").slice(1);
  return findPaths(routerPaths, menuOptions);
});
</script>

<template>
  <NConfigProvider class="h-screen w-screen overflow-hidden" :theme="darkTheme">
    <NAppProvider>
      <NLayout class="h-full w-full overflow-hidden" has-sider>
        <!-- Sider -->
        <NLayoutSider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed
          :width="240"
          :collapsed-width="64"
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <NFlex class="h-full w-full" vertical justify="space-between">
            <NMenu
              :collapsed
              :value="currentPath"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
            />
            <UserQuickView :expanded />
          </NFlex>
        </NLayoutSider>

        <!-- Content -->
        <NLayout>
          <NLayoutContent class="h-full w-full overflow-hidden">
            <NElement class="h-full w-full overflow-hidden">
              <NuxtPage />
            </NElement>
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </NAppProvider>
  </NConfigProvider>
</template>

<style lang="scss">
:root {
  font-family: "Source Han Sans SC VF", v-sans, v-mono, other-fallbacks;
}
</style>
