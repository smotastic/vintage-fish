<template>
  <q-page padding>
    <div class="row justify-center q-gutter-md">
      <div class="col-5" v-for="task in list" :key="task.summary">
        <TaskCard :task="task" :onStart="onStart" :onStop="onStop" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Service from "../service";
import Notify from '../utils/notify';

import TaskCard from "../components/TaskCard";

export default {
  name: "Tasklist",
  components: {
    TaskCard
  },
  data: () => {
    return {
      list: []
    };
  },
  created() {
    Service.readToday().then(list => {
      this.list = list;
    });
  },
  methods: {
    onStart(task) {
       Service.startTask(task).then(code => {
          Notify.success(code.msg);
          const index = this.list.findIndex(t => t.summary === task.summary);
          this.list.splice(index, 1, code.object);
        }).catch(code => {
          Notify.error(code.msg);
        });
    },
    onStop(task) {
       Service.stopTask(task).then(code => {
          Notify.success(code.msg);
          const index = this.list.findIndex(t => t.summary === task.summary);
          this.list.splice(index, 1, code.object);
        });
    }
  }
};
</script>
