var info;

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if(msg.from==="bugzilla_popup"){
    if(msg.action==="create_TTR"){
       //console.log("in content of tab");
      if(info){
        sendResponse({status:"success"});
        chrome.runtime.sendMessage({from:"TTR_bug",info:info,action:"create_TTR"});
      }else{
         //console.log("Failed to find info of bug");
        sendResponse({status:"failed"});
      }
      
    }
  }
});

function isInArray(value, array){
   //console.log(value);
  return array.indexOf(parseInt(value))>-1;
}

function getErrorType(info){
  return chrome.storage.local.get('errors', function(results){
    var errors = results['errors'];
    return errors.some(function(error){
    if(isInArray(info['errorCode'], error.codes)){ 
       //console.log(error.name);
      info["errorType"]=error.name;
      return true;
    }
    });
  });
}

function getPosition(str, m, i) {
   return str.split(m, i).join(m).length;
}

function getTTRInfo(){
  var info = {};
  keyword = $('#keywords').val();
  if((keyword.indexOf('TTR_ALERT')<=-1)){
    return;
  }
  
  info.agent = $('#cf_agents').val();
  info.sumInfo = $('#cf_suminfo').val();
  info.errorCode = $('#cf_errorcode').val();
  getErrorType(info);
  
  stackTrace = $('#comment_text_0').text();
  info.stackTrace = stackTrace.substring(stackTrace.indexOf("Stack Trace:")+"Stack Trace:".length+1);
  
  info.bugId = $('#summary_alias_container').prev('a').text().replace('Bug','').trim();
  
  title = $('#short_desc_nonedit_display').text();
  info.title = title.substring(0,getPosition(title, '>', 2))+'>';
  
  return info;
}

$(document).ready(function(){
  info = getTTRInfo();
  var i = Math.floor((Math.random() * 10) + 1);
  console.log('in script '+i);
  console.log(info);
  chrome.runtime.sendMessage({from:'TTR_bug',action:'ready'});
});