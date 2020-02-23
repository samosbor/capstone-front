<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="3">
        <h1 class="display-2 font-weight-bold mb-3">
          Campaigns
        </h1>
        <createCampaign/>
        <v-card class="my-5">
          <v-card-title> Select a Campaign</v-card-title>
          <v-list v-model="campaigns">
            <v-list-item
              v-for="(campaign, i) in campaigns"
              :key="i"
              @click="setCampaign(campaign)"
            >
            <v-list-item-title>{{campaign}}</v-list-item-title>

            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import exportService from '@/misc/exportService.js'
import { dataStore } from '@/misc/dataStore'
import createCampaign from '@/components/createCampaign.vue'
export default {
  name: 'Campaigns',
  components: {
    createCampaign
  },
  data: () => ({
    storeName: dataStore.currentStoreName,
    campaigns: [],
    selectedCampaign: ""
  }),
  computed: {
    
  },
  created() {
    this.getCampaigns()
  },
  methods: {
    setCurrentDate () {
      var today = new Date()
      var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate()
      this.date = date
    },
    getCampaigns() {
      let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/"
      let prefix = "athena-query-logs/" + this.storeName + "/campaigns/"
      this.axios.get(base+"?prefix="+prefix)
        .then((response) => {
          var parser = new DOMParser();
          let data = parser.parseFromString(response.data, "text/xml")
          let keys = data.getElementsByTagName("Key")
          let c = []
          keys.forEach(key => {
            if(key.innerHTML.endsWith('/')) {
              let parsed = key.innerHTML.match(/\/campaigns\/(.+)\//)
              if (parsed && parsed.length > 0){
                c.push(parsed[1])
              }
            }
          });
          this.campaigns = c
        })
        .catch((error) => {
          this.campaigns = []
      })
    },
    setCampaign(campaign) {
      this.selectedCampaign = campaign
    }
  }
};
</script>
