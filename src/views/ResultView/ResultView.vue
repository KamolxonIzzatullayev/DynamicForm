<template>
  <div v-if="data.length" class="result">
    <div class="form">
      <h1>Fill the form</h1>
      <ul class="form-list">
        <li class="form-list__item" v-for="(item, index) in data" :key="index">
          <div
            class="form-list__item-element"
            v-for="(element, ind) in item.elements"
            :key="ind"
          >
            <input
              type="radio"
              v-if="element.value == 4"
              :id="`input${index}${ind}`"
            />
            <input
              type="checkbox"
              v-if="element.value == 5"
              :id="`input${index}${ind}`"
            />
            <label :for="`input${index}${ind}`">{{ element.label }}</label>
            <input
              v-if="element.value == 1"
              type="text"
              :id="`input${index}${ind}`"
            />
            <input
              v-if="element.value == 2"
              type="date"
              :id="`input${index}${ind}`"
            />
            <input
              v-if="element.value == 3"
              type="password"
              :id="`input${index}${ind}`"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <h1>Please fill the form first !!!</h1>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.getters.getResult;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.data.length) {
      const answer = window.confirm(
        "Do you really want to leave? All the things will be deleted !!!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>

<style scoped lang="scss">
@import "./ResultView.style.scss";
</style>
