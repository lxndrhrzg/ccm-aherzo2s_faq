ccm.component( {
  name: 'aherzo2s_faq',
  config: {
    html:  [ ccm.store, { local: 'templates.json' } ],
	key: "randomkey",
	store: [ ccm.store, { local: 'datastore.json' } ],
    style: [ ccm.load, 'ccm-style.css' ],  // Einbindung einer CSS-Datei
    user:  [ ccm.instance, 'http://kaul.inf.h-brs.de/ccm/components/user2.js' ]
  },
  Instance: function () {
	var self = this;
	
	self.init = function ( callback ) {
	  self.store.onChange = function () { self.render(); };
	  callback();
	};
	
	
    self.render = function ( callback ) {
      var element = ccm.helper.element( self );
	  
	  var obj = self.store.get( 'messages' );
	  if ( obj === null )
		  self.store.set( { key: self.key, messages: [] }, proceed );
	  else
		  proceed( obj );
	  
	  function proceed( obj ) {
		  
		  element.html( ccm.helper.html( self.html.get( 'main' ) ) );
		  var messages_div = ccm.helper.find( self, '.messages' );     // neue private Variable
		  
		  for ( var i = 0; i < getLength(obj); i++ ) {
			  var message = obj[ i ];
			  
			  var msghtml = ccm.helper.html( self.html.get( 'message' ), {
				name: ccm.helper.val( message.name ),  // Herausfiltern von Skripten, falls
				text: ccm.helper.val( message.text )   // der Datensatz manipuliert ist.
			  } ); 
			  
			  msghtml.find('.name').click(function() {
				 if ($(this).parent().find('.text').is(':visible')) {
					 $(this).parent().find('.text').slideUp();
				 } else {
					 $(this).parent().find('.text').slideDown();
				 }
			  });
			  
			  messages_div.append( msghtml );
		  }
		  
		  if ( callback ) callback();
	  }
    }
  }
} );

function getLength( obj ) {
	return Object.keys(obj).length;
}
