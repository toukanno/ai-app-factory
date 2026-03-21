(() => {
  "use strict";

  let enabled = true;
  let tooltip = null;
  let highlight = null;

  // ---------------------------------------------------------------------------
  // DOM helpers
  // ---------------------------------------------------------------------------

  function createTooltip() {
    const el = document.createElement("div");
    el.id = "css-inspector-tooltip";
    document.documentElement.appendChild(el);
    return el;
  }

  function createHighlight() {
    const el = document.createElement("div");
    el.id = "css-inspector-highlight";
    document.documentElement.appendChild(el);
    return el;
  }

  function ensureElements() {
    if (!tooltip || !tooltip.isConnected) tooltip = createTooltip();
    if (!highlight || !highlight.isConnected) highlight = createHighlight();
  }

  // ---------------------------------------------------------------------------
  // Formatting
  // ---------------------------------------------------------------------------

  function shorthand(top, right, bottom, left) {
    if (top === right && right === bottom && bottom === left) return top;
    if (top === bottom && right === left) return `${top} ${right}`;
    if (right === left) return `${top} ${right} ${bottom}`;
    return `${top} ${right} ${bottom} ${left}`;
  }

  function buildHTML(target) {
    const cs = window.getComputedStyle(target);
    const rect = target.getBoundingClientRect();

    const tag = target.tagName.toLowerCase();
    const id = target.id ? `#${target.id}` : "";
    const cls = target.classList.length
      ? `.${[...target.classList].slice(0, 3).join(".")}`
      : "";

    const margin = shorthand(
      cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft
    );
    const padding = shorthand(
      cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft
    );
    const fontSize = cs.fontSize;
    const width = `${Math.round(rect.width)}px`;
    const height = `${Math.round(rect.height)}px`;

    const rows = [
      ["margin", margin],
      ["padding", padding],
      ["font-size", fontSize],
      ["size", `${width} × ${height}`],
    ];

    const rowsHTML = rows
      .map(
        ([label, value]) =>
          `<div class="inspector-row">
            <span class="inspector-label">${label}</span>
            <span class="inspector-value">${value}</span>
          </div>`
      )
      .join("");

    return `<div class="inspector-tag">${tag}${id}${cls}</div>${rowsHTML}`;
  }

  // ---------------------------------------------------------------------------
  // Positioning
  // ---------------------------------------------------------------------------

  function positionTooltip(event) {
    if (!tooltip) return;

    const gap = 12;
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = event.clientX + gap;
    let y = event.clientY + gap;

    if (x + tw > vw) x = event.clientX - tw - gap;
    if (y + th > vh) y = event.clientY - th - gap;

    x = Math.max(4, x);
    y = Math.max(4, y);

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  function positionHighlight(target) {
    if (!highlight) return;
    const rect = target.getBoundingClientRect();
    highlight.style.left = `${rect.left}px`;
    highlight.style.top = `${rect.top}px`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
  }

  // ---------------------------------------------------------------------------
  // Event handlers
  // ---------------------------------------------------------------------------

  function onMouseMove(event) {
    if (!enabled) return;

    const target = event.target;
    if (
      !target ||
      target === tooltip ||
      target === highlight ||
      target === document.documentElement ||
      target === document.body
    ) {
      return;
    }

    ensureElements();

    tooltip.innerHTML = buildHTML(target);
    tooltip.classList.add("visible");
    positionTooltip(event);
    positionHighlight(target);
    highlight.style.display = "block";
  }

  function onMouseOut(event) {
    if (
      event.relatedTarget === null ||
      event.relatedTarget === document.documentElement
    ) {
      hideOverlay();
    }
  }

  function hideOverlay() {
    if (tooltip) tooltip.classList.remove("visible");
    if (highlight) highlight.style.display = "none";
  }

  // ---------------------------------------------------------------------------
  // Toggle via message from popup
  // ---------------------------------------------------------------------------

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "toggle") {
      enabled = msg.enabled;
      if (!enabled) hideOverlay();
    }
    if (msg.type === "getState") {
      return enabled;
    }
  });

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  document.addEventListener("mousemove", onMouseMove, true);
  document.addEventListener("mouseout", onMouseOut, true);
})();
