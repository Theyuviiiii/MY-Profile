document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navtoggle');
  const links = document.getElementById('navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const terminal = document.getElementById('terminal');
  if (terminal) {
    const lines = JSON.parse(terminal.getAttribute('data-lines'));
    if (reduceMotion) {
      terminal.innerHTML = lines.map(l => `<div class="tline"><span class="prompt">${l.p}</span> ${l.t}</div>`).join('');
    } else {
      let li = 0;
      function typeLine(){
        if (li >= lines.length) return;
        const row = document.createElement('div');
        row.className = 'tline';
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = lines[li].p;
        row.appendChild(prompt);
        row.appendChild(document.createTextNode(' '));
        const textSpan = document.createElement('span');
        row.appendChild(textSpan);
        terminal.appendChild(row);
        const text = lines[li].t;
        let ci = 0;
        const iv = setInterval(() => {
          textSpan.textContent += text[ci];
          ci++;
          if (ci >= text.length) {
            clearInterval(iv);
            li++;
            setTimeout(typeLine, 220);
          }
        }, 18);
      }
      typeLine();
    }
  }

  document.querySelectorAll('.bb-switch').forEach(sw => {
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('data-on') === 'true';
      sw.setAttribute('data-on', on ? 'false' : 'true');
      sw.setAttribute('aria-pressed', on ? 'false' : 'true');
      const targetId = sw.getAttribute('data-target');
      const led = document.getElementById(targetId);
      if (led) led.classList.toggle('lit', !on);
    });
  });

  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      const panel = document.getElementById(btn.getAttribute('data-panel'));
      if (panel) panel.classList.add('active');
    });
  });
});
