<template>
  <q-item>
    <q-item-section avatar>
      <q-icon name="settings_brightness" />
    </q-item-section>

    <q-item-section>
      <q-btn-toggle
        v-model="toggle"
        @input="toggleMode"
        toggle-color="primary"
        no-caps
        spread
        :options="[
        {label: 'Dark', value: 'dark'},
        {label: 'Light', value: 'light'},
      ]"
      />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  data: () => {
    return {
      toggle: "dark",
    };
  },
  created() {
    this.toggle = this.$q.dark.isActive ? "dark" : "light";
  },
  methods: {
    toggleMode() {
      this.$q.dark.set(this.toggle === "dark");
    }
  }
};
</script>
