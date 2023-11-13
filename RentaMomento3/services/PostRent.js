export async function PostRent(rentnumber,platenumber,initialdate,finaldate,username,status){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
           "rentnumber":rentnumber,
           "username":username,
           "platenumber":platenumber,
           "initialdate":initialdate,
           "finaldate":finaldate,
           "status":status
       });
       
       let response = await fetch("https://api-rentas-p2d8imd4z-mejiasimons-projects.vercel.app/mandar/Rent", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       console.log(data);
       
}

