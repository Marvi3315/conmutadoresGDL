// Subida de fotos de producto a ImgBB (https://imgbb.com), un servicio de
// hospedaje de imágenes 100% gratuito que no pide tarjeta de crédito.
//
// Requiere una API key gratuita: ver README.md, sección "Configurar ImgBB".

const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export const isImgbbConfigured = Boolean(import.meta.env.VITE_IMGBB_API_KEY);

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result viene como "data:image/png;base64,AAAA..." — ImgBB solo
      // quiere la parte después de la coma.
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

export async function uploadImageToImgbb(file: File): Promise<string> {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error('Falta configurar VITE_IMGBB_API_KEY (ver README.md, sección "Configurar ImgBB").');
  }

  const base64 = await fileToBase64(file);

  const body = new FormData();
  body.append('key', apiKey);
  body.append('image', base64);

  const response = await fetch(IMGBB_UPLOAD_URL, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error(`ImgBB respondió con error ${response.status}.`);
  }

  const data = await response.json();
  const url: string | undefined = data?.data?.display_url || data?.data?.url;
  if (!data?.success || !url) {
    throw new Error('ImgBB no devolvió una URL de imagen válida.');
  }

  return url;
}
