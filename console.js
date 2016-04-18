(function() {

	var consoleLogger = {
		setup: function() {
      this.createLogWrapper();
      this.createLog();
      this.createLogButton();
      this.createLogBar();
			this.setStyles();
      this.appendLog();
		},
    createLogWrapper: function() {
      this.consoleLogWrapper = document.createElement('div');
      this.consoleLogWrapper.id = 'console';
    },
    createLog: function() {
      this.consoleLog = document.createElement('div');
      this.consoleLog.className = 'log';
      this.consoleLogs = document.createElement('div');
      this.consoleLogs.className = 'logs';
    },
    createLogButton: function() {
      this.consoleLogButton = document.createElement('div');
      this.consoleLogButton.className = 'button';
      this.consoleLogButton.setAttribute('data-console', 'toggle');
      this.consoleLogButton.innerHTML = 'Console';
    },
    createLogBar: function() {
      this.consoleBar = document.createElement('div');
      this.close = document.createElement('button');
      this.close.innerHTML = 'Close';
      this.close.setAttribute('data-console', 'toggle');
      this.close.className = 'close';
      this.clear = document.createElement('button');
      this.clear.innerHTML = 'Clear';
      this.clear.setAttribute('data-console', 'clear');
      this.clear.className = 'clear';
      this.consoleBar.appendChild(this.clear);
      this.consoleBar.appendChild(this.close);
      this.consoleBar.className = 'console-bar';
    },
		setStyles: function() {
      var position = this.options.position,
          setPostion;
      if (position === 'left') {
        setPostion = 'left: 20px;';
      } else if (position === 'right') {
        setPostion = 'right: 20px;';
      } else if (position === 'center') {
        setPostion = 'left: 50%; margin-left: -38px;';
      }

      this.consoleLogButton.style.cssText = setPostion;
		},
		appendLog: function() {
      this.consoleLogWrapper.appendChild(this.consoleLogButton);
      this.consoleLogWrapper.appendChild(this.consoleLogs);
      this.consoleLogs.appendChild(this.consoleBar);
      this.consoleLogs.appendChild(this.consoleLog);
			document.body.appendChild(this.consoleLogWrapper);
		},
		log: function() {
      var highlight = (typeof hljs === 'undefined') ? undefined : hljs;
	   	console.log = function(message) {
	   		var addLog = document.createElement('div');

        addLog.className = 'logged';
      	if (typeof message == 'object') {
          addLog.innerHTML = (JSON && JSON.stringify ? JSON.stringify(message) : message);
      	} else {
          addLog.innerHTML = message;
      	}
      	this.consoleLog.appendChild(addLog);
      	
        // use highlightjs library
        if (highlight) {
          highlight.highlightBlock(addLog);
        }
    	}.bind(this);
		},
		toggleDisplay: function() {
			var display = this.consoleLog.style.display == 'block' ? 'none' : 'block';
			this.consoleLog.style.display = display;
		},
		clearLog: function() {
			this.consoleLog.innerHTML = '';
		},
		addEvents: function() {
      var toggleSelector = document.querySelectorAll('[data-console="toggle"]');
      for (var i = 0; i < toggleSelector.length; i++) {
        toggleSelector[i].addEventListener('click', this.toggleDisplay.bind(this));
      }
      document.querySelector('[data-console="clear"]').addEventListener('click', this.clearLog.bind(this));
		},
		init: function(options) {
      this.options = options;
			this.setup();
			this.addEvents();
			this.log();
		}
	}

	consoleLogger.init({
    position: 'left'
  });

})();