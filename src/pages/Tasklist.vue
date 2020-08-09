<template>
  <q-page padding>
    <div class="row justify-center q-gutter-md">
      <div class="col-8" v-for="task in list" :key="task.id">
        <TaskCard
          :task="task"
          :onStart="onStart"
          :onStop="onStop"
          :onChangeSummary="onChangeSummary"
          :onChangeDescription="onChangeDescription"
          :onChangeStarttime="onChangeStarttime"
          :onChangeEndtime="onChangeEndtime"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import Service from "../service";
import Notify from "../utils/notify";

import TaskCard from "../components/TaskCard/TaskCard";

export default {
  name: "Tasklist",
  components: {
    TaskCard,
  },
  data: () => {
    return {
      list: [],
    };
  },
  created() {
    Service.readToday().then((list) => {
      this.list = list;
    });
  },
  methods: {
    successChange(task) {
      return (code) => {
        Notify.success(code.msg);
        const index = this.list.findIndex((t) => t.id === task.id);
        this.list.splice(index, 1, code.object);
      };
    },
    errorChange(code) {
      Notify.error(code.msg);
    },
    onStart(task) {
      Service.startTask(task)
        .then(this.successChange(task))
        .catch(this.errorChange);
    },
    onStop(task) {
      Service.stopTask(task)
        .then(this.successChange(task))
        .catch(this.errorChange);
    },
    onChangeSummary(task, summary) {
      const updatingTask = { ...task };
      updatingTask.summary = summary;
      Service.update(updatingTask)
        .then(this.successChange(task))
        .catch(this.errorChange);
    },
    onChangeDescription(task, description) {
      const updatingTask = { ...task };
      updatingTask.description = description;
      Service.update(updatingTask)
        .then(this.successChange(task))
        .catch(this.errorChange);
    },
    onChangeStarttime(task, starttime) {
      const updatingTask = { ...task };
      updatingTask.starttime = starttime;
      Service.update(updatingTask)
        .then(this.successChange(task))
        .catch(this.errorChange);
    },
    onChangeEndtime(task, endtime) {
      const updatingTask = { ...task };
      updatingTask.endtime = endtime;
      Service.update(updatingTask)
        .then(this.successChange(task))
        .catch(this.errorChange);
    },
  },
};
</script>
