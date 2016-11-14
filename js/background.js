/**
 * used to store templates as array of {name: bug type, url: url}
 * also store error codes and error type as array of {name: errorType, codes:[code1, code2, code3]}
 **/

chrome.runtime.onInstalled.addListener(function(details){
  chrome.storage.local.get(null, function(results){
    if(!results.hasOwnProperty('templates')){
      var i18nURL = 'https://blrbugzilla.yodlee.com/enter_bug.cgi?alias=&assigned_to=apanda1&attach_text=&blocked=&bug_file_loc=http%3A%2F%2F&bug_severity=major&bug_status=NEW&cc=tgarg&cf_agent_status=---&cf_agent_type=---&cf_agent_version=&cf_agents=AgentName&cf_backend_frontend=Preventive%20Fixes&cf_branch_found=---&cf_bug_fixed_on=&cf_bugtype=Bug&cf_build_fixed_new=&cf_build_found_new=&cf_business=---&cf_changelist_no=&cf_cobrand_bug_id=&cf_cobrand_changelist=&cf_customer=All&cf_customer_note=&cf_department=IAE&cf_environment=Production&cf_errorcode=&cf_feature=&cf_is_automation=---&cf_is_regression=---&cf_mem_site_acc_id=&cf_memitem=&cf_portfolio=---&cf_public=Private&cf_qa_browser_details=&cf_release_found=---&cf_service_request_id=&cf_site_id=&cf_sla_type=---&cf_story_id=&cf_sub_brand=&cf_suminfo=CSID&cf_tea__disposition=---&cf_tea_cause=---&cf_tea_evaluation=---&cf_tea_manager=&cf_username=&cf_workflow=IAE&comment=Agent%20Version%3A%20scrptVrsn%0D%0A%0D%0ADump%20URL%3A%0D%0Adumpurl%0D%0A%0D%0AException%20Stack%20Trace%3A%0D%0AstackTrace&component=IAE-Data%20Agent&contenttypeentry=&contenttypemethod=autodetect&contenttypeselection=text%2Fplain&data=&deadline=&defined_cf_build_component=&defined_cf_qa_browser_type=&defined_groups=1&dependson=&description=&estimated_time=&form_name=enter_bug&keywords=IAE-QI%2C%20I18N%2C%20TTR_ALERT%2C%20&maketemplate=Remember%20values%20as%20bookmarkable%20template&op_sys=Windows&priority=P1&product=PFM&qa_contact=mjaganiya&rep_platform=All&short_desc=%3CTTR-ALERT%3E%3CI18N%3E%3CAgentName%3E%3CErrorType%3E%3CErrorCode%3A%20ErrorDesc%3E&target_milestone=---&version=3.2';
      var domURL = 'https://blrbugzilla.yodlee.com/enter_bug.cgi?alias=&assigned_to=apanda1&attach_text=&blocked=&bug_file_loc=http%3A%2F%2F&bug_severity=major&bug_status=NEW&cc=shanjura&cf_agent_status=---&cf_agent_type=---&cf_agent_version=&cf_agents=AgentName&cf_backend_frontend=Preventive%20Fixes&cf_branch_found=---&cf_bug_fixed_on=&cf_bugtype=Bug&cf_build_fixed_new=&cf_build_found_new=&cf_business=---&cf_changelist_no=&cf_cobrand_bug_id=&cf_cobrand_changelist=&cf_customer=All&cf_customer_note=&cf_department=IAE&cf_environment=Production&cf_errorcode=&cf_feature=&cf_is_automation=---&cf_is_regression=---&cf_mem_site_acc_id=&cf_memitem=&cf_portfolio=---&cf_public=Private&cf_qa_browser_details=&cf_release_found=---&cf_service_request_id=&cf_site_id=&cf_sla_type=---&cf_story_id=&cf_sub_brand=&cf_suminfo=CSID&cf_tea__disposition=---&cf_tea_cause=---&cf_tea_evaluation=---&cf_tea_manager=&cf_username=&cf_workflow=IAE&comment=Agent%20Version%3A%20scrptVrsn%0D%0A%0D%0ADump%20URL%3A%0D%0Adumpurl%0D%0A%0D%0AException%20Stack%20Trace%3A%0D%0AstackTrace&component=IAE-Data%20Agent&contenttypeentry=&contenttypemethod=autodetect&contenttypeselection=text%2Fplain&data=&deadline=&defined_cf_build_component=&defined_cf_qa_browser_type=&defined_groups=1&dependson=&description=&estimated_time=&form_name=enter_bug&keywords=IAE-QI%2C%20TTR_ALERT%2C%20&maketemplate=Remember%20values%20as%20bookmarkable%20template&op_sys=Windows&priority=P1&product=PFM&qa_contact=mjaganiya&rep_platform=All&short_desc=%3CTTR-ALERT%3E%3CDomestic%3E%3CAgentName%3E%3CErrorType%3E%3CErrorCode%3A%20ErrorDesc%3E&target_milestone=---&version=3.2';
      var template = {'templates':[]};
      template['templates'].push({name:'TTR-I18N', url:i18nURL});
      template['templates'].push({name:'TTR-DOM', url:domURL});
      chrome.storage.local.set(template);
    }
    
    if(!results.hasOwnProperty('errors')){
      var agentErr = [403,408,413,419,439,444,449,450,453,475,476,477,478,479,491,492,493,494,495,496,497,498,507,513,514,601,707,708,709,517];
      var siteErr = [401,409,410,412,415,416,418,424,425,426,431,432,447,448,1012];
      var uarErr = [402,406,407,411,414,417,420,421,422,423,427,428,429,430,434,435,436,437,438,440,441,442,443,445,446,451,452,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,480,481,482,483,484,485,486,510,511,512,515,516,604,605,701,702,703,704,705,706,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1013,505,506,509,518,519,520,521,522,523,524,526];
      var infraErr = [200,201,202,300,303,400,404,508,600,602,603];
      var error = {'errors': []};
      error['errors'].push({name:"Agent",codes:agentErr});
      error['errors'].push({name:"Site",codes:siteErr});
      error['errors'].push({name:"UAR",codes:uarErr});
      error['errors'].push({name:"Infra",codes:infraErr});
      chrome.storage.local.set(error);
    }

    if(!results.hasOwnProperty('sitenames')){ 
      var sites = ['NatWest Bank (UK) - Bank','Lloyds (UK) - Bank', 'Halifax Online (UK) - Bank', 'Barclays (UK) - Bank', 
                  'Nationwide Building Society (UK) - Bank', 'TSB (UK) - Bank', 'Royal Bank of Scotland (UK) - Bank', 'Barclaycard (UK) - credits',
                  'Lloyds Business Banking (UK) - bank', 'Santander Business Banking (UK) - bank', 'Halifax Online (UK) - Credit Card',
                  'Santander (UK) - Bank', 'American Express Cards (UK)	- credits', 'MBNA Credit Cards (UK)	- credits', 'HSBC Bank (UK) - Bank',
                  'Bank of Scotland (UK) - Bank', 'Lloyds (UK) - Credit Card', 'Capital One (UK) - Credit Card', 'NatWest Bank (UK) - Credit Card',
                  'First Direct (UK) - Bank']; 
      var suminfos = ['10249','4495','4569','4721','4419','22676','13203','4686','16284','20344','4874','4416','4515','19437','4567','4424','9828','9777','10614','4848'];
      var sitelist = {'sitenames':[]};
      for(i=0; i<sites.length; i++){
        sitelist['sitenames'].push({site:sites[i], suminfo:suminfos[i]});
      }
      chrome.storage.local.set(sitelist);
    }

      chrome.storage.local.set({'to':'#Client_Services@yodlee.com'});
      chrome.storage.local.set({'cc':'#IAE-Leads@yodlee.com'});
      chrome.storage.local.set({'bcc':'IAE-TTR-Stakeholders@yodlee.com; #IAE-India-Internal@yodlee.com'});
      chrome.storage.local.set({'sign':'Thanks & Regards'});
      
      chrome.runtime.openOptionsPage();
  });

});

