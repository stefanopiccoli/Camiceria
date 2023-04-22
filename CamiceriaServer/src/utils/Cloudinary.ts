import { cloud } from "../server.js"

export const upload = async (file: any, folder: string) =>{
  try {
    const res = await cloud.uploader.upload(file.tempFilePath, {public_id: file.name, folder: folder})
    return res;
  } catch (error) {
    console.log("Errore nell'upload dell'immagine");
  }

}