import Swal from 'sweetalert2'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swal', Swal.mixin({
    customClass: {
      popup: 'swal2-popup-custom',
      title: 'swal2-title-custom',
      htmlContainer: 'swal2-html-custom'
    }
  }))
})
