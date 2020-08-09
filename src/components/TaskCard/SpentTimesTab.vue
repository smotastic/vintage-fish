<template>
  <span>
    <q-table
      class="my-sticky-header-table"
      :data="spenttimes"
      :columns="columns"
      row-key="id"
      :pagination="{rowsPerPage:0}"
    />
  </span>
</template>

<script>
export default {
  props: {
    spenttimes: {
      type: Array,
      default: () => [],
    },
  },
  data: () => {
    return {
      columns: [
        {
          name: "starttime",
          label: "Start Time",
          field: "starttime",
        },
        {
          name: "endtime",
          label: "End Time",
          field: "endtime",
        },
      ],
    };
  },
};
</script>

<style>
.my-sticky-header-table {
  height: 250px;
  /* this is when the loading indicator appears */
}
body.body--dark.my-sticky-header-table .q-table__top,
body.body--dark.my-sticky-header-table .q-table__bottom,
body.body--dark .my-sticky-header-table thead tr:first-child th {
  background-color: #1d1d1d;
}
body.body--light .my-sticky-header-table .q-table__top,
body.body--light .my-sticky-header-table .q-table__bottom,
body.body--light .my-sticky-header-table thead tr:first-child th {
  background-color: white;
}
.my-sticky-header-table thead tr th {
  position: sticky;
  z-index: 1;
}
.my-sticky-header-table thead tr:first-child th {
  top: 0;
}
.my-sticky-header-table.q-table--loading thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}
</style>
