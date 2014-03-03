(function () {
  "use strict";

  window.addEventListener("load", function() {			
    loadLocalData();
    loadDataFromServer();
    assignEventHandlers();	
  }, false);
        
  function loadLocalData() {
    if(localStorageIsNotEmpty()) {
      loadLocalTodoItems();			
    }			
  }			
        
  function loadLocalTodoItems() {
    var todoList = document.getElementById("todoList"),
      i,
      currentKey, 
      currentValue;
          
    for(i = 0; i < localStorage.length; i++) {
      currentKey = localStorage.key(i);
      currentValue = localStorage.getItem(currentKey);
            
      addListItem(todoList, currentValue);						
    }			
  }			
        
  function assignEventHandlers() {
    addItemToTodoList();	
    saveTodoItemsToServer();
  }

  function addItemToTodoList() {
    document.getElementById("addTodoItem").addEventListener("click", function() {
      var newItem = document.getElementById("todoItemEntryControl"),
        todoList = document.getElementById("todoList");
            
      addListItem(todoList, newItem.value);
      localStorage.setItem(createUUID(), newItem.value);															
    }, false);
  }

  function saveTodoItemsToServer() {
    document.getElementById("saveTodoItems").addEventListener("click", function() {
      if(browserIsOnline()) {
        // Send form data to server....
        localStorage.clear();
      }	
    }, false);
  }

  function browserIsOnline() {
    if(navigator.onLine) {
      return true;	
    }	
    return false;
  }

  function loadDataFromServer() {	
    var todoList;

    if(localStorageIsEmpty()) {
      todoList = document.getElementById("todoList");
      addListItem(todoList, "Eier kaufen");
      localStorage.setItem(createUUID(), "Eier kaufen");
      addListItem(todoList, "Mittwoch Kino");
      localStorage.setItem(createUUID(), "Mittwoch Kino");
      addListItem(todoList, "Samstag Steakhouse");				
      localStorage.setItem(createUUID(), "Samstag Steakhouse");	
    }		
  }

  function localStorageIsNotEmpty() {
    if(localStorageIsEmpty()) {
      return false;	
    }
    return true;  	
  }

  function localStorageIsEmpty() {
    if(localStorage.length === 0) {
      return true;	
    }
    return false;	
  }

  function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
     var s = [],
      hexDigits = "0123456789abcdef",
      i, 
      uuid;
     
     for (i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
     }
     s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
     // bits 6-7 of the clock_seq_hi_and_reserved to 01
     s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  
     s[8] = s[13] = s[18] = s[23] = "-";

      uuid = s.join("");
      return uuid;
  }			

  function addListItem(listControl, itemToAdd) {
    var listItem = document.createElement("li"),
      listItemText = document.createTextNode(itemToAdd);
    
    listItem.appendChild(listItemText);								
    listControl.appendChild(listItem);
  }
}());
