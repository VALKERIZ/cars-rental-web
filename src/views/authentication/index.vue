<template>
  <div class="user-container">
    <Back />
    <ul class="menu">
      <li :class="{ current: type === 'identity' }" @click="tab('identity')">
        身份证上传
      </li>
      <li :class="{ current: type === 'drive' }" @click="tab('drive')">
        驾驶证上传
      </li>
    </ul>
    <div class="upload-wrap" v-for="(item, index) in imgType" :key="index">
      <Upload ref="upload" />
      <p class="text">{{ item }}</p>
    </div>
    <div class="blank-40"></div>
    <el-button type="primary" class="button-block" round
      >提交{{ text }}认证</el-button
    >
  </div>
</template>
<script>
import Upload from "@/components/upload";
export default {
  name: "Authentication",
  components: { Upload },
  data() {
    return {
      type: "identity",
      text: "",
      imgType: ["正面", "反面", "手持免冠"],
    };
  },
  methods: {
    tab(type) {
      this.type = type;
      if (type == "identity") {
        this.text = "身份证";
      } else {
        this.text = "驾驶证";
      }
      this.$refs.upload.forEach((i) => {
        i.imageUrl = "";
      });
    },
  },
};
</script>
<style lang="scss">
.menu {
  text-align: center;
  margin-bottom: 40px;
  li {
    display: inline-block;
    position: relative;
    font-size: 14px;
    opacity: 0.5;
    padding: 0 40px 15px;
    color: #fff;
    cursor: pointer;
    &.current {
      opacity: 1;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -15px;
        width: 30px;
        height: 4px;
        border-radius: 10px;
        background-color: #00a3ff;
      }
    }
  }
}
.upload-wrap {
  .text {
    padding: 15px 0;
    color: #fff;
    opacity: 0.5;
    text-align: center;
  }
}
</style>
