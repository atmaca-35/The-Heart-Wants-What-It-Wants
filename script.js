let wordList = {};

// Kelime listesini dosyadan yükle
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

        showRandomWords(); // Başlangıçta rastgele kelimeleri göster
    });

const input = document.getElementById('searchInput');
const result = document.getElementById('result');

// Kullanıcı girişi için olay dinleyici
input.addEventListener('input', () => {
    const allowedChars = /^[aâbcçdeéfgğhıiîjklmnŋoöprsştuüûvyz]*$/; // Türkçe harfler için izin verilen karakterler
    let query = input.value.toLocaleLowerCase('tr');

    // Geçersiz karakterleri kaldır
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
                    // Ayrı bir div olarak separator oluştur
                    const separator = document.createElement('div');
                    separator.textContent = '•••';
                    separator.className = 'separator'; // CSS sınıfı ekleniyor
                    result.appendChild(separator);
                }
            });
        } else {
            result.innerHTML = 'Ana Türkçe (Proto-Turkic) çıkışlı sözcüklerin izini sürdüğümüz <span class="emphasis">köken sözlüğümüze</span> de göz atmayı unutmayın!';
        }
    } else {
        showRandomWords();
    }
});

// Rastgele kelimeleri gösterme işlevi
function showRandomWords() {
    result.innerHTML = '';
    const keys = Object.keys(wordList);
    const randomWords = keys
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    randomWords.forEach((randomKey, index) => {
        const meaning = wordList[randomKey];
        const matchHtml = `Yad kökenli <span class="emphasis">${randomKey}</span> sözünün Öz Türkçedeki deŋi <span class="emphasis">${meaning}</span> idir.`;
        const div = document.createElement('div');
        div.innerHTML = matchHtml;
        div.style.marginBottom = '10px';
        result.appendChild(div);

        if (index < randomWords.length - 1) {
            // Ayrı bir div olarak separator oluştur
            const separator = document.createElement('div');
            separator.textContent = '•••';
            separator.className = 'separator'; // CSS sınıfı ekleniyor
            result.appendChild(separator);
        }
    });
}
