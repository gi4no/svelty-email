# Button

A link that is styled to look like a button.

## Usage

```svelte
<script>
	import { Button } from 'svelte-email';
</script>

<Button href="https://example.com" style={{ color: '#61dafb' }}>Click me</Button>
```

## Props

| Name     | Type     | Required | Default  | Description                       |
| -------- | -------- | -------- | -------- | --------------------------------- |
| `href`   | `string` | `true`   |          | The URL to link to                |
| `style`  | `object` | `false`  |          | The CSS styles for the link       |
| `target` | `string` | `false`  | `_blank` | The target attribute for the link |
