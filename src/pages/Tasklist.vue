<template>
  <q-page padding >
    <div class="row justify-center q-gutter-md">
      <div class="col-5" v-for="task in list" :key="task.summary">
        <TaskCard :task="task" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Service from "../service";

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
  }
};
</script>
