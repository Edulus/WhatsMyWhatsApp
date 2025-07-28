document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('Get3Words');
  const resultDiv = document.getElementById('result');
  const numberP = document.getElementById('number');
  const qrCodeImg = document.getElementById('qrCode');
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

    numberP.textContent = '+44 773 0751 925';
    qrCodeImg.src = 'assets/QR_Code.png';

    form.style.display = 'none';
    resultDiv.style.display = 'block';
  });
});
