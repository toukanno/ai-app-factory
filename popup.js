const toggle = document.getElementById("toggle");

toggle.addEventListener("change", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: "toggle",
      enabled: toggle.checked,
    });
  }
});
