// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise( async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/users',{method:'POST',body:JSON.stringify(userData), headers:{'content-type':'application/json'}});
    const result = await response.json();
    resolve({data:result});

  }
  );
}


export function checkUser(loginInfo) {
  return new Promise( async (resolve,reject) =>
  {
    const email=loginInfo.email;
    const password=loginInfo.password;

    const response=await fetch('http://localhost:8080/users?email='+email);
    const result = await response.json();

    if(result.length)
    {
      if(password===result[0].password)
      {
        resolve({data:result[0]})
      }
      else
      {
        reject({message:'User found but password incorrect'});
      }
    }
    else
    {
      reject({message:'User not found'});
    }

  }
  );
}

export function signOut(userId) {
  return new Promise( async (resolve) =>
  {


    resolve({data:'success'});

  }
  );
}
