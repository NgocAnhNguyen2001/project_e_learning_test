# Tab List

Re-usable Tab List component

![](./readmeIMG/2023-02-15-17-52-23.png)

## Props

```js
interface Props {
  content: any[];
  disabled?: boolean;
}
```

## Example

```js
<TabList
  disabled={isLoading}
  content={typeList.map((type) => {
    return { title: type };
  })}
/>
```
