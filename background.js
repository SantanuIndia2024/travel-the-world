// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//     if (tab.url && tab.url.includes("youtube.com/watch")) {
//       const queryParameters = tab.url.split("?")[1];
//       const urlParameters = new URLSearchParams(queryParameters);
  
//       chrome.tabs.sendMessage(tabId, {
//         type: "NEW",
//         videoId: urlParameters.get("v"),
//       });
//     }
//   });

chrome.runtime.onInstalled.addListener(()=>{
  console.log("crx installed");
  chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    if(message.action==="newtab")
    {
      chrome.tabs.create({url:message.url});
    }
    if(message.action==="getlocalstorage" && message.from==="popup")
    {
      chrome.runtime.sendMessage({action:"getlocalstorage",data:message.data,from:"background"},(response)=>{
        sendResponse(response);
      })
    }
    
  })
});