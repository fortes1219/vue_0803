<template>
  <div class="page el-customize">
    <h1>正則表單驗證範例</h1>
    <el-form :model="form" :rules="rules" ref="loginForm">
      <el-form-item label="URL" prop="url">
        <el-input v-model="form.url" type="text" placeholder="URL" />
      </el-form-item>
      <p v-if="checkURL==false">{{ errMessage }}</p>
      <el-button type="primary" @click="submit('loginForm')">SUBMIT</el-button>
      <el-button @click="nativeSubmit">SUBMIT</el-button>
    </el-form>
  </div>
</template>

<script>
import { reg_url } from "../../utils/validate";
export default {
  data() {
    return {
      form: {
        url: ""
      },
      rules: {
        url: [{ required: true, message: "請務必輸入URL", trigger: "blur" }]
      },
      errMessage: "",
      checkURL: true
    };
  },

  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        console.log("valid: ", valid)
        if (valid) {
          this.$message({
            message: "登入成功",
            type: "success"
          })
        } else {
          this.$message({
            message: "登入失敗",
            type: "warning"
          })
          return false;
        }
      })
    },

    nativeSubmit() {
      this.checkURL = reg_url(this.form.url)
      if (this.checkURL) {
        this.$message({
          message: "登入成功",
          type: "success"
        })
      } else {
        this.$message({
          message: "登入失敗",
          type: "warning"
        })
      }
      console.log(reg_url(this.form.url))
    }
  }
};
</script>