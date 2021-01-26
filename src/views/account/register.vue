<template>
  <div class="user-container">
    <Back>
      <template v-slot:navHeaderRight>
        <router-link to="/login" class="color-white opacity-4"
          >登录</router-link
        >
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <Username :value.sync="form.username" />
        <Password :value.sync="form.password" />
        <PasswordConfirm
          :password="form.password"
          :value.sync="form.passwordConfirm"
        />
        <Code :username="form.username" :value.sync="form.code" />
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-black"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Username from "@/components/account/username";
import Password from "@/components/account/password";
import PasswordConfirm from "@/components/account/passwordConfirm";
import Code from "@/components/code/";

// sha1
import sha1 from "js-sha1";
export default {
  name: "Register",
  components: { Username, Code, Password, PasswordConfirm },
  data() {
    return {
      form: {
        username: "",
        password: "",
        passwordConfirm: "",
        code: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册
    register() {
      const requestData = {
        username: this.form.username,
        password: sha1(this.form.password), // md5，sha1
        code: this.form.code,
      };
      this.$store
        .dispatch("account/registerAction", requestData)
        .then((response) => {
          this.$message({
            type: "success",
            message: response.message,
          });
          this.$router.replace({
            name: "Login",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss"></style>
