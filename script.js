const currencies = [
  { code: 'USD', name: 'Dólar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'COP', name: 'Peso Colombiano', flag: '🇨🇴' },
  { code: 'PEN', name: 'Sol Peruano', flag: '🇵🇪' },
  { code: 'CLP', name: 'Peso Chileno', flag: '🇨🇱' },
  { code: 'ARS', name: 'Peso Argentino', flag: '🇦🇷' },
  { code: 'BRL', name: 'Real Brasileño', flag: '🇧🇷' }
];

const rates = {
  USD: { EUR: 0.92, COP: 3900, PEN: 3.7, CLP: 910, ARS: 880, BRL: 5.2 },
  EUR: { USD: 1.09, COP: 4200, PEN: 4, CLP: 1000, ARS: 950, BRL: 5.5 },
  COP: { USD: 0.00026, EUR: 0.00024, PEN: 0.00095, CLP: 0.26, ARS: 0.23, BRL: 0.0013 },
  PEN: { USD: 0.27, EUR: 0.25, COP: 1050, CLP: 270, ARS: 240, BRL: 1.35 },
  CLP: { USD: 0.0011, EUR: 0.001, COP: 3.9, PEN: 0.0037, ARS: 0.91, BRL: 0.005 },
  ARS: { USD: 0.0011, EUR: 0.00105, COP: 4.4, PEN: 0.0042, CLP: 1.1, BRL: 0.0058 },
  BRL: { USD: 0.19, EUR: 0.18, COP: 770, PEN: 0.74, CLP: 200, ARS: 172 }
};

const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultText = document.getElementById('result');
const rateInfo = document.getElementById('rateInfo');
const darkModeSwitch = document.getElementById('darkModeSwitch');

currencies.forEach(c => {
  const optionFrom = document.createElement('option');
  optionFrom.value = c.code;
  optionFrom.textContent = `${c.flag} ${c.code} - ${c.name}`;
  fromSelect.appendChild(optionFrom);

  const optionTo = document.createElement('option');
  optionTo.value = c.code;
  optionTo.textContent = `${c.flag} ${c.code} - ${c.name}`;
  toSelect.appendChild(optionTo);
});

fromSelect.value = "USD";
toSelect.value = "EUR";

function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultText.textContent = "Ingresa una cantidad válida.";
    return;
  }

  if (from === to) {
    rateInfo.textContent = "Misma moneda seleccionada.";
    resultText.textContent = `${amount.toFixed(2)} ${to}`;
    return;
  }

  const rate = rates[from][to];
  const converted = amount * rate;

  rateInfo.textContent = `1 ${from} = ${rate} ${to}`;
  resultText.textContent = `${converted.toFixed(2)} ${to}`;
}

darkModeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

function swapCurrencies() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
}
