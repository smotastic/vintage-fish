<template>
  <q-page padding>
    <div class="q-gutter-md">
      <div class="row">
        <div class="col">
          <q-input v-model="task.summary" label="Summary" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-input v-model="task.description" type="textarea" label="Description" />
        </div>
      </div>
      <div class="row q-gutter-x-xs">
        <div class="col">
          <q-input filled v-model="task.starttime" mask="time" :rules="['time']" label="Start Time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="task.starttime" now-btn format24h />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input filled v-model="task.endtime" mask="time" :rules="['time']" label="End Time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="task.endtime" now-btn format24h />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <q-btn color="primary" label="Create" @click="addTask" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Service from "../service";
import Notify from "../utils/notify";
import Paths from "../router/paths"

export default {
  name: "CreateTask",
  data: () => {
    return {
      task: {
        summary: "",
        description: "",
        starttime: "",
        endtime: ""
      }
    };
  },
  methods: {
    addTask() {
      Service.create({ ...this.task }).then(success => {
        Notify.success(success.msg);
        this.$router.push(Paths.LIST_TASKS);
      }).catch(error => {
        Notify.error(error.msg);
      });
    }
  }
};
</script>
