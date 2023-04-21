const id-pergunta = document.getElementById('id-pergunta');
const id-resultado = document.getElementById('id-resultado');

id-pergunta.addEventListener('keypress', (e) => {
    if(id-pergunta.value && e.key === 'Enter') SendQuestion();
});

const OPENAI_API_KEY = '';

function SendQuestion() {
    var sQueestion = id-pergunta.value;

    fetch('https://api.openai.com/v1/completions', {
        method: 'POST', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', 
            Authorization: 'Bearer ' + OPENAI_API_KEY, 
        },
        body: JSON.stringify(
            model: 'text-davinci-003',
            prompt: sQuestion,
            max-tokens: 2048,
            temperatue: 0.5
        ),   
    }
        .then((response) => response.json())
        .then((json) => {
            if (id-resultado.value) id-resultado.value += '\n';

            if (json.error?.message) {
                id-resultado.value += `Error: ${json.error.message}`;
            } else if (json.choice?.[0].text) {
                var text = json.choices[0].text || 'Sem Resposta';

                id-resultado.value += "Chat GPT: " + text;
            }
            id-resultado.scrollTop = id-scrollHeight;  
        })
        .catch((error)) => console.error('Error:', error))
        .finally(() => {
            id-pergunta.value = '';
            id=pergunta.disable = false;
            id-pergunta.focus();
        });
    

    if (id-resultado.value) id-resultado.value += '\n\n\n';

    id-resultado.value += `Eu: ${sQuestion}`;
    id-pergunta.value = 'Carregando...';
    id-pergunta.disable = true;

    id-resultado.scrollTop = id-resultado.scrollHeight;
} 
