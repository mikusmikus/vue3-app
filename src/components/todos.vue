<template>
  <div class="row center-xs">
    <div class="col-xs-6">
      <form action="" @submit.prevent="addNote()" class="form">
        <Input v-model:inputValue="searchText" placeholder="add note here" ref="inputRef" />
        <Button class="add__buttom" label="Add" type="submit" />
      </form>
      <Button
        v-for="name in buttonNames"
        :key="name"
        class="showButton mb-1"
        v-bind:class="{ active: whatToShow === name }"
        :label="name"
        @click="notesToShow(name)"
      />
      <transition name="switch" mode="out-in">
        <div v-if="toDoListNotes.length">
          <transition-group tag="ul" name="list" appear>
            <li v-for="item in toDoListNotes" :key="item.id">
              <label v-bind:class="{ checked: item.checked }" v-bind:for="item.id">
                {{ item.name }}
              </label>
              <input type="checkbox" v-bind:id="item.id" v-model="item.checked" :value="item" />
              <Button class="add__buttom" label="delete" @click="deleteItem(item.id)" />
            </li>
          </transition-group>
        </div>
        <h2 v-else>empty To do</h2>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Button from "./button.vue";
import Input from "./input.vue";

type Datalist = {
  id: number;
  name: string;
  checked: boolean;
};
const listItems: Datalist[] = [
  { id: 1613601718416, name: "asd", checked: false },
  { id: 1613601721047, name: "asdsdfsdf", checked: false },
  { id: 1613601722030, name: "sfasdgf", checked: false },
];

const Component = defineComponent({
  components: {
    Button,
    Input,
  },
  setup(props, { emit }) {
    const toDoList = ref<Datalist[]>(listItems);
    const buttonNames = ref<string[]>(["all", "checked", "notChecked"]);
    const searchText = ref("");
    const whatToShow = ref("all");

    const deleteItem = (id: number) => {
      const index = toDoList.value.findIndex((item) => item.id === id);
      toDoList.value.splice(index, 1);
    };

    const addNote = () => {
      if (searchText.value === "") {
        emit("badValue");
        return;
      }
      const newNote = { id: Date.now(), name: searchText.value, checked: false };
      toDoList.value.unshift(newNote);
      searchText.value = "";
    };

    const notesToShow = (text: string) => {
      whatToShow.value = text;
    };

    const toDoListNotes = computed(() => {
      if (whatToShow.value === "checked") {
        return toDoList.value.filter((item) => item.checked);
      }
      if (whatToShow.value === "notChecked") {
        return toDoList.value.filter((item) => !item.checked);
      }
      return toDoList.value;
    });
    console.log("toDoListNotes", toDoListNotes.value);
    return {
      toDoList,
      buttonNames,
      searchText,
      whatToShow,
      deleteItem,
      addNote,
      notesToShow,
      toDoListNotes,
    };
  },
});

export default Component;
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.form {
  position: relative;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}
.mb-1{
  margin-bottom: 2rem;
}
ul {
  padding: 0;
  li {
    @include theme-aware("background-color", "color-light");
    @include theme-aware("color", "color-dark");
    position: relative;
    padding: 0.4em;
    margin-bottom: 0.6em;
    border-radius: 8px;
    list-style: none;
    overflow: hidden;
    box-shadow: 2px 4px 9px -4px;
    label {
      display: block;
      font-size: 1.3em;
      width: 100%;
      margin: 2px;
      text-align: left;
      padding: 0.2em 40px;
      &.checked {
        text-decoration: line-through;
      }
    }
    input {
      position: absolute;
      border: none;
      top: 0px;
      left: 7px;
      height: 100%;
      margin: 0;
    }
  }
}
</style>
