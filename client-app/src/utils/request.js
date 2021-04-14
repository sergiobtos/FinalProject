

export async function requestPost (url, body, headers = "" ) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
          ...headers,
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+localStorage.getItem("token")
      },
      body: body ? JSON.stringify(body) : {}
    }); 
    return res;
}

export async function requestGet (url, body, headers = "" ) {
    const res = await fetch(url, {
      method: "GET",
      headers: {
          ...headers,
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+localStorage.getItem("token")
      }
    }); 
    return res;
}


