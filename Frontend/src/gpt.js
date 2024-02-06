const API_KEY = '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';

async function getCompletion(prompt) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY	
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await res.json();

    console.log(data);

    return data.choices[0].text;
}

const promptInput = document.querySelector('#prompt')
const button = document.querySelector('#generate')
const output = document.querySelector('#output')

button.addEventListener('click', async () => {
  if (!promptInput.value) return;

  const response = await getCompletion(promptInput.value);
  output.innerHTML = response;

});