function saveTTRInfo(info, callback){
  chrome.storage.local.set(info, callback);
}

function saveTemplate(template, callback){
    chrome.storage.local.get('templates',function(results){
      update = template.update;
      delete template.update;
      if(update==='true'){
        results['templates'].forEach(function(template1, index, templates){
            if(template1.name===template.name){
              template1.url = template.url;
              templates[index] = template1;
            }
        });
        chrome.storage.local.set(results);
      }
      else if(update==='false'){
        templates = results['templates'];
        templates.push(template);
        chrome.storage.local.set(results);
      }
      callback();
    });
}

function saveSite(sitename, callback){
    chrome.storage.local.get('sitenames',function(results){
      update = sitename.update;
      delete sitename.update;
      console.log('in save update='+update);
      if(update==='true'){
        results['sitenames'].forEach(function(sitename1, index, sitenames){
            if(sitename1.suminfo===sitename.suminfo){
              sitename1.site = sitename.site;
              sitenames[index] = sitename1;
            }
        });
        chrome.storage.local.set(results);
      }else if(update==='false'){
        sitenames = results['sitenames'];
        sitenames.push(sitename);
        chrome.storage.local.set(results);
      }
      callback();
    });
}

function deleteTemplate(templateName){
  chrome.storage.local.get('templates',function(results){
    templates = results['templates'];
    index = templates.findIndex(function(template, index, array){
      if(template.name===templateName){
        return true;
      }
    });
    console.log("index to be sliced:"+index);
    templates.splice(index,1);
    console.log(templates);
    chrome.storage.local.set(results);
  });
}

