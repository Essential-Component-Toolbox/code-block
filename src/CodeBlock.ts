import { css, html, LitElement, svg } from 'lit';
import { property } from 'lit/decorators.js';

export class CodeBlock extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .code-block-wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: #1e2329;
      color: white;
      padding: 0px 12px;
      border-style: solid;
      border-color: white;
      border-width: 1px;
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

  @property({ type: Boolean, attribute: 'copy-alert', reflect: true }) copyAlert = false;

  @property({ type: Boolean, attribute: 'dependency-alert', reflect: true }) dependencyAlert = false;


  _copyToClipboard() {
    if (this.allowCopy) {
      const text = this.innerText;
      navigator.clipboard.writeText(text);
      if (this.copyAlert) alert(`Copied text to clipboard!`);
    }
  }

  _handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._copyToClipboard();
      e.preventDefault();
      this._mimicActiveCSS(e);
    }
  }

  _mimicActiveCSS(e: KeyboardEvent) {
    const img = e.target as HTMLImageElement;
    console.log(img);
    img.classList.add('active-mimic');
    setTimeout(() => img.classList.remove('active-mimic'), 1000);
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
