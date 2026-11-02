/* Session 10: Promises and async/await. */
(() => {
  const { block, table, list, steps, callout, fig, run } = Ops.h;
  const L = (...lines) => lines.join('\n');

  Ops.content['session-10'] = Ops.h.module({
    id: 'session-10', prefix: 's10', num: 10, title: 'Promises and Async/Await',
    lead: 'Some work takes time. JavaScript does not stop and wait. It carries on and comes back when the work is done.',
    learn: [
      'Why waiting needs special handling',
      'Promises: a result that comes later',
      'async/await: waiting in a clean way',
      'try/catch for errors',
    ],
    subs: [
      {
        key: 'why', title: 'Why async?', lead: 'Slow work should not freeze everything.',
        blocks: [
          block('Slow things in a backend', 'These all take time, so they are asynchronous.', list([
            'Database queries',
            'API requests',
            'File operations',
            'Payment gateway calls',
          ]), 1),
          block('Watch the order', '<code>setTimeout</code> runs a function later. JavaScript does not wait for it. Guess the order before you run.', run(L(
            'console.log("1. Start");',
            '',
            'setTimeout(() => {',
            '  console.log("3. Done after 1 second");',
            '}, 1000);',
            '',
            'console.log("2. End of the code");'
          )), 2),
          block('What just happened', '', steps([
            'Line 1 ran and printed "Start".',
            '<code>setTimeout</code> said: run this later, in 1 second. JavaScript moved on.',
            '"End of the code" printed straight away.',
            'After 1 second, the waiting function ran.',
          ]), 3),
        ],
      },
      {
        key: 'promise', title: 'Promises', lead: 'A promise is a result that will arrive later.',
        blocks: [
          block('Three states', 'Like ordering food: first you wait, then it arrives or it fails.', table(['State', 'Meaning'], [
            ['Pending', 'Still waiting'],
            ['Fulfilled', 'Worked. You get the value.'],
            ['Rejected', 'Failed. You get an error.'],
          ]), 1),
          block('Make and use one', '<code>resolve</code> sends the good result. <code>.then</code> receives it.', run(L(
            'const getData = () => {',
            '  return new Promise((resolve, reject) => {',
            '    setTimeout(() => resolve("Data received"), 500);',
            '  });',
            '};',
            '',
            'getData().then(result => {',
            '  console.log(result);',
            '});',
            '',
            'console.log("This prints first");'
          )), 2),
        ],
      },
      {
        key: 'await', title: 'async / await', lead: 'The clean way to write the same thing.',
        blocks: [
          block('The two keywords', '', table(['Keyword', 'Meaning'], [
            ['<code>async</code>', 'Put before a function. It can now use <code>await</code> inside.'],
            ['<code>await</code>', 'Pause <em>this function only</em> until the promise is done, then give the value.'],
          ]), 1),
          block('Same example with await', 'It reads from top to bottom like normal code. This is the style used in NestJS.', run(L(
            'const getData = () => new Promise(resolve => {',
            '  setTimeout(() => resolve("Data received"), 500);',
            '});',
            '',
            'async function getUser() {',
            '  const user = await getData();',
            '  console.log(user);',
            '}',
            '',
            'getUser();   // call it like any function'
          )), 2),
          block('Handle errors with try/catch', 'If the promise is rejected, the code jumps to <code>catch</code>.', run(L(
            'const getData = () => new Promise((resolve, reject) => {',
            '  setTimeout(() => reject(new Error("Database is down")), 500);',
            '});',
            '',
            'async function getUser() {',
            '  try {',
            '    const user = await getData();',
            '    console.log(user);',
            '  } catch (error) {',
            '    console.log("Something went wrong:", error.message);',
            '  }',
            '}',
            '',
            'getUser();'
          )) + callout('amber', 'Remember', '<code>await</code> does not stop the whole program. It only pauses the <code>async</code> function it is in. Everything else keeps running.'), 3),
        ],
      },
    ],
  });
})();
