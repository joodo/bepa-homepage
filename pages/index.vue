<template>
  <div>
    <widget-base :widgetData="{x:6,y:6,width:12,height:6}">
      <el-card class="base-card">
        <h1>It Works</h1>
      </el-card>
    </widget-base>
    <widget-base :widgetData="{width:3,height:1}">
      <el-card class="menu-card">
        <span style="margin-right: 16px;">Edit Mode</span><el-switch v-model="editMode"></el-switch>
      </el-card>
    </widget-base>
  </div>
</template>

<script>
import WidgetBase from '~/components/WidgetBase'

export default {
  name: 'index',
  components: {
    'widget-base': WidgetBase,
  },
  computed: {
    editMode: {
      get () { return this.$store.state.editMode },
      set (value) {
        if (value) {
          this.$store.commit('enableEdit')
        } else {
          this.$store.commit('disableEdit')
        }
      }
    },
  }
}
</script>

<style>
.el-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.menu-card {
  justify-content: center;
}
</style>
