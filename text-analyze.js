document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const statusIndicator = document.getElementById('statusIndicator');

    const pronouns = [
        "i", "me", "my", "mine", "myself",
        "you", "your", "yours", "yourself", "yourselves",
        "he", "him", "his", "himself",
        "she", "her", "hers", "herself",
        "it", "its", "itself",
        "we", "us", "our", "ours", "ourselves",
        "they", "them", "their", "theirs", "themselves",
        "this", "that", "these", "those",
        "who", "whom", "whose", "which", "what"
    ];

    const prepositions = [
        "about", "above", "across", "after", "against", "along", "among", "around",
        "at", "before", "behind", "below", "beneath", "beside", "between", "beyond",
        "by", "despite", "down", "during", "except", "for", "from", "in", "inside",
        "into", "like", "near", "of", "off", "on", "onto", "out", "outside", "over",
        "past", "since", "through", "throughout", "to", "toward", "towards", "under",
        "underneath", "until", "up", "upon", "with", "within", "without"
    ];

    const articles = ["a", "an"];

    textInput.addEventListener('input', () => {
        statusIndicator.classList.add('active');
        analyzeText(textInput.value);
        setTimeout(() => statusIndicator.classList.remove('active'), 300);
    });

    function analyzeText(text) {
        if (!text.trim()) {
            resetResults();
            return;
        }

        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        const wordsArray = text.trim().split(/\s+/);
        const wordCount = wordsArray.length;
        const spaceCount = (text.match(/\s/g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;
        const symbolCount = (text.match(/[^\w\s\n]/g) || []).length;

        document.getElementById('basicStats').innerHTML = `
            <p><strong>Letters:</strong> ${letters}</p>
            <p><strong>Words:</strong> ${wordCount}</p>
            <p><strong>Spaces:</strong> ${spaceCount}</p>
            <p><strong>Newlines:</strong> ${newlineCount}</p>
            <p><strong>Special Symbols:</strong> ${symbolCount}</p>
        `;

        const cleanedWords = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);

        showWordCounts('pronounsCount', countWords(pronouns, cleanedWords));
        showWordCounts('prepositionsCount', countWords(prepositions, cleanedWords));
        showWordCounts('articlesCount', countWords(articles, cleanedWords));
    }

    function countWords(group, words) {
        const counts = {};
        group.forEach(word => counts[word] = 0);
        words.forEach(word => { if (counts.hasOwnProperty(word)) counts[word]++; });
        return counts;
    }

    function showWordCounts(containerId, wordCounts) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        const entries = Object.entries(wordCounts).filter(([_, count]) => count > 0);

        if (entries.length === 0) {
            container.innerHTML = '<div class="empty-state">None detected in the text</div>';
            return;
        }

        entries.sort((a, b) => b[1] - a[1]);

        entries.forEach(([word, count]) => {
            const div = document.createElement('div');
            div.className = 'word-count-item';
            div.innerHTML = `<span class="word">${word}</span> <span class="count">${count}</span>`;
            container.appendChild(div);
        });
    }

    function resetResults() {
        document.getElementById('basicStats').innerHTML = '<div class="empty-state">Enter some text to begin analysis</div>';
        ['pronounsCount', 'prepositionsCount', 'articlesCount'].forEach(id => {
            document.getElementById(id).innerHTML = `<div class="empty-state">No ${id.replace('Count', '').toLowerCase()} detected yet</div>`;
        });
    }
});
