var UCA_Server = {
    connection: null,
    user2_connection: null,
	user2: 'laji@gangadl-ws04',
	user2_pwd:'laji',
	room: 'share@conference.gangadl-ws04',
    nickname: 'server_monitor',
	user1:'bala@gangadl-ws04',
	user1_pwd:'pwd',
	dev1count: 0,
	dev2count:0,
	user1_devices:[],
	user2_devices:[],
	shared_devices:[],

    NS_MUC: "http://jabber.org/protocol/muc",
    joined: null,
    participants: null,

    on_presence: function (presence) {
	
	    var to = $(presence).attr('to');
		var from = $(presence).attr('from');
        var room = Strophe.getBareJidFromJid(from);
		var id = $(presence).attr('id');
		
// 		alert('from \n'+ from);
//		alert('to \n'+ to); */
		
		if (from.indexOf(UCA_Server.room) < 0)
		{
		if (from!=to){
		var device = null;
		if (from.indexOf("device:") > -1) {
			pos = from.indexOf("device:");
			device = from.substring(pos+7,pos+7+from.substring(pos+7).indexOf(":"));
		}
		if (from.indexOf(":ControlPoint:") > -1)
		{
			device = "mobile";
		}
		
	//	alert('device: '+device);
		
		if ((from.indexOf(UCA_Server.user1) > -1) && (room != UCA_Server.room)){

				iPresence = -1;
				for(var i = UCA_Server.user1_devices.length - 1; i >= 0; i--) {
						if(UCA_Server.user1_devices[i] == device+'1') {
						   iPresence = i;
					}
				}
				if ((device =='MediaServer') &&($(presence).attr('type') != 'unavailable')){
				    $('#STB1_img').remove();
					$('#stb1').append("<img id='STB1_img' src='images/cisco_stb.png'/><br>");
			//		$('#mediaserver1').show();
					$('#user1_disconnected').hide();
				}
				else if ((device =='MediaServer') &&($(presence).attr('type') == 'unavailable')){
					UCA_Server.user1_devices = null;
					$(document).trigger('disconnected');
				}
				else {
					if (($(presence).attr('type') != 'unavailable') && iPresence == -1 && (device != null)){
						UCA_Server.user1_devices.push(device+'1'); 
					}
					if (($(presence).attr('type') == 'unavailable') && iPresence > -1){
						UCA_Server.user1_devices.splice(iPresence, 1);
						//$('#'+UCA_Server.user1_devices[iPresence]).hide();
						
					}
			    } 


		$('#loading1').remove();
		
		$('#gallery1').remove();
	
		$('#stb1').append('<center><ul id="gallery1"></ul></center>');
	
	    for(var i =0; i <= UCA_Server.user1_devices.length - 1; i++) {
			$('#gallery1').append("<li><img src='images/"+UCA_Server.user1_devices[i]+".png'/></li>");
			}
		}
		
		$('#gallery1').carousel({distance:0,radius: 50});
		$('#gallery1').show();	 
/* 		$('#powerhub1').hide();
		$('#mediaserver1').hide();
		$('#mobile1').hide();
		$('#shared_powerhub').hide();
		$('#shared_mediaserver').hide(); */
		
/* 		for(var i =0; i <= UCA_Server.user1_devices.length - 1; i++) {
			$('#'+UCA_Server.user1_devices[i]).show();
			} */
		}
		


		if ((from.indexOf(UCA_Server.user2) > -1) && (room != UCA_Server.room)){

				iPresence = -1;
				
				for(var i = UCA_Server.user2_devices.length - 1; i >= 0; i--) {
						if(UCA_Server.user2_devices[i] == device+'2') {
						   iPresence = i;
					}
				}
				
				for(var i = UCA_Server.user1_devices.length - 1; i >= 0; i--) {
						if(UCA_Server.user1_devices[i] == "shared_"+device) {
						   iPresenceShared = i;
					}
				}
				

				if ((device =='MediaServer') &&($(presence).attr('type') != 'unavailable') && iPresence == -1){
					$('#STB2_img').remove();
					$('#stb2').append("<img id='STB2_img' src='images/cisco_stb.png'/><br>");
					//$('#mediaserver2').show();
					$('#user2_disconnected').hide();
				}
				else if ((device =='MediaServer') &&($(presence).attr('type') == 'unavailable')){
					UCA_Server.user2_devices = null;
					$(document).trigger('user2_disconnected');
				}
				else {
					if (($(presence).attr('type') != 'unavailable') && iPresence == -1 && (device != null)){
						UCA_Server.user2_devices.push(device+"2"); 
					}
					if (($(presence).attr('type') == 'unavailable') && iPresence > -1){
						UCA_Server.user2_devices.splice(iPresence, 1);
						//alert(UCA_Server.user2_devices[iPresence]);
						//$('#'+UCA_Server.user2_devices[iPresence]).hide();
/* 						if (iPresenceShared > -1){
							UCA_Server.user1_devices.splice(iPresenceShared, 1);
							//$('#'+UCA_Server.user1_devices[iPresenceShared]).hide();
							
							$('#loading1').remove();
		
							$('#gallery1').remove();
	
							$('#stb1').append('<center><ul id="gallery1"></ul></center>');

/* 		$('#powerhub1').hide();
		$('#mediaserver1').hide();
		$('#mobile1').hide(); */
							
/* 		for(var i =0; i <= UCA_Server.user1_devices.length - 1; i++) {
			$('#'+UCA_Server.user1_devices[i]).show();
			} */
						}
		
			//			$('#gallery1').carousel({distance:0,radius: 50});
			//			$('#gallery1').show();	 
					}
		//		}
			 		/* if (iPresence == -1){ */
		$('#loading2').remove();
		
		$('#gallery2').remove();
	
		$('#stb2').append('<center><ul id="gallery2"></ul></center>');
	
	    for(var i =0; i <= UCA_Server.user2_devices.length - 1; i++) {
			$('#gallery2').append("<li><img src='images/"+UCA_Server.user2_devices[i]+".png'/></li>");
			}
		
		$('#gallery2').carousel({distance:0,radius: 30});
		$('#gallery2').show();
		
/* 				$('#powerhub2').hide();
		$('#mediaserver2').hide();
		$('#mobile2').hide(); */
		
/* 				for(var i =0; i <= UCA_Server.user2_devices.length - 1; i++) {
			$('#'+UCA_Server.user2_devices[i]).show();
			} */
	//	}
			 
			 } 


		}
        
		
		else if ((from.indexOf(UCA_Server.room) > -1) && (from.indexOf(UCA_Server.nickname) < 0))
		{
			if (room === UCA_Server.room) {
				ujid = $(presence).html();
		//		alert('$(presence) \n \n '+ $(presence).html());
		//		alert(ujid);
				pos = ujid.indexOf("device:");
		//		alert(pos);
	            var cps = $('#shared_dev').get(); 
		//		alert(cps);

		//		$('#shared_name').append(cps);	
				
		//		alert(">>>>>>>>>>"+ujid);
				var user = ujid.substring(ujid.indexOf("jid")+5,ujid.indexOf("jid")+22);
				var device ="shared_"+ ujid.substring(pos+7,pos+7+ujid.substring(pos+7).indexOf(":"));
				if (pos == -1){
					device = "null";
				//	user = UCA_Server.user2;
				}
        		
				var who_is_sharing;
				if (ujid.indexOf("ControlPoint") > 0)
				{
					who_is_sharing = user;
				}
 		//		alert('User joined: '+user);
		//		alert('Sharing device: '+device);
//				alert('who_is_sharing' +who_is_sharing); 
				
				if (user == UCA_Server.user1){
					console.log("User 1 is also participating in chat room");
				}
				if (user == UCA_Server.user2){
					
						iPresence = -1;
				
						for(var i = UCA_Server.shared_devices.length - 1; i >= 0; i--) {
							if(UCA_Server.shared_devices[i] == device) {
								iPresence = i;
							}
						}
				//		alert($(presence).attr('type'));
/* 						if ((device =='MediaServer') &&($(presence).attr('type') != 'unavailable')){
							$('#STB2_img').remove();
							$('#stb2').append("<img id='STB2_img' src='images/cisco_stb.png'/><br><br><br>");
							$('#user2_disconnected').hide();
						}
						else if ((device =='MediaServer') &&($(presence).attr('type') == 'unavailable')){
							UCA_Server.user2_devices = null;
							$(document).trigger('user2_disconnected');
						}
						else { */
					//	alert(device);
							if (($(presence).attr('type') != 'unavailable') && iPresence == -1 && (device != "null")){
								UCA_Server.shared_devices.push(device); 
							}
							if (($(presence).attr('type') == 'unavailable') && iPresence > -1){
							UCA_Server.shared_devices.splice(iPresence, 1);
							//$('#'+UCA_Server.user1_devices[iPresence]).hide();
							}
//						} 

				//		$('#loading1').remove();
		
						$('#shared_dev').remove();
	
						$('#shared').append('<center><ul id="shared_dev"></ul></center>');
				//		alert('length'+UCA_Server.shared_devices.length);
						for(var i =0; i <= UCA_Server.shared_devices.length - 1; i++) {
						//    alert('UCA_Server.shared_devices[i]'+UCA_Server.shared_devices[i]);
							$('#shared_dev').append("<li><img src='images/"+UCA_Server.shared_devices[i]+".png'/></li>");
						}

				//		$('#shared_dev').remove();
   				//        $('#shared_name').append('<ul id="shared_dev"></ul>');
						$('#shared_dev').carousel({distance:0,tilt:50,radius: 80});
						$('#shared_dev').show();	
				}
				
/* 				$('#gallery1').carousel({distance:0,radius: 100});
				$('#gallery1').show(); */
			}
			
			
		}
        return true;
    },

};

