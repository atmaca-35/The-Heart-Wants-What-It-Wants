let wordList = {};

fetch('vocabulary.txt')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        lines.forEach(line => {
            const [key, value] = line.split(':');
            if (key && value) {
                wordList[key.trim()] = value.trim();
            }
        });

        showRandomWords();
    });

const input = document.getElementById('searchInput');
const result = document.getElementById('result');

input.addEventListener('input', () => {
    const allowedChars = /^[aâbcçdeéfgğhıiîjklmnŋoöprsştuüûvyz]*$/;
    let query = input.value.toLocaleLowerCase('tr');

    if (!allowedChars.test(query)) {
        input.value = query.replace(/[^aâbcçdeéfgğhıiîjklmnŋoöprsştuüûvyz]/g, '');
    } else {
        input.value = query;
    }

    result.innerHTML = '';

    if (input.value) {
        const matches = Object.keys(wordList)
            .filter(key => key.includes(input.value))
            .sort((a, b) => a.indexOf(input.value) - b.indexOf(input.value))
            .slice(0, 5);

        if (matches.length > 0) {
            matches.forEach((match, index) => {
                const meaning = wordList[match];
                const matchHtml = `Yad kökenli <span class="emphasis">${match}</span> sözünün Öz Türkçedeki deŋi <span class="emphasis">${meaning}</span> idir.`;
                const div = document.createElement('div');
                div.innerHTML = matchHtml;
                div.style.marginBottom = '10px';
                result.appendChild(div);

                if (index < matches.length - 1) {
                    const separator = document.createElement('div');
                    separator.textContent = '•••';
                    separator.style.textAlign = 'center';
                    separator.style.margin = '10px 0';
                    separator.style.color = '#f0f0f0';
                    result.appendChild(separator);
                }
            });
        } else {
            result.innerHTML = 'Ana Türkçe (Proto-Turkic) çıkışlı sözcükleri geçmişlerini eşelediğimiz <span class="emphasis">köken sözlüğümüze</span> de göz atmayı unutmayın!';
        }
    } else {
        showRandomWords();
    }
});

function showRandomWords() {
    result.innerHTML = '';
    const keys = Object.keys(wordList);
    const randomWords = keys
        .sort(() => Math.random() - 0.5)
        .slice(0, 7);

    randomWords.forEach((randomKey, index) => {
        const meaning = wordList[randomKey];
        const matchHtml = `Yad kökenli <span class="emphasis">${randomKey}</span> sözünün Öz Türkçedeki deŋi <span class="emphasis">${meaning}</span> idir.`;
        const div = document.createElement('div');
        div.innerHTML = matchHtml;
        div.style.marginBottom = '10px';
        result.appendChild(div);

        if (index < randomWords.length - 1) {
            const separator = document.createElement('div');
            separator.textContent = '•••';
            separator.style.textAlign = 'center';
            separator.style.margin = '10px 0';
            separator.style.color = '#f0f0f0';
            result.appendChild(separator);
        }
    });
}