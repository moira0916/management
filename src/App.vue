<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>
<style>
.el-calendar__body{padding:0 5px 0}
.el-calendar-table td.is-selected{
    color: #409EFF !important;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
.el-calendar-table tr td:focus, .el-calendar-table tr td:hover{
   color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
.el-calendar-table .el-calendar-day {
  height: auto;
}
.el-calendar-table tr td{
  border:0;
}
.el-calendar-table tr:first-child td{
  border:0;
}
.el-calendar-table tr td:first-child{
  border:0;
}
</style>
