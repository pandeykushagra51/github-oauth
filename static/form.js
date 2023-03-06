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
    let loadingElement = document.createElement('div');
    loadingElement.className = 'loading';


    XHR.onreadystatechange = () => {
        // In local files, status is 0 upon success in Mozilla Firefox
        console.log('current status: ',XHR.readyState);
        if (XHR.readyState === 1) {
            
        }else if (XHR.readyState === 4){
        }
    };

    XHR.addEventListener('load', (event) => {

        if(XHR.status==401){
            alert('unauthorised request content');
            setTimeout(()=>{
                console.log('kkk');
                window.location.assign("http://127.0.0.1:3000/logout");
            },1000);
        }
        else if(XHR.status==422){
            alert('Repository with this name already exist');
        }
        else if(Math.floor(XHR.status/100)!=2){
            console.log(XHR.status,XHR.statusText,XHR.status/100,'qnvf');
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
    
    // window.location.href = "http://127.0.0.1:3000/success";
}

btn.addEventListener('click', () => {
    sendData();
})

