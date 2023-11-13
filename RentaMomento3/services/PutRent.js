export async function PutRent(id,rentnumber,platenumber,initialdate,finaldate){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
           "rentnumber":rentnumber,
           "username":"user",
           "platenumber":platenumber,
           "initialdate":initialdate,
           "finaldate":finaldate,
           "status":false
       });
       
       let response = await fetch(`https://api-rentas-p2d8imd4z-mejiasimons-projects.vercel.app/actualizar/Rent/${id}`, { 
         method: "PUT",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       console.log(data);



}