# Input Field

Customisable input field with a field wrapper

![](./readmeIMG/2023-02-17-15-25-48.png)

## Props

```js
interface Props {
  type?: "text" | "email" | "password" | "range" | "number";
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>;
  required?: boolean;
  error?: FieldError;
  errorClassName?: string;
  value?: string;
  name?: string;
  step?: number;
  min?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (e: any) => void;
}
```

## Example

```js
<InputField
  required
  type="text"
  registration={{ ...register("firstName") }}
  error={errors.firstName as FieldError}
  className="bg-white/25 focus:border-white text-white"
/>
```
