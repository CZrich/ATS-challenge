import axios from "axios"

const BASE_URL="example.org"


export const postMessages =(data:any)=>{
     //return axios.post(BASE_URL,data);
     alert(`Datos a enviar al backend:' ${JSON.stringify(data, null, 2)}`)
     console.log('Datos a enviar al backend:', JSON.stringify(data, null, 2));
}