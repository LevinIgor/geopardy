<template>
  <V-table :table="property.scenario.table" @tableClick="tableClick($event)" />
</template>

<script>
export default {
  name: "Table",
  props: ["property"],
  methods:{
    tableClick(event){
      console.log("tableClick", event);
      var score = this.property.scenario.table[event[0]].cols[event[1]].score
      var type =  this.property.scenario.table[event[0]].cols[event[1]].type
 
      score != 0 ? this.$emit("event", {view:'GameViewsQuestions', type:type, index:[event[0],event[1]]}) :''
    }
  }
}

</script>

<style></style>
