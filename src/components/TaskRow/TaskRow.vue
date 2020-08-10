<template>
  <!-- <span> -->
  <q-tr :style="{'backgroundColor': task.running ? runningColor : 'inherit'}">
    <q-td key="action">
      <q-btn flat round :icon="icon" @click="onAction(task)" />
      <q-btn v-if="expandable" flat round :icon="props.expand ? 'expand_less' : 'expand_more'" @click="props.expand = !props.expand" />
    </q-td>
    <q-td key="summary">
      <q-input @change="onChangeSummary(task, $event.target.value)" :value="task.summary" label="Summary" />
    </q-td>
    <q-td key="description">
      <q-input @change="onChangeDescription(task, $event.target.value)" :value="task.description" label="Description" />
    </q-td>
    <q-td key="starttime">
      <q-input :value="task.starttime" @change="onChangeStarttime(task, $event.target.value)" mask="time" label="Start Time">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time :value="task.starttime" @input="onChangeStarttime(task, $event)" now-btn format24h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-td>
    <q-td key="endtime">
      <q-input :value="task.endtime" @change="onChangeEndtime(task, $event.target.value)" mask="time" label="End Time">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time :value="task.endtime" @input="onChangeEndtime(task, $event)" now-btn format24h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-td>
  </q-tr>
</template>

<script>
import { colors } from "quasar";
const { getPaletteColor } = colors;

export default {
  props: {
    props: Object,
    task: {
      type: Object,
      default: () => ({}),
    },
    expandable: {
      type: Boolean,
      default: true,
    },
    icon: String,
    onAction: Function,
    onExpand: Function,
    onChangeSummary: Function,
    onChangeDescription: Function,
    onChangeStarttime: Function,
    onChangeEndtime: Function,
  },
  data: () => {
    return {
      expanded: false,
    };
  },
  computed: {
    runningColor() {
      return getPaletteColor("secondary");
    },
  },
};
</script>

<style scoped>
</style>