$(document).ready(function () {
        $('#far-clouds').pan({fps: 30, speed: 0.7, dir: 'left'});
    $('#near-clouds').pan({fps: 30, speed: 1, dir: 'left'});
	
			$('#gallery1').carousel({distance:0,radius: 50});
		$('#gallery1').show();	

		$('#gallery2').carousel({distance:0,radius: 50});
		$('#gallery2').show();	
		
	    $('#shared_dev').carousel({distance:0,radius: 50});
		$('#shared_dev').show();
		
		$('#user1_name').text("USER - 2");
		$('#user2_name').text("USER - 1");
		
	$(document).trigger('connect', {
                    jid: UCA_Server.user1,
                    password: UCA_Server.user1_pwd
                });
    $(document).trigger('user2_connect', {
                    jid: UCA_Server.user2,
                    password: UCA_Server.user2_pwd
                });

	

    $('#leave').click(function () {
        $('#leave').attr('disabled', 'disabled');
        UCA_Server.connection.send(
            $pres({to: UCA_Server.room + "/" + UCA_Server.nickname,
                   type: "unavailable"}));
        UCA_Server.connection.disconnect();
    });

   });

$(document).bind('connect', function (ev, data) {
    UCA_Server.connection = new Strophe.Connection(
        "http://64.103.161.55/http-bind");
    UCA_Server.connection.connect(
        data.jid, data.password,
        function (status) {
            if (status === Strophe.Status.CONNECTED) {
                $(document).trigger('connected');
            } else if (status === Strophe.Status.DISCONNECTED) {
                $(document).trigger('disconnected');
            }
        });
		
});

