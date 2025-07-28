document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('Get3Words');
  const resultDiv = document.getElementById('result');
  const wordsP = document.getElementById('words');
  const headerDiv = document.getElementById('header');
  const footerDiv = document.getElementById('footer');

  // Load header and footer
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      headerDiv.innerHTML = data;
    });

  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      footerDiv.innerHTML = data;
    });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const wordOne = document.getElementById('wordOne').value;
    const wordTwo = document.getElementById('wordTwo').value;
    const wordThree = document.getElementById('wordThree').value;

    wordsP.textContent = `${wordOne} ${wordTwo} ${wordThree}`;

    form.style.display = 'none';
    resultDiv.style.display = 'block';
  });
});
