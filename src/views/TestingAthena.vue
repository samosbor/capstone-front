<template>
  <div>
    <v-app-bar>
      <v-toolbar-title>
        <span>Main Dash</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn>DifferentView1</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn>DifferentView2</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <AthenaResultTest/>
  </div>
</template>

<script>
import AthenaResultTest from '@/components/AthenaResultTest.vue'

export default {
  name: 'testing',
  components: {
    AthenaResultTest
  }
}
</script>
