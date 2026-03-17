const input = document.getElementById('input');
const output = document.getElementById('output');

document.getElementById('encode').addEventListener('click', () => {
  output.textContent = btoa(unescape(encodeURIComponent(input.value)));
});

document.getElementById('decode').addEventListener('click', () => {
  try {
    output.textContent = decodeURIComponent(escape(atob(input.value)));
  } catch (error) {
    output.textContent = `Decode error: ${error.message}`;
  }
});
