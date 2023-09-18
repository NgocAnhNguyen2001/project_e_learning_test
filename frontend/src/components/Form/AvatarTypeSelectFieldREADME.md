# Avatar Type Select Field

Avatar type dropdown for subcategory selecting

![](./readmeIMG/2023-02-16-05-24-05.png)

## Props

```js
type FieldWrapperPassThroughProps = {
  label?: string,
  errorClassName?: string,
  error?: FieldError | undefined,
  description?: string,
};

type Props = {
  options: Option[],
  className?: string,
  placeholder?: string,
  onChange: any,
  fieldName: string,
  defaultValue: any,
  isSearchable?: boolean,
  disabled?: boolean,
  value: string,
} & FieldWrapperPassThroughProps;
```

## Example

```js
<AvatarTypeSelectField
  onChange={subcategoryOnChange}
  options={subCategories as Header[]}
  defaultValue={null}
  fieldName="type"
  value={subcategory || ""}
/>
```
