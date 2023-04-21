const idPergunta = document.getElementById('idPergunta');
const idResultado = document.getElementById('idResultado');

idPergunta.addEventListener('keypress', (e) => {
    if (idPergunta.value && e.key === 'Enter') SendQuestion();
});

const OPENAI_API_KEY = '';

function SendQuestion() {
    var sQuestion = idPergunta.value;

    fetch('https://api.openai.com/v1/completions', {
        method: 'POST', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', 
            Authorization: 'Bearer ' + OPENAI_API_KEY, 
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: sQuestion,
            "max-tokens": 2048,
            temperature: 0.5
        }),   
    })
        .then((response) => response.json())
        .then((json) => {
            if (idResultado.value) idResultado.value += '\n';

            if (json.error?.message) {
                idResultado.value += `Error: ${json.error.message}`;
            } else if (json.choices?.[0].text) {
                var text = json.choices[0].text || 'Sem Resposta';

                idResultado.value += "Chat GPT: " + text;
            }
            idResultado.scrollTop = idResultado.scrollHeight;  
        })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
            idPergunta.value = '';
            idPergunta.disabled = false;
            idPergunta.focus();
        });

    if (idResultado.value) idResultado.value += '\n\n\n';

    idResultado.value += `Eu: ${sQuestion}`;
    idPergunta.value = 'Carregando...';
    idPergunta.disabled = true;

    idResultado.scrollTop = idResultado.scrollHeight;
}  