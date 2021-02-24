<template>
  <div class="user-container">
    <Back />
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <Password :value.sync="form.password" placeholder="新密码" />
        <PasswordConfirm
          :password="form.password"
          :value.sync="form.passwordConfirm"
          placeholder="确认新密码"
        />
        <Code :username="username" :value.sync="form.code" />
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
  name: "Reset",
  components: { Username, Code, Password, PasswordConfirm },
  data() {
    return {
      username: this.$store.state.account.username,
      form: {
        password: "",
        passwordConfirm: "",
        code: "",
      },
    };
  },
  // mounted() {
  //   this.form.username = this.$store.state.account.username;
  // },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.resetPassword();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.username, this.form);
    },
    // 重置密码
    resetPassword() {
      const requestData = {
        username: this.username,
        password: sha1(this.form.password), // md5，sha1
        code: this.form.code,
      };
      console.log(requestData);
      this.$store
        .dispatch("account/forgetAction", requestData)
        .then((response) => {
          this.$message({
            type: "success",
            message: response.message,
          });
          this.$store.dispatch("account/logoutAction").then(() => {
            this.$router.replace({
              name: "Login",
            });
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
