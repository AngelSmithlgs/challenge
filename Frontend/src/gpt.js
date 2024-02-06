const apiKey = import.meta.env.VITE_OPENAI_API_KEY; //carehere

async function getCompletion(prompt) {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
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
  } catch (error) {
    console.error('Error:', error.message);
    return '';
  }
}
