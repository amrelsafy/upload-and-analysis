interface UserDTO{
  username: string,
  password: string
}

const baseUrl = process.env.BASE_API_URL || 'http://localhost:3000';

export const registerUser = async (userDTO: UserDTO) => {
  try{
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDTO)
    });

    if(!res.ok){
      let errorData = await res.json();
      return errorData;
    }

    const data = await res.json();
    return data;
  }
  catch(e){
    console.error("Error registering the user to server")
  }
}

export const loginUser = async (userDTO: UserDTO) => {
  try{
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDTO)
    });

    console.log("In login")

    if(!res.ok){
      const errorData = await res.json();
      return errorData;
    }

    const data = await res.json();
    return data;
  }
  catch(e){
    console.log(e);
    throw new Error('Error logging the user to the server');
  }
}

export const getAllProfiles = async() =>{
  const token = window.localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  }

  try{
    let res = await fetch(`${baseUrl}/auth/profile`, {
      headers
    });

    const data = await res.json();
    return data;
  }
  catch(e){
    console.error("Error retrieving all profiles")
  }
}