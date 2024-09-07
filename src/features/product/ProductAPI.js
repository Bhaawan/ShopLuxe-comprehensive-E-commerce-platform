// A mock function to mimic making an async request for data

export function fetchProductById(id) {
  return new Promise(async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/products/'+id);
    const data = await response.json();
    resolve({data});
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/products/',{method:'POST',body:JSON.stringify(product),headers:{'content-type':'application/json'},});
    const data = await response.json();
    resolve({data});
  }
  );
}

export function updateProduct(update) {
  return new Promise( async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/products/'+update.id,
      {method:'PATCH',body:JSON.stringify(update), headers:{'content-type':'application/json'}});
    const result = await response.json();
    resolve({data:result});

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

export function fetchProductsByFilters(filter,sort,pagination,admin) {
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
  if(admin)
  {
    queryString+=`admin=true`;
  }



  return new Promise(async (resolve) =>
  {
    const response=await fetch('http://localhost:8080/products?'+queryString+'isAdmin=true');
    const data = await response.json();
    const totalItems=await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:+totalItems}});
  }
  );
}
