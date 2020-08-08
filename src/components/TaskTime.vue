<template>
  <div class="tasktime">
    <div>{{task.starttime || 'undefined'}}</div>
    <div>-</div>
    <div>{{task.endtime || 'undefined'}}</div>
  </div>
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
}
</script>

<style scoped>
.tasktime > div {
  display: inline-block;
}
</style>
