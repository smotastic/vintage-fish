<template>
  <q-page padding>
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
          :expandable="false"
        />
      </template>
      <template v-slot:body="props">
        <TaskRow
          :props="props"
          :task="props.row"
          :onAction="onAction"
          :icon="props.row.running ? 'pause_circle_outline' : 'play_circle_outline'"
          :onChangeSummary="onChangeSummary"
          :onChangeDescription="onChangeDescription"
          :onChangeStarttime="onChangeStarttime"
          :onChangeEndtime="onChangeEndtime"
        />
        <transition appear enter-active-class="animated backInLeft" leave-active-class="animated backOutRight">
          <TaskRowExpanded v-if="props.expand" :spenttimes="props.row.spenttimes" />
        </transition>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import Service from "../service";
import Notify from "../utils/notify";
import TaskRow from "../components/TaskRow/TaskRow";
import TaskRowExpanded from "../components/TaskRow/TaskRowExpanded";

export default {
  name: "Tasklist",
  components: {
    TaskRow,
    TaskRowExpanded,
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
      this.$store
        .dispatch("startTask", task)
        .then(this.successChange(task))
        .catch(this.errorChange);
    },
    onStop(task) {
      this.$store
        .dispatch("stopTask", task)
        .then(this.successChange(task))
        .catch(this.errorChange);
    },
    onChangeSummary(task, summary) {
      const updatingTask = { ...task };
      updatingTask.summary = summary;
      this.$store
        .dispatch("update", updatingTask)
        .then(this.successChange(updatingTask))
        .catch(this.errorChange);
    },
    onChangeDescription(task, description) {
      const updatingTask = { ...task };
      updatingTask.description = description;
      this.$store
        .dispatch("update", updatingTask)
        .then(this.successChange(updatingTask))
        .catch(this.errorChange);
    },
    onChangeStarttime(task, starttime) {
      const updatingTask = { ...task };
      updatingTask.starttime = starttime;
      this.$store
        .dispatch("update", updatingTask)
        .then(this.successChange(updatingTask))
        .catch(this.errorChange);
    },
    onChangeEndtime(task, endtime) {
      const updatingTask = { ...task };
      updatingTask.endtime = endtime;
      this.$store
        .dispatch("update", updatingTask)
        .then(this.successChange(updatingTask))
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
