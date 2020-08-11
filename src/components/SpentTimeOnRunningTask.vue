<template>
  <div>{{spentTimeOnRunningTask}}</div>
</template>

<script>
import { now } from "../service/util";
export default {
  created() {
    setInterval(() => {
      if (this.$store.getters.showTime) {
        const start = Date.parse(
          `1970-01.01 ${this.$store.state.manageTask.starttime}`
        );
        const noaw = Date.parse(`1970-01.01 ${now()}`);
        this.spentTimeOnRunningTask = (noaw - start) / 1000;
      } else {
        this.spentTimeOnRunningTask = "";
      }
    }, 1000);
  },
  data: () => {
    return {
      spentTimeOnRunningTask: undefined,
    };
  },
};
</script>
