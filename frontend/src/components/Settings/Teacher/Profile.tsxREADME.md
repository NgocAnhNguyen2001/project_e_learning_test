# Profile Settings Form

Profile settings form

![](./readmeIMG/2023-02-22-11-55-20.png)

## Props

```js
interface Props {
  errors: {
    [x: string]: any,
  };
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}
```

## Example

```js
<ProfileSettings
  handleSubmit={handleSubmit}
  errors={errors}
  register={register}
  setValue={setValue}
  watch={watch}
  control={control}
/>
```
