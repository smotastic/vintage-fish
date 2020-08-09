<template>
  <q-card bordered style="max-height:350px;overflow-y:auto">
    <q-tabs v-model="tab" class="text-teal">
      <q-tab label="Details" name="details" />
      <q-tab label="Spent times" name="spenttimes" />
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="details">
        <DetailsTab
          :task="task"
          :onStart="onStart"
          :onStop="onStop"
          :onChangeSummary="onChangeSummary"
          :onChangeDescription="onChangeDescription"
          :onChangeStarttime="onChangeStarttime"
          :onChangeEndtime="onChangeEndtime"
        />
      </q-tab-panel>
      <q-tab-panel name="spenttimes">
        <SpentTimesTab :spenttimes="task.spenttimes" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import DetailsTab from "./DetailsTab";
import SpentTimesTab from "./SpentTimesTab";

export default {
  components: {
    DetailsTab,
    SpentTimesTab,
  },
  props: {
    task: Object,
    onStart: Function,
    onStop: Function,
    onChangeSummary: Function,
    onChangeDescription: Function,
    onChangeStarttime: Function,
    onChangeEndtime: Function,
  },
  data: () => {
    return {
      tab: "details",
    };
  },
};
</script>
