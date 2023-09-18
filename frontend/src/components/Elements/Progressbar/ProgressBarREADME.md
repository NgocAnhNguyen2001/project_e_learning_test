# Progress Bar

Re-usable progress bar component

![](./readmeIMG/2023-02-15-17-33-07.png)

## Props

```js
interface Props {
  className?: string;
  barColorClassName?: string;
  percent: number;
  customColor?: string;
  showPercentage?: boolean;
}
```

## Example

```js
<Progressbar percent={80} customColor="#C042F1" />
```
