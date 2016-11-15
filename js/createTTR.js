
var _info = [];
var buffer = 20; //scroll bar buffer
var iframe = document.getElementById('TTRbody');
var dynamicFieldCount = 1;
var templtBtn = false;
var _fields = [];

window.onresize = resizeIframe; 

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

 var sitenames = ['NatWest Bank (UK) - Bank','Lloyds (UK) - Bank', 'Halifax Online (UK) - Bank', 'Barclays (UK) - Bank', 
                  'Nationwide Building Society (UK) - Bank', 'TSB (UK) - Bank', 'Royal Bank of Scotland (UK) - Bank', 'Barclaycard (UK) - credits',
                  'Lloyds Business Banking (UK) - bank', 'Santander Business Banking (UK) - bank', 'Halifax Online (UK) - Credit Card',
                  'Santander (UK) - Bank', 'American Express Cards (UK)	- credits', 'MBNA Credit Cards (UK)	- credits', 'HSBC Bank (UK) - Bank',
                  'Bank of Scotland (UK) - Bank', 'Lloyds (UK) - Credit Card', 'Capital One (UK) - Credit Card', 'NatWest Bank (UK) - Credit Card',
                  'First Direct (UK) - Bank']; 

var fieldnamelist = ['Display Name  /Site name change', 'Login  Field type change','Login flow change', 'MFA type change', 'Base url /Login url change',
                  'Logo / FavIcon  are change', 'Login field Description change', 'Login field  Order change', 'Meta fields max length / Field size change'];

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

function getDynfield(idx){
        var selectList = " <div id='addtextboxdyn'> <div class='col-md-11'> "+ 
                         " <label for='fieldnames' class='control-label'>Field Name :</label> "+ 
                         " <select class='form-control' id='fldName-meta-"+idx+"'> "+
                         " <option value='' selected>--- None ---</option> ";
          $.each(fieldnamelist, function(index, value) {
            selectList += "<option value='"+value+"'>" + value + "</option>";
          });
            selectList += " </select> "+
                          " <span class='help-block'></span> "+
                          " </div> "+
                          " <div class='col-md-1'> <label class='control-label'><font color='white'>as</font></label><label class='control-label'><a href='#' id='remove-"+idx+"' class='text-danger'><span class='glyphicon glyphicon-remove'></span></a></label></div> ";

            selectList += " <div class='col-md-6'> <label class='control-label'>Old :</label> <input id='fld-old-meta-"+idx+"' name='fld-old-meta-"+idx+"' class='form-control' /> </div> "+
                          " <div class='col-md-6'> <label class='control-label'>New :</label> <input id='fld-new-meta-"+idx+"' name='fld-new-meta-"+idx+"' class='form-control' /> </div> ";

            selectList += " </div> </div> ";
  return selectList;
}

function getDynIframefield(index){

var tableRow =  " <tr style='height:16.5pt' id='fieldname-meta-"+index+"'> "+
				        " <td width=152 style='width:114.15pt;border:solid windowtext 1.0pt;border-top:none;background:silver;padding:0cm 5.4pt 0cm 5.4pt;height:16.5pt'> "+
					      " <p class=MsoNormal><span style='color:#1F4E79'>Field Name <o:p></o:p></span></p> "+
				        " </td> "+
				        " <td width=331 style='width:248.1pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;background:white;padding:0cm 5.4pt 0cm 5.4pt;height:16.5pt'> "+
					      " <p class=MsoNormal><span id='fldName-meta-"+index+"' style='color:#1F4E79'><o:p></o:p></span></p> "+
				        " </td> "+
				        " <td width=326 style='width:244.2pt;padding:0cm 0cm 0cm 0cm;height:16.5pt'></td> "+
			          " </tr> ";
			          
    tableRow += " <tr style='height:16.5pt' id='field-old-meta-"+index+"'> "+
                " <td width=152 style='width:114.15pt;border:solid windowtext 1.0pt;border-top:none;background:HoneyDew;padding:0cm 5.4pt 0cm 5.4pt;height:16.5pt;' align='right'> "+
                " <p class=MsoNormal><span style='color:#696969'> Old Name : <o:p></o:p></span></p> </td> "+
                " <td width=331 style='width:248.1pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;background:GhostWhite ;padding:0cm 5.4pt 0cm 5.4pt;height:16.5pt'> "+
                " <p class=MsoNormal><span id='fld-old-meta-"+index+"' style='color:#1F4E79'><o:p></o:p></span></p> </td> "+
                " <td width=326 style='width:244.2pt;padding:0cm 0cm 0cm 0cm;height:16.5pt'></td> "+
                " </tr> ";
                
    tableRow += " <tr style='height:16.5pt' id='field-new-meta-"+index+"'> "+
                " <td width=152 style='width:114.15pt;border:solid windowtext 1.0pt;border-top:none;background:HoneyDew;padding:0cm 5.4pt 0cm 5.4pt;height:16.5pt' align='right'> "+
                " <p class=MsoNormal><span style='color:#696969'> New Name : <o:p></o:p></span></p> </td> "+    
                " <td width=331 style='width:248.1pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;background:GhostWhite;padding:0cm 5.4pt 0cm 5.4pt;height:16.5pt'> "+
                " <p class=MsoNormal><span id='fld-new-meta-"+index+"' style='color:#1F4E79'><o:p></o:p></span></p> </td> "+
                " <td width=326 style='width:244.2pt;padding:0cm 0cm 0cm 0cm;height:16.5pt'></td> "+
                " </tr> ";
  return tableRow;
}

