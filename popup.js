document.getElementById('googletravel').addEventListener('click',(e)=>{
    chrome.runtime.sendMessage({action:"newtab",url:"https://www.google.com/travel/explore"});
});

document.getElementById('showcheapest').addEventListener('click',(e)=>{
    //send message to contentScript and receive object

    chrome.runtime.sendMessage({action:"getlocalstorage",data:"googleTravel",from:"popup"},(response)=>{
        y=Object.entries(response);
        z=y.sort((a,b)=>Number(a[1])-Number(b[1]));
        elem= document.getElementById('localstorage');
        z.forEach((element) => {
            z1=document.createElement('div');
            z1.textContent=element[0]+" : "+element[1];
            elem.appendChild(z1);
        });
        elem.style.display="block";
    });
    
});






