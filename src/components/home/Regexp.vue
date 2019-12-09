<template>
  <div class="page el-customize">
    <h1>正則表單驗證範例</h1>
    <br>
    <!--不使用element UI 內建驗證的表單-->
    <el-form :model="form2" label-width="100px" data-width="30rem">
      <el-form-item label="姓名">
        <el-input v-model="form.name.value" type="text" placeholder="請輸入姓名" />
        <div class="el-form-item__error">{{ form.name.msg }}</div>
      </el-form-item>
      <el-form-item label="電話號碼">
        <el-input v-model="form.tel.value" type="text" placeholder="請輸入電話號碼: 02-23033824" @change="nativeValidate(form, 'tel')" />
        <div class="el-form-item__error">{{ form.tel.msg }}</div>
      </el-form-item>
      <el-form-item label="手機號碼">
        <el-input v-model="form.phone.value" type="text" placeholder="請輸入手機號碼: 0987-987-987" @change="nativeValidate(form, 'phone')" />
        <div class="el-form-item__error">{{ form.phone.msg }}</div>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email.value" type="text" placeholder="請輸入電子信箱地址" @change="nativeValidate(form, 'email')" />
        <div class="el-form-item__error">{{ form.email.msg }}</div>
      </el-form-item>
      <el-form-item label="個人網站">
        <el-input v-model="form.url.value" type="text" placeholder="個人網站網址" @change="nativeValidate(form, 'url')" />
        <div class="el-form-item__error">{{ form.url.msg }}</div>
      </el-form-item>
      <div class="row horizontal end">
        <el-button @click="nativeSubmit" :disabled="submitDisabled">SUBMIT</el-button>
      </div>
    </el-form>
    <br>
    <!--使用element UI 內建驗證 v-bind:rules-->
    <el-form :model="form2" :rules="rules" ref="loginForm" label-width="100px" data-width="30rem">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form2.name" type="text" placeholder="請輸入姓名" />
      </el-form-item>
      <el-form-item label="電話號碼" prop="tel">
        <el-input v-model="form2.tel" type="text" placeholder="請輸入電話號碼" />
      </el-form-item>
      <el-form-item label="手機號碼" prop="phone">
        <el-input v-model="form2.phone" type="text" placeholder="請輸入手機號碼" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form2.email" type="text" placeholder="請輸入電子信箱地址" />
      </el-form-item>
      <el-form-item label="個人網站" prop="url">
        <el-input v-model="form2.url" type="text" placeholder="個人網站網址"/>
      </el-form-item>
      <div class="row horizontal end">
        <el-button type="primary" @click="submit('loginForm')">SUBMIT</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { reg_telTaipei, reg_phoneType1, reg_email, reg_url } from "../../utils/validate";
export default {
  data() {
    return {
      form: {
        name: { value: '', msg: '' },
        tel: { value: '', msg: '' },
        phone: { value: '', msg: '' },
        email: { value: '', msg: '' },
        url: { value: '', msg: '' },
      },
      submitDisabled: true,
      form2: {
        name: '',
        tel: '',
        phone: '',
        email: '',
        url: '',
      },
      rules: {
        tel: [{
          required: true,
          pattern: /\d{2}-[2]\d{7}/,
          message: "電話號碼格式錯誤",
          trigger: "blur"
        }],
        phone: [{
          required: true,
          pattern: /\d{4}-\d{3}-\d{3}/,
          message: "手機號碼格式錯誤",
          trigger: "blur"
        }],
        email: [{
          required: true,
          pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
          message: "Email格式錯誤",
          trigger: "blur"
        }],
        url: [{
          required: true,
          pattern: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
          message: "網址格式錯誤",
          trigger: "blur"
        }]
      }
    };
  },

  computed: {

  },

  methods: {
    // native validate
    nativeValidate(target, key) {
      let checkTel = reg_telTaipei(target.tel.value)
      let checkPhone = reg_phoneType1(target.phone.value)
      let checkEmail = reg_email(target.email.value)
      let checkURL = reg_url(target.url.value)
      const arr = [checkTel, checkPhone, checkEmail, checkURL]
      switch (key) {
        case 'tel':
          checkTel == true ? target.tel.msg = '' : target.tel.msg = '電話號碼格式錯誤或未輸入'
          break
        case 'phone':
          checkPhone == true ? target.phone.msg = '' : target.phone.msg = '手機號碼格式錯誤或未輸入'
          break
        case 'email':
          checkEmail == true ? target.email.msg = '' : target.email.msg = 'Email格式錯誤或未輸入'
          break
        case 'url':
          checkURL == true ? target.url.msg = '' : target.url.msg = '網址格式錯誤或未輸入'
          break
      }
      let result = arr.find((item) => {
        return item == false
      })

      // this.form.status = !result
      result == undefined ? this.submitDisabled = false : this.submitDisabled = true

      console.log('form: ', arr, result)
    },
    nativeSubmit() {
      if (!this.submitDisabled) {
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
    },

    // element UI validate
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
          return false
        }
      })
    },
  },

  created() {

  }
};
</script>