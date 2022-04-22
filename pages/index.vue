<template>
  <div class="container">
    <div class="variant-selector">
      <select class="select-css">
        <option>This is a native select element</option>
        <option>Apples</option>
        <option>Bananas</option>
        <option>Grapes</option>
        <option>Oranges</option>
      </select>
      <div class="buttons">
        <button class="btn">Добавить</button>
        <button class="btn">Редактировать</button>
        <button class="btn">Удалить</button>
      </div>
    </div>
    <div class="commands">
      <div class="command">
        <img src="../../dossier/static/img/add-user.png" alt="" />
        <input type="text" placeholder="Название" />
      </div>
      <div class="command">
        <img src="../../dossier/static/img/add-user.png" alt="" />
        <input type="text" placeholder="Название" />
      </div>
      <div class="command">
        <img src="../../dossier/static/img/add-user.png" alt="" />
        <input type="text" placeholder="Название" />
      </div>
    </div>
    <button class="run" @click="gotoGamePage()">Начать</button>
  </div>
</template>

<script>
export default {
  methods:{
    gotoGamePage(){
      this.$router.push('/game');
    }
  }
};
</script>
<style scoped>
img {
  width: 200px;
}
input {
  border: none;
  outline: none;
  text-align: center;
  padding: 5px;
}
.container {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--color-form-main);
  min-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.variant-selector {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-form-secondary);
  padding: 10px;
}
.commands {
  display: flex;
  justify-content: space-between;
}
.command {
  display: flex;
  flex-direction: column;
  background-color: beige;
  margin: 20px;
}
</style>
