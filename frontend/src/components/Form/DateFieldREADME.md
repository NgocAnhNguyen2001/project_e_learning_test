# Date Field

Date picker field

![](./readmeIMG/2023-02-16-05-53-09.png)

## Props

```js
interface Props {
  label?: string;
  className?: string;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  fieldName: string;
}
```

## Example

```js
<DateField
  control={control}
  label="birthDate"
  fieldName="birthDate"
  setValue={setValue}
/>
```
