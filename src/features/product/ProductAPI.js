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

export function fetchAllCategories() {
  return new Promise(async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/categories');
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchAllBrands() {
  return new Promise(async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/brands');
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchProductsByFilters(filter,sort,pagination) {
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
  // console.log(pagination)
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`;
  }



  return new Promise(async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/products?'+queryString);
    const data = await response.json();
    const totalItems=await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:+totalItems}});
  }
  );
}
