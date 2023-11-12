export async function GetUsers(){
    let headersList = {

    }
    let response = await fetch("https://api-rentas.vercel.app/obtener/Users", { 
      method: "GET",
      headers: headersList
    });
    
    let data = await response.json();
    return(data.datos)
}