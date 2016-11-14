
var info;
var buffer = 20; //scroll bar buffer
var iframe = document.getElementById('TTRbody');

String.prototype.replaceAll = function(str, replacement){
  return this.split(str).join(replacement);
};

function pageY(elem) {
    return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;
}

function resizeIframe() {
    var height = document.documentElement.clientHeight;
    height -= pageY(document.getElementById('TTRbody'))+ buffer ;
    height = (height < 0) ? 0 : height;
    document.getElementById('TTRbody').style.height = height + 'px';
}


window.onresize = resizeIframe; 

function getFormattedDate(date){
  var mmm = new Array('Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
  var dd = date.getDate();
  var mm = date.getMonth();
  var yyyy = date.getFullYear();
  
  return dd+'-'+mmm[mm]+'-'+yyyy;
}

function copyToClipboard() {
    windw = document.getElementById('TTRbody').contentWindow;
    doc = windw.document;
    range = doc.createRange();
    range.selectNodeContents(doc);
    selection = windw.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    doc.execCommand("copy",true);
    selection.removeAllRanges();
}

resetFormOptions = function(form){
  $('.has-error', form).removeClass('has-error');
  $('.help-block', form).text('');
};

resetDivError = function(div){
  div.removeClass('has-error');
  $('.help-block', div).text('');
};

validateForm = function(form){
  resetFormOptions(form);
  var error = false;
  $.each($('input, textarea', form),function(i, field){
    if(!$(field).val()){
      error = true;
      var div = $(field).closest('.form-group');
      div.addClass('has-error');
      $('.help-block', div).text($('label[for="'+$(field).attr('id')+'"]').text().replace(':','')+' cannot be empty');
      $(window).scrollTop($(field).offset().top);
    }
  });
  return !error;
};

function fill_info(info){
  var today = new Date();
  
  $('#sDate').val(getFormattedDate(today)).change();
   today.setDate(today.getDate()+5);
  $('#eta').val(getFormattedDate(today)).change();
   
  
  title = info.title+'<Agent Name: '+info.agent+'><Bug#:'
              +info.bugId+'><'+info.errorType+' Error: '+info.errorCode+'><Status: WIP>';
  
  $('#issueType').val(info.errorType+' Error : '+info.errorCode).change();
  
  $('#agentName').val(info.agent).change();
  
  $('#sumInfo').val(info.sumInfo).change();
  
  $('#bugId').val(info.bugId).change();
  
  $('#stacktrace').val(info.stackTrace).change();
  
  $('#subject').val(title);
}



function getFrameEle(ele){
  if($.type(ele)==="string"){
    return $('iframe#TTRbody').contents().find(ele);
  }
  return $('iframe#TTRbody').contents().find('#'+ele.attr('id')); 
  // $(window.frames[0].document.getElementById(ele.attr('id')));
}

var cobrands = ['3DAdvisor ',	'AMEX ',	'AMEX IAV SDK ',	'ANZ ',	'Accountantsworld ',	'AdityaBirlaMU ',	
              'Affinity Financial ',	'Ally Bank Bill Pay ',	'Amazon IAV ',	'Amex IAV ',	'Amex PFM ',	
                'Andera ',	'Appfolio ',	'Arthamoney ',	'Auyirestmaster ',	'Ayco ',	'BBT ',	'BancVue PFM ',	
                'Bank of America ',	'Bank of America - Mil ',	'Betterment ',	'Big Brain ',	'Bimnetworks ',	
                'Bloomberg ',	'Bloomberg beta ',	'Boston Financial(BFDS) ',	'Boursorama ',	'BoweryFinancial ',	
                'CESI ',	'CHASE IAV ',	'Capital One - BPAA ',	'CashLocale ',	'CashPath ',	'Chase Private Bank PFM ',	
                'Citi Private ',	'Citi Smith Barney ',	'CitiPFM ',	'Clarilogic ',	'Clinkle ',	'Clovr Media ',	'Comerica ',
                'Commonwealth ',	'Compass Bank ',	'Concur ',	'Confused ',	'Credit Sense ',	'CreditKarma ',	
                'CustomHouse ',	'DOSH, LLC (Solavei) ',	'Deluxe ',	'Djed ',	'Dwolla ',	'ETRADE ',	'ETrade Credit Card ',
                'Enova ',	'Envesnet ',	'Experian ',	'FCC ',	'FICO ',	'Fidelity ',	'Fidelity_Tandem ',	
                'Financial Engine ',	'First Citizen Bank ',	'FormFree ',	'Freedom Financial ',	'Frost ',	'Frost Bank ',	
                'FundsXpress ',	'General Electric Capital Corp ',	'Goldmansachs ',	'Google SDK IAV ',	'Great West-RPS ',	
                'HRBlock ',	'HSBC ',	'HSBC ',	'HSBC Funds Transfer ',	'HSBC OnCenter Upgrade 9x ',	'Harris_Production ',	
                'HedgeOp ',	'Hello Wallet ',	'ICICI ',	'ICICI Bank ',	'Identityforce ',	'International Yodlee SDKMaster ',
                'InvestCloud ',	'Investec ',	'Iron Stone Bank ',	'JPMorgan Chase ',	'K2 ',	'Kabbage ',	'Kashoo ',	
                'Klarna ',	'LearnVest ',	'Liberis ',	'Liberty ',	'LifeLock ',	'LoanDepot ',	'LoudWater ',	'Lovemoney ',	
                'Loyalty Angels ',	'M&amp;T ',	'MBNA ',	'Mass Mutual ',	'Merill Lynch ',	'Merrill Lynch IAV ',	
                'MerrillLynch11x PFM ',	'Metavante ',	'Metavante IAV ',	'Miicard ',	'Mobank ',	'Mobile Candy Dish ',	
                'Money Dashboard ',	'MoneyDesktop ',	'MoneyGuidePro ',	'MoulaMoney ',	'Moven ',	'MyChange ',	'Mystrands ',
                'Nedbank ',	'NextCapital ',	'Northern Trust ',	'Northern Trust AV ',	'Northwestern ',	'OLTTWA - ISV ',	
                'Ontrees ',	'Open Solutions ',	'PNC ',	'PNC Bank ',	'PNC PFM ',	'PayPal ',	'PaySimple ',	'Paypal 12x ',	
                'Paypal Hybrid ',	'Personal Capital ',	'Postilion ',	'Protective Draft Credit - SDK ',	'Q2 ',	'QSuper ',	
                'QuickStart ',	'QuickStart IAV ',	'RBC ',	'RBC IAV ',	'RHB ',	'RealGift SDK ',	'Rearden ',	
                'Rearden Expense ',	'Reliance Trust ',	'Revolution Money ',	'SEI-3-SAML ',	'SEI-3Client-SAML ',	
                'SMB-PersonalView ',	'Sammedia ',	'Scottrade ',	'Seamless ',	'Simplifi ',	'Smart401K ',	'SmartCredit ',	
                'SouthPointe Digital ',	'Standard Insurance ',	'T. Rowe Price ',	'TIAA-CREF ',	'Tandem ',	'Tangerine ',	
                'Telephia ',	'Thomson Reuters ',	'Tink ',	'TransUnion ',	'TransferWise ',	'Troweprice CDV ',	'UBS ',	
                'USAA Hybrid SDK ',	'USC ',	'Umpqua ',	'Unienence ',	'Union FSB ',	'Vanguard ',	'VerifyValid ',	'Vitality ',	
                'Wachovia - Advisor View ',	'Wachovia SAML ',	'Western Union ',	'WorkingPoint ',	'Xero ',	'Xero ',	'YI Finapps ',	
                'Yes Bank ',	'Yodlee ',	'Yodlee Money Movement SDK  Mas ',	'Yodlee PFM Master ',	'Yodlee SDK (EE) LAW Master ',
                'Yodlee SDK Master ',	'YodleeSandbox ',	'andera ',	'centralone ',	'eMoney ',	'ePAR ',	'finsphere ',	'marlettefunding ',	
                'squarecash ',	'target ',	'usyirestserver '];


$('select').change(function(){
    getFrameEle($(this)).text($(this).find(':selected').text());
});
  
$('input, textarea').on('input change',function(){
    resetDivError($(this).closest('.form-group'));
    //console.log($(this).attr('id')+'--'+$(this).val());
    //console.log(getFrameEle($(this)).text());
    getFrameEle($(this)).text($(this).val());
});

$('#bugId').on('input change',function(){
  ele = getFrameEle($('#bugId'));
  href = ele.attr('href');
  //console.log(href);
  href = href.substring(0,href.indexOf('='))+"=";
  ele.attr('href',href+ele.text());
});

$('#stacktrace').on('input change',function(){
  getFrameEle($(this)).html($(this).val().replaceAll('\n','<br>'));
});

$('#status').on('input change',function(){
  sub = $('#subject').val();
  sub = sub.substring(0, sub.indexOf('Status:')+'Status:'.length+1);
  //console.log(sub);
  sub+=($(this).val()+'>');
  $('#subject').val(sub);
});


$('#create-ttr').click(function(){
  if(validateForm($('#TTR'))){
    copyToClipboard();
    var url = encodeURI("mailto:"+$('#to').val()+'?cc='+$('#cc').val()+'&bcc='+$('#bcc').val()+'&subject='+$('#subject').val());
    // console.log(url);
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      var index = tabs[0].index+1;
      chrome.tabs.create({index:index,url:url},function(tab){
        setTimeout(function(){chrome.tabs.remove(tab.id, function(){
          chrome.tabs.update(tabs[0].id, {selected: true});
        });},500);
      });
    });
  }else{
    alert("Please fill in all the fields!!");
  }
});

