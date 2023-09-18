# Notification Settings Form

Notification settings form

![](./readmeIMG/2023-02-22-12-01-29.png)

## Props

```js
interface Props {
  errors: {
    [x: string]: any,
  };
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  // handleSubmit: UseFormHandleSubmit<FieldValues>;
  notificationSetting: any;
}
```

## Example

```js
<NotificationSettings
  // handleSubmit={handleSubmit}
  errors={errors}
  control={control}
  setValue={setValue}
  notificationSetting={
    childResponse.data?.child?.user.userNotificationSettings || []
  }
/>
```
