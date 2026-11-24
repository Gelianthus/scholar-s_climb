export type Block = { t: "h" | "p" | "code"; text: string };
export type Lesson = { title: string; blocks: Block[] };
export type Question = {
	prompt: string;
	code?: string;
	options: string[];
	answer: number;
	explanation: string;
};
export type Floor = {
	title: string;
	summary: string;
	lessons: Lesson[];
	quiz: Question[];
};
export type Tower = {
	slug: string;
	name: string;
	level: string;
	summary: string;
	floors: Floor[];
};

const h = (text: string): Block => ({ t: "h", text });
const p = (text: string): Block => ({ t: "p", text });
const c = (text: string): Block => ({ t: "code", text });

export const towers: Tower[] = [
	// ───────────────────────────── HTML ─────────────────────────────
	{
		slug: "html",
		name: "HTML",
		level: "Beginner",
		summary:
			"Learn how every web page is structured, from your first tag to accessible forms.",
		floors: [
			{
				title: "Fundamentals",
				summary: "Elements, page structure, text, links and images.",
				lessons: [
					{
						title: "Your first page",
						blocks: [
							p(
								"HTML (HyperText Markup Language) describes the structure and meaning of a web page. It labels content: this is a heading, this is a link, this is an image. Browsers read those labels and draw the page.",
							),
							p(
								"Most elements have an opening tag, content, and a closing tag. Every page has the same skeleton:",
							),
							c(
								'<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>My page</title>\n</head>\n<body>\n  <h1>Hello</h1>\n</body>\n</html>',
							),
							p(
								"The head holds information about the page, such as the title on the browser tab. The body holds everything people see.",
							),
						],
					},
					{
						title: "Text, links and images",
						blocks: [
							p(
								"Headings run from h1 to h6. Use one h1 per page and keep the levels in order. Paragraphs use p, and lists use ul or ol with li items.",
							),
							c(
								"<h1>Travel notes</h1>\n<p>I <strong>love</strong> trains.</p>\n<ul>\n  <li>Pack a bag</li>\n  <li>Buy a ticket</li>\n</ul>",
							),
							p(
								"Links use the a element. Images use img, which has no closing tag.",
							),
							c(
								'<a href="about.html">About me</a>\n<img src="train.jpg" alt="A red train">',
							),
						],
					},
					{
						title: "Structuring a page",
						blocks: [
							p(
								"Semantic elements tell browsers and screen readers what each part of a page is. Prefer them over generic boxes.",
							),
							c(
								"<header>Logo</header>\n<nav>Links</nav>\n<main>\n  <section>Content</section>\n</main>\n<footer>Contact</footer>",
							),
							p(
								"Use main once per page. The div and span elements have no meaning, so use them only when nothing semantic fits.",
							),
						],
					},
				],
				quiz: [
					{
						prompt: "Which line must come first in a modern HTML page?",
						options: ["<html>", "<!DOCTYPE html>", "<head>", "<body>"],
						answer: 1,
						explanation:
							"The doctype tells the browser to use modern standards mode.",
					},
					{
						code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Ada Lovelace</title>\n</head>\n<body>\n\n</body>\n</html>',
						prompt:
							"You are building a profile page. Where do the visible headings and text go?",
						options: [
							"Inside the head",
							"Inside the title",
							"Inside the body",
							"After the closing html tag",
						],
						answer: 2,
						explanation: "Everything visible belongs in the body.",
					},
					{
						code: "<body>\n  <h1>Ada Lovelace</h1>\n</body>",
						prompt: "Add a paragraph below the heading. Which is correct?",
						options: [
							"<para>Welcome</para>",
							"<p>Welcome</p>",
							"<p>Welcome<p>",
							"</p>Welcome<p>",
						],
						answer: 1,
						explanation: "A paragraph opens with <p> and closes with </p>.",
					},
					{
						code: "<body>\n  <h1>Ada Lovelace</h1>\n  <p>Welcome.</p>\n</body>",
						prompt:
							"Add a link with the text Open the map that goes to /map. Which is right?",
						options: [
							'<a href="/map">Open the map</a>',
							'<a src="/map">Open the map</a>',
							'<link href="/map">Open the map</link>',
							"<a>/map</a>",
						],
						answer: 0,
						explanation:
							"The a element creates links, and href holds the destination.",
					},
					{
						code: "<body>\n  <h1>Ada Lovelace</h1>\n  ...\n</body>",
						prompt:
							"Which is the most meaningful markup for a menu with two links?",
						options: [
							'<nav><a href="/">Home</a> <a href="/map">Map</a></nav>',
							'<div><a href="/">Home</a> <a href="/map">Map</a></div>',
							'<span><a href="/">Home</a> <a href="/map">Map</a></span>',
							"<nav>Home Map</nav>",
						],
						answer: 0,
						explanation: "nav is the semantic element for navigation links.",
					},
				],
			},
			{
				title: "Attributes",
				summary:
					"Give elements extra meaning with href, src, alt, class, id and more.",
				lessons: [
					{
						title: "Attribute basics",
						blocks: [
							p(
								'Attributes add information to an element. They go in the opening tag as name="value" pairs.',
							),
							c(
								'<a href="https://example.com" target="_blank" rel="noopener noreferrer">Docs</a>\n<img src="ada.jpg" alt="Portrait of Ada" width="200" height="200">',
							),
							p(
								'href is where a link goes, src is the file an image loads, and alt describes an image for people who cannot see it. Links that open a new tab should also have rel="noopener noreferrer" for safety.',
							),
							p(
								"Boolean attributes have no value. Their presence turns them on:",
							),
							c('<input disabled>\n<input type="checkbox" checked>'),
						],
					},
					{
						title: "Global and accessibility attributes",
						blocks: [
							p(
								"Some attributes work on any element. A class can be shared by many elements and is how CSS targets them. An id must be unique on the page, and it lets a link jump to that element.",
							),
							c(
								'<section id="about" class="card">...</section>\n<a href="#about">Jump to About</a>',
							),
							p(
								"Use data- attributes to store small bits of custom data for JavaScript, and aria-label to give an accessible name to controls that have no visible text.",
							),
							c(
								'<button aria-label="Close" data-modal="login">X</button>\n<img src="photo.jpg" alt="" loading="lazy">',
							),
							p(
								'An empty alt marks an image as decorative. loading="lazy" delays loading images until they are near the screen.',
							),
						],
					},
				],
				quiz: [
					{
						prompt: "Which image tag is best for people using a screen reader?",
						options: [
							'<img src="ada.jpg">',
							'<img src="ada.jpg" alt="Portrait of Ada Lovelace">',
							'<img alt="ada.jpg">',
							'<image src="ada.jpg">',
						],
						answer: 1,
						explanation:
							"alt gives the image a text description. src is still needed to load the file.",
					},
					{
						prompt: "Which link opens an external site in a new tab, safely?",
						options: [
							'<a href="https://example.com" target="_blank">Site</a>',
							'<a href="https://example.com" target="_blank" rel="noopener noreferrer">Site</a>',
							'<a src="https://example.com" new-tab>Site</a>',
							'<a href="https://example.com" rel="new">Site</a>',
						],
						answer: 1,
						explanation:
							'target="_blank" opens a new tab, and rel="noopener noreferrer" stops the new page controlling yours.',
					},
					{
						prompt:
							"Which attribute must be unique on a page and lets you link to it with #name?",
						options: ["class", "id", "name", "data-id"],
						answer: 1,
						explanation:
							"An id identifies one element. Many elements can share a class.",
					},
					{
						prompt:
							"A button shows only an X icon. How do you give it an accessible name?",
						options: [
							'<button label="Close">X</button>',
							'<button aria-label="Close">X</button>',
							'<button alt="Close">X</button>',
							"<button title>Close</button>",
						],
						answer: 1,
						explanation:
							"aria-label supplies a name for assistive technology when no text is visible.",
					},
				],
			},
			{
				title: "Forms",
				summary:
					"Collect input with labels, inputs, validation and a submit button.",
				lessons: [
					{
						title: "Form basics",
						blocks: [
							p(
								"A form collects input and sends it somewhere. Each field needs a label connected to it with matching for and id values. That makes the label clickable and readable by screen readers.",
							),
							c(
								'<form action="/subscribe" method="post">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email">\n  <label for="msg">Message</label>\n  <textarea id="msg" name="msg"></textarea>\n  <button type="submit">Send</button>\n</form>',
							),
							p(
								"The type attribute changes how an input works: text, email, password, number, checkbox, radio and date are common. The name attribute is the key the value is sent under.",
							),
							c(
								'<label for="topic">Topic</label>\n<select id="topic" name="topic">\n  <option>HTML</option>\n  <option>CSS</option>\n</select>',
							),
						],
					},
					{
						title: "Validation and good practice",
						blocks: [
							p(
								'The browser can validate for you. Add required to make a field mandatory, minlength and maxlength to limit text, min and max for numbers, and pattern for a custom rule. type="email" checks the format automatically.',
							),
							c(
								'<input id="pw" name="pw" type="password" required minlength="8">',
							),
							p(
								"Radio buttons that share the same name form a group where only one can be chosen. Wrap a group in fieldset with a legend that describes it.",
							),
							c(
								'<fieldset>\n  <legend>Level</legend>\n  <label><input type="radio" name="level" value="new"> New</label>\n  <label><input type="radio" name="level" value="pro"> Pro</label>\n</fieldset>',
							),
							p(
								"A placeholder is a hint, not a label. Always keep a real label, and add autocomplete so browsers can fill in known details.",
							),
						],
					},
				],
				quiz: [
					{
						prompt: "Which pair connects a label to its input correctly?",
						options: [
							'<label>Email</label><input type="email">',
							'<label for="email">Email</label><input id="email" type="email">',
							'<label id="email">Email</label><input for="email">',
							'<input type="email">Email',
						],
						answer: 1,
						explanation: "The label's for value must match the input's id.",
					},
					{
						prompt:
							"Which attribute stops the form from submitting when a field is empty?",
						options: ["mandatory", "placeholder", "required", "validate"],
						answer: 2,
						explanation:
							"required makes the browser block submission until the field has a value.",
					},
					{
						prompt:
							"You have two radio buttons for Level. What makes them a single group where only one can be picked?",
						options: [
							"The same id",
							"The same name",
							"The same class",
							"The same value",
						],
						answer: 1,
						explanation:
							"Radio buttons with the same name belong to one group.",
					},
					{
						prompt: "Which is the best email field for a sign-up form?",
						options: [
							'<input type="text" placeholder="Email">',
							'<input id="email" name="email" type="email" autocomplete="email" required>',
							'<input name="email" required>',
							'<email id="email" required>',
						],
						answer: 1,
						explanation:
							"It has the right type, a name, autocomplete and required. Pair it with a label too.",
					},
				],
			},
		],
	},

	// ───────────────────────────── CSS ─────────────────────────────
	{
		slug: "css",
		name: "CSS",
		level: "Beginner to intermediate",
		summary:
			"Style your pages, make them responsive, add motion, and speed up with Tailwind.",
		floors: [
			{
				title: "Fundamentals",
				summary: "Selectors, color, the box model and Flexbox.",
				lessons: [
					{
						title: "Selectors and rules",
						blocks: [
							p(
								"CSS controls how HTML looks. A rule has a selector, which picks elements, and declarations made of a property and a value. Put rules in a separate file and link it in the head.",
							),
							c('<link rel="stylesheet" href="style.css">'),
							c(
								"h1 { color: darkblue; font-size: 2rem; }\n.card { padding: 1rem; }  /* class */\n#logo { width: 3rem; }    /* id */\nnav a { color: black; }   /* links inside nav */",
							),
							p(
								"When rules conflict, the more specific selector wins: an id beats a class, and a class beats an element. If specificity is equal, the later rule wins.",
							),
						],
					},
					{
						title: "Color, text and the box model",
						blocks: [
							p(
								"Set text color with color and the background with background-color. Colors can be names, hex codes like #1e90ff, rgb() or hsl(). Use rem for font sizes, which respects user settings.",
							),
							c(
								"body {\n  font-family: Georgia, serif;\n  line-height: 1.6;\n  color: #222;\n}",
							),
							p(
								"Every element is a box: content, then padding, border and margin. By default, width sets only the content, so padding and border add to it. box-sizing: border-box makes width include them.",
							),
							c(
								"*, *::before, *::after { box-sizing: border-box; }\n.card {\n  padding: 1rem;\n  border: 2px solid #333;\n  margin: 1rem auto;\n}",
							),
						],
					},
					{
						title: "Layout with Flexbox",
						blocks: [
							p(
								"Flexbox lays items out in one direction. Add display: flex to a container and its children become flex items.",
							),
							c(
								".nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}",
							),
							p(
								"justify-content spreads items along the main axis, align-items aligns them across it, and gap adds space between them. Use flex-direction: column to stack items and flex-wrap: wrap to let them wrap.",
							),
						],
					},
				],
				quiz: [
					{
						prompt:
							"Which line connects a page to a stylesheet called style.css?",
						options: [
							'<style src="style.css">',
							'<link rel="stylesheet" href="style.css">',
							'<css href="style.css">',
							'<script href="style.css">',
						],
						answer: 1,
						explanation:
							'The link element with rel="stylesheet" loads an external CSS file.',
					},
					{
						code: '<div class="card">...</div>',
						prompt:
							"Which selector styles that div, and any other element with the same class?",
						options: ["#card", "card", ".card", "div.card.all"],
						answer: 2,
						explanation: "A dot selects by class. A hash selects by id.",
					},
					{
						code: '<p class="note">Hi</p>\n\np { color: red; }\n.note { color: blue; }',
						prompt: "What color is the text?",
						options: ["Red", "Blue", "Purple", "Black"],
						answer: 1,
						explanation:
							"A class selector is more specific than an element selector, so blue wins.",
					},
					{
						code: ".card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #333;\n}",
						prompt:
							"With the default box-sizing, how wide is the card on screen?",
						options: ["300px", "320px", "340px", "344px"],
						answer: 3,
						explanation:
							"300 content + 40 padding (20 each side) + 4 border (2 each side) = 344px.",
					},
					{
						code: ".nav { }\n/* contains three links */",
						prompt:
							"Put the links in a row, spaced apart and vertically centered. Which works?",
						options: [
							".nav { display: flex; justify-content: space-between; align-items: center; }",
							".nav { display: inline; justify-content: space-between; }",
							".nav { float: center; }",
							".nav { flex: row; align: middle; }",
						],
						answer: 0,
						explanation:
							"display: flex starts the layout, then justify-content and align-items position the items.",
					},
				],
			},
			{
				title: "Media queries and animations",
				summary:
					"Adapt layouts to screen size and add motion with transitions and keyframes.",
				lessons: [
					{
						title: "Responsive design with media queries",
						blocks: [
							p(
								"Responsive design makes one page work on every screen. Make sure your HTML has the viewport tag, then start with the small-screen styles and add changes for larger screens. This is called mobile-first.",
							),
							c(
								'<meta name="viewport" content="width=device-width, initial-scale=1">',
							),
							c(
								".gallery { display: grid; gap: 1rem; }\n\n@media (min-width: 600px) {\n  .gallery { grid-template-columns: repeat(2, 1fr); }\n}\n@media (min-width: 900px) {\n  .gallery { grid-template-columns: repeat(3, 1fr); }\n}",
							),
							p(
								"min-width queries apply from that width upward. Also use max-width: 100% on images so they never overflow.",
							),
						],
					},
					{
						title: "Transitions and keyframe animations",
						blocks: [
							p(
								"A transition smooths a change between two states, such as on hover. Name the property, the time and the easing.",
							),
							c(
								".button {\n  background-color: #a2d5c6;\n  transition: background-color 0.3s ease;\n}\n.button:hover { background-color: #cfffe2; }",
							),
							p(
								"For multi-step motion, define @keyframes and attach them with the animation property.",
							),
							c(
								"@keyframes fade-in {\n  from { opacity: 0; transform: translateY(1rem); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n.card { animation: fade-in 0.6s ease-out; }",
							),
							p(
								"Animate transform and opacity where you can, since they are the smoothest. Respect people who prefer less motion:",
							),
							c(
								"@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; transition: none !important; }\n}",
							),
						],
					},
				],
				quiz: [
					{
						code: ".card { width: 90%; margin: 0 auto; }",
						prompt:
							"On screens at least 700px wide, make the card 600px wide. Which is correct?",
						options: [
							"@media (min-width: 700px) { .card { width: 600px; } }",
							"@media (max-width: 700px) { .card { width: 600px; } }",
							"@screen 700px { .card { width: 600px; } }",
							".card:wide { width: 600px; }",
						],
						answer: 0,
						explanation:
							"min-width queries apply from that width upward, which is the mobile-first pattern.",
					},
					{
						prompt:
							"Make a button's background change smoothly over 0.3 seconds on hover. Which goes on .button?",
						options: [
							"animation: background 0.3s;",
							"transition: background-color 0.3s ease;",
							"transform: background-color 0.3s;",
							"smooth: 0.3s;",
						],
						answer: 1,
						explanation:
							"transition names the property and duration to animate between states.",
					},
					{
						prompt: "Which pair fades an element in over one second?",
						options: [
							"@keyframes fade { from { opacity: 0; } to { opacity: 1; } }\n.box { animation: fade 1s; }",
							"@animation fade { 0% { opacity: 0; } }\n.box { keyframes: fade 1s; }",
							".box { animation: opacity 0 to 1 1s; }",
							"@keyframes fade { opacity: 0 to 1; }",
						],
						answer: 0,
						explanation:
							"Define the steps with @keyframes, then apply them with the animation property.",
					},
					{
						prompt:
							"How do you turn off animations for visitors who prefer reduced motion?",
						options: [
							"@media (prefers-reduced-motion: reduce) { * { animation: none; } }",
							"@media (motion: none) { * { animation: none; } }",
							"* { animation: reduced; }",
							"@media (max-motion: 0) { * { animation: none; } }",
						],
						answer: 0,
						explanation:
							"prefers-reduced-motion is the media feature that reflects the user's system setting.",
					},
				],
			},
			{
				title: "Tailwind CSS",
				summary:
					"Style directly in your markup with utility classes, variants and responsive prefixes.",
				lessons: [
					{
						title: "Utility-first styling",
						blocks: [
							p(
								"Tailwind gives you small single-purpose classes, like px-4 or text-center, and you combine them in your HTML instead of writing CSS rules. In Tailwind v4 you enable it with one line in your CSS file.",
							),
							c('@import "tailwindcss";'),
							c(
								'<button class="rounded bg-blue-500 px-4 py-2 font-semibold text-white">\n  Save\n</button>',
							),
							p(
								"Spacing uses a scale where 1 unit is 0.25rem, so px-4 is 1rem of horizontal padding and py-2 is 0.5rem of vertical padding. Layout utilities map to the CSS you already know:",
							),
							c(
								'<div class="flex items-center justify-between gap-4">\n  <span>Left</span>\n  <span>Right</span>\n</div>',
							),
						],
					},
					{
						title: "Variants and responsive design",
						blocks: [
							p(
								"Prefix a class to apply it only in a state or on a screen size. hover:, focus: and dark: handle states and themes. Size prefixes like md: and lg: are mobile-first, so a class without a prefix applies everywhere and a prefixed class applies from that width up.",
							),
							c(
								'<a class="bg-blue-500 hover:bg-blue-600 focus:ring-2">Link</a>\n\n<div class="flex flex-col gap-4 md:flex-row">\n  <div class="w-full md:w-1/2">One</div>\n  <div class="w-full md:w-1/2">Two</div>\n</div>',
							),
							p(
								"For one-off values use square brackets, such as w-[320px]. To add your own design tokens, declare them in a theme block, which then creates matching classes:",
							),
							c(
								"@theme {\n  --color-brand: #a2d5c6;\n}\n/* now you can write bg-brand and text-brand */",
							),
							p(
								"If a long list of classes repeats, extract a component in your framework rather than reaching for custom CSS.",
							),
						],
					},
				],
				quiz: [
					{
						prompt:
							"Which classes give a button 1rem of horizontal padding and 0.5rem of vertical padding?",
						options: ["p-4", "px-4 py-2", "pad-x-4 pad-y-2", "px-2 py-4"],
						answer: 1,
						explanation:
							"px sets horizontal padding and py sets vertical. Each unit is 0.25rem, so 4 is 1rem and 2 is 0.5rem.",
					},
					{
						prompt:
							"Which classes place items in a row, vertically centered, with space between them?",
						options: [
							"row center gap-4",
							"flex items-center gap-4",
							"flex align-center margin-4",
							"display-flex center gap-4",
						],
						answer: 1,
						explanation:
							"flex starts a flex container, items-center centers across the axis, and gap-4 adds space.",
					},
					{
						prompt:
							"Which class darkens the background only while the mouse is over an element?",
						options: [
							"on-hover:bg-blue-600",
							"bg-blue-600:hover",
							"hover:bg-blue-600",
							"bg-hover-blue-600",
						],
						answer: 2,
						explanation:
							"State variants are written as a prefix: hover:bg-blue-600.",
					},
					{
						prompt:
							"Stack two boxes on mobile and place them side by side from the md breakpoint up. Which container works?",
						options: [
							"flex md:flex-col",
							"flex flex-col md:flex-row",
							"flex-row md:flex",
							"md:flex flex-col",
						],
						answer: 1,
						explanation:
							"Unprefixed classes are the mobile default. md:flex-row takes over from the md breakpoint upward.",
					},
				],
			},
		],
	},

	// ───────────────────────────── JavaScript ─────────────────────────────
	{
		slug: "javascript",
		name: "JavaScript",
		level: "Beginner to intermediate",
		summary:
			"Add behavior to your pages, handle async data, and take your first steps with React.",
		floors: [
			{
				title: "Fundamentals",
				summary: "Variables, conditions, arrays, functions and the DOM.",
				lessons: [
					{
						title: "Variables, types and conditions",
						blocks: [
							p(
								"JavaScript makes pages interactive. Use const for values that will not be reassigned and let for values that will. The main types are string, number, boolean, null, undefined, object and array.",
							),
							c(
								"const name = 'Ada';\nlet visits = 0;\nvisits = visits + 1;\ntypeof visits; // 'number'",
							),
							p(
								"Compare with === and !==, not ==. Combine conditions with && (and), || (or) and ! (not).",
							),
							c(
								"if (visits === 1) {\n  console.log('Welcome');\n} else {\n  console.log('Welcome back');\n}",
							),
						],
					},
					{
						title: "Arrays, objects and loops",
						blocks: [
							p(
								"An array is an ordered list and starts at index 0. An object groups values under named keys.",
							),
							c(
								"const skills = ['HTML', 'CSS', 'JS'];\nskills[0];       // 'HTML'\nskills.push('Git');\n\nconst user = { name: 'Ada', age: 36 };\nuser.name;       // 'Ada'",
							),
							p(
								"Loop with for...of, or use array methods. map builds a new array from each item, and filter keeps items that pass a test. Neither changes the original.",
							),
							c(
								"for (const s of skills) console.log(s);\n\nconst lower = skills.map((s) => s.toLowerCase());\nconst short = skills.filter((s) => s.length <= 3);",
							),
						],
					},
					{
						title: "Functions and the DOM",
						blocks: [
							p(
								"A function is reusable code. It takes parameters and gives back a value with return. Arrow functions are a shorter form.",
							),
							c(
								"function greet(name) {\n  return 'Hi ' + name;\n}\nconst greet2 = (name) => 'Hi ' + name;",
							),
							p(
								"The DOM is the browser's live version of your HTML. Select an element, change it, and react to events.",
							),
							c(
								"const button = document.querySelector('#btn');\nconst title = document.querySelector('h1');\n\nbutton.addEventListener('click', () => {\n  title.textContent = 'You clicked!';\n});",
							),
						],
					},
				],
				quiz: [
					{
						code: "const name = 'Ada';\nlet visits = 0;",
						prompt: "What does typeof visits return?",
						options: ["'string'", "'number'", "'boolean'", "'undefined'"],
						answer: 1,
						explanation: "0 is a number, so typeof gives 'number'.",
					},
					{
						code: "let visits = 0;",
						prompt:
							'Show "Welcome" on the first visit and "Welcome back" afterwards. Which is correct?',
						options: [
							"if (visits = 0) { show('Welcome'); } else { show('Welcome back'); }",
							"if (visits === 0) { show('Welcome'); } else { show('Welcome back'); }",
							"if visits === 0 { show('Welcome'); } else { show('Welcome back'); }",
							"if (visits === 0) show('Welcome') otherwise show('Welcome back');",
						],
						answer: 1,
						explanation:
							"Use === to compare. A single = assigns a value instead.",
					},
					{
						code: "const skills = ['HTML', 'CSS', 'JS'];",
						prompt: "What does skills.map((s) => s.toLowerCase()) return?",
						options: [
							"'html css js'",
							"The same array, changed in place",
							"A new array: ['html', 'css', 'js']",
							"undefined",
						],
						answer: 2,
						explanation:
							"map builds a new array and leaves the original unchanged.",
					},
					{
						code: "function greet(name) {\n  return 'Hi ' + name;\n}",
						prompt: "Which arrow function is equivalent?",
						options: [
							"const greet = (name) => 'Hi ' + name;",
							"const greet = name -> 'Hi ' + name;",
							"const greet = () => { 'Hi ' + name; };",
							"arrow greet(name) = 'Hi ' + name;",
						],
						answer: 0,
						explanation:
							"A single expression after => is returned automatically.",
					},
					{
						code: '<h1 id="title">Ada</h1>\n<button id="btn">Greet</button>',
						prompt:
							"Make the heading say Hello! when the button is clicked. Which is correct?",
						options: [
							"document.querySelector('#btn').onclick = 'Hello!';",
							"document.querySelector('#btn').addEventListener('click', () => {\n  document.querySelector('#title').textContent = 'Hello!';\n});",
							"document.querySelector('btn').addEventListener(click, () => { title = 'Hello!'; });",
							"addEventListener('#btn', 'click', 'Hello!');",
						],
						answer: 1,
						explanation:
							"Find the element, listen for the event with a function, and update textContent inside it.",
					},
				],
			},
			{
				title: "Promises",
				summary:
					"Handle code that takes time: promises, async/await and fetching data.",
				lessons: [
					{
						title: "Promises",
						blocks: [
							p(
								"Some tasks take time, such as loading data. JavaScript keeps running while it waits, and the task returns a promise: an object that will hold a result later.",
							),
							p(
								"A promise is pending, then either fulfilled with a value or rejected with an error. Use then for success and catch for failure. Calls can be chained, because each then returns a new promise.",
							),
							c(
								"fetch('/api/user')\n  .then((res) => res.json())\n  .then((user) => console.log(user.name))\n  .catch((err) => console.error(err));",
							),
							p("You can create your own promise too:"),
							c(
								"const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nwait(1000).then(() => console.log('One second passed'));",
							),
						],
					},
					{
						title: "async/await and fetch",
						blocks: [
							p(
								"async and await let you write promise code in a straight line. An async function always returns a promise, and await pauses inside it until a promise settles.",
							),
							c(
								"async function loadUser() {\n  try {\n    const res = await fetch('/api/user');\n    if (!res.ok) throw new Error('Request failed: ' + res.status);\n    return await res.json();\n  } catch (error) {\n    console.error(error);\n  }\n}",
							),
							p(
								"fetch only rejects when the network fails, so check res.ok for server errors yourself. To run independent requests at the same time, use Promise.all:",
							),
							c(
								"const [user, posts] = await Promise.all([\n  fetch('/api/user').then((r) => r.json()),\n  fetch('/api/posts').then((r) => r.json()),\n]);",
							),
						],
					},
				],
				quiz: [
					{
						prompt: "What does fetch(url) return right away?",
						options: [
							"The response data",
							"A Promise",
							"A string of JSON",
							"undefined",
						],
						answer: 1,
						explanation:
							"fetch returns a promise that settles when the response arrives.",
					},
					{
						prompt: "Which chain parses JSON, uses it, and handles any error?",
						options: [
							"fetch(url).then((res) => res.json()).then((data) => show(data)).catch((err) => console.error(err));",
							"fetch(url).catch((res) => res.json()).then((data) => show(data));",
							"fetch(url).json().then(show).error(console.error);",
							"fetch(url).then(show(res.json())).catch(console.error);",
						],
						answer: 0,
						explanation:
							"Each then receives the previous result, and catch handles a rejection anywhere in the chain.",
					},
					{
						prompt: "Where can you use the await keyword?",
						options: [
							"Anywhere in any function",
							"Inside an async function (or a module's top level)",
							"Only inside catch blocks",
							"Only inside setTimeout",
						],
						answer: 1,
						explanation:
							"await pauses an async function. A regular function cannot use it.",
					},
					{
						code: "async function loadUser() {\n  const res = await fetch('/api/user');\n  // ?\n}",
						prompt:
							"Read the response as JSON and handle failed requests. Which is best?",
						options: [
							"const data = res.json();",
							"if (!res.ok) throw new Error('Failed'); const data = await res.json();",
							"const data = JSON(res);",
							"const data = await res.text().json();",
						],
						answer: 1,
						explanation:
							"Check res.ok for server errors, then await res.json(), since it returns a promise.",
					},
				],
			},
			{
				title: "React",
				summary:
					"Build interfaces from components with JSX, props, state and effects.",
				lessons: [
					{
						title: "Components, JSX and props",
						blocks: [
							p(
								"React builds a page from components: functions that return JSX, a syntax that looks like HTML inside JavaScript. A component name starts with a capital letter and must return one root element.",
							),
							c(
								'function Greeting({ name }) {\n  return <h1 className="title">Hello, {name}!</h1>;\n}\n\n<Greeting name="Ada" />',
							),
							p(
								"Differences from HTML: use className instead of class, close every tag, and put JavaScript expressions in curly braces. Props are the inputs a component receives. To render a list, map over an array and give each item a unique key.",
							),
							c(
								"function Skills({ items }) {\n  return (\n    <ul>\n      {items.map((s) => <li key={s}>{s}</li>)}\n    </ul>\n  );\n}",
							),
						],
					},
					{
						title: "State and effects",
						blocks: [
							p(
								"State is data that changes over time. useState returns the current value and a function to update it. Calling the setter re-renders the component. Never change state directly.",
							),
							c(
								"import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}",
							),
							p(
								"useEffect runs code after rendering, such as fetching data. The dependency array controls when: an empty array runs once after the first render.",
							),
							c(
								"import { useEffect, useState } from 'react';\n\nfunction Profile() {\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    fetch('/api/user')\n      .then((res) => res.json())\n      .then(setUser);\n  }, []);\n\n  return <p>{user ? user.name : 'Loading...'}</p>;\n}",
							),
						],
					},
				],
				quiz: [
					{
						prompt: "Which is a valid React component?",
						options: [
							"function welcome() { return <h1>Hello</h1>; }",
							"function Welcome() { return <h1>Hello</h1>; }",
							"function Welcome() { <h1>Hello</h1>; }",
							"const Welcome = <h1>Hello</h1>();",
						],
						answer: 1,
						explanation:
							"Component names start with a capital letter and the function must return JSX.",
					},
					{
						code: "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}",
						prompt: "Which line renders Hello, Ada! using this component?",
						options: [
							'<Greeting name="Ada" />',
							'<greeting name="Ada" />',
							'Greeting("Ada")',
							'<Greeting>{name: "Ada"}</Greeting>',
						],
						answer: 0,
						explanation:
							"Use the component like a tag and pass props as attributes.",
					},
					{
						code: "const [count, setCount] = useState(0);",
						prompt: "Which handler correctly adds one to the count?",
						options: [
							"onClick={() => count++}",
							"onClick={() => setCount(count + 1)}",
							"onClick={setCount(count + 1)}",
							"onClick={() => count = count + 1}",
						],
						answer: 1,
						explanation:
							"Update state through the setter so React re-renders. The setter is called inside a function so it runs on click, not during render.",
					},
					{
						prompt:
							"Which useEffect fetches data once, after the first render?",
						options: [
							"useEffect(() => { load(); });",
							"useEffect(() => { load(); }, []);",
							"useEffect(() => { load(); }, [load, load]);",
							"useEffect(load());",
						],
						answer: 1,
						explanation:
							"An empty dependency array means the effect runs once after the first render. With no array it runs after every render.",
					},
				],
			},
		],
	},
];

export const getTower = (slug: string) => towers.find((t) => t.slug === slug);
export const floorKey = (slug: string, index: number) => `${slug}:${index}`;
export const isFloorCleared = (t: Tower, i: number, climbed: string[]) =>
	climbed.includes(floorKey(t.slug, i));
export const isFloorUnlocked = (t: Tower, i: number, climbed: string[]) =>
	i === 0 || isFloorCleared(t, i - 1, climbed);
export const clearedCount = (t: Tower, climbed: string[]) =>
	t.floors.filter((_, i) => isFloorCleared(t, i, climbed)).length;
export const isTowerCleared = (t: Tower, climbed: string[]) =>
	clearedCount(t, climbed) === t.floors.length;
