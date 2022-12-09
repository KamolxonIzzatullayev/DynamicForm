<template>
  <div class="home">
    <div class="home-header">
      <label for="lines">How many rows will be in the form?</label>
      <p>(If you change the number all the data will be cleaned !!!)</p>
      <input
        type="number"
        id="lines"
        v-model="lineNumbers"
        @change="creatingLines"
        min="0"
      />
    </div>

    <div class="home-body">
      <ul class="home-body__list">
        <li
          class="home-body__list-item"
          v-for="(line, index) in lines"
          :key="index"
        >
          <label for="elements">How many element will be in this row?</label>
          <p>(If you change the number all the data will be cleaned !!!)</p>
          <input
            type="number"
            id="elements"
            v-model="line.numberOfElements"
            min="0"
            @change="elementNumbers(index)"
          />

          <div class="elements">
            <table v-if="line.elements ? line.elements.length : 0">
              <tr>
                <th>Label</th>
                <th>Value</th>
              </tr>
              <tr v-for="(elem, index) in line.elements" :key="index">
                <td><input type="text" v-model="elem.label" /></td>
                <td>
                  <select v-model="elem.value">
                    <option disabled value="0">Select a feature</option>
                    <option value="1">Input type text</option>
                    <option value="2">Input type date</option>
                    <option value="3">Input type password</option>
                    <option value="4">Input type radio</option>
                    <option value="5">Input type checkbox</option>
                  </select>
                </td>
              </tr>
            </table>
          </div>
        </li>
      </ul>
    </div>

    <p class="error" v-if="errorVisible">{{ errorText }}</p>

    <div class="home-footer">
      <button @click="seeResult">See result</button>
      <button @click="seeConf">See configuration</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      lineNumbers: 0,
      lines: [],
      errorVisible: false,
      errorText: "",
    };
  },

  computed: {
    data() {
      return this.$store.getters.getResult;
    },
  },

  methods: {
    creatingLines() {
      this.lines = [];
      for (let index = 0; index < this.lineNumbers; index++) {
        this.lines[index] = {
          numberOfElements: 0,
          elements: [],
        };
      }
    },
    elementNumbers(ind) {
      this.lines[ind].elements = [];
      for (let index = 0; index < this.lines[ind].numberOfElements; index++) {
        this.lines[ind].elements[index] = {
          label: "",
          value: 0,
        };
      }
    },

    seeResult() {
      if (this.lineNumbers == "" || this.lineNumbers == 0) {
        this.errorVisible = true;
        this.errorText = "The number of the rows must be minimum 1";
      } else {
        this.errorVisible = false;
        let a = false;
        this.lines.forEach((element) => {
          if (element.elements.length) {
            a = true;
          } else {
            if (a == true) {
              a = false;
            }
          }
        });

        if (a) {
          this.errorVisible = false;
          let b = false;

          this.lines.forEach((element) => {
            element.elements.forEach((elem) => {
              if (
                elem.label == "" ||
                elem.label.trim() == "" ||
                elem.value == 0
              ) {
                b = true;
              } else {
                if (b == true) {
                  b = false;
                }
              }
            });
          });

          if (b) {
            this.errorVisible = true;
            this.errorText = "The number of the elements data must be filled";
          } else {
            this.$store.commit("SET_RESULT", this.lines);
            this.$router.push("/result");
          }
        } else {
          this.errorVisible = true;
          this.errorText =
            "The number of the elements inside rows must be minimum 1";
        }
      }
    },
    seeConf() {
      if (this.lines.length) {
        const data = JSON.stringify(this.lines);
        const blob = new Blob([data], { type: "text/plain" });
        const e = document.createEvent("MouseEvents"),
          a = document.createElement("a");
        a.download = "test.json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        e.initEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        a.dispatchEvent(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./HomeView.style.scss";
</style>
