<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">
          Campaigns
        </h1>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">New Campaign</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Campaign</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="campaignName"
                    label="Campaign Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="startdatemenu"
                    v-model="startdatemenu"
                    :close-on-content-click="false"
                    :return-value.sync="startdate"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="startdate"
                        label="Start Date"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="startdate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="startdatemenu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.startdatemenu.save(startdate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="enddatemenu"
                    v-model="enddatemenu"
                    :close-on-content-click="false"
                    :return-value.sync="enddate"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="enddate"
                        label="End Date"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="enddate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="enddatemenu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.enddatemenu.save(enddate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="compareTo"
                    :items="['All other data','A different date range']"
                    label="Compare to"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="submitCampaign">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import exportService from '@/misc/exportService.js'
export default {
  name: 'Campaigns',
  components: {
    
  },
  data: () => ({
    dialog: false,
    startdatemenu: false,
    enddatemenu: false,
    startdate: "",
    enddate: "",
    compareTo: ""
  }),
  computed: {
    
  },
  created() {
    
  },
  methods: {
    submitCampaign() {
      this.dialog = false

    },
    setCurrentDate () {
      var today = new Date()
      var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate()
      this.date = date
    },
    exportToCsv() {
      exportService.exportToCSV(this.storeName + "_" + this.query + "_" + this.date, this.dataTable)
    }
  }
};
</script>
