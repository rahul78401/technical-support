/* Session 11: important JavaScript concepts, each with a small demo. */
(() => {
  const { block, table, steps, callout, fig, run } = Ops.h;
  const L = (...lines) => lines.join('\n');

  Ops.content['session-11'] = Ops.h.module({
    id: 'session-11', prefix: 's11', num: 11, title: 'Important Concepts',
    lead: 'The ideas that interviewers ask about and that matter in real backend work.',
    learn: [
      'Scope and hoisting',
      'Closures and callbacks',
      'The event loop',
      'this, prototypes, copying, null vs undefined',
    ],
    subs: [
      {
        key: 'overview', title: 'The big list', lead: 'One line for each idea. The next sections show them in code.',
        blocks: [
          block('All ten', '', table(['Concept', 'What it means'], [
            ['Scope', 'Where a variable can be used'],
            ['Hoisting', 'Declarations are noticed before the code runs'],
            ['Closure', 'A function remembers the variables around where it was made'],
            ['Callback', 'A function given to another function, to be called later'],
            ['Promise', 'A result that arrives later, or fails'],
            ['Event loop', 'The helper that runs waiting code when JavaScript is free'],
            ['Prototype', 'How JavaScript objects share features'],
            ['<code>this</code>', 'The object a function belongs to, decided by how it is called'],
            ['Null vs undefined', 'Empty on purpose vs never given a value'],
            ['Shallow vs deep copy', 'Copy only the top level vs copy everything inside'],
          ]), 1),
        ],
      },
      {
        key: 'scope', title: 'Scope and hoisting', lead: 'Where variables live, and when they exist.',
        blocks: [
          block('Scope', 'A variable made inside curly braces <code>{ }</code> can only be used inside them. A variable made outside can be used inside.', run(L(
            'const outside = "I am everywhere";',
            '',
            'function test() {',
            '  const inside = "I live only in test()";',
            '  console.log(outside);   // works',
            '  console.log(inside);    // works',
            '}',
            '',
            'test();',
            '',
            'try {',
            '  console.log(inside);    // does not work here',
            '} catch (error) {',
            '  console.log("Error:", error.message);',
            '}'
          )), 1),
          block('Hoisting', 'JavaScript reads all declarations first. So you can call a normal function before the line that writes it.', run(L(
            'sayHi();   // works, even though it is written below',
            '',
            'function sayHi() {',
            '  console.log("Hi!");',
            '}',
            '',
            'try {',
            '  console.log(price);   // let/const exist but are not ready yet',
            '  let price = 100;',
            '} catch (error) {',
            '  console.log("Error:", error.message);',
            '}'
          )), 2),
        ],
      },
      {
        key: 'closure', title: 'Closures and callbacks', lead: 'Functions that remember, and functions you hand over.',
        blocks: [
          block('Closure', 'The inner function keeps <code>count</code> alive, even after <code>makeCounter</code> has finished. Nobody outside can touch it directly.', run(L(
            'function makeCounter() {',
            '  let count = 0;',
            '  return function () {',
            '    count++;',
            '    return count;',
            '  };',
            '}',
            '',
            'const counter = makeCounter();',
            'console.log(counter());   // 1',
            'console.log(counter());   // 2',
            'console.log(counter());   // 3'
          )), 1),
          block('Callback', 'You give a function to another function. It calls yours when it is ready.', run(L(
            'function doWork(callback) {',
            '  console.log("Working...");',
            '  callback("finished");',
            '}',
            '',
            'doWork(message => {',
            '  console.log("Callback says:", message);',
            '});'
          )), 2),
        ],
      },
      {
        key: 'loop', title: 'The event loop', lead: 'How one thread does many jobs.',
        blocks: [
          block('The idea', 'JavaScript does one thing at a time. Slow jobs are handed off, and when they finish they wait in a line. The event loop moves the next one in when JavaScript is free.',
            fig('flow', 'Waiting jobs only run after the current code has finished.', {
              items: [{ t: 'Your code', s: 'Runs first', c: 'green' }, { t: 'Waiting line', s: 'Finished timers and promises' }, { t: 'Event loop', s: 'Picks the next job', c: 'amber' }],
              opts: { w: 170, gap: 50 },
            }), 1),
          block('Order test', 'Even a 0 ms timer waits until the current code is done. Promises go before timers.', run(L(
            'console.log("1 start");',
            '',
            'setTimeout(() => console.log("4 timer"), 0);',
            '',
            'Promise.resolve().then(() => console.log("3 promise"));',
            '',
            'console.log("2 end");'
          )), 2),
        ],
      },
      {
        key: 'more', title: 'this, prototype, copies', lead: 'Three more ideas, with a small demo each.',
        blocks: [
          block('this', '<code>this</code> is the object that called the function.', run(L(
            'const user = {',
            '  name: "Rahul",',
            '  hello() {',
            '    console.log("Hi, I am " + this.name);',
            '  }',
            '};',
            '',
            'user.hello();   // this = user'
          )), 1),
          block('Prototype', 'Objects can borrow features from another object. This is how JavaScript inheritance works. Arrays get <code>map</code> and <code>filter</code> this way.', run(L(
            'const animal = {',
            '  speak() { console.log(this.name + " makes a sound"); }',
            '};',
            '',
            'const dog = Object.create(animal);   // dog borrows from animal',
            'dog.name = "Tommy";',
            '',
            'dog.speak();',
            'console.log(Object.getPrototypeOf(dog) === animal);'
          )), 2),
          block('Shallow vs deep copy', 'A shallow copy (<code>...</code>) copies the top level only. Objects inside are still shared. A deep copy copies everything.', run(L(
            'const original = { name: "Rahul", address: { city: "Surat" } };',
            '',
            'const shallow = { ...original };',
            'const deep = structuredClone(original);',
            '',
            'original.address.city = "Ahmedabad";',
            '',
            'console.log(shallow.address.city);   // changed too (shared)',
            'console.log(deep.address.city);      // still Surat'
          )), 3),
        ],
      },
    ],
  });
})();
