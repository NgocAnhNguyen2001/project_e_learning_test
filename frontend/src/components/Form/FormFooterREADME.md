# Form Footer

Form Footer to provide confirmation and canceling buttons to a form

![](./readmeIMG/2023-02-17-15-24-12.png)

## Props

```js
interface Props {
  onCancel?: any;
  onSubmit?: any;
}
```

## Example

```js
<FormFooter
  onCancel={(): void => {
    router.back();
  }}
/>
```
