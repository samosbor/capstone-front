<template>
  <v-container fluid>
    <div id="stripes" class="ml-n3 mt-10">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <v-card>
      <HelloWorld/>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
#stripes {
  transform: skewY(-12deg);
  transform-origin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid: repeat(8, 80px) / repeat(10, 1fr);
}

#stripes :nth-child(1) {
  grid-area: 1 / span 3 / auto / auto;
  background: #1976d2;
}

#stripes :nth-child(2) {
  grid-area: 4 / span 2 / auto / -1;
  background: #1976d2;
}

#stripes :nth-child(3) {
  grid-area: 7 / span 3 / auto / -1;
  background: #1976d2;
}

#stripes :nth-child(4) {
  grid-area: 8 / span 2 / auto / -1;
  background: #1976d2;
}

#stripes :nth-child(5) {
  grid-area: 6 / span 2 / auto / auto;
  background: #1976d2;
}

#stripes :nth-child(6) {
  grid-area: 7 / span 4 / auto / auto;
  background: #1976d2;
}
</style>
