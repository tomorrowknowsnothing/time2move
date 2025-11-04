
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

    // --- MATRIX RAIN (canvas) ---
    (function(){
      const canvas = document.getElementById('matrix');
      const ctx = canvas.getContext('2d');
      let cols, rows, fontSize, drops;

      function resize(){
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        fontSize = Math.max(10, Math.floor(canvas.width / 120)); // adapt
        cols = Math.floor(canvas.width / fontSize);
        rows = Math.floor(canvas.height / fontSize);
        drops = Array.from({length:cols}).map(() => Math.floor(Math.random()*rows));
      }
      function randChar(){
        // mix of binary and hex-like chars
        const pool = "01<>[]{}()\\/|=+-_*~:;abcdefghijklmnopqrstuvwxyz0123456789";
        return pool.charAt(Math.floor(Math.random()*pool.length));
      }

      function draw(){
        ctx.fillStyle = 'rgba(7,16,21,0.08)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font = fontSize + "px " + "monospace";
        for(let i=0;i<cols;i++){
          const text = randChar();
          const x = i*fontSize;
          const y = drops[i]*fontSize;
          ctx.fillStyle = i%8===0 ? 'rgba(57,255,20,0.24)' : 'rgba(57,255,20,0.12)';
          ctx.fillText(text, x, y);
          if(y > canvas.height && Math.random() > 0.975) drops[i]=0;
          drops[i]++;
        }
      }

      function loop(){
        draw();
        requestAnimationFrame(loop);
      }

      window.addEventListener('resize', resize);
      resize();
      loop();
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
          prompt.textContent='[root@node ~]$ ';
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

