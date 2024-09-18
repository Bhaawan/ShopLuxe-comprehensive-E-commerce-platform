// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise( async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/auth/signup',{method:'POST',body:JSON.stringify(userData), headers:{'content-type':'application/json'}});
    const result = await response.json();
    resolve({data:result});

  }
  );
}


export function checkUser(loginInfo) {
  return new Promise( async (resolve,reject) =>
  {
    try{
      const response=await fetch('http://localhost:8080/auth/login',{
        method:'POST',body:JSON.stringify(loginInfo), headers:{'content-type':'application/json'}
      });

      if(response.ok)
      {
        const data = await response.json();
        console.log("great");
        resolve({data});
      }
      else{
        let errorData;
        try {
          errorData = await response.text();
        } catch (e) {
          errorData = { error: 'Something went wrong, please try again.' };
        }
        console.log('Error : ', errorData);
        reject(errorData);
      }
    }catch(error){
      console.log("error 2");
      reject(error);
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
