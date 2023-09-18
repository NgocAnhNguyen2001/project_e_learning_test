# Text Area Field

Size adjustable text area input field

![](./readmeIMG/2023-02-17-16-43-27.png)

## Props

```js
type FieldWrapperProps = {
  label?: string,
  errorClassName?: string,
  error?: FieldError | undefined,
  description?: string,
};

type Props = FieldWrapperProps & {
  className?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
  background?: keyof typeof backgrounds;
  rows?: number;
};
```

## Example

```js
<TextAreaField
  placeholder="Enter your review..."
  registration={{ ...register("comment") }}
  background="white"
  rows={4}
  className="text-gray-500 rounded-xl"
/>
```
