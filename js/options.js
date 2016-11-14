
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

$(document).ready(function(){
  $("#display-success").hide();
  $('#addTemplate').hide();
  updateTemplatesPage();
  updateTTRpage();
  
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
});