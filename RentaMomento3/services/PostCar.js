export async function PostCar(platenumber,brand,state,dailyvalue){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
       "platenumber":platenumber,
       "brand":brand,
       "state":state,
       "dailyvalue":dailyvalue 
       });
       
       let response = await fetch("https://api-rentas-p2d8imd4z-mejiasimons-projects.vercel.app/mandar/Car", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
return(data)
}