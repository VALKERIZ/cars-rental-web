<template>
  <div class="user-container">
    <Back />
    <div class="form-ui">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="原始密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="验证码"></el-input>
          <button class="button-vcode" type="button">获取验证码</button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-block"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reset",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss"></style>
