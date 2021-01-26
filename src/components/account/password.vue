<template>
  <el-form-item
    prop="password"
    :rules="[{ validator: validatePassword, trigger: 'blur' }]"
  >
    <el-input
      type="password"
      v-model="password"
      :placeholder="placeholder"
      @input="enterInput"
      clearable
      maxlength="20"
    ></el-input>
  </el-form-item>
</template>

<script>
import { validate_password } from "@/utils/validate";
export default {
  name: "Password",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "密码",
    },
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    validatePassword(rule, value, callback) {
      // 校验规则
      if (!this.password || this.password == "") {
        return callback(new Error("密码不能为空"));
      } else if (!validate_password(this.password)) {
        return callback(new Error("密码为6~20的英文和数字组合"));
      } else {
        callback();
      }
    },
    enterInput() {
      this.$emit("update:value", this.password);
    },
  },
};
</script>
<style lang="scss" scoped></style>
