if (document.registerElement) {

  var proto = Object.create(HTMLElement.prototype, {
    createdCallback: {
      value:
      function() {
        this.div = null;
      },
      enumerable: true
    },

    attachedCallback: {
      value:
      /**
       * Lifecycle callback that is invoked when this element is added to the
       * DOM.
       */
      function() {
        this.generateCountdown();
      },
      enumerable: true
    },

    attributeChangedCallback: {
      value:
      /**
       * Lifecycle callback that is invoked when an attribute is changed.
       * @param {string} attributeName Name of the attribute being changed.
       */
      function(attributeName) {
        if (!this.div) {
          // It is possible that the attribute is set before before the
          // component is added to the DOM.
          return;
        }
        switch (attributeName) {
          case 'data':
            this.generateCountdown();
            break;
        }
      },
      enumerable: true
    },
    generateCountdown: {
      value:
      function() {
        var data = this.getAttribute('data-time');
        var format = this.getAttribute('data-format').split('-');
        var string = this.getAttribute('data-string').split('-');
        var expire = this.getAttribute('data-expire');
        if (data) {
          if (!this.div) {
            this.div = document.createElement('div');
            this.appendChild(this.div);
          }
          function pad(n){
            return (n < 10) ? ("0" + n) : n;
          }
          var _div = this.div;
          var countDownDate = new Date(data).getTime();
          var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var _t = '';
            
            if(format.indexOf('D') != -1 && pad(days) != '00'){
              _t += pad(days);
              if(string[0] != '0' && string[0] != undefined){_t += string[0]+' ';}else{_t += ' ';}
            }
            if(format.indexOf('H') != -1 && pad(hours) != '00'){
              _t += pad(hours);
              if(string[1] != '0' && string[1] != undefined){_t += string[1]+' ';}else{_t += ' ';}
            }
            if(format.indexOf('M') != -1  && pad(minutes) != '00'){
              _t +=  pad(minutes);
              if(string[2] != '0' && string[2] != undefined){_t += string[2]+' ';}else{_t += ' ';}
            }
            if(format.indexOf('S') != -1){
              _t += pad(seconds);
              if(string[3] != '0' && string[3] != undefined){_t += string[3]+' ';}else{_t += ' ';}
            }
            _div.innerHTML = _t;
            if(format.indexOf('D') != -1 && pad(days) == '00' && format.indexOf('H') == -1 && format.indexOf('M') == -1 && format.indexOf('S') == -1){
              debugger
              clearInterval(x);
              if(expire != '' || expire != null){_div.innerHTML = expire;}else{_div.innerHTML = "EXPIRED";}
            }
            if (distance < 0) {
              clearInterval(x);
              if(expire != '' || expire != null){_div.innerHTML = expire;}else{_div.innerHTML = "EXPIRED";}
            }
          }, 1000);
        }	
      }
    }
  });

  document.registerElement('countdown-timer', {prototype: proto});
}
