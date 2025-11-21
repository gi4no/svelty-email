# Heading

A block of heading text.

## Usage

```svelte
<script>
	import { Heading } from 'svelte-email';
</script>

<Heading as="h1">Hello world</Heading>
```

## Props

| Name | Type     | Required | Default | Description                                                           |
| ---- | -------- | -------- | ------- | --------------------------------------------------------------------- |
| `as` | `string` | `true`   | `h1`    | Render component as <br>`h1`, `h2`, `h3`, `h4`, `h5`, `h6`            |
| `m`  | `string` | `false`  |         | A shortcut for the<br>`margin` CSS property                           |
| `mx` | `string` | `false`  |         | A shortcut for the<br>`margin-left` and `margin-right` CSS properties |
| `my` | `string` | `false`  |         | A shortcut for the<br>`margin-top` and `margin-bottom` CSS properties |
| `mt` | `string` | `false`  |         | A shortcut for the<br>`margin-top` CSS property                       |
| `mr` | `string` | `false`  |         | A shortcut for the<br>`margin-right` CSS property                     |
| `mb` | `string` | `false`  |         | A shortcut for the<br>`margin-bottom` CSS property                    |
| `ml` | `string` | `false`  |         | A shortcut for the<br>`margin-left` CSS property                      |
