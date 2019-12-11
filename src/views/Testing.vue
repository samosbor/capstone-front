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
    <CsvTest/>
  </div>
</template>

<script>
import CsvTest from '@/components/CsvTest.vue'

export default {
  name: 'testing',
  components: {
    CsvTest
  }
}
</script>
