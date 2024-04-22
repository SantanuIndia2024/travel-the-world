

function calculatenewprices()
{   //get data from local storage

    priceBucket = JSON.parse(localStorage.getItem('googleTravel'));
    fromLocation = document.getElementsByClassName('yPKHsc')[0].innerText;

    //if no data existing then create new object
    if(priceBucket===null)
    {
        priceBucket = Object.create(null);
    }

    if (document.getElementsByClassName('TP4Lpb eoY5cb j0Ppje')[0]!==undefined)
        {
            exactdates =document.getElementsByClassName('TP4Lpb eoY5cb j0Ppje');
        }
    //get map points
    mappoints=document.getElementsByClassName('pnukcf CeoRYc C6zmBb');
    
    //iterate through each location
    Array.from(document.querySelectorAll("li.lPyEac.P0ukfb")).map(function name1(params1){
        toLocation = params1.getElementsByClassName('W6bZuc YMlIz')[0].innerText;
        
        //check if price element present
        ispricedisplayed = params1.getElementsByClassName('Q70fcd')[0];
        unitprice =params1.getElementsByClassName('unitprice')[0];
        
        
        if(ispricedisplayed !== undefined && unitprice==undefined)
        {
            if(params1.getElementsByClassName('sSHqwe sSHqwe')[0]===undefined)
            {
                daystext='';
                if (exactdates!==undefined)
                {   
                    
                    if (exactdates[0].value!==undefined) 
                    {
                        startdate=exactdates[0].value;
                        enddate=exactdates[1].value;
                    }
                    else if(exactdates[0].innerText!==undefined)
                    {   startdate=exactdates[0].innerText;
                        enddate=exactdates[1].innerText;
                    }
                    
                    if(startdate!==undefined && enddate!==undefined)
                    {
                        day1 =new Date(startdate);
                        day2 =new Date(enddate);
                        days= (day2-day1)/1000/24/60/60;
                    }
                }
            }
            else{
                daystext=params1.getElementsByClassName('sSHqwe sSHqwe')[0].innerText;
                if(daystext.includes('Jan')||daystext.includes('Feb')||daystext.includes('Mar')||daystext.includes('Apr')||daystext.includes('May')||daystext.includes('Jun')||daystext.includes('Jul')||daystext.includes('Aug')||daystext.includes('Sept')||daystext.includes('Oct')||daystext.includes('Nov')||daystext.includes('Dec'))
                {
                    
                    dayseperator = daystext.indexOf('–');
                    if(dayseperator>3){
                        //2 months logic
                        dayspace =daystext.indexOf(' ');
                        day1= daystext.slice(0,dayspace);
                        day2= daystext.slice(dayseperator+2,dayseperator+4);
                        days = 31+ Number(day2)- Number(day1);
                    }
                    else{
                        day1= daystext.slice(0,dayseperator);
                        day2= daystext.slice(dayseperator+1,dayseperator+3);
                        days=day2-day1;
                    }
                }
                else if (exactdates!==undefined)
                {   
                    
                    if (exactdates[0].value!==undefined) {
                        startdate=exactdates[0].value;
                        enddate=exactdates[1].value;
                    }
                    else if(exactdates[0].innerText!==undefined)
                    {   startdate=exactdates[0].innerText;
                        enddate=exactdates[1].innerText;
                    }
                    
                    if(startdate!==undefined && enddate!==undefined)
                    {
                        day1 =new Date(startdate);
                        day2 =new Date(enddate);
                        days= (day2-day1)/1000/24/60/60;
                    }
                }
            }
            
            
            
            
            //price extraction
            priceparent = params1.getElementsByClassName('BBxxuf NMm5M');
            flightprice=0;
            hotelprice=0;
            unitprice=0;
            total=0;
            if (typeof priceparent[0] !== 'undefined'){
                flightprice = priceparent[0].nextSibling.innerText;
            };
            if (typeof priceparent[1] !== 'undefined'){
                hotelprice = priceparent[1].nextSibling.innerText;
                hotellen= hotelprice.length;
                hotelprice= hotelprice.slice(1,hotellen).replace(/,/g, '');
            };
            
            
            
            //total price calculation
            isflightprice = flightprice.slice(flightprice.length-1,flightprice.length);
            if((isflightprice==='h' || isflightprice==='m'))
            {   //if driving hour mentioned then flight price =0
                flightprice=0;
                
            }else {
                //calculate flight price
                flightlen= flightprice.length;
                flightprice= flightprice.slice(1,flightlen).replace(/,/g, '');
            }

            if(flightprice===0||flightprice===undefined){
                if (hotelprice===0||hotelprice===undefined)
                {
                    total=9999;
                    unitprice=999;
                }
                else if(hotelprice!==undefined){
                    total= hotelprice*days;
                    unitprice=Math.floor(total/days);
                }
            }
            else if(flightprice!==undefined){
                if (hotelprice==0||hotelprice==undefined)
                {
                    total= flightprice*2+500*days;
                    unitprice=Math.floor(total/days);
                }
                else if(hotelprice!==undefined){
                    total= (flightprice*2) + hotelprice*days;
                    unitprice=Math.floor(total/days);
                }

            }

            // if(flightprice==0 && hotelprice!=0)
            // {   // if flight price =0 but hotel price !=0
            //     total = hotelprice*days;
            //     unitprice = hotelprice;
            // }
            // else if (hotelprice!=0){
            //     //if hotel price !=0 and flight price !=0
            //     total = flightprice + hotelprice*days
            //     unitprice = Math.floor(total/days); 
            // }
            // else {
            //     total = flightprice;
            // }
            totalprice = document.createElement("div");
            totalprice.classList.add('o9JBjb');
            totalprice.classList.add('sSHqwe');
            totalprice.textContent = total +' for '+days+ 'd';
            unitpriceelem = document.createElement("div");
            unitpriceelem.classList.add('o9JBjb');
            unitpriceelem.classList.add('unitprice');
            
            //compare previous price and create element
            
            previousPrice=Number(priceBucket[fromLocation+'-'+toLocation+'-'+days+'d']);

            if (previousPrice!==undefined && unitprice <previousPrice*.95)
            {
                unitpriceelem.textContent = '↓ '+unitprice +' /day from '+previousPrice+' /day';
                

            }
            else if (previousPrice!==undefined && unitprice >previousPrice*1.05)
            {
                unitpriceelem.textContent = '↑ '+unitprice +' /day from '+previousPrice+' /day';
                
            }
            else{
                unitpriceelem.textContent = '  '+unitprice +' per day';
                priceBucket[fromLocation+'-'+toLocation+'-'+days+'d']=unitprice;
            }

            //end of compare
            params1.getElementsByClassName("W6bZuc YMlIz")[0].appendChild(unitpriceelem);
            colorprice= params1.getElementsByClassName('unitprice')[0];


            //color prices
            if (Number(unitprice)<150){
                colorprice.style.color='green';
                Array.from(mappoints).map((e)=>{
                    if(e.innerText.includes(toLocation))
                    {
                        e.getElementsByClassName('byd5Xd')[0].style.background="green";
                        e.getElementsByClassName('oLD7Od tdMWuf')[0].style.fontSize="medium";
                        // e.getElementsByClassName('SwQ5Be')[0].style.visibility="visible !important";
                        // e.getElementsByClassName('SwQ5Be')[0].style.cursor="pointer";
                        // e.getElementsByClassName('SwQ5Be')[0].style.pointerEvents="auto";
                        // e.getElementsByClassName('SwQ5Be')[0].classList.add('makechildvisible');
                        // picture=e.getElementsByClassName('fN3ML SLNXhe')[0];
                        // z=picture.dataset.src;
                        // if(z!==undefined)
                        // {
                        //     pictureurl='background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 11.76%, rgba(0, 0, 0, 0.25) 46.16%, rgba(0, 0, 0, 0) 63.98%), url("'+z+'");';
                        //     picture.style=pictureurl;
                        // }

                    }
                });
            }
            else if (Number(unitprice)<250){
                colorprice.style.color='orange';
                Array.from(mappoints).map((e)=>{
                    if(e.innerText.includes(toLocation))
                    {
                        e.getElementsByClassName('byd5Xd')[0].style.background="orange";
                        e.getElementsByClassName('SwQ5Be')[0].style.visibility="hidden";
                    }
                });
            }
            else { 
                colorprice.style.color='red';
                Array.from(mappoints).map((e)=>{
                    if(e.innerText.includes(toLocation))
                    {
                        e.getElementsByClassName('byd5Xd')[0].style.background="red";
                        e.getElementsByClassName('SwQ5Be')[0].style.visibility="hidden";
                    }
                }); 
            }
            
            params1.getElementsByClassName("W6bZuc YMlIz")[0].appendChild(totalprice);
            //return('day1='+day1 +' day2='+day2+' days='+days+' '+flightprice+' '+hotelprice+' '+total);   
            
            //add to object
            //priceBucket[fromLocation+'-'+toLocation+'-'+days+'d']=unitprice;
        
        }// end of ispricedisplayed check
        
        

    });
    
    //sort items

    list =document.querySelectorAll('li.lPyEac.P0ukfb');
    newparentArray = Array.from(list).sort((a,b)=> Number(a.querySelector('div.unitprice').innerHTML.slice(2,5))-Number(b.querySelector('div.unitprice').innerHTML.slice(2,5)));

    document.getElementsByClassName('SD4Ugf')[0].replaceChildren('');

    // Append each element of the array to the document fragment
    newparentArray.map(item => {
        // const span = document.createElement('div');
        //span.textContent = item;
        document.getElementsByClassName('SD4Ugf')[0].appendChild(item);
    });//end sort items

    //add to local storage
    localStorage.setItem('googleTravel',JSON.stringify(priceBucket));
        
}// end of if new prices already present
 
