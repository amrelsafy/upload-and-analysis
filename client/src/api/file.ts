const baseUrl = process.env.BASE_API_URL || 'http://localhost:3000';

export const uploadFiles = async(files: File[], userId: string) => {

  const token = window.localStorage.getItem('token');
  const formData = new FormData();

  files.map(file => {
    console.log(file);
    formData.append('files', file);
  })

  formData.append('userId', userId)

  try{
    let res = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });

    let data = await res.json();
    return data;
  }
  catch(e){
    throw new Error('Error while uploading files');
  }
}

export const getFileMetadata = async(userId: string) => {
  const token = window.localStorage.getItem('token');

  try{
    let res = await fetch(`${baseUrl}/files?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    let data = await res.json();
    console.log(data);
    return data;
  }
  catch(e){
    throw new Error('Error while getting files');
  }
}