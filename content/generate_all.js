const { getSignals } = require('../signals/signal_generator');
const { generateContent } = require('./content_generator');

async function generateAll() {
  const signals = getSignals();
  for (const signal of signals) {
    const content = await generateContent(signal);
    console.log(content);
  }
}

generateAll();
