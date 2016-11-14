
updateTemplatesPage = function(){
  $('tbody',$('#templates')).empty();
  chrome.storage.local.get('templates', function(results){
      $('tbody',$('#templates')).append(ich.template({templates:results['templates']}));
      
      $('.edit-template').click(function(){
        $('legend',$('#addTemplate')).text('Edit Template');
        $('#update').val('true');
        var template = $(this).closest('tr');
        //console.log($('td:eq(0)',template).text());
        resetFormOptions($('#addTemplate'));
        $('#tName').val($('td:eq(0)',template).text());
        $('#tName').attr('readonly','');
        $('#tUrl').val($('td:eq(1)',template).text());
        $('#templates-table').hide();
        $('#addTemplate').show();
      });
      
      $('.delete-template').click(function(){
        var template = $(this).closest('tr');
        //console.log($('td:eq(0)',template).text());
        var deleteDialog = $('#delete-modal');
        $('p',deleteDialog).text('Are you sure you want to delete \''+$('td:eq(0)',template).text()+'\' Bug Template ?');
        $('.btn-danger',deleteDialog).off('click').on('click',function(){
          template.remove();
          chrome.extension.getBackgroundPage().deleteTemplate($('td:eq(0)',template).text());
          deleteDialog.modal('hide');
          showSuccessStatus();
        });
        // //console.log('show dialog');
        deleteDialog.modal('show');
      });
      
  });
};

updateSiteListPage = function(){
  $('tbody',$('#sitenames')).empty();
  chrome.storage.local.get('sitenames', function(results){
    $('tbody',$('#sitenames')).append(ich.sitename({sitenames:results['sitenames']}));

      $('.edit-sitenames').click(function(){
        $('legend',$('#addSitenames')).text('Edit Site with SUM_INFO');
        $('#update',$('#addSitenames')).val('true');
        var site = $(this).closest('tr');
        //console.log($('td:eq(0)',site).text());
        resetFormOptions($('#addSitenames'));
        var siteName = $('td:eq(0)',site).text();
        var sites = siteName.substr(0, siteName.indexOf(' - '));
        var cobrnd = siteName.substr((siteName.indexOf(' - ')+3),siteName.length);
        console.log('siteName:'+sites+'/cobrnd:'+cobrnd);
        $('#sName').val(sites);
        $('#sInfo').val($('td:eq(1)',site).text());
        $('#sInfo').attr('readonly','');
        $('#sCobrnd').val(cobrnd).change();
        $('#sitenames-table').hide();
        $('#addSitenames').show();
      });
    
      $('.delete-sitenames').click(function(){
        var template = $(this).closest('tr');
        console.log($('td:eq(0)',template).text());
        var deleteDialog = $('#delete-modal');
        $('p',deleteDialog).text('Are you sure you want to delete \''+$('td:eq(0)',template).text()+'\' Site detail ?');
        $('.btn-danger',deleteDialog).off('click').on('click',function(){
          template.remove();
          chrome.extension.getBackgroundPage().deleteSite($('td:eq(0)',template).text());
          deleteDialog.modal('hide');
          showSuccessStatus();
        });
        // //console.log('show dialog');
        deleteDialog.modal('show');
      });

  });
};

updateTTRpage = function(){
  $('input,textarea',$('#ttrInfo')).val('');
  chrome.storage.local.get(['to','bcc','cc','sign'],function(results){
    $('#to').val(results['to']);
    $('#cc').val(results['cc']);
    $('#bcc').val(results['bcc']);
    $('#sign').val(results['sign']);
  });
};

// i=1;
resetFormOptions = function(form){
  $('.has-error', form).removeClass('has-error');
  $('.help-block', form).text('');
};

showSuccessStatus = function(){
  $("#display-success").alert();
  $("#display-success").fadeTo(2000, 500).slideUp(500, function(){
    $("#display-success").hide();
  });
};

validateTemplateForm = function(form, fields){
  var template = {};
  $.each(fields, function(i, field){
    //console.log(field.name+"="+field.value);
    if(!field.value){
      var div = $('#'+field.name,form).closest('.form-group');
      div.addClass('has-error');
      $('.help-block', div).text($('label[for="'+field.name+'"]').text().replace(':','')+' cannot be empty');
    }else{
      if(field.name=='tName'){
        template.name = field.value;
      }
      if(field.name=='tUrl'){
        if(field.value.indexOf('https://blrbugzilla.yodlee.com/enter_bug.cgi?')<0){
          var div1 = $('#tUrl',form).closest('.form-group');
          div1.addClass('has-error');
          $('.help-block', div1).text('Not a valid Bugzila Template URL.');
          return;
        }
        template.url = field.value;
      }
      if(field.name=='update'){
        template.update = field.value;
      }
    }
  });
  return template;
};

