import { css, html, LitElement } from 'lit';
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

    :host([allow-copy]) .code-block-wrapper:hover, :host([allow-copy]) .code-block-wrapper:focus {
      cursor: pointer;
      background-color: #2e2e2e;
      border-width: 2px;
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
    }
  }

  render() {
    return html`
      <div class="code-block-wrapper" @click=${this._copyToClipboard} @keypress=${this._handleKeyPress} tabindex="0">
        <p><slot></slot></p>
      </div>
    `;
  }
}