validateForm = function(form){
  resetFormOptions(form);
  var error = false;
  
  $.each($('input, textarea', form),function(i, field){
    
    if(!$(field).val()){
      if($(field).attr('id').indexOf('-meta') >= 0 && !templtBtn){
        return;
      }
        error = true;
        var div = $(field).closest('.form-group');
        div.addClass('has-error');
        $('.help-block', div).text($('label[for="'+$(field).attr('id')+'"]').text().replace(':','')+' cannot be empty');
        $(window).scrollTop($(field).offset().top);
    }
  });
  
  $.each($('select', form),function(i, field){
    var fieldId = $(field).attr('id'); 
    var fieldValue = $(field).val();

    if(fieldValue == 'All-' || fieldValue == '--- None ---' || fieldValue === null || fieldValue === ''){
        if((fieldId.indexOf('-meta') >= 0 || fieldId == 'sitenames') && !templtBtn){
          return;
        }  
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
  _info = info;
  var today = new Date();
  var etaDate = new Date();
  $('#sDate').val(getFormattedDate(today)).change();
   etaDate.setDate(today.getDate()+5);
  $('#eta').val(getFormattedDate(etaDate)).change();
   
  
  title = info.title+'<Agent Name: '+info.agent+'><Bug#:'
              +info.bugId+'><'+info.errorType+' Error: '+info.errorCode+'><Status: WIP>';
  
  $('#issueType').val(info.errorType+' Error : '+info.errorCode).change();
  $('#agentName').val(info.agent).change();
  $('#sumInfo').val(info.sumInfo).change();
  $('#bugId').val(info.bugId).change();
  $('#stacktrace').val(info.stackTrace).change();
  $('#subject').val(title);

  /* This is for Metafield template*/
  $('#sDate-meta').val(getFormattedDate(today)).change();
  $('#agentName-meta').val(_info.agent).change();
  $('#sumInfo-meta').val(_info.sumInfo).change();  
  $('#bugId-meta').val(_info.bugId).change();
  $('#eta-meta').val(getFormattedDate(etaDate)).change();
}

/**
*
* 
*/
function getFrameEle(ele){
  if($.type(ele)==="string"){
    return $('iframe#TTRbody').contents().find(ele);
  }
    return $('iframe#TTRbody').contents().find('#'+ele.attr('id')); 
  // $(window.frames[0].document.getElementById(ele.attr('id')));
}

function removeFrameElement(idx, fld){
    $('iframe#TTRbody').contents().find('tr[id^='+fld+']').each(function (index, field) {
      var iFrmEleId = $(field).attr('id');
      iFrmEleId = iFrmEleId.substring((iFrmEleId.lastIndexOf('-')+1));
      if(iFrmEleId === idx)
        return $('iframe#TTRbody').contents().find('table#my_table tr#'+$(field).attr('id')).remove(); 
    });
}

$('select').change(function(){
    getFrameEle($(this)).text($(this).find(':selected').text());
});
  
/**
*/  
$('input, textarea').on('input change',function(){
    resetDivError($(this).closest('.form-group'));
    getFrameEle($(this)).text($(this).val().trim());
});

$('#bugId').on('input change',function(){
  ele = getFrameEle($('#bugId'));
  href = ele.attr('href');
  href = href.substring(0,href.indexOf('='))+"=";
  ele.attr('href',href+ele.text());
});

$('#bugId-meta').on('input change',function(){
  ele = getFrameEle($('#bugId-meta'));
  href = ele.attr('href');
  href = href.substring(0,href.indexOf('='))+"=";
  ele.attr('href',href+ele.text());
});

$('#stacktrace').on('input change',function(){
  getFrameEle($(this)).html($(this).val().replaceAll('\n','<br>'));
});

$('#status').on('input change',function(){
  sub = $('#subject').val();
  sub = sub.substring(0, sub.indexOf('Status:')+'Status:'.length+1);
  sub+=($(this).val()+'>');
  $('#subject').val(sub);
});


$('#sitenames').on('change',function(){
        var selected = $("#sitenames option:selected");
        var message = "";
        selected.each(function () {
            message += $(this).text()+"\n";
        });
        getFrameEle($(this)).text($(this).val());
});

/*
*
*
*/
$('#add-fieldBox').click(function () {
    if(dynamicFieldCount <= fieldnamelist.length){
      $('#fieldBox').append(getDynfield(dynamicFieldCount));
      var position = (3 * (dynamicFieldCount-1)) + 1;
      var $table = $('iframe#TTRbody').contents().find('table > tbody:last tr:eq('+position+')');
          $table.after(getDynIframefield(dynamicFieldCount));
      dynamicFieldCount++;
    }
});

/*
*
*
*/
$(document).on('click', ".text-danger", function () {
      dynamicFieldCount--;
      var ele = $(this).attr('id');
      ele = ele.substring((ele.lastIndexOf('-')+1));
      $(this).closest("div#addtextboxdyn").remove();
      removeFrameElement(ele, 'field-old-meta-');
      removeFrameElement(ele, 'field-new-meta-');
      removeFrameElement(ele, 'fieldname-meta-');
});

$(document).on('change', "input[id^=fld-old-meta-], input[id^=fld-new-meta-], select[id^=fldName-meta-]", function () {
  getFrameEle($(this)).text($(this).val());  
});


$('#control-btn').click(function () {
  templtBtn = (templtBtn) ? false : true;
  if(templtBtn){
      var _isSite = _info.isUKSite;
      //console.log("======> Inside the createTTR/cnt_btn=======>"+_isSite); 
      if(_isSite === undefined || _isSite === null){
          $('#myModal').on('show', function () { });
          $('#myModal').modal('show');
          $('#mymodal-content').text('This sum_info in not an UK Site to create MetaData Template..');
          return;
      }
    
      $(this).text('Remove MetaData Template');
      $('#control-btn').attr('title', 'Remove MetaData Template');
      $('#control-right').show();
      
      $('#fieldnames').append($('<option>', {text: '--- None ---'}));
      chrome.storage.local.get('sitenames',function(results){
          results['sitenames'].forEach(function(sitename1, index, sitenames){
            $('#sitenames').append($('<option>', {text: sitename1.site}));
          });
      });
    
      //$('#TTRbody').attr('src', 'ttr-metafieldTemplate.html');
      $('iframe#TTRbody').contents().find('#temp-right').show();

    }else{
      $(this).text('Add MetaData Template');
      $('#control-btn').attr('title', 'Add MetaData Template');

      $("#sitenames").empty();
      
      $(".text-danger").each(function(i) {
          dynamicFieldCount--;
          var ele = $(this).attr('id');
          ele = ele.substring((ele.lastIndexOf('-')+1));
          $(this).closest("div#addtextboxdyn").remove();
          removeFrameElement(ele, 'field-old-meta-');
          removeFrameElement(ele, 'field-new-meta-');
          removeFrameElement(ele, 'fieldname-meta-');
       });
      $('#control-right').hide();
      //$('#TTRbody').attr('src', 'ttrTemplate.html');
      $('iframe#TTRbody').contents().find('#temp-right').hide();
    }
});

/**
*
*
**/
$('#create-ttr').click(function(){
  if(validateForm($('#TTR'))){
    copyToClipboard();
    var url = encodeURI("mailto:"+$('#to').val()+'?cc='+$('#cc').val()+'&bcc='+$('#bcc').val()+'&subject='+$('#subject').val());
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      var index = tabs[0].index+1;
      chrome.tabs.create({index:index,url:url},function(tab){
        setTimeout(function(){chrome.tabs.remove(tab.id, function(){
          chrome.tabs.update(tabs[0].id, {selected: true});
        });},500);
      });
    });
  }else{
    //alert("Please fill in all the fields!!");
    $('#myModal').on('show', function () { });
    $('#myModal').modal('show');
    $('#mymodal-content').text('Some of fields are not filed so enter it...');
  }
});

$('#impactValue,#impactDuration,#impactDurUnits,#actualAffected').on('input change', function(){
  ele = getFrameEle('#impacted');
  impact = $('#impactValue').val();
  duratn = $('#impactDuration').find(':selected').text();
  units = $('#impactDurUnits').find(':selected').text();
  actualAffected = $('#actualAffected').val();
  ele.text('~'+impact+'% requests in last '+duratn+' '+units+'('+actualAffected+'+)');
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if(msg.from==="background"){
    if(msg.action==="fill_TTR"){
      $('iframe#TTRbody').contents()[0].addEventListener('DOMContentLoaded',fill_info(msg.info));
    }
  }
});


/**
 * Document loaded.
 * */
document.addEventListener('DOMContentLoaded',function(){
  $('[data-toggle="tooltip"]').tooltip(); 
  
  $('#control-right').hide();

  for(i=1;i<=24;i++){
    $('#impactDuration').append($('<option>',{text:i}));
  }
  
  $.each(cobrands, function(i, cobrand){
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
  
  $('iframe#TTRbody').contents().find('#temp-right').hide();
  
  chrome.storage.local.get(['to','cc','bcc','sign'],function(results){
    $('#to').val(results['to']);
    $('#cc').val(results['cc']);
    $('#bcc').val(results['bcc']);
    if(results['sign']){
      $('iframe#TTRbody').contents()[0].addEventListener('DOMContentLoaded',function(){
        //console.log('called in iframe#TTRbody/document functinon.');
        $('iframe#TTRbody').contents().find('#temp-right').hide();
        getFrameEle('#sign').html(results['sign'].replaceAll('\n','<br>'));
      });
    }
  });
});