// const flightTimeout= setInterval(()=>{
var url1 = window.location.href;

function loadButton()
{
      //counter++;
    //alert(counter); 
    priceactive=document.createElement('button');
    priceactive.classList.add('priceButton');
    priceactive.textContent= 'Show Best prices';
    
    // pricestatus=document.createElement('span');
    // pricestatus.classList.add('pricestatus');
    // pricestatus.textContent= 'Showing best prices';

    document.getElementsByClassName('rNqSl sSHqwe')[0].appendChild(priceactive);

    document.getElementsByClassName('priceButton')[0].addEventListener('click',(e)=>{
        calculatenewprices();
        // document.getElementsByClassName('rNqSl sSHqwe')[0].appendChild(pricestatus);
        // document.getElementsByClassName('priceButton')[0].style.display="none";
    });
                    
        
                
}

    

//var counter=0;
// chrome.runtime.sendMessage({url:url1, sender:"contentScript"});       
const flightInterval = setInterval(()=>{
    if(url1.includes('www.google.com/travel/explore')){    //check if new price already displayed
        if(document.getElementsByClassName('priceButton')[0]===undefined)
            {
            //activate pricing button
            loadButton();
            //end activate pricing button
            }
    }
},5000);

        
setTimeout(function() {
    clearInterval(flightInterval); // Clear the interval
}, 3600000);

//send Local Storage
chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    if(message.from==='background' && message.action==='getlocalstorage'){
        x= JSON.parse(localStorage.getItem(message.data));
        sendResponse(x);
    } 
});


