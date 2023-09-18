# Toggle Field

Switchable toggle field

![](./readmeIMG/2023-02-17-16-49-51.png)

## Props

```js
type FieldWrapperProps = {
  label?: string,
  errorClassName?: string,
  error?: FieldError | undefined,
  description?: string,
};

type Props = FieldWrapperProps & {
  label: string,
  control: Control<FieldValues, object>,
  setValue: UseFormSetValue<FieldValues>,
  setStatus?: any,
  description: string,
  fieldName: string,
  defaultValue?: boolean,
};
```

## Example

```js
<ToggleField
  control={control}
  setValue={setValue}
  label="notifications"
  fieldName="notifications"
  description="Notifications"
  defaultValue={false}
/>
```
