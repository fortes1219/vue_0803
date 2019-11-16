<template>
  <div class="page vue_i18n">
    <h1>{{ $t('header') }}</h1>
    <br />
    <div class="row horizontal v_center">
      <el-form style="width: 500px;">
        <el-form-item label="選擇語言">
          <el-select v-model="langSelect.select" :placeholder="$t('please_select')" clearable>
            <el-option
              v-for="(item, index) in langSelect.items"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
          <el-button
            type="primary"
            @click="changeLanguage(langSelect.select)"
          >{{ $t('change_language') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { getLanguage, setLanguage } from "../../lang"
export default {
  name: "VueI18n",
  data() {
    return {
      langSelect: {
        select: "",
        items: [
          { value: "zh_tw", label: this.$t("locale_zh_tw") },
          { value: "en", label: this.$t("locale_en") },
          { value: "jp", label: this.$t("locale_jp") }
        ]
      }
    }
  },

  methods: {
    changeLanguage(val) {
      setLanguage(val)
      location.reload()
    }
  },

  created() {
    getLanguage
  }
};
</script>
