
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
       
    $(app.onDOMLoad());
    
    $("#save").click(function(e) {
//        var networkState = navigator.connection.type;
//        console.log($("#state_det").val());
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var mob = /^[1-9]{1}[0-9]{9}$/;
        
        var networkState = navigator.network.connection.type;
//            alert($("#mobile_numbr").val().length);
            if($("#first_name").val() == ""){
              alert('Enter first name');  
            }else if($("#last_name").val() == ""){
              alert('Enter last name');
            }else if($("#qualification").val() == ""){
              alert('Enter qualification');  
            }else if($("#email_id").val() == ""){
              alert('Enter email id');   
            }else if($("#state_det").val() == ""){
              alert('Enter state');  
            }else if($("#mobile_numbr").val() == ""){
              alert('Enter mobile number');  
            }else if($("#city").val() == ""){
               alert('Enter city name'); 
            }else{
                
                if(!re.test($("#email_id").val())){
                    alert("Enter Valid Email Id")
                }else if($("#state_det").val() == null){
                    alert("Select State");
                }else if(mob.test($("#mobile_numbr").val()) == false){
                    alert("Enter Valid Number");
                }else{
                    
                    if (networkState == Connection.NONE){
                        alert('no internet ');
                    }else{
                            var news = "No";
                            if (document.getElementById('subscribe_box').checked) {
                                 news = "Yes";
                            }
                            var sub = "giupdate.com member registration";
                            var emailBody ="Member details<br>First name : "+$("#first_name").val()+"<br>Last Name : "+$("#last_name").val()+"<br>Qualification : "+$("#qualification").val()+
                                         "<br>Email : "+$("#email_id").val()+"<br>State : "+$("#state_det").val()+"<br>Mobile Number : "+$("#mobile_numbr").val()+
                                         "<br>City : "+$("#city").val()+"<br>Medical Council Registration No : "+$("#medical_no").val()+
                                         "<br>Subscribe to newsletter : "+news;
                            var mailTo = "vjadhav986@gmail.com";
                            //        window.plugins.emailComposer.showEmailComposerWithCallback(callback,subject,body,toRecipients,ccRecipients,bccRecipients,isHtml,attachments);
                            window.plugins.emailComposer.showEmailComposerWithCallback(
        //                    function(result){console.log(result);},sub,emailBody,["vjadhav986@gmail.com"],[],[],true,["Abbott"]);
                            function(result){
                                 location.reload();
                                 console.log("this is result :"+result);
                                },
                                sub,emailBody,[mailTo],[],[],true,[]);
                            }
                    
                    }

            }

            
        });
    },
    onDOMLoad: function(){
    
		document.addEventListener('deviceready', this.onDeviceReady, false);
		db = window.openDatabase("giupdateDB", "1.0", "giupdate Database", 500000);
                db.transaction(app.createTables, app.txError, app.createTablesSuccess); 
//                DROP TABLE IF EXISTS TimeTable
    },
    onDeviceReady: function() {

    },
    txError: function(tx) {
	    alert("Database Error : " + tx.message);
     },
     createTables: function(tx) {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS user  ( "+
			"uid INTEGER PRIMARY KEY AUTOINCREMENT, " +
                        "fnmae TEXT, " +
			"lname TEXT, " +
                        "qualification TEXT, " +
                        "email TEXT, " +
                        "state TEXT, " +
                        "mnumber INTEGER, " +
                        "city TEXT, " +
                        "sub TEXT, " +
			"medical_number INTEGER)")

    },
    createTablesSuccess: function() {		
		app.displayEntries();
    },
    displayEntries: function(){
            console.log('displayEntries');
		db.transaction(function(tx){
                    
			var sql = 'SELECT * FROM user';
			tx.executeSql(sql, [],
			function(tx, results) 
			{
				var len = results.rows.length;
				if(len > 0)
				{
                                                   
					for (var i=0; i<len; i++)
					{
                                            
                                            var fname = results.rows.item(i).fnmae.charAt(0).toUpperCase();
                                            var lname = results.rows.item(i).lname.charAt(0).toUpperCase() + results.rows.item(i).lname.slice(1).toLowerCase();
                                           console.log(fname+" : "+lname); 
//
					}
				}
				
			},
			app.txError)}, 
			app.txError);
	},
    addEntry: function(){
                console.log('addEntry');
		db.transaction(
                        
		function(tx){
                        
                        if($("#first_name").val() === ""){
                            
                        }else if(+$("#last_name").val() === ""){
                            
                        }else if($("#date_det").val() === null && $("#date_det").val() === undefined){
//                            endTime !== null && endTime !== undefined
                        }else if($("#ph_number").val() === ""){
                            
                        }else if($("#weight").val() === ""){
                            
                        }else{
                           var sql = "INSERT INTO Patient(fnmae, lname, date,cnumber,cweight) VALUES('"+$("#first_name").val()+"','"+$("#last_name").val()+"','"+$("#date_det").val()+"','"+$("#ph_number").val()+"','"+$("#weight").val()+"')";
                           tx.executeSql(sql) 
                        }        
			
		}, 
		app.txError, 
		app.clearInput);
	}
        
   
};
