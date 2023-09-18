# Card

Re-usable card component

![](./readmeIMG/2023-02-15-16-56-50.png)

## Props

```js
interface Props {
  children?: any;
  className?: string;
  border?: keyof typeof borders;
  rounded?: keyof typeof roundedness;
}
```

## Example

```js
<Card className="flex flex-col p-6 w-full col-span-1" key={product.id} >
```
