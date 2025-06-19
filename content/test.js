const { generateContent } = require('./content_generator');

async function test() {
  const content = await generateContent('best travel pillow');
  console.log(content);
}

test();
