# Account Settings Form

Account settings form

![](./readmeIMG/2023-02-22-11-43-15.png)

## Props

```js
interface Props {
  errors: {
    [x: string]: any,
  };
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}
```

## Example

```js
<Account errors={errors} handleSubmit={handleSubmit} register={register} />
```
