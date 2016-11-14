var info;
var suminfolist = [];

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if(msg.from==="bugzilla_popup"){
    if(msg.action==="create_TTR"){
      if(info){
        sendResponse({status:"success"});
        chrome.runtime.sendMessage({from:"TTR_bug",info:info,action:"create_TTR"});
      }else{
        sendResponse({status:"failed"});
      }
    }else if(msg.action==="create_metafield"){
      var _isSite = info.isUKSite;
      //console.log("======> Inside the TTR_bug/SUBMIT="+_isSite);
      if(info && !(_isSite === undefined || _isSite === null)){
        sendResponse({status:"success"});
        chrome.runtime.sendMessage({from:"TTR_bug",info:info,action:"create_metafield"});
      }else{
        sendResponse({status:"failed"});
      }
    }
  }
});

function isInArray(value, array){
  return array.indexOf(parseInt(value))>-1;
}

function getErrorType(info){
  return chrome.storage.local.get('errors', function(results){
    var errors = results['errors'];
    return errors.some(function(error){
    if(isInArray(info['errorCode'], error.codes)){ 
      info["errorType"]=error.name;
      return true;
    }
    });
  });
}

function isUKSite(info) {
  return chrome.storage.local.get('sitenames', function(results){
    var sitesList = results['sitenames'];
    return sitesList.some(function(_site){
    if(isInArray(info['sumInfo'], _site.suminfo)){
      // console.log("======> Inside the TTR_bug/isUKSite= SUCCESS=======>"+info['sumInfo']);  
      info["isUKSite"]=_site.suminfo;
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
  var sum_info = $('#cf_suminfo').val();

    if((keyword.indexOf('TTR_ALERT')<=-1)){
      return;
    }

  info.agent = $('#cf_agents').val();
  info.sumInfo = $('#cf_suminfo').val();
  info.errorCode = $('#cf_errorcode').val();
  info.assigne = $('#bz_assignee_edit_container').closest('.fn').text();
  getErrorType(info);
  isUKSite(info);
  
  stackTrace = $('#comment_text_0').text();
  info.stackTrace = stackTrace.substring(stackTrace.indexOf("Stack Trace:")+"Stack Trace:".length+1);
  
  info.bugId = $('#summary_alias_container').prev('a').text().replace('Bug','').trim();
  
  title = $('#short_desc_nonedit_display').text();
  info.title = title.substring(0,getPosition(title, '>', 2))+'>';
  
  return info;
}


$(document).ready(function(){
  //console.log("======> Inside the TTR_bug/document-ready.");
  info = getTTRInfo();
  var i = Math.floor((Math.random() * 10) + 1);
  chrome.runtime.sendMessage({from:'TTR_bug',action:'ready'});
});