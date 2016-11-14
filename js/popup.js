var queryInfo = {active:true,currentWindow:true};


function updateStatus(status){
  $('#status').empty();
  if(status=='failed'){
    $('#status').append('<h6>Wait for Dump to load completely.. Or retry!!</h6>');
  }else{
    $('#status').append('<h6>Ready!! Click to file bug.<h6>');
  }
}

chrome.storage.local.get('templates', function(results){
    results['templates'].forEach(function(template){
      $('#options').append("<button>File "+template["name"]+" Bug</button>");
    });
    $("button").click(function(){
      var bugType = $(this)[0].innerText.replace("File","").replace("Bug","").trim();
       //console.log("Clicked on: "+bugType);
      chrome.tabs.query(queryInfo,function(tabs){
       //console.log("in Tab ID :"+tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id,{from:"popup",action:"create_bug",bugType:bugType,url:tabs[0].url}, function(response){
         //console.log(response.status);
        if(response.status==="failed"){
          updateStatus('failed');
        }
      });
    });
  });
});


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if(msg.from=='content'){
    chrome.tabs.query(queryInfo, function(tabs){
      if(tabs[0].id==sender.tab.id){
        if(msg.action=='ready'){
          updateStatus('success');
        }
      }
    });
  }
});


