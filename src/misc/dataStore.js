import Vue from "vue";

export const dataStore = Vue.observable({
  ownedStores: [{storeName: "store_name_1", readableName: "Store Name", readableSubName: "1", displayName: "Store Name 1"},
                {storeName: "heritage_15", readableName: "Heritage", readableSubName: "15", displayName: "Heritage 15"},
                {storeName: "heritage_16", readableName: "Heritage", readableSubName: "16", displayName: "Heritage 16"},
                {storeName: "sams_house", readableName: "Sam's House", readableSubName: "", displayName: "Sam's House"}],
  currentStore: {storeName: "store_name_1", readableName: "Store Name", readableSubName: "1", displayName: "Store Name 1"},
  currentStoreName: "store_name_1",
  user: {
    userName: "Mr Store Owner",
    email: "storeOwner@gmail.com"
  },
  authenticated: false,
  mockAccount: {
      username: "kendall",
      password: "password"
  }

});