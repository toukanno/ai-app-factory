document.getElementById('run').addEventListener('click', () => {
  const pattern = document.getElementById('pattern').value;
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');
  try {
    const regex = new RegExp(pattern, 'g');
    const matches = input.match(regex) || [];
    output.textContent = JSON.stringify(matches, null, 2);
  } catch (error) {
    output.textContent = `Regex error: ${error.message}`;
  }
});
