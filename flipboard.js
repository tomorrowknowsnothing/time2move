const letters = "\u00A00123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let iteration = 0;
let foundLetters = [];

/**
 * Initializes the flipboard effect inside the specified element.
 * @param {string} targetText - The text to display with the animation.
 * @param {string} [elementId='flipboard'] - The ID of the HTML element to use.
 */
export function initFlipboardEffect(targetText, elementId = 'flipboard') {
  const span = document.getElementById(elementId);
  if (!span) {
    console.error(`Element with id "${elementId}" not found.`);
    return;
  }

  iteration = 0;
  foundLetters = [];
  span.textContent = '-'.repeat(targetText.length);

  startFlipboardEffect(targetText, span);
}

/**
 * Performs the flipboard animation.
 * @param {string} text - The target text.
 * @param {HTMLElement} span - The target element.
 */
function startFlipboardEffect(text, span) {
  const targetText = text.replace(/ /g, '\u00A0').toUpperCase();

  function animate() {
    let displayedText = '';

    for (let i = 0; i < targetText.length; i++) {
      if (foundLetters[i] !== targetText.charAt(i)) {
        foundLetters[i] = letters.charAt(iteration % letters.length);
      }
      displayedText += foundLetters[i];
    }

    span.textContent = displayedText;
    iteration++;

    if (iteration < letters.length) {
      setTimeout(animate, 50);
    }
  }

  animate();
}

