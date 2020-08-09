<template>
  <q-page padding>
    <!-- <div class="row justify-center q-gutter-md"> -->
    <!-- <div class="col-8" v-for="task in list" :key="task.id">
        <TaskCard
          :task="task"
          :onStart="onStart"
          :onStop="onStop"
          :onChangeSummary="onChangeSummary"
          :onChangeDescription="onChangeDescription"
          :onChangeStarttime="onChangeStarttime"
          :onChangeEndtime="onChangeEndtime"
        />
    </div>-->
    <q-table :data="list" :columns="columns" row-key="id">
      <template v-slot:top-row>
        <TaskRow
          :task="newTask"
          :onAction="onActionAdd"
          icon="add"
          :onChangeSummary="onChangeSummaryAdd"
          :onChangeDescription="onChangeDescriptionAdd"
          :onChangeStarttime="onChangeStarttimeAdd"
          :onChangeEndtime="onChangeEndtimeAdd"
        />
      </template>
      <template v-slot:body="props">
        <TaskRow
          :task="props.row"
          :onAction="onAction"
          :icon="props.row.running ? 'pause_circle_outline' : 'play_circle_outline'"
          :onChangeSummary="onChangeSummary"
          :onChangeDescription="onChangeDescription"
          :onChangeStarttime="onChangeStarttime"
          :onChangeEndtime="onChangeEndtime"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import Service from "../service";
import Notify from "../utils/notify";
import TaskRow from "../components/TaskRow/TaskRow";

export default {
  name: "Tasklist",
  components: {
    TaskRow,
  },
  data: () => {
    return {
      newTask: {},
      list: [],
      columns: [
        {
          name: "action",
          label: "Actions",
          align: "left",
        },
        {
          name: "summary",
          label: "Summary",
          field: "summary",
          align: "left",
        },
        {
          name: "description",
          label: "Description",
          field: "description",
          align: "left",
        },
        {
          name: "starttime",
          label: "Start Time",
          field: "starttime",
          align: "left",
        },
        {
          name: "endtime",
          label: "End time",
          field: "endtime",
          align: "left",
        },
      ],
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
    onAction(task) {
      if (task.running) {
        this.onStop(task);
      } else {
        this.onStart(task);
      }
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
    // NEW TASK
    onActionAdd(task) {
      Service.create(task)
        .then((code) => {
          Notify.success(code.msg);
          this.list.push(code.object);
          this.newTask = {};
        })
        .catch(this.errorChange);
    },
    onChangeSummaryAdd(task, summary) {
      this.$set(task, "summary", summary);
    },
    onChangeDescriptionAdd(task, description) {
      this.$set(task, "description", description);
    },
    onChangeStarttimeAdd(task, starttime) {
      this.$set(task, "starttime", starttime);
    },
    onChangeEndtimeAdd(task, endtime) {
      this.$set(task, "endtime", endtime);
    },
  },
};
</script>
