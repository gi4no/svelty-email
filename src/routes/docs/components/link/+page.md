# Link

A hyperlink to web pages, email addresses, or anything else a URL can address.

## Usage

```svelte
<script>
	import { Link } from 'svelte-email';
</script>

<Link href="https://svelte.dev">Svelte</Link>
```

## Props

| Name     | Type     | Required | Default  | Description                      |
| -------- | -------- | -------- | -------- | -------------------------------- |
| `href`   | `string` | `true`   |          | The URL to link to               |
| `target` | `string` | `false`  | `_blank` | The target attribute of the link |
