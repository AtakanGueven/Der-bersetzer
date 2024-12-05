document.getElementById('translate-button').addEventListener('click', () => {
    const text = document.getElementById('input-text').value;
    const targetLanguage = document.getElementById('language-select').value;

    if (text.trim() === '') {
        alert('Bitte gib den Text ein, der übersetzt werden soll.');
        return;
    }

    translateText(text, targetLanguage);
});

function translateText(text, targetLanguage) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`;

    console.log(`API-Anfrage: ${apiUrl}`); // Debugging-Ausgabe für die API-Anfrage

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API-Antwort:', data); // Debugging-Ausgabe für die API-Antwort

            if (data.responseData && data.responseData.translatedText) {
                document.getElementById('translation-output').textContent = data.responseData.translatedText;
            } else {
                document.getElementById('translation-output').textContent = 'Übersetzung fehlgeschlagen. Bitte versuche es erneut.';
            }
        })
        .catch(error => {
            console.error('Fehler:', error);
            alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
        });
}

// Optional: Unterstützung für Enter-Taste hinzufügen
document.getElementById('input-text').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Verhindert den Zeilenumbruch
        document.getElementById('translate-button').click();
    }
});
