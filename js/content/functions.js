/* Sessions 6 to 9: functions, arrays, objects, spread and rest. */
(() => {
  const { block, table, list, steps, callout, run, callrow } = Ops.h;
  const L = (...lines) => lines.join('\n');
  const mod = (num, title, lead, learn, subs) =>
    (Ops.content[`session-${num}`] = Ops.h.module({ id: `session-${num}`, prefix: `s${num}`, num, title, lead, learn, subs }));

  /* ---------------- Session 6: Functions ---------------- */
  mod(6, 'Functions', 'A function is code you write once and use many times.', [
    'Writing a function and calling it',
    'Parameters and return values',
    'Arrow functions',
  ], [
    {
      key: 'basic', title: 'Write and call', lead: 'Two steps: write it, then use it.',
      blocks: [
        block('Two steps', 'Writing a function does nothing by itself. Code runs only when you <strong>call</strong> it.',
          callrow(
            '<code>function greet() {<br>&nbsp;&nbsp;console.log("Hello");<br>}</code>',
            '<code>greet();</code><br>The brackets <code>()</code> make it run.'
          ) + run(L(
            'function greet() {',
            '  console.log("Hello");',
            '}',
            '',
            'greet();   // call it',
            'greet();   // call it again'
          )), 1),
        block('Give it input, get output back', '<strong>Parameters</strong> are the inputs. <code>return</code> sends a result back to whoever called it.', run(L(
          'function add(a, b) {',
          '  return a + b;',
          '}',
          '',
          'const result = add(10, 20);   // 10 and 20 are the arguments',
          'console.log(result);'
        )), 2),
        block('Step by step: what happens', '', steps([
          '<code>add(10, 20)</code> is called.',
          '<code>a</code> becomes 10 and <code>b</code> becomes 20.',
          '<code>a + b</code> is worked out: 30.',
          '<code>return</code> sends 30 back, and it is saved in <code>result</code>.',
        ]), 3),
      ],
    },
    {
      key: 'arrow', title: 'Arrow functions', lead: 'A shorter way to write a function.',
      blocks: [
        block('Same job, shorter', 'Modern JavaScript uses these all the time.', table(['Style', 'Code'], [
          ['Normal', '<code>function add(a, b) { return a + b; }</code>'],
          ['Arrow', '<code>const add = (a, b) =&gt; { return a + b; };</code>'],
          ['Short arrow', '<code>const add = (a, b) =&gt; a + b;</code>'],
        ]) + run(L(
          'const add = (a, b) => a + b;',
          'const double = n => n * 2;      // one parameter: brackets are optional',
          '',
          'console.log(add(10, 20));',
          'console.log(double(4));'
        )) + callout('green', 'Remember', 'With a short arrow (no curly braces), the result is returned automatically. You do not write <code>return</code>.'), 1),
      ],
    },
  ]);

  /* ---------------- Session 7: Arrays ---------------- */
  mod(7, 'Arrays', 'An array is a list of values in one variable.', [
    'Reading and changing a list',
    'map, filter, find and reduce',
  ], [
    {
      key: 'basic', title: 'Array basics', lead: 'Store many values together.',
      blocks: [
        block('Make and read', 'Counting starts at <strong>0</strong>, not 1.', run(L(
          'const users = ["Rahul", "Amit", "Jay"];',
          '',
          'console.log(users[0]);       // first item',
          'console.log(users[2]);       // third item',
          'console.log(users.length);   // how many'
        )), 1),
        block('Add and remove', '', run(L(
          'const users = ["Rahul", "Amit", "Jay"];',
          '',
          'users.push("Raj");   // add to the end',
          'console.log(users);',
          '',
          'users.pop();         // remove the last',
          'console.log(users);'
        )), 2),
      ],
    },
    {
      key: 'methods', title: 'map, filter, find, reduce', lead: 'Four tools you will use every day.',
      blocks: [
        block('Which one do I need?', '', table(['Method', 'What it does', 'Gives back'], [
          ['<code>map</code>', 'Changes every item', 'A new array, same length'],
          ['<code>filter</code>', 'Keeps items that pass a test', 'A new, shorter array'],
          ['<code>find</code>', 'Finds the first match', 'One item'],
          ['<code>reduce</code>', 'Combines all items into one value', 'One value'],
        ]), 1),
        block('map: change every item', '', run(L(
          'const numbers = [1, 2, 3];',
          'const result = numbers.map(num => num * 2);',
          'console.log(result);'
        )), 2),
        block('filter: keep some items', '', run(L(
          'const numbers = [10, 20, 30, 40];',
          'const result = numbers.filter(num => num > 20);',
          'console.log(result);'
        )), 3),
        block('find: get one item', '', run(L(
          'const users = [',
          '  { id: 1, name: "Rahul" },',
          '  { id: 2, name: "Amit" }',
          '];',
          '',
          'const user = users.find(user => user.id === 2);',
          'console.log(user);'
        )), 4),
        block('reduce: make one value', 'Start from 0, then add each number to the running total.', run(L(
          'const prices = [100, 250, 50];',
          'const total = prices.reduce((sum, price) => sum + price, 0);',
          'console.log(total);'
        )), 5),
      ],
    },
  ]);

  /* ---------------- Session 8: Objects ---------------- */
  mod(8, 'Objects', 'An object keeps related details together under names. Very important in Node.js and NestJS.', [
    'Making and reading an object',
    'Changing an object',
    'Destructuring',
  ], [
    {
      key: 'basic', title: 'Object basics', lead: 'Named values in one place.',
      blocks: [
        block('Make and read', 'Each item is a <strong>key: value</strong> pair. Use a dot to read one.', run(L(
          'const user = {',
          '  name: "Rahul",',
          '  age: 24,',
          '  role: "Backend Developer"',
          '};',
          '',
          'console.log(user.name);',
          'console.log(user.age);',
          'console.log(user["role"]);   // another way to read'
        )), 1),
        block('Change and add', 'A <code>const</code> object can still have its insides changed. Only the variable itself cannot be replaced.', run(L(
          'const user = { name: "Rahul", age: 24 };',
          '',
          'user.age = 25;              // change',
          'user.city = "Ahmedabad";    // add',
          'console.log(user);'
        )), 2),
      ],
    },
    {
      key: 'destructure', title: 'Destructuring', lead: 'Pull values out in one line.',
      blocks: [
        block('Without and with', 'Destructuring takes the keys you name and makes variables from them.', run(L(
          'const user = { name: "Rahul", age: 24 };',
          '',
          '// Long way',
          'const name1 = user.name;',
          '',
          '// Short way',
          'const { name, age } = user;',
          '',
          'console.log(name1);',
          'console.log(name, age);'
        )), 1),
        block('In real backend code', 'You will often see it inside function parameters.', run(L(
          'function createUser({ name, age }) {',
          '  return "Created " + name + ", age " + age;',
          '}',
          '',
          'console.log(createUser({ name: "Rahul", age: 24 }));'
        )), 2),
      ],
    },
  ]);

  /* ---------------- Session 9: Spread and rest ---------------- */
  mod(9, 'Spread and Rest', 'Three dots <code>...</code> that do two opposite jobs.', [
    'Spread: open a list or object',
    'Rest: collect many values',
  ], [
    {
      key: 'spread', title: 'Spread', lead: 'Copy or open up values.',
      blocks: [
        block('The idea', 'Spread takes a box and pours its items out.', run(L(
          'const arr1 = [1, 2, 3];',
          'const arr2 = [...arr1, 4, 5];   // copy arr1, then add more',
          'console.log(arr2);'
        )), 1),
        block('Update an object without changing the original', 'Copy the old keys, then write the new ones after. The last value wins.', run(L(
          'const user = { name: "Rahul", age: 24 };',
          '',
          'const updatedUser = {',
          '  ...user,',
          '  age: 25',
          '};',
          '',
          'console.log(user);          // unchanged',
          'console.log(updatedUser);'
        )), 2),
      ],
    },
    {
      key: 'rest', title: 'Rest', lead: 'Gather many values into one array.',
      blocks: [
        block('The idea', 'In a function, <code>...numbers</code> collects every argument into an array called <code>numbers</code>.', run(L(
          'function sum(...numbers) {',
          '  return numbers.reduce((total, num) => total + num, 0);',
          '}',
          '',
          'console.log(sum(10, 20, 30));',
          'console.log(sum(1, 2));'
        )), 1),
        block('Spread vs rest', '', table(['', 'Where', 'Job'], [
          ['Spread', 'When <em>using</em> values', 'Opens a list or object'],
          ['Rest', 'When <em>receiving</em> values', 'Gathers many values into one array'],
        ]), 2),
      ],
    },
  ]);
})();