function deleteSite(sitename){
  chrome.storage.local.get('sitenames',function(results){
    sitenames = results['sitenames'];
    index = sitenames.findIndex(function(template, index, array){
      if(template.site===sitename){
        return true;
      }
    });
    console.log("index to be sliced:"+index);
    sitenames.splice(index,1);
    console.log(sitenames);
    chrome.storage.local.set(results);
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  var url = tab.url;
  if(isDumpUrl(url)){
    chrome.pageAction.show(tab.id);
    
  }
  if(isIDCDumpUrl(url)){
    if (changeInfo.status == "complete") {
      chrome.tabs.executeScript(tab.id, {file:"bower_components/jquery/dist/jquery.min.js", runAt:"document_start"},function(){
        chrome.tabs.executeScript(tab.id, {file: "js/content_script.js",runAt:'document_start'});
      });
    }
  }
  
  if(isBugzillaUrl(url)){
    if (changeInfo.status == "complete") {
      chrome.tabs.executeScript(tab.id, {file:"bower_components/jquery/dist/jquery.min.js", runAt:"document_start"},function(){
        chrome.tabs.executeScript(tab.id, {file: "js/TTR_bug.js",runAt:'document_start'});
      });
      chrome.pageAction.show(tab.id);
      chrome.pageAction.setPopup({tabId:tab.id,popup:'bugzilla_popup.html'});
    }
  }
});

function isBugzillaUrl(url){
  if(url.indexOf("https://blrbugzilla.yodlee.com/show_bug.cgi?id=")>-1){
    return true;
  }
}

function isDumpUrl(url){
  if(url.indexOf("https://yoshiee.yodlee.com")>-1 ||
      url.indexOf("https://172.25.25.26")>-1 ||
	  url.indexOf("https://172.25.4.17")>-1 )
    return true;
}

function isIDCDumpUrl(url){
  if(url.indexOf("https://172.25.25.26")>-1 ||
	url.indexOf("https://172.25.4.17")>-1 ){
    return true;
  }
}

function createBug(url, info){
chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      var index = tabs[0].index+1;
      chrome.tabs.create({index:index,url:url}, function(tab){
        chrome.tabs.executeScript(tab.id, {file:"bower_components/jquery/dist/jquery.min.js", runAt:"document_end"}, function(){
          chrome.tabs.executeScript(tab.id, {file:"js/file_bug.js", runAt:"document_end"}, function(){
            chrome.tabs.sendMessage(tab.id,{from:"background", action:"fill_info", info:info});
          });
        });
      });
    });
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if(msg.from==="content"){
    if(msg.action==="create_bug"){
          chrome.storage.local.get('templates',function(results){
            results['templates'].forEach(function(template){
              if(template["name"]==msg.info.bugType){
                createBug(template["url"],msg.info);
              }
            });
          });
      }else if(msg.action==="create_metafield"){
           chrome.tabs.query({active:true,currentWindow:true},function(tabs){
              var index = tabs[0].index+1;
              var url = chrome.extension.getURL('../createMetaField.html');
              chrome.tabs.create({index:index,url:url}, function(tab){
                  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab1){
                      if(tabId==tab.id && changeInfo.status=="complete"){
                        chrome.tabs.sendMessage(tab.id,{from:"background", action:"fill_META", info:msg.info});
                      }
                  });
              });
            });
      }
    }
    if(msg.from==="TTR_bug"){
      if(msg.action==="create_TTR"){
           chrome.tabs.query({active:true,currentWindow:true},function(tabs){
              var index = tabs[0].index+1;
              var url = chrome.extension.getURL('../createTTR.html');
              chrome.tabs.create({index:index,url:url}, function(tab){
                  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab1){
                      if(tabId==tab.id && changeInfo.status=="complete"){
                        chrome.tabs.sendMessage(tab.id,{from:"background", action:"fill_TTR", info:msg.info});
                      }
                  });
              });
            });
      }else if(msg.action==="create_metafield"){
           chrome.tabs.query({active:true,currentWindow:true},function(tabs){
              var index = tabs[0].index+1;
              var url = chrome.extension.getURL('../createMetaField.html');
              chrome.tabs.create({index:index,url:url}, function(tab){
                  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab1){
                      if(tabId==tab.id && changeInfo.status=="complete"){
                        chrome.tabs.sendMessage(tab.id,{from:"background", action:"fill_META", info:msg.info});
                      }
                  });
              });
            });
      }
    }
});