<template>
  <el-form-item
    id="passwordConfirm"
    prop="passwordConfirm"
    :rules="[{ validator: validatePassword, trigger: 'blur' }]"
  >
    <el-input
      type="password"
      v-model="passwordConfirm"
      :placeholder="placeholder"
      @input="enterInput"
      clearable
      maxlength="20"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "PasswordConfirm",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "确认密码",
    },
    // 接收“密码”的值
    password: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      passwordConfirm: "",
    };
  },
  methods: {
    validatePassword(rule, value, callback) {
      // 校验规则
      if (!this.passwordConfirm || this.passwordConfirm == "") {
        return callback(new Error("密码不能为空"));
      } else if (this.passwordConfirm != this.password) {
        return callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    },
    enterInput() {
      this.$emit("update:value", this.passwordConfirm);
    },
  },
  watch: {
    password: {
      handler(newValue) {
        const errorDom = document
          .getElementById("passwordConfirm")
          .querySelector(".el-form-item__error");
        if (newValue == this.passwordConfirm) {
          if (errorDom) {
            errorDom.style.display = "none";
          }
        } else {
          if (errorDom) {
            errorDom.style.display = "block";
          }
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped></style>
