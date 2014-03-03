"use strict";

function messageHandler(e) {
	var result = 1,
    i, 
    j,
    x = 0, 
    y = 0;

	for(i = 1; i < 9999999; i++) {
		result *= i;
		for(j = 0; j < 600; j++) {
			x = 100000.00 / 10.00;
			y = x * 100;	
		}
	}
	postMessage("worker result = " + result);
}

this.addEventListener("message", messageHandler, true);
