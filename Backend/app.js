const API_KEY = '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';

async function getCompletion() {
    const res = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY	
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt: "nombra un futbolista",
        max_tokens: 10,
        temperature: 0.9,
      })
    });

    const data = await res.json();
    console.log(data);
}

getCompletion();