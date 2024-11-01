import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class CodeBlock extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      --theme-border-color: #88887a;
    }

    :host([dark-mode]) {
      --theme-border-color: white;
    }

    .code-block-wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: #1e2329;
      color: white;
      padding: 0px 12px;
      border-style: solid;
      border-color: var(--theme-border-color);
      border-width: 2px;
      border-radius: 8px;
      font-size: 16px;
      font-family: monospace;
    }

    .copy-wrapper {
      width: 36px;
      margin-left: 16px;
    }

    :host([allow-copy]) .copy-wrapper:hover, :host([allow-copy]) .copy-wrapper:focus-visible {
      cursor: pointer;
      border-style: solid;
      border-width: 1px;
      width: 34px;
    }

    :host([allow-copy]) .copy-wrapper:active {
      border-width: 2px;
      width: 32px;
    }

    .active-mimic {
      border-width: 2px;
      width: 32px;
    }

    .copy-icon {
      pointer-events: none; /* TODO bug still technically getting dragged, causes weird shape issues */
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }
  `;

  @property({ type: Boolean, attribute: 'allow-copy', reflect: true }) allowCopy = false;
  @property({ type: Boolean, attribute: 'dark-mode', reflect: true }) darkMode = false;

  _copyToClipboard() {
    if (this.allowCopy) {
      const text = this.innerText;
      navigator.clipboard.writeText(text);
      this._changeIcon();
    }
  }

  _handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._copyToClipboard();
      e.preventDefault();
      this._mimicActiveCSS(e);
    }
  }

  // TODO for some reason something is not working here for allowing the .active-mimic to work :(
  _mimicActiveCSS(e: KeyboardEvent) {
    const img = e.target as HTMLImageElement;
    console.log(img);
    img.classList.add('active-mimic');
    setTimeout(() => img.classList.remove('active-mimic'), 1000);
  }

  _changeIcon() {
    const img = this.shadowRoot?.querySelector('img') as HTMLImageElement;
    img.setAttribute('src', '../lib/check-icon.svg');
    setTimeout(() => img.setAttribute('src', '../lib/copy-icon.svg'), 1000);
  }

  render() {
    return html`
      <div class="code-block-wrapper">
        <p><slot></slot></p>
        ${this.allowCopy ? html`
          <div class="copy-wrapper" @click=${this._copyToClipboard} tabindex="0" @keypress=${this._handleKeyPress}>
            <img src="../lib/copy-icon.svg" alt="Copy Icon" class="copy-icon">
          </div>
        ` : ''}
      </div>
    `;
  }
}
