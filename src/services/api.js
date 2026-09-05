const API_URL=import.meta.env.VITE_API_URL||'http://localhost:8080/api'
async function request(path,options={}){const res=await fetch(`${API_URL}${path}`,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});if(!res.ok)throw new Error(`API ${res.status}`);return res.status===204?null:res.json()}
export const api={
 products:(params='')=>request(`/products${params}`), product:id=>request(`/products/${id}`),
 categories:()=>request('/categories'), cart:()=>request('/cart'), addToCart:(body)=>request('/cart/items',{method:'POST',body:JSON.stringify(body)}),
 checkout:body=>request('/checkout',{method:'POST',body:JSON.stringify(body)}), orders:()=>request('/orders'), order:id=>request(`/orders/${id}`),
 me:()=>request('/me'), login:body=>request('/auth/login',{method:'POST',body:JSON.stringify(body)}), register:body=>request('/auth/register',{method:'POST',body:JSON.stringify(body)})
}
