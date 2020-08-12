<template>
  <div>{{spentTimeOnRunningTask}}</div>
</template>

<script>
import { now } from "../service/util";
import Service from "../service/";
export default {
  created() {
    Service.readToday().then((todaysTasks) => {
      const runningTask = todaysTasks.find((t) => t.running);
      if (runningTask) {
        this.$store.commit("changeTask", runningTask);
      }
    });

    setInterval(() => {
      if (this.$store.getters.showTime) {
        const start = Date.parse(
          `1970-01.01 ${this.$store.state.manageTask.starttime}`
        );
        const noaw = Date.parse(`1970-01.01 ${now()}`);
        const totalSeconds = (noaw - start) / 1000;
        const seconds = totalSeconds % 60;
        const minutes = totalSeconds / 60;
        const hours = minutes / 60;
        const hourStr = String(parseInt(hours)).padStart(2, "0");
        const minStr = String(parseInt(minutes % 60)).padStart(2, "0");
        const secStr = String(parseInt(seconds % 60)).padStart(2, "0");
        this.spentTimeOnRunningTask = `${hourStr}:${minStr}:${secStr}`;
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
