<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          This is a CSV test from AWS
        </h1>
        <p class="subheading font-weight-regular">
          Testing hitting the bucket with correct credentials
        </p>
      </v-flex>

      <div>{{file}}</div>

    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'CsvTest',
  components: {
    
  },
  data: () => ({
    file: {}
  }),
  created() {
    let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/"
    let filename = "/root/logs/log-send.csv"
    this.axios.get(base+filename)
      .then(response => (this.file = response.data))
      .catch((error) => {
    })
  },
  methods: {

  }
};
</script>
