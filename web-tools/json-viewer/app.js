document.getElementById('format').addEventListener('click', () => {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');
  try {
    output.textContent = JSON.stringify(JSON.parse(input), null, 2);
  } catch (error) {
    output.textContent = `JSON error: ${error.message}`;
  }
});
