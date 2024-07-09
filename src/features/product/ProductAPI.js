// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/products');
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchProductsByFilters(filter,sort) {
  let queryString='';
  for(let key in filter)
  {
    const keyValue=filter[key];

    if(keyValue.length>=1)
    {
      const lastKeyValue=keyValue[keyValue.length-1];
      queryString+=`${key}=${lastKeyValue}&`;
    }
  }
  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`;
  }


  return new Promise(async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/products?'+queryString);
    const data = await response.json();
    resolve({data});
  }
  );
}
