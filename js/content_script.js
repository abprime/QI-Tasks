var clas = '##@@Class:';
var rqst = ['##@@BeginRequestXML','##@@EndRequestXML'];
var rpsn = ['##@@BeginResponseXML', '##@@EndResponseXML'];
var exp = ['##@@BeginException', '##@@EndException'];
var xml = ['[XML BEGIN]','[XML END]'];
var Begn=0, End=1;
var ttrinfo = null;
var queryInfo = {active:true, currentWindow:true};

//alert("content injected");

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

function isMetaChangeSuminfo(info){
  return chrome.storage.local.get('sitenames', function(results){
    var suminfos = results['suminfos'];
    return suminfos.some(function(suminfo){
    if(info['suminfo']===suminfo){ 
       //console.log(error.name);
      info["isMetaChange"]=true;
      return true;
    }
    return false;
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


function getNodeValueofTag(xmlDOC, tagName){
   //console.log("tag : "+tagName);
  return xmlDOC.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
}

function getElement(xpath,n){
  var nodes = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    var ele = nodes.iterateNext();
    var ele1 = null;
    var i = 0;
    while(ele && (i<n || n==-1)){
      ele1 = ele;
      ele = nodes.iterateNext();
      i++;
    }
    return ele1;
}


function getDumpText(){
  var dumptxt = getElement('//pre[contains(text(),"'+rqst[Begn]+'")]',1).innerText;
  if(dumptxt.indexOf(rpsn[Begn])<0){
    var rpsnXML = getElement('//td[contains(text(),"<status>")]',-1).innerText;
    rpsnXML = rpsnXML.replace(xml[Begn], rpsn[Begn]);
    rpsnXML = rpsnXML.replace(xml[End], rpsn[End]);
    dumptxt = dumptxt+rpsnXML;
    
    excp = getElement('//td[@class="Exception"]',-1).innerText;
    excp = exp[Begn]+excp+exp[End];
    dumptxt = dumptxt+excp;
  }
  return dumptxt;
}

function getInfo(){
  var info = {};
  parser = new DOMParser();
  var dump = getDumpText();
  info["agent"] = dump.substring(dump.indexOf(clas)+clas.length,dump.indexOf(rqst[Begn])).trim().split(" ")[0].trim();
  
  var request = dump.substring(dump.indexOf(rqst[Begn])+rqst[Begn].length,dump.indexOf(rqst[End])).trim();
  var rqstXML = parser.parseFromString(request,'text/xml');
  info["suminfo"] = getNodeValueofTag(rqstXML,"sumInfoId");
  info["sumInfo"] = getNodeValueofTag(rqstXML,"sumInfoId");
  
  var response = dump.substring(dump.indexOf(rpsn[Begn])+rpsn[Begn].length,dump.indexOf(rpsn[End])).trim();
  var rpsnXML = parser.parseFromString(response,'text/xml');
  info["errorCode"] = getNodeValueofTag(rpsnXML,"status").trim();
  info["scrptVrsn"] = getNodeValueofTag(rpsnXML,"scriptVersion");
  
  var stackTrace = info["stackTrace"] =  dump.substring(dump.indexOf(exp[Begn])+exp[Begn].length,dump.indexOf(exp[End])).trim();
  info["errorDesc"] = stackTrace.substring(stackTrace.indexOf(':')+1,stackTrace.indexOf('at ')).trim().substring(0,150);
  
  getErrorType(info);
  isUKSite(info);
  
  return info;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  console.log("==> CONTENT Clicked on: "+msg.action);
  if(msg.from==="popup"){
    if(msg.action==="create_bug"){
       //console.log("in content of tab");
      if(ttrinfo){
        sendResponse({status:"success"});
        ttrinfo["url"] = msg.url;
        ttrinfo.bugType=msg.bugType;
        chrome.runtime.sendMessage({from:"content",info:ttrinfo,action:"create_bug"});
      }else{
         ttrinfo = getInfo();
        //console.log("Failed to find info of bug");
        sendResponse({status:"failed"});
      }
    }else if(msg.action==="create_metafield"){
      //console.log("==> CONTENT Clicked on: "+msg.action);
      var _isSite = ttrinfo.isUKSite;
      if(ttrinfo && !(_isSite === undefined || _isSite === null)){
        sendResponse({status:"success"});
        //console.log("======> Inside the content/SUBMIT= YESSSSSS=>"+_isSite);        
        chrome.runtime.sendMessage({from:"content",info:ttrinfo,action:"create_metafield"});
      }else{
        sendResponse({status:"failed"});
      }
        
    }
  }
});

document.addEventListener('DOMContentLoaded',function(){
  // alert('content script');
  ttrinfo = getInfo();
  chrome.runtime.sendMessage({from:'content',action:'ready'});
});

