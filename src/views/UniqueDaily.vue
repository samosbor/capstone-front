<template>
  <div>
    <v-app-bar>
      <v-toolbar-title>
        <span>Unique Daily Visitors</span>
      </v-toolbar-title>
    </v-app-bar>
    <UniqueDailyCmp/>
  </div>
</template>

<script>
import UniqueDailyCmp from '@/components/UniqueDailyCmp.vue'

export default {
  name: 'testing',
  components: {
    UniqueDailyCmp
  }
}
</script>
