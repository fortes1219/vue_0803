<template>
  <div class="page uploader">
    <h1>上傳機制</h1>
    <br />
    <div class="row horizontal v_center" data-width="40rem">
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    submitUpload() {
      console.log("submit")
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleChange(file, fileList) {
      console.log('upload obj: ',file, fileList)
    }
  }
}
</script>