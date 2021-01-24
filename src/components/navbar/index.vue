<template>
  <div class="navbar-index">
    <ul>
      <li><i class="icon icon-w-h-44 icon-help"></i></li>
      <li><i class="icon icon-w-h-44 icon-search"></i></li>
      <li>
        <a href="javascript: void(0);" class="select-car-btn">选择车辆</a>
      </li>
      <li>
        <i class="icon icon-w-h-44 icon-location" @click="selfLocation"></i>
      </li>
      <li><i class="icon icon-w-h-44 icon-user" @click="toUser"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  mounted() {
    document.addEventListener("mouseup", (e) => {
      const userView = document.getElementById("user-view");
      const name = this.$route.name;
      if (name !== "Index" && !userView.contains(e.target)) {
        this.$router.push({
          name: "Index",
        });
      }
    });
  },
  methods: {
    toUser() {
      this.$router.push({
        name: "User",
      });
    },
    selfLocation() {
      this.$store.commit("location/SELF_LOCATION");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-index {
  position: fixed;
  left: 0;
  bottom: 86px;
  right: 0;
  z-index: 10;
  text-align: center;
  li {
    display: inline-block;
  }
  .icon {
    vertical-align: middle;
    margin: 0 17px;
    cursor: pointer;
    border-radius: 100px;
    background-color: $color-main;
  }
}
</style>
