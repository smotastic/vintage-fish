<template>
  <q-card bordered style="max-height:200px;overflow-y:auto">
    <q-card-section>
      <div class="text-h6">{{mutableTask.summary}}</div>
      <!-- <div class="text-subtitle2">{{time}}</div> -->
    </q-card-section>

    <q-separator inset />

    <q-card-section style="font-style: italic">{{mutableTask.description || 'A brief description'}}</q-card-section>

    <q-separator inset />

    <q-card-actions>
      <q-btn
        flat
        round
        :icon="mutableTask.running ? 'pause_circle_outline' : 'play_circle_outline'"
        @click="startOrStopTask"
      />
      <TaskTime :task="mutableTask" />
    </q-card-actions>
  </q-card>
</template>

<script>
import TaskTime from './TaskTime';
import Notify from '../utils/notify';
import Service from '../service';
export default {
  components: {
    TaskTime
  },
  props: {
    task: Object
  },
  data: () => {
    return {
      mutableTask: null
    }
  },
  created() {
    this.mutableTask = { ...this.task };
  },
  methods: {
    startOrStopTask() {
      if (this.mutableTask.running) {
        Service.stopTask(this.mutableTask).then(code => {
          Notify.success(code.msg);
          this.mutableTask = code.object;
        });
      } else {
        Service.startTask(this.mutableTask).then(code => {
          Notify.success(code.msg);
          this.mutableTask = code.object;
        }).catch(code => {
          Notify.error(code.msg);
        });
      }
    }
  }
};
</script>
