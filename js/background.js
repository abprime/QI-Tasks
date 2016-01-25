/**
 * used to store templates as array of {name: bug type, url: url}
 * also store error codes and error type as array of {name: errorType, codes:[code1, code2, code3]}
 **/
chrome.storage.local.get(null, function(results){
  if(!results.hasOwnProperty('templates')){
    console.log('not found template');
    var ttrURL = 'https://blrbugzilla.yodlee.com/enter_bug.cgi?alias=&assigned_to=&attach_text=&blocked=&bug_file_loc=http%3A%2F%2F&bug_severity=major&bug_status=NEW&cc=tgarg&cf_agent_status=---&cf_agent_type=---&cf_agent_version=&cf_agents=AgentName&cf_backend_frontend=Preventive%20Fixes&cf_branch_found=---&cf_bug_fixed_on=&cf_bugtype=Bug&cf_build_fixed_new=&cf_build_found_new=&cf_business=---&cf_changelist_no=&cf_cobrand_bug_id=&cf_cobrand_changelist=&cf_customer=All&cf_customer_note=&cf_department=IAE&cf_environment=Production&cf_errorcode=&cf_feature=&cf_is_automation=---&cf_is_regression=---&cf_mem_site_acc_id=&cf_memitem=&cf_portfolio=---&cf_public=Private&cf_qa_browser_details=&cf_release_found=---&cf_service_request_id=&cf_site_id=&cf_sla_type=---&cf_story_id=&cf_sub_brand=&cf_suminfo=CSID&cf_tea__disposition=---&cf_tea_cause=---&cf_tea_evaluation=---&cf_tea_manager=&cf_username=&cf_workflow=IAE&comment=Dump%20URL%0D%0A%0D%0AException%20Stack%20Trace%3A&component=Account%20Management%20%3A%20Add%20Account&contenttypeentry=&contenttypemethod=autodetect&contenttypeselection=text%2Fplain&data=&deadline=&defined_cf_build_component=&defined_cf_qa_browser_type=&defined_groups=1&dependson=&description=&estimated_time=&form_name=enter_bug&keywords=TTR_ALERT%2C%20IAE-QI%2C%20I18N&maketemplate=Remember%20values%20as%20bookmarkable%20template&op_sys=Windows&priority=P1&product=PFM&qa_contact=mjaganiya&rep_platform=All&short_desc=%3CTTR-Alert%3E%3CAgentName%3E%3CErrorType%3E%3CErrorCode%3A%20ErrorDesc%3E&target_milestone=---&version=Tesla';
    var pfmURL = 'https://blrbugzilla.yodlee.com/enter_bug.cgi?alias=&assigned_to=&attach_text=&blocked=&bug_file_loc=http%3A%2F%2F&bug_severity=major&bug_status=NEW&cc=tgarg&cf_agent_status=---&cf_agent_type=---&cf_agent_version=&cf_agents=AgentName&cf_backend_frontend=Preventive%20Fixes&cf_branch_found=---&cf_bug_fixed_on=&cf_bugtype=Bug&cf_build_fixed_new=&cf_build_found_new=&cf_business=---&cf_changelist_no=&cf_cobrand_bug_id=&cf_cobrand_changelist=&cf_customer=All&cf_customer_note=&cf_department=IAE&cf_environment=Production&cf_errorcode=&cf_feature=&cf_is_automation=---&cf_is_regression=---&cf_mem_site_acc_id=&cf_memitem=&cf_portfolio=---&cf_public=Private&cf_qa_browser_details=&cf_release_found=---&cf_service_request_id=&cf_site_id=&cf_sla_type=---&cf_story_id=&cf_sub_brand=&cf_suminfo=CSID&cf_tea__disposition=---&cf_tea_cause=---&cf_tea_evaluation=---&cf_tea_manager=&cf_username=&cf_workflow=IAE&comment=Dump%20URL%0D%0A%0D%0AException%20Stack%20Trace%3A&component=Account%20Management%20%3A%20Add%20Account&contenttypeentry=&contenttypemethod=autodetect&contenttypeselection=text%2Fplain&data=&deadline=&defined_cf_build_component=&defined_cf_qa_browser_type=&defined_groups=1&dependson=&description=&estimated_time=&form_name=enter_bug&keywords=IAE-QI%2C%20I18N%2C%20&maketemplate=Remember%20values%20as%20bookmarkable%20template&op_sys=Windows&priority=P1&product=PFM&qa_contact=mjaganiya&rep_platform=All&short_desc=%3CTTR-I18N%3E%3CAgentName%3E%3CErrorType%3E%3CErrorCode%3A%20ErrorDesc%3E&target_milestone=---&version=Tesla';
    var template = {'templates':[]};
    template['templates'].push({name:'TTR', url:ttrURL});
    template['templates'].push({name:'PFM', url:pfmURL});
    chrome.storage.local.set(template);
  }
  if(!results.hasOwnProperty('errors')){
    console.log('not found errors');
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
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  var url = tab.url;
  if(isDumpUrl(url)){
    // console.log("Tab id: "+tab.id+", Tab no: "+tab.index);
    chrome.pageAction.show(tab.id);
  }
});

function isDumpUrl(url){
  if(url.indexOf("https://yoshiee.yodlee.com")>-1)
    return true;
}

function createBug(url, info){
chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      // console.log("in Tab No:"+tabs[0].id);
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
          // console.log("Got request from content to create bug for : "+msg);
          chrome.storage.local.get('templates',function(results){
            results['templates'].forEach(function(template){
              // console.log((template["name"]==msg.bugType)+"---"+template["name"]+"=="+msg.bugType);
              if(template["name"]==msg.info.bugType){
                createBug(template["url"],msg.info);
              }
            });
          });
      }
    }
});