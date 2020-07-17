<template>
  <q-card bordered style="max-height:200px;overflow-y:auto">
    <q-card-section>
      <div class="text-h6">{{task.summary}}</div>
      <div class="text-subtitle2">{{time}}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section style="font-style: italic">{{task.description || 'A brief description'}}</q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    task: Object
  },
  computed: {
    time() {
      let time = "No time specified";
      if (this.task.startTime || this.task.endTime) {
        const start = this.task.startTime || "Open Start";
        const end = this.task.endTime || "Open End";
        time = `${start} - ${end}`;
      }
      return time;
    }
  }
};
</script>
