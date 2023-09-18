# Feedback

Gives feedback to user with a message

![](./readmeIMG/2023.02.15-18_06_12.png)

## Props

```js
interface Props {
  title: string;
  subtitle?: string;
  type: "success" | "error";
  disableFeedback?: boolean;
  extraButton?: boolean;
  link?: string;
  buttonText?: string;
  onNext?: () => void;
}
```

## Example

```js
<Feedback
  title="There's an error!"
  subtitle="Unable to checkout item"
  type="error"
  disableFeedback={true}
/>
```
