export default function castObjectToFormData(obj: any): FormData {
  const formData = new FormData();

  for (const key in obj) {
    if (key === 'images' && Array.isArray(obj[key])) {
      obj[key].forEach((file: File, index: number) => {
        formData.append('images', file, file.name);
      });
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any) => {
        formData.append(key, item);
      });
    } else if (obj[key] !== null && obj[key] !== undefined) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
}
