function fill_info(info){
  
  component = document.querySelector('#component');
  component.value = 'IAE-Data Agent';
  component.dispatchEvent(new Event('change'));
  
  
  $('#assigned_to').val($('#field_container_reporter').text());
  
  $('#cf_agents').val(info["agent"]);
  $('#cf_suminfo').val(info["suminfo"]);
  $('#cf_errorcode').val(info["errorCode"]);
  // $('#cf_agents').val(info["scrptVrsn"]);
  var summary = "<TTR-";
  if(info.bugType=='TTR'){
    summary = summary+"Alert><I18N><";
  }else{
    summary = summary+"I18N><";
  }
  summary = summary+info["agent"]+"><"+info["errorType"]+"><"+info["errorCode"]+": "+info["errorDesc"]+">";
  $('#short_desc').val(summary);
  
  var comment = "Agent Version:"+info["scrptVrsn"]+"\n\nDump URL:\n"+info["url"]+"\n\nException Stack Trace:\n"+info["stackTrace"];
  $('#comment').val(comment);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if(msg.from==="background"){
    if(msg.action==="fill_info"){
      fill_info(msg.info);
    }
  }
});