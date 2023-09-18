# Notification Settings Form

Notification settings form

## Props

```js
interface Props {
  errors: {
    [x: string]: any,
  };
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}
```

## Example

```js
<NotificationSettings
  errors={errors}
  handleSubmit={handleSubmit}
  control={control}
  setValue={setValue}
/>
```
