let currentLanguage = "en";

function translatePage(lang) {
  document.querySelector("h1").textContent = translations[lang].title;
  document.querySelector("label[for='last-period']").textContent = translations[lang].lastPeriod;
  document.querySelector("label[for='cycle-length']").textContent = translations[lang].cycleLength;
  document.querySelector("button[type='submit']").textContent = translations[lang].calculate;
  currentLanguage = lang;
}

document.getElementById('en-btn').addEventListener('click', () => translatePage('en'));
document.getElementById('es-btn').addEventListener('click', () => translatePage('es'));

document.getElementById('fertility-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const lastPeriod = new Date(document.getElementById('last-period').value);
  const cycleLength = parseInt(document.getElementById('cycle-length').value);
  const resultDiv = document.getElementById('result');
  
  if (isNaN(lastPeriod.getTime()) || isNaN(cycleLength)) {
    resultDiv.textContent = translations[currentLanguage].validData;
    resultDiv.classList.add('show');
    return;
  }

  const fertileStart = new Date(lastPeriod);
  fertileStart.setDate(fertileStart.getDate() + cycleLength - 18);

  const fertileEnd = new Date(lastPeriod);
  fertileEnd.setDate(fertileEnd.getDate() + cycleLength - 10);

  resultDiv.innerHTML = `
    ${translations[currentLanguage].result} <strong>${fertileStart.toLocaleDateString()}</strong> 
    ${translations[currentLanguage].to} <strong>${fertileEnd.toLocaleDateString()}</strong>.
  `;

  resultDiv.classList.add('show');
});