$(document).bind('user2_connect', function (ev, data) {
    UCA_Server.user2_connection = new Strophe.Connection(
        "http://64.103.161.55/http-bind");
    UCA_Server.user2_connection.connect(
        data.jid, data.password,
        function (status) {
            if (status === Strophe.Status.CONNECTED) {
                $(document).trigger('user2_connected');
            } else if (status === Strophe.Status.DISCONNECTED) {
                $(document).trigger('user2_disconnected');
            }
        });
		
});

$(document).bind('connected', function () {
    UCA_Server.joined = false;
    UCA_Server.participants = {};
//    $('#gallery1').jqcarousel();
//	$('#gallery1').show();
//	$('#user1_name').text("Private cloud of "+UCA_Server.user1);
	$('#user1_name').text("USER - 2");
	$('#shared_dev').carousel({
				orientation: 'horizontal',
				radius: 100
			});
    $('#shared_dev').show();
    UCA_Server.connection.send($pres().c('priority').t('0'));
    
    UCA_Server.connection.addHandler(UCA_Server.on_presence,
                                  null, "presence");
	UCA_Server.connection.addHandler(UCA_Server.on_presence,
                                  null, null, "presence");
    UCA_Server.connection.addHandler(UCA_Server.on_public_message,
                                  null, "message", "groupchat");
    UCA_Server.connection.addHandler(UCA_Server.on_private_message,
                                  null, "message", "chat");

				  
	UCA_Server.connection.send(
        $pres({
            to: UCA_Server.room + "/" + UCA_Server.nickname
        }).c('x', {xmlns: UCA_Server.NS_MUC})
		  .c('password','pwd'));
	
    UCA_Server.connection.addHandler(UCA_Server.on_presence,
                                  null, "presence");
	UCA_Server.connection.addHandler(UCA_Server.on_presence);	
		  
/* 	alert(        $pres({
            to: UCA_Server.room + "/" + UCA_Server.nickname
        }).c('x', {xmlns: UCA_Server.NS_MUC})
		  .c('password',"pwd")).html(); */
		  
});


$(document).bind('user2_connected', function () {
    UCA_Server.joined = false;
    UCA_Server.participants = {};

//	$('#gallery2').jqcarousel();
//	$('#gallery2').show();
	//$('#user2_name').text("Private cloud of "+UCA_Server.user2);
	$('#user2_name').text("USER - 1");
//    $('#shared').show();
    
    UCA_Server.user2_connection.send($pres().c('priority').t('0'));
    
						  
    UCA_Server.user2_connection.addHandler(UCA_Server.on_presence,
                                  null, "presence");
	UCA_Server.user2_connection.addHandler(UCA_Server.on_presence,
                                  null, null, "presence");
								  
/*	UCA_Server.connection.send(
        $pres({
            to: UCA_Server.room + "/" + UCA_Server.nickname
        }).c('x', {xmlns: UCA_Server.NS_MUC}));
	*/
});

$(document).bind('disconnected', function () {
   // alert("user 1 disconnected");
	$('#STB1_img').remove();
	$('#gallery1').remove();
	$('#user1_disconnected').show();
    UCA_Server.connection = null;
	//window.location.reload(1);
});

$(document).bind('user2_disconnected', function () {
//	alert("user 2 disconnected");
	$('#STB2_img').remove();
	$('#gallery2').remove();
	$('#user2_disconnected').show();
	UCA_Server.user2_connection = null;
	//window.location.reload(1);
});

