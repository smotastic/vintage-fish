<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Vintage Fish</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-grey-8">Menu</q-item-label>
        <MenuNavigationLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuNavigationLink from "components/MenuNavigationLink.vue";

export default {
  name: "MainLayout",

  components: {
    MenuNavigationLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
         {
          title: "List Tasks",
          caption: "Show all tasks and start / stop them",
          icon: "list",
          link: "taskList"
        },
        {
          title: "Create",
          caption: "Manually create a new task",
          icon: "add",
          link: "createTask"
        },
        {
          title: "Outlook",
          caption: "Import your Outlook calendar",
          icon: "import_contacts",
          link: "/"
        },
                {
          title: "Git",
          caption: "Import your worked on Branches ",
          icon: "insights",
          link: "/"
        }
      ]
    };
  }
};
</script>
