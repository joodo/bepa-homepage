<template>
  <widget-base :widget-x="6" :widget-y="6" :widget-width="12" :widget-height="12">
  <el-card class="box-card">
    <h1>It Works</h1>
  </el-card>
  </widget-base>
</template>

<script>
import WidgetBase from '~/components/WidgetBase'

export default {
  name: 'index',
  components: {
    'widget-base': WidgetBase,
  },
}
</script>

<style>
  .box-card {
    width: 100%;
    height: 100%;
  }
</style>
