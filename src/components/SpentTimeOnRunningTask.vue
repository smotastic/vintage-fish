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
        const totalSeconds = (noaw - start) / 1000;
        const seconds = String(parseInt(totalSeconds % 60)).padStart(2, "0");
        const minutes = String(parseInt(totalSeconds / 60)).padStart(2, "0");
        const hours = String(parseInt(minutes / 60)).padStart(2, "0");
        this.spentTimeOnRunningTask = `${hours}:${minutes}:${seconds}`;
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
