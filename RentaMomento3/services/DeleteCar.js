export async function DeleteCar(id){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let response = await fetch(`https://api-rentas-p2d8imd4z-mejiasimons-projects.vercel.app/eliminar/Car/${id}`, { 
         method: "DELETE",
         headers: headersList
       });
       
       let data = await response.text();
return(data)
}