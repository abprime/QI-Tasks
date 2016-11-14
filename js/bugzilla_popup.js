var queryInfo = {active:true,currentWindow:true};

function updateStatus(status){
  $('#status').empty();
  if(status=='failed'){
    $('#status').append('<h6>Sorry! Either BugZilla Page has not loaded completely <br> Or not a TTR Bug</h6>');
  }else{
    $('#status').append('<h6>Ready!! Click to raise TTR.<h6>');
  }
}

$(document).ready(function(){
  $('#options').append('<button>Create TTR mail</button>');
  $("button").click(function(){
    chrome.tabs.query(queryInfo,function(tabs){
       //console.log("in Tab ID :"+tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id,{from:"bugzilla_popup",action:"create_TTR",url:tabs[0].url}, function(response){
         //console.log(response.status);
        updateStatus(response.status);
      });
    });
  });
});