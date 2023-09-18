# Spinner

Re-usable spinner component

![](./readmeIMG/2023-02-15-17-45-27.png)

## Props

```js
const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const variants = {
  light: "text-white",
  primary: "text-blue-600",
}

interface Props {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
}
```

## Example

```js
<Spinner size="sm" className="text-current" />
```
