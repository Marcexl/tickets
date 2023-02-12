const acreditarPersona = async (data) => {
  //var res = null;
  const url = "https://www.sgiar.org.ar:3001/ticket/event/acreditate";
  const url2 = "https://localhost:3001/ticket/event/acreditate";
  const response = await fetch(url2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}



export {acreditarPersona}