# Landing App Layout

Landing App layout wrapper that includes the navbar and footer

![](./readmeIMG/2023-02-21-16-15-27.png)

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
<LandingAppLayout hostname={hostname} noFooter>
  {children}
</LandingAppLayout>
```
