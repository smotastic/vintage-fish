<template>
  <span>
    <q-card-section>
      <div class="text-h6">
        <q-input :value="task.summary" @change="onChangeSummary(task, $event.target.value)" label="Summary" />
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section style="font-style: italic">
      <q-input @change="onChangeDescription(task, $event.target.value)" :value="task.description" label="Description" />
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="row q-gutter-x-lg">
        <div v-if="!task.running" class="col-2">
          <q-btn flat round icon="play_circle_outline" @click="onStart(task)" />
        </div>
        <div v-else class="col-2">
          <q-btn flat round icon="pause_circle_outline" @click="onStop(task)" />
        </div>
        <div class="col-4">
          <q-input
            :value="task.starttime"
            @change="onChangeStarttime(task, $event.target.value)"
            mask="time"
            label="Start Time"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time :value="task.starttime" @input="onChangeStarttime(task, $event)" now-btn format24h />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-4">
          <q-input
            :value="task.endtime"
            @change="onChangeEndtime(task, $event.target.value)"
            mask="time"
            label="End Time"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time :value="task.endtime" @input="onChangeEndtime(task, $event)" now-btn format24h />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
  </span>
</template>

<script>
export default {
  props: {
    task: Object,
    onStart: Function,
    onStop: Function,
    onChangeSummary: Function,
    onChangeDescription: Function,
    onChangeStarttime: Function,
    onChangeEndtime: Function,
  },
};
</script>
