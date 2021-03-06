import { reactive, computed, ref } from 'vue'
import { error } from 'store@history'

//// https://github.com/itsabdessalam/encodeit/blob/develop/src/components/FileUploader.vue
// to be upgraded with this code https://github.com/powerbot15/image-compressor/blob/master/image-compressor.js
// https://github.com/dhhb/vue-base64-file-upload
// https://zocada.com/compress-resize-images-javascript-browser/

export function useFileUpload() {
  const status = {
    initial: 0,
    loading: 1,
    success: 2,
    failed: 3,
  }
  const notifications = [
    {
      title: 'Success',
      color: '#50c0b4',
    },
    {
      title: 'Warning',
      color: '#f59938',
    },
    { title: 'Danger', color: '#e2342f' },
  ]

  const options = {
    maxFileSize: 10240000,
  }

  const state = reactive({
    errors: [],
    status: null,
    output: {},
    isInitial: computed(() => {
      return state.status === status.initial
    }),
    isLoading: computed(() => {
      return state.status === status.loading
    }),
    isSuccess: computed(() => {
      return state.status === status.success
    }),
    isFailed: computed(() => {
      return state.status === status.failed
    }),
  })

  function handleChanges(fieldName, fileList) {
    reset()
    if (!fileList.length) return
    state.status = status.loading
    ;[...fileList].map((file) => processFile(file))
  }

  function processFile(file) {
    fileToBase64(file).then((res) => {
      state.output = {
        name: sanitizeFileName(file.name),
        content: res,
        size: Math.round((res.length * 3) / 4),
      }
      state.status = status.success
    })
    return null
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(),
        readerBase64 = new FileReader(),
        blob = file.slice(0, 4)
      reader.readAsArrayBuffer(blob)
      reader.onloadend = (e) => {
        let isValidMimeType = checkMimetype(
          getMimeTypeSignature(e.target.result),
        )

        if (
          bytesToMegabytes(file.size) > bytesToMegabytes(options.maxFileSize)
        ) {
          state.errors.push({
            message: 'File size is too large!',
            type: notifications[1],
          })
        }

        if (isValidMimeType === false) {
          state.errors.push({
            message: 'File type is not supported!',
            type: notifications[2],
          })
        }

        if (state.errors.length > 0) {
          flashErrors(state.errors)
          reset()
          return
        } else {
          readerBase64.readAsDataURL(file)
        }
      }

      readerBase64.onloadend = () => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = canvas.height = 100
          const context = canvas.getContext('2d')
          //  const naturalAspect = img.naturalWidth / img.naturalHeight

          context.drawImage(img, 0, 0, canvas.width, canvas.height)
          resolve(canvas.toDataURL())
        }
        let res = readerBase64.result
        img.src = res
      }

      reader.onerror = (error) => reject(error)
      readerBase64.onerror = (error) => reject(error)
    })
  }

  // Resets upload
  function reset() {
    state.status = status.initial
    state.errors = []
    state.output = {}
  }

  // Converts from bytes to megabytes
  function bytesToMegabytes(bytes) {
    const value = bytes * Math.pow(10, -6)
    return value
  }

  // Checks mime type
  function checkMimetype(signature) {
    const signatures = [
      '89504E47', // image/png
      '47494638', // image/gif
      'FFD8FFDB', // image/jpeg
      'FFD8FFE0',
      'FFD8FFE1',
      'FFD8FFE2',
      'FFD8FFE3',
      'FFD8FFE8',
      '3C3F786D', // svg/xml
      '3C737667',
    ]
    return signatures.includes(signature)
  }

  function getMimeTypeSignature(data) {
    const uint = new Uint8Array(data)
    let bytes = []
    uint.forEach((byte) => {
      bytes.push(byte.toString(16))
    })
    return bytes.join('').toUpperCase()
  }

  // Sanitizes file's name
  function sanitizeFileName(name) {
    return name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
  }

  function flashErrors(errors) {
    if (errors.length === 2) {
      error('File upload failed due to size and type!' + notifications[2])
    } else {
      error(errors[0].message + errors[0].type)
    }
  }

  return {
    state,
    handleChanges,
  }
}
