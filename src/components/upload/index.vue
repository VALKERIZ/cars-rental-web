<template>
  <el-upload
    class="avatar-uploader"
    action="https://up-z2.qiniup.com"
    :data="uploadData"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    v-if="show"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      imageUrl: "",
      uploadData: {
        token: this.$store.state.upload.qiniu_token,
      },
      show: false,
    };
  },
  beforeMount() {
    if (
      !this.$store.state.upload.qiniu_token &&
      !this.$store.state.upload.isRequest
    ) {
      this.$store.dispatch("upload/getQiniuToken");
    }
  },
  methods: {
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let fileName = file.name;
      let key = encodeURI(fileName);
      this.uploadData.key = key;
      return isJPG && isLt2M;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = `http://ql1yue6tv.hn-bkt.clouddn.com/${res.key}`;
      this.$emit("update:imgUrl", this.imageUrl);
    },
  },
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
  },
  watch: {
    imgUrl: {
      immediate: true,
      handler(newV) {
        if (newV !== this.imageUrl) {
          this.imageUrl = newV;
        }
      },
    },
    "$store.state.upload.qiniu_token": {
      immediate: true,
      handler(newV) {
        if (newV) {
          this.uploadData.token = newV;
          this.show = true;
        }
      },
    },
  },
};
</script>
<style lang="scss"></style>