$('#impactValue,#impactDuration,#impactDurUnits,#actualAffected').on('input change', function(){
  ele = getFrameEle('#impacted');
  impact = $('#impactValue').val();
  duratn = $('#impactDuration').find(':selected').text();
  units = $('#impactDurUnits').find(':selected').text();
  actualAffected = $('#actualAffected').val();
  //console.log(impact+' requests in last '+duratn+' '+units);
  ele.text('~'+impact+'% requests in last '+duratn+' '+units+'('+actualAffected+'+)');
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if(msg.from==="background"){
    if(msg.action==="fill_TTR"){
      //console.log('filling info now');
      $('iframe#TTRbody').contents()[0].addEventListener('DOMContentLoaded',fill_info(msg.info));
    }
  }
});

document.addEventListener('DOMContentLoaded',function(){
  
  $('[data-toggle="tooltip"]').tooltip(); 
  
  for(i=1;i<=24;i++){
    $('#impactDuration').append($('<option>',{text:i}));
  }
  $.each(cobrands, function(i, cobrand){
    // //console.log(cobrand);
    $('#cobrands').append($('<option>', {text: cobrand}));
  });
  
  $('iframe#TTRbody').on('load', function(){
    resizeIframe();
     $(this).css('border','solid');
     $(this).css('padding','2px');
  });
  
  
  chrome.tabs.getCurrent(function(tab){
    //console.log('tab id:'+tab.id);
  });
  
  chrome.storage.local.get(['to','cc','bcc','sign'],function(results){
    $('#to').val(results['to']);
    $('#cc').val(results['cc']);
    $('#bcc').val(results['bcc']);
    if(results['sign']){
      //console.log(results.sign);
      $('iframe#TTRbody').contents()[0].addEventListener('DOMContentLoaded',function(){
        getFrameEle('#sign').html(results['sign'].replaceAll('\n','<br>'));
      });
    }
  });
  
});