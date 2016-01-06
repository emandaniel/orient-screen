<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="author" content="Aurelio De Rosa">
      <title>Screen Orientation API Demo by Aurelio De Rosa</title>
      <style>
         *
         {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
         }

         body
         {
            max-width: 500px;
            margin: 2em auto;
            padding: 0 0.5em;
            font-size: 20px;
         }

         h1
         {
            text-align: center;
         }

         .api-support
         {
            display: block;
         }

         .hidden
         {
            display: none;
         }

         .value
         {
            font-weight: bold;
         }

         .button-demo
         {
            padding: 0.5em;
            margin: 1em;
         }

         .author
         {
            display: block;
            margin-top: 1em;
         }
      </style>
   </head>
   <body>
      <h1>Screen Orientation API</h1>

      <span id="so-unsupported" class="api-support hidden">API not supported</span>

      <div id="so-results">
         <p>
            The orientation of the device is <span id="orientation" class="value">unavailable</span>
         </p>
         <form id="form-orientation">
            <label for="orientation">Lock the device in:</label>
            <select id="orientation-type">
               <option value="portrait">portrait</option>
               <option value="landscape">landscape</option>
               <option value="portrait-primary">portrait-primary</option>
               <option value="portrait-secondary">portrait-secondary</option>
               <option value="landscape-primary">landscape-primary</option>
               <option value="landscape-secondary">landscape-secondary</option>
            </select>
            <br />
            <input class="button-demo" id="lock-button" type="submit" value="Lock!" />
            <button class="button-demo" id="unlock-button">Unlock!</button>
         </form>
      </div>

      <small class="author">
         Demo created by <a href="http://www.audero.it">Aurelio De Rosa</a>
         (<a href="https://twitter.com/AurelioDeRosa">@AurelioDeRosa</a>).<br />
         This demo is part of the <a href="https://github.com/AurelioDeRosa/HTML5-API-demos">HTML5 API demos repository</a>.
      </small>

      <script>
         var prefix = 'orientation' in screen ? '' :
                      'mozOrientation' in screen ? 'moz' :
                      'msOrientation' in screen ? 'ms' :
                      null;

         if (prefix === null) {
            document.getElementById('so-unsupported').classList.remove('hidden');

            ['lock-button', 'unlock-button'].forEach(function(elementId) {
               document.getElementById(elementId).setAttribute('disabled', 'disabled');
            });
         } else {
            var form = document.getElementById('form-orientation');
            var select = document.getElementById('orientation-type');

            // Function needed to see lock in action
            function launchFullscreen(element) {
               if(element.requestFullscreen) {
                  element.requestFullscreen();
               } else if(element.mozRequestFullScreen) {
                  element.mozRequestFullScreen();
               } else if(element.webkitRequestFullscreen) {
                  element.webkitRequestFullscreen();
               } else if(element.msRequestFullscreen) {
                  element.msRequestFullscreen();
               }
            }

            function exitFullscreen() {
               if(document.exitFullscreen) {
                  document.exitFullscreen();
               } else if(document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
               } else if(document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
               } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
               }
            }

            function orientationHandler() {
               var orientationProperty = prefix + (prefix === '' ? 'o' : 'O') + 'rientation';
               document.getElementById('orientation').textContent = screen[orientationProperty];
            }

            screen.addEventListener(prefix + 'orientationchange', orientationHandler);
            document.getElementById('lock-button').addEventListener('click', function(event) {
               event.preventDefault();
               launchFullscreen(document.documentElement);

               setTimeout(function() {
                  screen[prefix + (prefix === '' ? 'l' : 'L') + 'ockOrientation'](select.value);
               }, 1);
            });
            document.getElementById('unlock-button').addEventListener('click', function() {
               exitFullscreen();
               screen[prefix + (prefix === '' ? 'u' : 'U') + 'nlockOrientation']();
            });

            orientationHandler();
         }
      </script>
   </body>
</html>
