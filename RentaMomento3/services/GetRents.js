export async function GetRents(){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let response = await fetch("https://api-rentas-p2d8imd4z-mejiasimons-projects.vercel.app/obtener/Rents", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       return(data.datos)
}