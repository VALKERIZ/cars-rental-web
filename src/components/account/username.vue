<template>
  <el-form-item
    prop="username"
    :rules="[{ validator: validateUsername, trigger: 'blur' }]"
  >
    <el-input
      v-model="username"
      :placeholder="placeholder"
      @input="enterInput"
      maxlength="11"
      clearable
    ></el-input>
  </el-form-item>
</template>

<script>
import { validate_phone } from "@/utils/validate";
export default {
  name: "Username",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "手机号",
    },
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    validateUsername(rule, value, callback) {
      if (!this.username || this.username == "") {
        return callback(new Error("手机号不能为空"));
      } else if (!validate_phone(this.username)) {
        return callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    },
    enterInput() {
      this.$emit("update:value", this.username);
    },
  },
};
</script>
<style lang="scss" scoped></style>
