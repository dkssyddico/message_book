import axios from 'axios';

export default async function imageUpload(file: File) {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  const {
    data: { url },
  } = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, formData);

  return url;
}
