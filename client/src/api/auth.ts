interface UserDTO{
  username: string,
  password: string
}

export const registerUser = async (userDTO: UserDTO) => {
  try{
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDTO)
    });

    const data = await res.json();
    return data;
  }
  catch(e){
    console.error("Error registering the user to server")
  }
}

export const loginUser = async (userDTO: UserDTO) => {
  try{
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDTO)
    });

    const data = await res.json();
    return data;
  }
  catch(e){
    console.error("Error logging in to server")
  }
}

export const getAllProfiles = async() =>{
  const token = window.localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  }

  try{
    let res = await fetch('http://localhost:3000/auth/profile', {
      headers
    });

    const data = await res.json();
    return data;
  }
  catch(e){
    console.error("Error retrieving all profiles")
  }
}