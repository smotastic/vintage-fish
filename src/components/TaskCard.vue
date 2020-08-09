<template>
  <q-card bordered style="max-height:250px;overflow-y:auto">
    <q-card-section>
      <div class="text-h6">
        <q-input :value="task.summary" @change="onChangeSummary(task, $event.target.value)" label="Summary" />
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section style="font-style: italic">{{task.description || 'A brief description'}}</q-card-section>

    <q-separator inset />

    <q-card-actions>
      <q-btn v-if="!task.running" flat round icon="play_circle_outline" @click="onStart(task)" />
      <q-btn v-else flat round icon="pause_circle_outline" @click="onStop(task)" />
      <TaskTime :task="task" />
    </q-card-actions>
  </q-card>
</template>

<script>
import TaskTime from './TaskTime';

export default {
  components: {
    TaskTime
  },
  props: {
    task: Object,
    onStart: Function,
    onStop: Function,
    onChangeSummary: Function,
    onChangeDescription: Function,
    onChangeStarttime: Function,
    onChangeEndtime: Function
  }
};
</script>
