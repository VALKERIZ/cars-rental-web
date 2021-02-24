<template>
  <div class="user-container">
    <Back />
    <div class="blank">
      <div class="item boc">
        <h4 class="name">中国银行</h4>
        <p class="id">3568 **** **** 8888</p>
      </div>
      <div class="item ccb">
        <h4 class="name">建设银行</h4>
        <p class="id">3568 **** **** 8888</p>
      </div>
      <div class="avatar-uploader">
        <div tabindex="0" class="el-upload el-upload--text">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Bank",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.blank {
  .item {
    height: 180px;
    border-radius: 10px;
    padding: 30px;
    margin-bottom: 25px;
    @include webkit(box-sizing, border-box);
    color: #fff;
  }
  .name {
    font-size: 18px;
    font-weight: bold;
  }
  .id {
    margin-top: 60px;
    font-size: 30px;
    font-family: "bahnschrift";
  }
}
.boc {
  background-color: #a41d27;
}
.ccb {
  background-color: #0c4f9e;
}
</style>
