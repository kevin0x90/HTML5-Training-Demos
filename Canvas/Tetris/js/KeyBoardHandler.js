var keyBoardHandler = function(elementToBind) {
	var _observers = [];
	var _boundElement = elementToBind;				
	var _keys = {
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		pressedDirection: null
	};				
	
	init();				
	
	function init() {
		bindEventHandlers();		
	}
	
	function bindEventHandlers() {
		_boundElement.addEventListener("keydown", handleKeyDown, false);				
	}				
	
	function handleKeyDown(e) {					
		switch(e.keyCode) {
			case _keys.DOWN: 
				_keys.pressedDirection = _keys.DOWN;
				downKeyPressed(_keys);
			break;
			
			case _keys.LEFT: 
				_keys.pressedDirection = _keys.LEFT;
				leftKeyPressed(_keys);
			break;
			
			case _keys.RIGHT: 
				_keys.pressedDirection = _keys.RIGHT;
				rightKeyPressed(_keys);
			break;
		}					
	}				
	
	function leftKeyPressed(keyObject) {
		notifyObservers("keyBoardPressed", keyObject);	
	}	
	
	function rightKeyPressed(keyObject) {
		notifyObservers("keyBoardPressed", keyObject);
	}
	
	function downKeyPressed(keyObject) {
		notifyObservers("keyBoardPressed", keyObject);
	}	
	
	function notifyObservers(functionName, keyObject) {
		var i, currentElement, functionToCall;				
	
		for(i = 0; i < _observers.length; i++) {
			currentElement = _observers[i];
			functionToCall = currentElement[functionName];
			
			if(isFunction(functionToCall)) {
				functionToCall(keyObject);						
			}					
		}
	}
	
	function isFunction(element) {
		return typeof element === 'function';				
	}		
	
	return {
		addObserver: function(observer) {
			_observers.push(observer);					
		},
		removeObserver: function() {
			_observers.pop();					
		}
	};
};