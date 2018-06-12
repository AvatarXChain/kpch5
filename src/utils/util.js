
export const base64ToFile = (base64Data, tempfilename = 'tmp.jpg') => {
  const arr = base64Data.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let len = bstr.length
  const u8arr = new Uint8Array(len)
  while (len--) {
    u8arr[len] = bstr.charCodeAt(len)
  }
  return new File([u8arr], tempfilename, { type: mime })
}