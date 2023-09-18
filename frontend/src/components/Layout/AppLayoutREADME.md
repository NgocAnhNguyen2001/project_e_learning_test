# App Layout

App Layout wrapper which includes the navbar

![](./readmeIMG/2023-02-21-15-54-47.png)

## Props

```js
interface Props {
  children?: React.ReactChild | React.ReactChild[];
  relative?: boolean;
  darkLayout?: boolean;
  noLayout?: boolean;
  noFooter?: boolean;
  hostname?: string;
}
```

## Example

```js
<AppLayout hostname={hostname} darkLayout noFooter>
  {children}
</AppLayout>
```
