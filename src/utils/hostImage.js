import axios from "axios";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export async function hostImage(imageFile) {
  const hostedImage = await axios.post(image_hosting_api, imageFile, {
    headers: { 'content-type': 'multipart/form-data' }
  });

  return hostedImage.data
}
