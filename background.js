chrome.runtime.onInstled.addListenr(()=>{
    chrome.storage.sync.get(["geminiAPIKey"],(result)=>{
        if(!result.geminiApiKey){
            chrome.tabs.create({url: "options.html"});
            
        }
    })
})