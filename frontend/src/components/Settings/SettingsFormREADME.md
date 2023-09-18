# Settings Form

Settings Form Wrapper that includes logout button and save changes

![](./readmeIMG/2023-02-22-12-56-59.png)

## Props

```js
interface Props {
  children: any;
  submitCallback: any;
}
```

## Example

```js
<SettingsForm submitCallback={handleSubmit(userSubmit)}>
  {children}
</SettingsForm>
```
