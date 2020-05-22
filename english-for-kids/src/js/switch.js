export const createSwitch = () => {
  const switchContainer = document.querySelector('.header-wrap');
  const switchDiv = document.createElement('div');
  switchDiv.className = 'mode-switch';

  switchDiv.innerHTML += `
    <input type="checkbox" name="mode-switch" class="mode-switch-checkbox" id="id-mode-switch" checked>
    <label class="mode-switch-label" for="id-mode-switch">
        <span class="mode-switch-train"></span>
        <span class="mode-switch-play"></span>
    </label>
  `;
  switchContainer.append(switchDiv);
  return switchContainer;
};
