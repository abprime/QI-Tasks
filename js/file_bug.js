function getFormattedDate(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  
  return yyyy+'-'+mm+'-'+dd;
}

function fill_info(info){
  
  component = document.querySelector('#component');
  component.value = 'IAE-Data Agent';
  component.dispatchEvent(new Event('change'));
  
  
  $('#assigned_to').val($('#field_container_reporter').text());
  
  $('#cf_agents').val(info["agent"]);
  $('#cf_suminfo').val(info["suminfo"]);
  $('#cf_errorcode').val(info["errorCode"]);
  // $('#cf_agents').val(info["scrptVrsn"]);
  var summary1 = $('#short_desc').val();
  
  summary1 = summary1.replace("AgentName",info["agent"])
                    .replace("CSID", info["suminfo"])
                    .replace("ErrorType",info["errorType"])
                    .replace("ErrorCode",info["errorCode"])
                    .replace("ErrorDesc",info["errorDesc"]);
  
  //console.log(summary1);

  $('#short_desc').val(summary1);
  
  var comment1 = $('#comment').val();
  comment1 = comment1.replace("scrptVrsn",info["scrptVrsn"])
              .replace("dumpurl",info["url"])
              .replace("stackTrace",info["stackTrace"]);
  
  //console.log(comment1);
  
   $('#comment').val(comment1);
   
   var today = new Date();
   today.setDate(today.getDate()+5);
   $('#deadline').val(getFormattedDate(today));
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if(msg.from==="background"){
    if(msg.action==="fill_info"){
      fill_info(msg.info);
    }
  }
});