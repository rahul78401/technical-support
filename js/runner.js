/* Run button for code examples.
   Ops.h.run(code, label) builds an editable code box. Clicking Run executes the code in the browser
   and prints whatever console.log would print, underneath. */
(() => {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  Ops.h.run = (text, label = 'Try it. Edit the code, then press Run.') => {
    const rows = Math.max(3, text.split('\n').length);
    return `<div class="runbox"><div class="code-bar"><span>${label}</span><button type="button" class="run-btn">Run</button></div>` +
      `<textarea class="run-src" rows="${rows}" spellcheck="false" aria-label="JavaScript code">${esc(text)}</textarea>` +
      `<pre class="run-out" aria-live="polite">Output appears here.</pre></div>`;
  };

  /* Two boxes: where the code is written (definition) and where it is used (call) */
  Ops.h.callrow = (def, call) =>
    `<div class="callrow"><div class="def"><b>1. Write it (definition)</b>${def}</div><div class="call"><b>2. Use it (call)</b>${call}</div></div>`;

  /* Turn any value into text, like the browser console does */
  const show = (v) => {
    if (typeof v === 'string') return v;
    if (v instanceof Error) return `${v.name}: ${v.message}`;
    if (typeof v === 'function') return String(v);
    if (v !== null && typeof v === 'object') {
      try { return JSON.stringify(v); } catch (e) { return String(v); }
    }
    return String(v);
  };

  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.run-btn');
    if (!btn) return;
    const box = btn.closest('.runbox');
    const out = box.querySelector('.run-out');
    const src = box.querySelector('.run-src').value;
    const lines = [];
    const paint = () => { out.textContent = lines.length ? lines.join('\n') : '(no output. Use console.log to print something)'; };
    const add = (prefix) => (...args) => { lines.push(prefix + args.map(show).join(' ')); paint(); };
    const cons = { log: add(''), info: add(''), warn: add('Warning: '), error: add('Error: ') };
    out.classList.remove('is-err');
    out.textContent = 'Running...';
    try {
      await new AsyncFunction('console', src)(cons);
      paint();
    } catch (err) {
      lines.push(`${err.name}: ${err.message}`);
      out.classList.add('is-err');
      paint();
    }
  });

  /* Grow the box while typing */
  document.addEventListener('input', (e) => {
    const t = e.target.closest('.run-src');
    if (t) t.rows = Math.max(3, t.value.split('\n').length);
  });
})();
