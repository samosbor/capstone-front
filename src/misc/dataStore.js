import Vue from "vue";

export const dataStore = Vue.observable({
  ownedStores: [{storeName: "store_name_1", readableName: "Store Name", readableSubName: "1"},
                {storeName: "store_name_2", readableName: "Store Name", readableSubName: "2"},
                {storeName: "mcdonalds_freedom_blvd", readableName: "McDonald's", readableSubName: "Freedom Blvd"}],
  currentStore: {storeName: "store_name_1", readableName: "Store Name 1", readableSubName: "1"},
  currentStoreName: "store_name_1",
  user: {
    userName: "Mr Store Owner",
    email: "storeOwner@gmail.com"
  },

});