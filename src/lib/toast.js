import toast from 'react-hot-toast'

export const toastSuccess = (msg) =>
  toast.success(msg, {
    style: { fontFamily: 'inherit', fontSize: 13 },
    duration: 3000,
  })

export const toastError = (msg) =>
  toast.error(msg, {
    style: { fontFamily: 'inherit', fontSize: 13 },
    duration: 4000,
  })

export { toast }
