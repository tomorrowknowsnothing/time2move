
    // --- UPTIME ---
    (function(){
      const el = document.getElementById('uptime');
      let start = Date.now();
      function fmt(ms){
        const s = Math.floor(ms/1000)%60;
        const m = Math.floor(ms/60000)%60;
        const h = Math.floor(ms/3600000);
        return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
      }
      setInterval(()=> el.textContent = fmt(Date.now()-start), 1000);
    })();

    
    // --- TYPING EFFECT / console logging ---
    (function(){
      const lines = [
        "sudo open root/coffee.os",
        "starting coffee.os 7.80 at 2025-11-04 12:22 CET",
        "preheating the machine",
        "boiling water",
        "grind beans",
        "tampering",
        "water is boiling",
        "machine is ready",
      ];

      const area = document.getElementById('typedArea');
      const consoleEl = document.getElementById('console');

      function appendLine(txt){
        const div = document.createElement('div');
        div.className = 'line';
        div.innerHTML = '<span class="prompt">[admin]$</span> <span class="out">'+txt+'</span>';
        area.appendChild(div);
        consoleEl.scrollTop = consoleEl.scrollHeight;
      }

      // type lines with small delay
      (async function typeAll(){
        for(const line of lines){
          await typeLine(line);
          await delay(400 + Math.random()*600);
        }
      })();

      function typeLine(line){
        return new Promise(resolve=>{
          let i=0;
          const span = document.createElement('span');
          span.className='line';
          area.appendChild(span);
          const prompt = document.createElement('span');
          prompt.className='prompt';
          prompt.textContent='[admin]$ ';
          span.appendChild(prompt);
          const out = document.createElement('span');
          out.className='out';
          span.appendChild(out);
          consoleEl.scrollTop = consoleEl.scrollHeight;

          const t = setInterval(()=>{
            out.textContent += line.charAt(i++);
            consoleEl.scrollTop = consoleEl.scrollHeight;
            if(i>line.length-1){
              clearInterval(t);
              resolve();
            }
          }, 22 + Math.random()*45);
        });
      }

      function delay(ms){ return new Promise(r=>setTimeout(r,ms)); }

      // expose small action used by buttons
      window.fakeAction = function(text){
        const now = new Date().toLocaleTimeString();
        appendLine(text + " (" + now + ")");
      };
    })();

