/* Sessions 1 to 5: variables, data types, operators, conditions, loops. */
(() => {
  const { block, table, list, steps, callout, legend, run } = Ops.h;
  const L = (...lines) => lines.join('\n');
  const mod = (id, num, title, lead, learn, subs) =>
    (Ops.content[`session-${num}`] = Ops.h.module({ id: `session-${num}`, prefix: `s${num}`, num, title, lead, learn, subs }));

  /* ---------------- Session 1: Variables ---------------- */
  mod('session-1', 1, 'Variables', 'A variable stores a value so you can use it later.', [
    'What a variable is',
    'var, let and const',
    'Which one to use, and why',
  ], [
    {
      key: 'what', title: 'What is a variable?', lead: 'A named box that holds a value.',
      blocks: [
        block('The idea', 'A variable is a box with a name on it. You put a value inside. Later you use the name to get the value back.', run(L(
          'const name = "Rahul";',
          'let age = 24;',
          '',
          'console.log(name);',
          'console.log(age);'
        )), 1),
        block('Three ways to make one', 'JavaScript gives you three keywords.', table(['Keyword', 'Meaning', 'Can the value change?'], [
          ['<code>var</code>', 'The old way. Avoid it in new code.', 'Yes'],
          ['<code>let</code>', 'A box whose value can change.', 'Yes'],
          ['<code>const</code>', 'A box whose value is fixed.', 'No'],
        ]), 2),
        block('let can change. const cannot.', 'Try to change both and see what happens.', run(L(
          'let age = 24;',
          'age = 25;              // allowed',
          'console.log(age);',
          '',
          'const name = "Rahul";',
          'try {',
          '  name = "John";        // not allowed',
          '} catch (error) {',
          '  console.log("Error:", error.message);',
          '}'
        )), 3),
      ],
    },
    {
      key: 'rules', title: 'Which one to use', lead: 'A simple rule that always works.',
      blocks: [
        block('The rule', 'Follow these steps every time you make a variable.', steps([
          'Start with <code>const</code>.',
          'If you later need to give it a new value, change it to <code>let</code>.',
          'Do not use <code>var</code>.',
        ]), 1),
        block('Why avoid var?', 'A <code>var</code> variable leaks out of the curly braces <code>{ }</code> where you made it. <code>let</code> and <code>const</code> stay inside.', run(L(
          'if (true) {',
          '  var a = 1;   // leaks out',
          '  let b = 2;   // stays inside',
          '}',
          '',
          'console.log(a);',
          'try {',
          '  console.log(b);',
          '} catch (error) {',
          '  console.log("b is not visible here:", error.message);',
          '}'
        )), 2),
        block('Good names', '', list([
          'Use clear words: <code>userName</code>, not <code>x</code>',
          'Write in camelCase: first word small, next words start with a capital',
          'A name cannot start with a number and cannot have spaces',
        ]) + callout('green', 'Remember', 'Prefer <code>const</code> by default. Use <code>let</code> only when the value must change.'), 3),
      ],
    },
  ]);

  /* ---------------- Session 2: Data types ---------------- */
  mod('session-2', 2, 'Data Types', 'Every value has a type: text, number, true/false, list, and more.', [
    'String, number, boolean',
    'Null and undefined',
    'Object and array',
    'Checking a type with typeof',
  ], [
    {
      key: 'types', title: 'The common types', lead: 'The kinds of data you will use every day.',
      blocks: [
        block('Simple types', 'These hold one single value.', table(['Type', 'Example', 'Used for'], [
          ['String', '<code>"Rahul"</code>', 'Text, always in quotes'],
          ['Number', '<code>24</code> or <code>9.5</code>', 'Whole and decimal numbers'],
          ['Boolean', '<code>true</code> / <code>false</code>', 'Yes or no answers'],
          ['Null', '<code>null</code>', 'Empty on purpose'],
          ['Undefined', '<code>undefined</code>', 'No value given yet'],
        ]), 1),
        block('Complex types', 'These hold many values together.', table(['Type', 'Example', 'Used for'], [
          ['Object', '<code>{ name: "Rahul", age: 24 }</code>', 'Named details about one thing'],
          ['Array', '<code>["Node", "JS", "Python"]</code>', 'A list of things'],
        ]), 2),
        block('Check a type with typeof', 'Put <code>typeof</code> before a value and it tells you the type.', run(L(
          'let name = "Rahul";',
          'let age = 24;',
          'let isDeveloper = true;',
          '',
          'console.log(typeof name);',
          'console.log(typeof age);',
          'console.log(typeof isDeveloper);'
        )), 3),
      ],
    },
    {
      key: 'empty', title: 'Null and undefined', lead: 'Two kinds of "nothing". They are not the same.',
      blocks: [
        block('The difference', '', table(['', 'Meaning', 'Who sets it'], [
          ['<code>null</code>', 'Empty on purpose', 'You'],
          ['<code>undefined</code>', 'Never given a value', 'JavaScript'],
        ]), 1),
        block('See it', '', run(L(
          'let salary = null;   // we decided: no salary',
          'let address;         // we never gave it a value',
          '',
          'console.log(salary);',
          'console.log(address);'
        )), 2),
        block('Objects and arrays', 'Put many values in one variable.', run(L(
          'let user = {',
          '  name: "Rahul",',
          '  age: 24',
          '};',
          'let skills = ["Node", "JS", "Python"];',
          '',
          'console.log(user);',
          'console.log(skills);',
          'console.log(typeof user, typeof skills);  // arrays also say "object"'
        )), 3),
      ],
    },
  ]);

  /* ---------------- Session 3: Operators ---------------- */
  mod('session-3', 3, 'Operators', 'Operators do maths and compare values.', [
    'Arithmetic: + - * / %',
    'Comparison: == and ===',
    'Logic: && || !',
  ], [
    {
      key: 'math', title: 'Arithmetic', lead: 'Add, subtract, multiply and divide.',
      blocks: [
        block('The operators', '', legend([
          ['', '+', 'Add'], ['', '-', 'Subtract'], ['', '*', 'Multiply'],
          ['', '/', 'Divide'], ['', '%', 'Remainder'], ['', '**', 'Power'],
        ]), 1),
        block('Try them', '<code>%</code> gives what is left after dividing.', run(L(
          'let a = 10;',
          'let b = 5;',
          '',
          'console.log(a + b);   // 15',
          'console.log(a - b);   // 5',
          'console.log(a * b);   // 50',
          'console.log(a / b);   // 2',
          'console.log(a % 3);   // 1  (10 divided by 3 leaves 1)'
        )), 2),
      ],
    },
    {
      key: 'compare', title: 'Compare and combine', lead: 'Ask questions that give true or false.',
      blocks: [
        block('== versus ===', '<code>==</code> only compares the value. <code>===</code> compares the value and the type.', run(L(
          'console.log(10 == "10");    // true  (same value)',
          'console.log(10 === "10");   // false (number vs text)',
          'console.log(10 > 5);        // true',
          'console.log(10 !== 5);      // true'
        )) + callout('amber', 'Remember', 'Always use <code>===</code> and <code>!==</code>. They never surprise you.'), 1),
        block('Logic operators', 'Join several questions into one.', table(['Operator', 'Meaning', 'Example'], [
          ['<code>&amp;&amp;</code>', 'AND: both must be true', '<code>age &gt; 18 &amp;&amp; hasId</code>'],
          ['<code>||</code>', 'OR: at least one is true', '<code>isAdmin || isOwner</code>'],
          ['<code>!</code>', 'NOT: flips true and false', '<code>!isBlocked</code>'],
        ]) + run(L(
          'const age = 24;',
          'const hasId = true;',
          '',
          'console.log(age > 18 && hasId);   // true',
          'console.log(age > 30 || hasId);   // true',
          'console.log(!hasId);              // false'
        )), 2),
      ],
    },
  ]);

  /* ---------------- Session 4: Conditions ---------------- */
  mod('session-4', 4, 'Conditions', 'Run different code depending on a question.', [
    'if and else',
    'else if for many cases',
    'Short forms: ternary and switch',
  ], [
    {
      key: 'ifelse', title: 'if and else', lead: 'If something is true, do this. Otherwise, do that.',
      blocks: [
        block('One question', '', run(L(
          'let age = 24;',
          '',
          'if (age >= 18) {',
          '  console.log("Adult");',
          '} else {',
          '  console.log("Minor");',
          '}'
        )), 1),
        block('Many questions', 'JavaScript checks from the top and stops at the first true one. Change <code>marks</code> and run again.', run(L(
          'let marks = 75;',
          '',
          'if (marks >= 90) {',
          '  console.log("A Grade");',
          '} else if (marks >= 60) {',
          '  console.log("B Grade");',
          '} else {',
          '  console.log("Fail");',
          '}'
        )), 2),
      ],
    },
    {
      key: 'short', title: 'Short forms', lead: 'Two shortcuts you will see in real code.',
      blocks: [
        block('Ternary', 'A one-line if/else: <code>question ? ifTrue : ifFalse</code>', run(L(
          'const age = 16;',
          'const label = age >= 18 ? "Adult" : "Minor";',
          'console.log(label);'
        )), 1),
        block('switch', 'Good when one value has many exact options.', run(L(
          'const role = "admin";',
          '',
          'switch (role) {',
          '  case "admin":',
          '    console.log("Full access");',
          '    break;',
          '  case "user":',
          '    console.log("Limited access");',
          '    break;',
          '  default:',
          '    console.log("No access");',
          '}'
        )), 2),
      ],
    },
  ]);

  /* ---------------- Session 5: Loops ---------------- */
  mod('session-5', 5, 'Loops', 'Repeat the same code without writing it again.', [
    'for loop',
    'while loop',
    'for...of for arrays',
  ], [
    {
      key: 'counting', title: 'for and while', lead: 'Loops that count.',
      blocks: [
        block('The for loop', 'Three parts in the brackets: where to start, when to stop, how to move.', run(L(
          'for (let i = 1; i <= 5; i++) {',
          '  console.log(i);',
          '}'
        )), 1),
        block('The while loop', 'Keep going while the question is true. Do not forget to move <code>i</code>, or it never ends.', run(L(
          'let i = 1;',
          '',
          'while (i <= 5) {',
          '  console.log(i);',
          '  i++;',
          '}'
        )), 2),
      ],
    },
    {
      key: 'forof', title: 'for...of', lead: 'The easy way to go through a list.',
      blocks: [
        block('One item at a time', '', run(L(
          'const skills = ["Node", "React", "Python"];',
          '',
          'for (const skill of skills) {',
          '  console.log(skill);',
          '}'
        )), 1),
        block('Skip or stop', '<code>continue</code> skips this item. <code>break</code> stops the whole loop.', run(L(
          'for (let i = 1; i <= 6; i++) {',
          '  if (i === 2) continue;   // skip 2',
          '  if (i === 5) break;      // stop at 5',
          '  console.log(i);',
          '}'
        )), 2),
      ],
    },
  ]);
})();