validateSiteForm = function(form, fields){
  var sitename = {};
  var _site = '';
  $.each(fields, function(i, field){
    console.log(field.name+"="+field.value);
    if(!field.value){
      var div = $('#'+field.name,form).closest('.form-group');
      div.addClass('has-error');
      $('.help-block', div).text($('label[for="'+field.name+'"]').text().replace(':','')+' cannot be empty');
    }else{
      if(field.name=='sName'){
        //sitename.site = field.value;
        _site = field.value;
      }
      if(field.name=='sInfo'){
        sitename.suminfo = field.value;
      }
      if(field.name=='update'){
        sitename.update = field.value;
        console.log("UPDATE="+sitename.update);
      }
      if(field.name=='sCobrnd'){
        sitename.site = _site + ' - ' +field.value;
      }
    }
  });
  return sitename;
};


validateTTRInfo = function(form, fields){
  var info = {};
  $.each(fields, function(i, field){
    if((field.name=="to" || field.name=="cc") && !field.value){
      //console.log('error in '+field.name);
      var div = $('#'+field.name,form).closest('.form-group');
      div.addClass('has-error');
      $('.help-block', div).text($('label[for="'+field.name+'"]').text().replace(':','')+' cannot be empty');
    }
    if(field.value){
      info[field.name] = field.value;
    }else if(field.name=="sign"){
      info[field.name] = "";
    }
  });
  return info;
};

$(document).on("click", "#remove-btn", function(){
  $(this).parent().remove();
});

/**
*
*
*/
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
  $("#display-success").hide();
  $('#addTemplate').hide();
  $('#addSitenames').hide();
  updateTemplatesPage();
  updateTTRpage();
  updateSiteListPage();
  
  $('.add-template').click(function(){
    //console.log('there in add');
    resetFormOptions($('#addTemplate'));
    $('legend',$('#addTemplate')).text('Add Template');
    $('#tName').val('');
    $('#tName').removeAttr('readonly');
    $('#tUrl').val('');
    $('#update').val('false');
    $('#templates-table').hide();
    $('#addTemplate').show();
  });

  $('#cancel').click(function(){
    updateTemplatesPage();
    $('#addTemplate').hide();
    $('#templates-table').show();
  });

  $('.add-sitenames').click(function(){
    //console.log('there in add');
    resetFormOptions($('#addSitenames'));
    $('legend',$('#addSitenames')).text('Add Site with SUM_INFO');
    $('#sName').val('');
    $('#sInfo').val('');
    $('#sInfo').removeAttr('readonly');
    $('#update').val('false');
    $('#sitenames-table').hide();
    $('#addSitenames').show();
  });

  $('#cancel-sitenames').click(function(){
    updateSiteListPage();
    $('#addSitenames').hide();
    $('#sitenames-table').show();
  });
  
  
  
  $('#save-template').click(function(){
    resetFormOptions($('#addTemplate'));
    template = validateTemplateForm($('#addTemplate'), $('#addTemplate').serializeArray());
    //console.log(template);
    if(template.name && template.url){
        chrome.extension.getBackgroundPage().saveTemplate(template, function(){
          showSuccessStatus();
          $('#cancel').click();
        });
    }
  });
  
  $('#save-ttr-info').click(function(){
    resetFormOptions($('#ttrInfo'));
    info = validateTTRInfo($('#ttrInfo'), $('#ttrInfo').serializeArray());
    if(info.to && info.cc && info.bcc){
      chrome.extension.getBackgroundPage().saveTTRInfo(info, function(){
          showSuccessStatus();
        });
    }
  });
  
    $('#save-sitenames').click(function(){
    resetFormOptions($('#addSitenames'));
    sitename = validateSiteForm($('#addSitenames'), $('#addSitenames').serializeArray());
    if(sitename.site && sitename.suminfo){
        chrome.extension.getBackgroundPage().saveSite(sitename, function(){
          showSuccessStatus();
          $('#cancel-sitenames').click();
        });
    }
  });

});