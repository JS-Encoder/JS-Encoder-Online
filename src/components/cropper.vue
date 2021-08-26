<template>
  <vue-cropper class="cropper" ref="cropper" :src="src" :aspectRatio="option.aspectRatio"
    :viewMode="option.viewMode" :dragMode="option.dragMode" :cropBoxResizable="option.cropBoxResizable"
    :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full"
    :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop"
    :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox">
  </vue-cropper>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: {
        img: '',
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        outputType: 'png',
        cropBoxResizable: false, //是否可以重置
        canMove: true,
        dragMode: 'move',
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 350,
        autoCropHeight: 200,
        minContainerWidth: 350,
        minContainerHeight: 200,
        minCropBoxWidth: 350,
        minCropBoxHeight: 200,
        minCanvasWidth: 350,
        minCanvasHeight: 200,
        aspectRatio: 1, //长宽比例
        fixedBox: true,
        viewMode: 1,
      },
    }
  },
  methods: {},
  components: {
    'vue-cropper': VueCropper,
  },
}
</script>

<style scoped>
</style>
