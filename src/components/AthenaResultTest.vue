<template>
  <v-container>
    <v-layout
      text-center
      row
    >
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          This is pulling a result csv from AWS Athena
        </h1>
        <p class="subheading font-weight-regular">
          Also playing with visualization
        </p>
      </v-flex>
      <v-flex>
        <GChart
          type="ColumnChart"
          :data="dataTable"
          :options="chartOptions"
        />
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'AthenaResultTest',
  components: {
    
  },
  data: () => ({
    dataTable: [],
    samplechartData: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    chartOptions: {
        chart: {
          title: 'Number of unique Visitors per day',
          subtitle: 'Week of 1-14-20',
          width: 500,
          height: 400
        }
      }
  }),
  created() {
    let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/"
    let filename = "charttest.csv"
    this.$papa.parse(base+filename, {
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        results.data.pop()
        this.dataTable = results.data
      }
    })
  },
  methods: {

  }
};
</script>
