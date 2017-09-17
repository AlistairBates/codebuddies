Template.newStudyGroupModal.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.newStudyGroupModal.events({
  "submit .newStudyGroup": function(event, template){

    event.preventDefault();

    if ($.trim(template.find("#title").value) == '') {
      return Bert.alert( 'Please input a name for your study group.', 'warning', 'growl-top-right' );
    }
    if ($.trim(template.find("#tagline").value) == '') {
      return Bert.alert( 'Please input a tagline for your study group.', 'warning', 'growl-top-right' );
    }

    const data = {
      title:template.find('#title').value,
      slug:template.find('#title').value.replace(/\s+/g, '-').toLowerCase(),
      tagline:template.find('#tagline').value
    }

    Meteor.call("createNewStudyGroup", data, function(error, result){
      if(error){
        Bert.alert( error.reason, 'danger', 'growl-top-right' );
      }
      if(result){
        template.find('#title').value="";
        template.find('#tagline').value="";

        Modal.hide();
        FlowRouter.go('my study groups');
        Bert.alert({
          type: 'success',
          message: 'Congratulations! Your study group "' + data.title + '" has been created.',
          icon: 'fa-check-circle',
          hideDelay: 6500
        });
      }
    });

  }
});
