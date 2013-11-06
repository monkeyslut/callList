/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*
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
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
*/
//my own code, leaving the default code as is. for some reason.

document.addEventListener("DOMContentLoaded", function() {

	console.log("DOM loaded");
	
	// todo: rewrite: make one list, use window.localstorage.key() & 
	// window.localstorage.getitem(key)
	
	var contactList = document.getElementById("contactList");
	var contactNameField = document.getElementById("contactNameField");
	var contactPhoneField = document.getElementById("contactPhoneField");

	var cll;
	console.log("contactListLength: " + window.localStorage.getItem("contactListLength"));
	
	if (parseInt(window.localStorage.getItem("contactListLength")) > 0) {
		console.log("contactListLength > 0");
		cll = parseInt(window.localStorage.getItem("contactListLength")); } 
	else {
		cll=0;
		console.log("contactListLength < 0, l set to 0"); }

	var l = window.localStorage.length;
	var i = 0;
	var storedContactName;
	var storedContactPhone;
	var storedContact;

	console.log("window.localStorage.length="+window.localStorage.length+", l="+l);
	
	console.log("name field:"+contactNameField.data+" phone field:"+contactPhoneField.value);
	console.log("contact list length variable:"+l);
	
	function printContact(contactName,contactPhone) {
		var newContact = document.createElement('li');

		newContact.innerHTML = contactName + ": <a href=tel:" + contactPhone + ">" + contactPhone + "</href>";
	
		contactList.appendChild(newContact);
	}


	//ladda listan från localstorage till DOM
	for (i; i < l; i++) {
		console.log("i: " + i + ", l: " + l);
		storedContact = window.localStorage.key(i);
		console.log(storedContact);
		if (storedContact.match(/^contact(\d*)[.]/)) {
			console.log("if passed");
			storedContactName = storedContact.match(/(?=^contact\d*[.])(.*)$/);
			storedContactPhone = window.localStorage.getItem(storedContact);

			printContact(storedContactName,storedContactPhone);
			
		console.log("contact read from local storage:"+storedContactName + storedContactPhone);
		}
	}
	
	document.getElementById("contactForm").addEventListener("submit", function (evt) {
		console.log("ze button clicked");
		evt.preventDefault();
		var newContactName = document.getElementById("contactNameField").value;
		var newContactPhone = document.getElementById("contactPhoneField").value;
		
		console.log("window.localstorage.contactListLength: " + window.localStorage.getItem("contactListLength"));
		var contactStoragePosition;
		contactStoragePosition = parseInt(window.localStorage.getItem("contactListLength")) + 1;
		console.log("contactStoragePosition: " + contactStoragePosition.toString());
		if (!(contactStoragePosition >= 0)) { contactStoragePosition = 0; }
		window.localStorage.setItem("contactListLength", contactStoragePosition.toString());
		console.log("window.localstorage.contactListLength: " + window.localStorage.getItem("contactListLength"));
		
		
		var contactKey = "contact" + (contactStoragePosition) + "." + newContactName;
		printContact(newContactName,newContactPhone);
		window.localStorage.setItem(contactKey,newContactPhone);
		
		contactNameField.value = "";
		contactPhoneField.value = "";
		return false;
	}, false);
	});
