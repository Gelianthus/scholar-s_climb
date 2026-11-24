export type Block = { t: "h" | "p" | "code"; text: string };
export type Lesson = { title: string; blocks: Block[] };
export type Question = { prompt: string; code?: string; options: string[]; answer: number; explanation: string };
export type Tower = {
  slug: string; name: string; level: string; summary: string; outcomes: string[];
  lessons: Lesson[]; quiz: Question[];
};

const h = (text: string): Block => ({ t: "h", text });
const p = (text: string): Block => ({ t: "p", text });
const c = (text: string): Block => ({ t: "code", text });

export const towers: Tower[] = [
  {
    slug: "html",
    name: "HTML",
    level: "Beginner",
    summary: "Learn how every web page is structured, from your first tag to accessible forms.",
    outcomes: ["Build a complete page from scratch", "Use semantic elements correctly", "Create accessible forms and tables"],
    lessons: [
      {
        title: "What HTML is and your first page",
        blocks: [
          p("HTML (HyperText Markup Language) describes the structure and meaning of a web page. It is not a programming language. It labels content: this is a heading, this is a link, this is an image. Browsers read those labels and draw the page."),
          p("HTML is built from elements. Most elements have an opening tag, some content, and a closing tag. Attributes add extra information inside the opening tag."),
          c('<p class="intro">Hello, world.</p>'),
          h("The skeleton of every page"),
          c('<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My first page</title>\n</head>\n<body>\n  <h1>Hello</h1>\n</body>\n</html>'),
          p("The doctype tells the browser to use modern standards. The head holds information that is not shown on the page, such as the title shown on the browser tab. The body holds everything people see. Save this as index.html and open it in your browser."),
        ],
      },
      {
        title: "Text, links and images",
        blocks: [
          p("Headings run from h1 to h6. Use a single h1 for the page title and use the lower levels in order, like the outline of a document. Paragraphs use p. Use strong for important text and em for emphasis."),
          c("<h1>Travel notes</h1>\n<p>I <strong>love</strong> long train rides.</p>"),
          h("Lists"),
          p("Use ul for a bulleted list, ol for a numbered one, and li for each item."),
          c("<ul>\n  <li>Pack a bag</li>\n  <li>Buy a ticket</li>\n</ul>"),
          h("Links and images"),
          p("The a element creates a link, and href holds the destination. A relative path like about.html points to a file on your own site. A full URL points elsewhere. The img element shows an image. It has no closing tag, and its alt attribute describes the image for people who cannot see it."),
          c('<a href="about.html">About me</a>\n<img src="train.jpg" alt="A red train crossing a bridge">'),
        ],
      },
      {
        title: "Structuring a page",
        blocks: [
          p("Semantic elements tell browsers, search engines and screen readers what each part of a page is. Prefer them over generic boxes."),
          c('<header>Site name and logo</header>\n<nav>Links to other pages</nav>\n<main>\n  <article>A self-contained post</article>\n  <section>A themed group of content</section>\n  <aside>Related extras</aside>\n</main>\n<footer>Contact and copyright</footer>'),
          p("Use main once per page for the primary content. The div and span elements have no meaning. Use them only when no semantic element fits: div groups block content and span wraps a piece of text."),
          p("Good structure is the base for everything that follows. CSS can target these elements, and assistive technology uses them to help people jump around the page."),
        ],
      },
      {
        title: "Forms and tables",
        blocks: [
          p("Forms collect information. Each field needs a label connected to it with matching for and id values. That makes the label clickable and readable by screen readers."),
          c('<form action="/subscribe" method="post">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required>\n  <label for="topic">Topic</label>\n  <select id="topic" name="topic">\n    <option>HTML</option>\n    <option>CSS</option>\n  </select>\n  <button type="submit">Subscribe</button>\n</form>'),
          p("The type attribute changes how an input behaves: text, email, password, number, checkbox, radio and date are common. The name attribute is the key the data is sent under. The required attribute stops submission when the field is empty."),
          h("Tables"),
          p("Use tables for data that has rows and columns, not for page layout."),
          c("<table>\n  <thead><tr><th>Item</th><th>Price</th></tr></thead>\n  <tbody><tr><td>Ticket</td><td>$12</td></tr></tbody>\n</table>"),
        ],
      },
      {
        title: "Writing good HTML",
        blocks: [
          p("Close every element you open and nest them properly: the element you open last is the one you close first. Indent nested elements so the structure is easy to read."),
          c("<!-- Comments are not shown on the page -->\n<ul>\n  <li><a href=\"/\">Home</a></li>\n</ul>"),
          h("class and id"),
          p("A class can be used on many elements and is how you will connect HTML to CSS. An id must be unique on the page and is used for links and scripts."),
          h("Accessibility checklist"),
          p("Add alt text to meaningful images. Connect every label to its input. Keep headings in order. Set the lang attribute on html. Make sure link text makes sense on its own, so use \"Read the guide\" instead of \"Click here\"."),
          p("Check your work with the W3C validator and your browser's developer tools (press F12). Next you will make this structure look good with CSS."),
        ],
      },
    ],
    quiz: [
      {
        prompt: "Which line must come first in a modern HTML page?",
        options: ["<html>", "<!DOCTYPE html>", "<head>", "<body>"],
        answer: 1,
        explanation: "The doctype tells the browser to use modern standards mode.",
      },
      {
        code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Ada Lovelace</title>\n</head>\n<body>\n\n</body>\n</html>',
        prompt: "You are building a profile page. Where do the visible headings and text go?",
        options: ["Inside the head", "Inside the title", "Inside the body", "After the closing html tag"],
        answer: 2,
        explanation: "Everything visible belongs in the body. The head holds information about the page.",
      },
      {
        code: "<body>\n  <h1>Ada Lovelace</h1>\n</body>",
        prompt: "Add her photo so that people using a screen reader know what it shows. Which is best?",
        options: [
          '<img src="ada.jpg">',
          '<img src="ada.jpg" alt="Portrait of Ada Lovelace">',
          '<img alt="ada.jpg">',
          '<image src="ada.jpg" alt="Ada">',
        ],
        answer: 1,
        explanation: "img needs src for the file and alt for a text description.",
      },
      {
        code: '<body>\n  <h1>Ada Lovelace</h1>\n  <img src="ada.jpg" alt="Portrait of Ada Lovelace">\n</body>',
        prompt: "Add a navigation menu with one link to a section called about. Which is the most meaningful markup?",
        options: [
          '<div><a href="#about">About</a></div>',
          '<nav><a href="#about">About</a></nav>',
          '<span><a href="#about">About</a></span>',
          '<nav>#about</nav>',
        ],
        answer: 1,
        explanation: "nav is the semantic element for navigation links.",
      },
      {
        code: '<body>\n  <h1>Ada Lovelace</h1>\n  <nav>...</nav>\n  <main>...</main>\n</body>',
        prompt: "Inside the main area, add a contact form field for an email address with an accessible label. Which is correct?",
        options: [
          '<label>Email</label><input type="email">',
          '<label for="email">Email</label><input id="email" type="email">',
          '<input type="email">Email',
          '<label id="email">Email</label><input for="email" type="email">',
        ],
        answer: 1,
        explanation: "The label's for value must match the input's id.",
      },
      {
        code: '<main>\n  <h2>Skills</h2>\n  ...\n</main>',
        prompt: "Finish the page by listing three skills. Which markup is correct?",
        options: [
          "<ul><li>Maths</li><li>Writing</li><li>Logic</li></ul>",
          "<li><ul>Maths</ul><ul>Writing</ul></li>",
          "<ul>Maths, Writing, Logic</ul>",
          "<list><item>Maths</item></list>",
        ],
        answer: 0,
        explanation: "A ul holds the list and each item sits in its own li.",
      },
    ],
  },
  {
    slug: "css",
    name: "CSS",
    level: "Beginner to intermediate",
    summary: "Style your pages, build layouts that adapt to any screen, and understand how the cascade works.",
    outcomes: ["Style text, color and spacing", "Lay out pages with Flexbox and Grid", "Make sites responsive"],
    lessons: [
      {
        title: "Adding CSS to a page",
        blocks: [
          p("CSS (Cascading Style Sheets) controls how HTML looks. A rule has a selector, which picks elements, and a block of declarations, each made of a property and a value."),
          c("h1 {\n  color: darkblue;\n  font-size: 2rem;\n}"),
          p("There are three ways to add CSS: inline with a style attribute, inside a style element, or in a separate file. A separate file is best because many pages can share it."),
          c('<link rel="stylesheet" href="style.css">'),
          h("Common selectors"),
          c("p { }            /* every paragraph */\n.card { }        /* elements with class=\"card\" */\n#logo { }        /* the element with id=\"logo\" */\nnav a { }        /* links inside nav */\nh1, h2 { }       /* both */"),
        ],
      },
      {
        title: "Color, text and units",
        blocks: [
          p("Colors can be written as names (tomato), hex codes (#1e90ff), rgb() or hsl(). Use color for text and background-color for the background."),
          c('body {\n  font-family: "Georgia", serif;\n  line-height: 1.6;\n  color: #222;\n  background-color: #fafafa;\n}'),
          p("Always give a font stack with a generic fallback like serif or sans-serif. A line-height around 1.5 makes paragraphs easier to read. Use text-align to align text."),
          h("Units"),
          p("px is a fixed size. rem is relative to the root font size and is the best choice for text and spacing because it respects user settings. em is relative to the current element. % is relative to the parent, and vw and vh are relative to the viewport."),
        ],
      },
      {
        title: "The box model",
        blocks: [
          p("Every element is a rectangular box with four layers, from inside to outside: content, padding, border and margin. Padding is space inside the border. Margin is space outside it."),
          c(".card {\n  padding: 1rem;\n  border: 2px solid #333;\n  margin: 1rem auto;\n  max-width: 30rem;\n}"),
          p("By default, width only sets the content size, so padding and border add to it. Setting box-sizing: border-box makes width include padding and border, which is far easier to reason about. Most developers apply it to everything."),
          c("*, *::before, *::after { box-sizing: border-box; }"),
          p("Elements are block (full width, new line, like div and p) or inline (flows with text, like span and a). You can change this with display. Setting margin: 0 auto centers a block element that has a width."),
        ],
      },
      {
        title: "Layout with Flexbox and Grid",
        blocks: [
          p("Flexbox lays items out in one direction. Add display: flex to a container and its children become flex items."),
          c(".nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}"),
          p("justify-content spreads items along the main axis, align-items aligns them on the cross axis, and gap adds space between them. Use flex-direction: column to stack, and flex-wrap: wrap to let items move to a new line."),
          h("Grid"),
          p("CSS Grid handles rows and columns together, which suits full page layouts and card galleries."),
          c(".gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}"),
          p("A good rule: use Flexbox for a row or column of items, and Grid when you need rows and columns."),
        ],
      },
      {
        title: "Responsive design and the cascade",
        blocks: [
          p("Responsive design makes one page work on every screen. Start with the small-screen layout and add changes for larger screens using media queries. Make sure your HTML has the viewport meta tag."),
          c(".gallery { display: grid; gap: 1rem; }\n\n@media (min-width: 600px) {\n  .gallery { grid-template-columns: repeat(2, 1fr); }\n}\nimg { max-width: 100%; height: auto; }"),
          h("States"),
          c("a:hover, button:focus-visible {\n  background-color: #e0f0ff;\n}"),
          h("The cascade"),
          p("When rules conflict, the browser picks a winner. More specific selectors beat less specific ones (an id beats a class, a class beats an element). When specificity is equal, the later rule wins. Avoid !important, since it makes styles hard to change."),
          p("Custom properties keep values in one place:"),
          c(":root { --brand: #1e90ff; }\n.button { background-color: var(--brand); }"),
        ],
      },
    ],
    quiz: [
      {
        code: "<head>\n  <title>Ada Lovelace</title>\n</head>",
        prompt: "Connect this profile page to a stylesheet called style.css. Which line goes in the head?",
        options: [
          '<style src="style.css">',
          '<link rel="stylesheet" href="style.css">',
          '<css href="style.css">',
          '<script href="style.css">',
        ],
        answer: 1,
        explanation: "The link element with rel=\"stylesheet\" loads an external CSS file.",
      },
      {
        code: '<h1>Ada Lovelace</h1>\n<div class="card">...</div>',
        prompt: "In style.css, make the heading dark blue and 2rem tall. Which rule is correct?",
        options: [
          "h1 { color: darkblue; font-size: 2rem; }",
          "h1 { text-color: darkblue; size: 2rem; }",
          "h1 ( color: darkblue; font-size: 2rem; )",
          ".h1 { color: darkblue; font-size: 2rem; }",
        ],
        answer: 0,
        explanation: "An element selector needs no dot, and declarations go in curly braces as property: value pairs.",
      },
      {
        code: '<div class="card">...</div>',
        prompt: "Which selector styles that div, and any other element with the same class?",
        options: ["#card", "card", ".card", "div.card.all"],
        answer: 2,
        explanation: "A dot selects by class. A hash selects by id.",
      },
      {
        code: ".card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #333;\n}",
        prompt: "With the default box-sizing, how wide is the card on screen?",
        options: ["300px", "320px", "340px", "344px"],
        answer: 3,
        explanation: "Content width 300 + 20 padding on each side (40) + 2px border on each side (4) = 344px.",
      },
      {
        code: ".nav { }\n/* inside: <a>Home</a> <a>About</a> <a>Contact</a> */",
        prompt: "Place the nav links in a row with space between them and vertically centered. Which works?",
        options: [
          ".nav { display: flex; justify-content: space-between; align-items: center; }",
          ".nav { display: inline; justify-content: space-between; }",
          ".nav { float: center; }",
          ".nav { flex: row; align: middle; }",
        ],
        answer: 0,
        explanation: "display: flex starts the layout, justify-content works along the row and align-items works across it.",
      },
      {
        code: ".card { width: 90%; margin: 0 auto; }",
        prompt: "On screens at least 700px wide, make the card 600px wide. Which is correct?",
        options: [
          "@media (min-width: 700px) { .card { width: 600px; } }",
          "@media (max-width: 700px) { .card { width: 600px; } }",
          "@screen 700px { .card { width: 600px; } }",
          ".card:wide { width: 600px; }",
        ],
        answer: 0,
        explanation: "min-width queries apply from that width upward. That is the mobile-first pattern.",
      },
    ],
  },
  {
    slug: "javascript",
    name: "JavaScript",
    level: "Beginner to intermediate",
    summary: "Add behavior to your pages: logic, data, DOM manipulation and talking to servers.",
    outcomes: ["Write functions, loops and conditions", "Update pages in response to user actions", "Fetch data with async code"],
    lessons: [
      {
        title: "Variables and data types",
        blocks: [
          p("JavaScript is the language that makes web pages interactive. It runs in the browser, and you can try code in the developer tools console (F12) or in a script tag."),
          p("A variable stores a value. Use const by default, and let when the value will change. Avoid var in new code."),
          c('const name = "Ada";\nlet visits = 0;\nvisits = visits + 1;\nconsole.log(name, visits);'),
          h("Data types"),
          p("The main types are string (text), number, boolean (true or false), null (intentionally empty), undefined (no value yet), object and array. The typeof operator tells you which type a value has."),
          c('typeof "hi";     // "string"\ntypeof 42;       // "number"\ntypeof true;     // "boolean"'),
          p("Template literals use backticks and let you place values inside text:"),
          c("const message = `Hello, ${name}! Visit number ${visits}.`;"),
        ],
      },
      {
        title: "Operators and decisions",
        blocks: [
          p("Arithmetic uses + - * / and % (remainder). Comparison gives true or false. Always use === and !== for comparison. The double version == converts types and gives surprising results."),
          c('5 === 5;     // true\n"5" === 5;   // false\n"5" == 5;    // true (avoid)'),
          h("Conditions"),
          c('if (visits === 0) {\n  console.log("Welcome");\n} else if (visits < 5) {\n  console.log("Welcome back");\n} else {\n  console.log("Good to see you again");\n}'),
          p("Combine conditions with && (and), || (or) and ! (not). Values like 0, an empty string, null, undefined and NaN are falsy. Almost everything else is truthy. The ternary operator is a short if/else for simple cases:"),
          c('const label = visits === 0 ? "Welcome" : "Welcome back";'),
        ],
      },
      {
        title: "Arrays, objects and loops",
        blocks: [
          p("An array is an ordered list. Indexes start at 0."),
          c('const skills = ["HTML", "CSS", "JS"];\nskills[0];          // "HTML"\nskills.length;      // 3\nskills.push("Git"); // adds to the end'),
          p("An object groups related values under named keys."),
          c('const user = { name: "Ada", age: 36, skills };\nuser.name;      // "Ada"\nuser.age = 37;  // update a value'),
          h("Loops"),
          c('for (let i = 0; i < skills.length; i++) {\n  console.log(skills[i]);\n}\n\nfor (const skill of skills) {\n  console.log(skill);\n}'),
          p("Arrays also have powerful methods. map transforms every item into a new array, filter keeps items that pass a test, and find returns the first match. They do not change the original array."),
          c('const lower = skills.map((s) => s.toLowerCase());\nconst short = skills.filter((s) => s.length <= 3);'),
        ],
      },
      {
        title: "Functions and scope",
        blocks: [
          p("A function is reusable code. It takes parameters, and returns a value with return. Without return, it gives back undefined."),
          c('function greet(name) {\n  return "Hi " + name;\n}\ngreet("Ada"); // "Hi Ada"'),
          p("Arrow functions are a shorter form that you will see everywhere. Parameters can have default values."),
          c('const greet2 = (name = "friend") => `Hi ${name}`;'),
          h("Scope"),
          p("Variables declared with let and const only exist inside the nearest pair of curly braces. Variables declared outside any function are global and can be changed from anywhere, so keep them to a minimum."),
          c("function counter() {\n  let count = 0;   // only visible inside counter\n  count++;\n  return count;\n}"),
          p("Functions are values, so you can pass them to other functions. A function passed in this way is a callback. The map and filter methods from the last lesson take callbacks."),
        ],
      },
      {
        title: "The DOM and events",
        blocks: [
          p("The DOM (Document Object Model) is the browser's live representation of your HTML. JavaScript can read it, change it and react to the user. First find an element:"),
          c('const button = document.querySelector("#btn");\nconst title = document.querySelector("h1");'),
          h("Changing the page"),
          c('title.textContent = "Welcome back";\ntitle.classList.toggle("highlight");\n\nconst li = document.createElement("li");\nli.textContent = "New item";\ndocument.querySelector("ul").append(li);'),
          h("Events"),
          p("An event listener runs a function when something happens, such as a click, a key press, or a form submit."),
          c('button.addEventListener("click", () => {\n  title.textContent = "You clicked!";\n});\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault(); // stop the page reloading\n});'),
          p("Load your script at the end of the body, or add the defer attribute to the script tag, so that the elements exist before your code looks for them."),
        ],
      },
      {
        title: "Async code and fetching data",
        blocks: [
          p("Some tasks take time, such as loading data from a server. JavaScript does not freeze while waiting. Instead those tasks return a promise, an object that will hold a result later."),
          p("The async and await keywords let you write this code in a straight line. The fetch function makes a network request."),
          c('async function loadUser() {\n  const res = await fetch("https://api.example.com/user/1");\n  const data = await res.json();\n  return data;\n}'),
          h("Handling errors"),
          p("Network requests can fail. A fetch call only throws when there is no connection, so check res.ok for server errors yourself, and wrap the code in try and catch."),
          c('async function loadUser() {\n  try {\n    const res = await fetch("https://api.example.com/user/1");\n    if (!res.ok) throw new Error("Request failed: " + res.status);\n    return await res.json();\n  } catch (error) {\n    console.error(error);\n  }\n}'),
          p("JSON is the text format most APIs use. res.json() turns it into objects and arrays. From here you can learn modules, tooling, and a framework like React."),
        ],
      },
    ],
    quiz: [
      {
        code: 'const name = "Ada";\nlet visits = 0;',
        prompt: "Your profile page now tracks visits. What does typeof visits return?",
        options: ['"string"', '"number"', '"boolean"', '"undefined"'],
        answer: 1,
        explanation: "0 is a number, so typeof gives \"number\".",
      },
      {
        code: 'const name = "Ada";\nlet visits = 0;',
        prompt: "Show \"Welcome\" on the first visit and \"Welcome back\" afterwards. Which is correct?",
        options: [
          'if (visits = 0) { show("Welcome"); } else { show("Welcome back"); }',
          'if (visits === 0) { show("Welcome"); } else { show("Welcome back"); }',
          'if visits === 0 { show("Welcome"); } else { show("Welcome back"); }',
          'if (visits === 0) show("Welcome") otherwise show("Welcome back");',
        ],
        answer: 1,
        explanation: "Use === for comparison. A single = assigns a value instead of comparing.",
      },
      {
        code: 'const skills = ["HTML", "CSS", "JS"];',
        prompt: "What does skills.map((s) => s.toLowerCase()) return?",
        options: [
          '"html css js"',
          'The same array, now changed to lowercase',
          'A new array: ["html", "css", "js"]',
          "undefined",
        ],
        answer: 2,
        explanation: "map builds a new array from the results and leaves the original unchanged.",
      },
      {
        code: "function greet(name) {\n  return `Hi ${name}`;\n}",
        prompt: "Which arrow function is equivalent?",
        options: [
          "const greet = (name) => `Hi ${name}`;",
          "const greet = name -> `Hi ${name}`;",
          "const greet = () => { `Hi ${name}`; };",
          "arrow greet(name) = `Hi ${name}`;",
        ],
        answer: 0,
        explanation: "A single expression after => is returned automatically. With curly braces you would need an explicit return.",
      },
      {
        code: '<h1 id="title">Ada</h1>\n<button id="btn">Greet</button>',
        prompt: "Make the heading say \"Hello!\" when the button is clicked. Which is correct?",
        options: [
          'document.querySelector("#btn").onclick = "Hello!";',
          'document.querySelector("#btn").addEventListener("click", () => {\n  document.querySelector("#title").textContent = "Hello!";\n});',
          'document.querySelector("btn").addEventListener(click, () => { title = "Hello!"; });',
          'addEventListener("#btn", "click", "Hello!");',
        ],
        answer: 1,
        explanation: "Find the element, listen for the event with a function, and update textContent inside it.",
      },
      {
        code: 'async function loadUser() {\n  const res = await fetch("/api/user");\n  // ?\n}',
        prompt: "Read the response as JSON and handle failed requests. Which is best?",
        options: [
          "const data = res.json();",
          'if (!res.ok) throw new Error("Failed"); const data = await res.json();',
          "const data = JSON(res);",
          "const data = await res.text().json();",
        ],
        answer: 1,
        explanation: "Check res.ok for server errors, then await res.json(), because it returns a promise.",
      },
    ],
  },
];

export const getTower = (slug: string) => towers.find((t) => t.slug === slug);
