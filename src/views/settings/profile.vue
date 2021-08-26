<template>
  <div id="profile">
    <v-form autocomplete="off" ref="form">
      <div class="profile-item profile-avatar d-flex flex-clo">
        <span class="item-title title-xs">头像</span>
        <span class="text-sm text-describe">从你的设备上选取一张 JPG 或 PNG 图片作为新的头像。</span>
        <div class="item-content d-flex flex-ai">
          <div class="avatar-preview">
            <img :src="form.imgUrl" class="avatar" />
          </div>
          <v-btn color="info" class="upload-btn">
            <a @change="chooseFile" class="upload-a" href="javascript:;">
              <input class="upload-input" ref="fileInput" type="file" accept="image/png,image/jpg,image/jpeg"
                multiple="multiple" />
              上传头像
            </a>
          </v-btn>
        </div>
      </div>
      <v-dialog v-model="cropDialogVisible" persistent max-width="350">
        <v-card>
          <v-card-title class="text-h5">裁剪图片</v-card-title>
          <cropper ref="cropper" :src="cropConf.cropUrl" v-if="cropConf.cropVisible"></cropper>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="closeCrop">取消</v-btn>
            <v-btn color="primary" text @click="crop">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="profile-item profile-nickname d-flex flex-clo">
        <span class="item-title title-xs">昵称</span>
        <v-text-field solo label="请填写昵称" hint="昵称长度小于25" background-color="info" v-model="form.nickname"
          :rules="rules.nickname"></v-text-field>
      </div>
      <div class="profile-item profile-about d-flex flex-clo">
        <span class="item-title title-xs">关于你</span>
        <v-textarea solo label="让别人更加了解你" :rules="rules.about" background-color="info" max-length="150" counter="150"
          rows="3" no-resize v-model="form.about">
        </v-textarea>
      </div>
      <div class="profile-item profile-about d-flex flex-clo">
        <span class="item-title title-xs">邮箱</span>
        <v-text-field solo label="你的联系邮箱" :rules="rules.email" background-color="info" v-model="form.email">
        </v-text-field>
      </div>
      <v-btn color="primary" block x-large :loading="loading" @click="save">保存</v-btn>
    </v-form>
  </div>
</template>

<script>
import regexpList from '@utils/regexp'
import Cropper from '@components/cropper'
export default {
  data() {
    return {
      form: {
        imgUrl: 'https://cdn.vuetifyjs.com/images/john.jpg',
        nickname: 'lliiooiill',
        about: '',
        email: '',
      },
      rules: {
        nickname: [
          (v) => !!v || '请填写昵称',
          (v) => (v && v.length <= 25) || '昵称长度不能大于25！',
        ],
        about: [(v) => v.length <= 150 || '关于内容长度不能超过150！'],
        email: [(v) => !v || regexpList.email.test(v) || '邮箱格式错误！'],
      },
      loading: false,
      cropDialogVisible: false,
      cropConf: {
        cropUrl: '',
        cropVisible: false,
      },
    }
  },
  methods: {
    chooseFile() {
      // 获取上传文件，判断文件是否满足要求，打开裁切窗口
      const input = this.$refs.fileInput
      const files = input.files
      if (!files.length) return void 0
      const file = files[0]
      if (!this.judgeFormatAndSize(file)) return void 0
      this.cropConf.cropUrl = URL.createObjectURL(file)
      this.cropDialogVisible = true
      this.cropConf.cropVisible = false
      this.$nextTick(() => {
        this.cropConf.cropVisible = true
      })
    },
    judgeFormatAndSize(file) {
      /**
       * 检测图片的格式和大小是否满足要求
       * 格式：jpg/png
       * 大小：小于等于2MB
       */
      const formatList = ['image/jpeg', 'image/png', 'image/jpg']
      const allow = formatList.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 <= 2
      if (!allow) {
        this.$alert({
          content: '文件格式错误！',
          showCancel: false,
        })
      } else if (!isLt2M) {
        this.$alert({
          content: '图片大小不能超过2M！',
          showCancel: false,
        })
      }
      return allow && isLt2M
    },
    getCroppedImage(sourceCanvas) {
      /**
       * 获取裁切好的图片
       * 将图片分辨率变成150*150(分辨率比这低就不做处理)
       */
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const [width, height] = [150, 150]
      canvas.width = width
      canvas.height = height
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(sourceCanvas, 0, 0, width, height)
      ctx.globalCompositeOperation = 'destination-in'
      ctx.beginPath()
      ctx.rect(0, 0, width, height)
      ctx.fill()
      return canvas.toDataURL('image/webp', 0.8)
    },
    crop() {
      const sourceCanvas = this.$refs.cropper.$children[0].getCroppedCanvas()
      const image = this.getCroppedImage(sourceCanvas)
      this.form.imgUrl = image
      this.cropConf.cropUrl = ''
      this.cropDialogVisible = false
    },
    closeCrop() {
      this.cropDialogVisible = false
      this.cropUrl = ''
    },
    validate() {
      return this.$refs.form.validate()
    },
    save() {
      if (this.validate()) {
        this.loading = true
        setTimeout(() => {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: '保存成功！',
            color: 'success',
          })
          this.loading = false
        }, 3000)
      }
    },
  },
  components: {
    cropper: Cropper,
  },
}
</script>

<style lang="scss">
.cropper {
  width: 350px;
  height: 200px;
}
.cropper-bg {
  background-repeat: repeat !important;
}
.cropper-view-box,
.cropper-face {
  border-radius: 50%;
}
</style>
<style lang="scss" scoped>
#profile {
  .profile-item {
    margin-bottom: 15px;
    .item-title {
      margin-bottom: 10px;
    }
    .item-content {
      margin-top: 25px;
    }
  }
  .profile-avatar {
    .avatar-preview {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      .avatar {
        width: 100%;
        height: 100%;
      }
    }
    .upload-btn {
      padding: 0;
      margin-left: 50px;
      .upload-a {
        display: inline-block;
        padding: 0 40px;
        height: 40px;
        line-height: 40px;
        background-color: transparent;
        .upload-input {
          width: 100%;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
