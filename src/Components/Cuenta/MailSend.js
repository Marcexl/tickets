export function SendEmail(){
    let userData = localStorage.getItem('usr');
    let user = JSON.parse(userData);
    let email = user.email;
    let elem = document.getElementById('ticket');
    console.log(elem.innerHTML);
    const data = "email=" + email + "&html=" + elem.innerHTML;
  
    fetch('./Mail/mail.php', {
        method: 'POST',
        body: data,
        }).then((response) => {
        if (response.ok) 
        {
          console.log('ok envio mail');
        }
        else 
        {
          console.log('no se mando el mail');
        }
    })
}