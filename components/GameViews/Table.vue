<template>
  <V-table :table="property.table" @tableClick="tableClick($event)" />
</template>

<script>
export default {
  name: "Table",
  props: ["property"],
  methods:{
    tableClick(event){
      var score = this.property.table[event[0]].cols[event[1]].score 
      score != 0 ? this.$emit("event", {type:'showQuestion', index:[event[0],event[1]]}) :''
    }
  }
}

</script>

