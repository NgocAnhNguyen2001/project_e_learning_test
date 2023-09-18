# Dialog

Re-usable dialog component

![](./readmeIMG/2023-02-15-17-02-07.png)

## Props

```js
interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocus?: React.MutableRefObject<null>;
  className?: string;
}
```

## Example

```js
<Dialog
  isOpen={isOpen}
  onClose={(): void => {
    setIsOpen(false);
    setTourOpen(true);
  }}
  className=""
>
```
