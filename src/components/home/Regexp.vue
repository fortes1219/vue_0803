<template>
  <div class="page el-customize">
    <h1>正則表單驗證範例</h1>
    <br>
    <!--不使用element UI 內建驗證的表單-->
    <el-form :model="form2" label-width="8rem" data-width="30rem">
      <el-form-item :label="$t('form_name')">
        <el-input
          v-model="form.name.value"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_name') + $t('placeholder.enter') : $t('placeholder.enter') + $t('form_name')"
        />
        <div class="el-form-item__error">{{ form.name.msg }}</div>
      </el-form-item>
      <el-form-item :label="$t('form_tel')">
        <el-input
          v-model="form.tel.value"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_tel') + $t('placeholder.enter') + ' ex: 02-23033824' :
          $t('placeholder.enter') + $t('form_tel') + ' ex: 02-23033824' "
          @change="nativeValidate(form, 'tel')"
        />
        <div class="el-form-item__error">{{ form.tel.msg }}</div>
      </el-form-item>
      <el-form-item :label="$t('form_phone')">
        <el-input
          v-model="form.phone.value"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_phone') + $t('placeholder.enter') + ' ex: 0987-987-987' :
          $t('placeholder.enter') + $t('form_phone') + ' ex: 0987-987-987' "
          @change="nativeValidate(form, 'phone')"
        />
        <div class="el-form-item__error">{{ form.phone.msg }}</div>
      </el-form-item>
      <el-form-item :label="$t('form_email')">
        <el-input
          v-model="form.email.value"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_email') + $t('placeholder.enter') :
          $t('placeholder.enter') + $t('form_email') "
          @change="nativeValidate(form, 'email')"
        />
        <div class="el-form-item__error">{{ form.email.msg }}</div>
      </el-form-item>
      <el-form-item :label="$t('form_website')">
        <el-input
          v-model="form.url.value"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_website') + $t('placeholder.enter') :
          $t('placeholder.enter') + $t('form_website') "
          @change="nativeValidate(form, 'url')"
        />
        <div class="el-form-item__error">{{ form.url.msg }}</div>
      </el-form-item>
      <div class="row horizontal end">
        <el-button :disabled="submitDisabled" @click="nativeSubmit">SUBMIT</el-button>
      </div>
    </el-form>
    <br>
    <!--使用element UI 內建驗證 v-bind:rules-->
    <el-form ref="loginForm" :model="form2" :rules="rules" label-width="100px" data-width="30rem">
      <el-form-item :label="$t('form_name')" prop="name">
        <el-input
          v-model="form2.name"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_name') + $t('placeholder.enter') : $t('placeholder.enter') + $t('form_name')"
        />
      </el-form-item>
      <el-form-item :label="$t('form_tel')" prop="tel">
        <el-input
          v-model="form2.tel"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_tel') + $t('placeholder.enter') + ' ex: 02-23033824' :
          $t('placeholder.enter') + $t('form_tel') + ' ex: 02-23033824' "
        />
      </el-form-item>
      <el-form-item :label="$t('form_phone')" prop="phone">
        <el-input
          v-model="form2.phone"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_phone') + $t('placeholder.enter') + ' ex: 0987-987-987' :
          $t('placeholder.enter') + $t('form_phone') + ' ex: 0987-987-987' "
        />
      </el-form-item>
      <el-form-item :label="$t('form_email')" prop="email">
        <el-input
          v-model="form2.email"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_email') + $t('placeholder.enter') :
          $t('placeholder.enter') + $t('form_email') "
        />
      </el-form-item>
      <el-form-item :label="$t('form_website')" prop="url">
        <el-input
          v-model="form2.url"
          type="text"
          :placeholder="lang === 'jp' ?
          $t('form_website') + $t('placeholder.enter') :
          $t('placeholder.enter') + $t('form_website') "
        />
      </el-form-item>
      <div class="row horizontal end">
        <el-button type="primary" @click="submit('loginForm')">SUBMIT</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  reg_telTaipei,
  reg_phoneType1,
  reg_email,
  reg_url
} from '../../utils/validate'
import { getLanguage, setLanguage } from '../../lang'
export default {
  data() {
    return {
      lang: '',
      form: {
        name: { value: '', msg: '' },
        tel: { value: '', msg: '' },
        phone: { value: '', msg: '' },
        email: { value: '', msg: '' },
        url: { value: '', msg: '' }
      },
      submitDisabled: true,
      form2: {
        name: '',
        tel: '',
        phone: '',
        email: '',
        url: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: this.i18nIsRequired(this.$t('form_name')),
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            pattern: /\d{2}-[2]\d{7}/,
            message: this.i18nFormatError(this.$t('form_tel')),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            pattern: /\d{4}-\d{3}-\d{3}/,
            message: this.i18nFormatError(this.$t('form_phone')),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
            message: this.i18nFormatError(this.$t('form_email')),
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            pattern: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
            message: this.i18nFormatError(this.$t('form_website')),
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {},

  created() {
    this.dataGetLanguage()
  },

  methods: {
    // get lang
    dataGetLanguage() {
      this.lang = getLanguage()
      console.log('lang: ', this.lang)
    },
    // native validate
    nativeValidate(target, key) {
      const checkTel = reg_telTaipei(target.tel.value)
      const checkPhone = reg_phoneType1(target.phone.value)
      const checkEmail = reg_email(target.email.value)
      const checkURL = reg_url(target.url.value)
      const arr = [checkTel, checkPhone, checkEmail, checkURL]
      switch (key) {
        case 'tel':
          checkTel === true
            ? (target.tel.msg = '')
            : (target.tel.msg = this.i18nFormatError(this.$t('form_tel')))
          break
        case 'phone':
          checkPhone === true
            ? (target.phone.msg = '')
            : (target.phone.msg = '手機號碼格式錯誤或未輸入')
          break
        case 'email':
          checkEmail === true
            ? (target.email.msg = '')
            : (target.email.msg = 'Email格式錯誤或未輸入')
          break
        case 'url':
          checkURL === true
            ? (target.url.msg = '')
            : (target.url.msg = '網址格式錯誤或未輸入')
          break
      }
      const result = arr.find(item => {
        return item === false
      })

      // this.form.status = !result
      result === undefined
        ? (this.submitDisabled = false)
        : (this.submitDisabled = true)

      console.log('form: ', arr, result)
    },
    nativeSubmit() {
      if (!this.submitDisabled) {
        this.$message({
          message: '登入成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '登入失敗',
          type: 'warning'
        })
      }
    },

    // element UI validate
    submit(formName) {
      this.$refs[formName].validate(valid => {
        console.log('valid: ', valid)
        if (valid) {
          this.$message({
            message: '登入成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '登入失敗',
            type: 'warning'
          })
          return false
        }
      })
    },

    // i18n parser
    i18nFormatError(val) {
      const regex = /var_1/g
      const text = this.$t('input_format_error').toString().replace(regex, val)
      return text
    },
    i18nIsRequired(val) {
      const regex = /var_1/g
      const text = this.$t('input_required').toString().replace(regex, val)
      console.log(val)
      return text
    }
  }
}
</script>
