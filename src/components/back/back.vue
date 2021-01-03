<template>
  <div class="header-back">
    <div class="back">
      <i class="icon"></i>
      <h4 class="title">{{ column }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Back",
  props: {
    column: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.header-back {
  position: relative;
  padding-bottom: 150px;
}
.back {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
}
.title {
  margin-left: 30px;
  color: #fff;
  font-size: 16px;
}
.icon {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  left: 0;
  cursor: pointer;
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: 0;
    top: 12px;
    width: 12px;
    height: 12px;
    border-left: 2px solid #00a3ff;
    border-bottom: 2px solid #00a3ff;
    @include webkit(transform, rotate(45deg));
  }
}
</style>
