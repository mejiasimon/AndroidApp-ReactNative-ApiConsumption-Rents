export async function PutUser(username,name,password,role,reservedword,id){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
           "username":username,
           "name":name,
           "password":password,
           "role":role,
           "reservedword":reservedword
       });
       
       let response = await fetch(`https://api-rentas-p2d8imd4z-mejiasimons-projects.vercel.app/actualizar/User/${id}`, { 
         method: "PUT",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
return(data.datos)
}