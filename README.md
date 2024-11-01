# \<code-block>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i @htmlplusplus/code-block
```

## Import

### HTML

```html
<!-- Import into HTML -->
<script type="module">
  import '@htmlplusplus/code-block/code-block.js';
</script>

<!-- OR -->
<script type="module" src="@htmlplusplus/code-block/code-block.js"></script>

<!-- Place the below tag into your HTML -->
<code-block></code-block>
```

### JavaScript / TypeScript

```JavaScript
// import into an existing JS module / web component
import '@htmlplusplus/code-block/code-block.js';
```

## Usage

### Attributes

```HTML
<!-- Will enable a "Copy" button on the right side of the component, 
 which will copy component contents to clipboard -->
<code-block allow-copy></code-block>

<!-- Border will be white instead of gray -->
<code-block dark-mode></code-block>
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
