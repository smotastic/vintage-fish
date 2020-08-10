<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>Vintage Fish</q-toolbar-title>
        <SpentTimeOnRunningTask />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-grey-8">Menu</q-item-label>
        <MenuNavigationLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        <ToggleDarkLight />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuNavigationLink from "components/Menu/MenuNavigationLink.vue";
import ToggleDarkLight from "components/Menu/ToggleDarkLight.vue";
import Paths from "../router/paths";
import SpentTimeOnRunningTask from "components/SpentTimeOnRunningTask";

export default {
  name: "MainLayout",

  components: {
    MenuNavigationLink,
    ToggleDarkLight,
    SpentTimeOnRunningTask,
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "List Tasks",
          caption: "Show all tasks and start / stop them",
          icon: "list",
          link: Paths.LIST_TASKS,
        },
        {
          title: "Outlook",
          caption: "Import your Outlook calendar",
          icon: "import_contacts",
          link: "/",
        },
        {
          title: "Git",
          caption: "Import your worked on Branches ",
          icon: "insights",
          link: "/",
        },
      ],
    };
  },
};
</script>
