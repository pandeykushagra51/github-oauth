/* eslint-disable prettier/prettier */
const btn = document.querySelector('button');

async function sendData() {
    console.log('Sending data');

    const repoName  = document.getElementById("repo-name").value;

    const data = {
        repoName:repoName
    }

    const XHR = new XMLHttpRequest();

    const urlEncodedDataPairs = [];

    for (const [name, value] of Object.entries(data)) {
        urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
        console.log(name,value);
    }

    const urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    XHR.addEventListener('load', (event) => {

        if(XHR.status==401){
            alert('unauthorised request, you will be redirected to authorise');
            setTimeout(()=>{
                window.location.assign("http://127.0.0.1:3000/logout");
            },1500);
        }
        else if(XHR.status==422){
            alert('Repository with this name already exist');
        }
        else if(Math.floor(XHR.status/100)!=2){
            alert('request could not be completed, please try again');
        }
        else
            alert(`Request completed successfully`);
    });

    XHR.addEventListener('error', (event) => {
        console.log(event);
        alert('Oops! Something went wrong.');
    });

    XHR.open('POST', 'http://127.0.0.1:3000/api/repo');
    
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    XHR.send(urlEncodedData);
    alert(`Please wait for few seconds`);
}

btn.addEventListener('click', () => {
    sendData();
})

