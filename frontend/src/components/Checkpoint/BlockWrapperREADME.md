# Block Wrapper

Block drag and drop wrapper to arrange blocks order

![](./readmeIMG/2023-02-14-11-41-10.png)

## Props

```js
interface Props {
  id: any;
  index: number;
  moveBlockDNDWrapper: (dragIndex: number, hoverIndex: number) => void;
  children?: React.ReactNode;
  onDelete?: () => void;
}
```

## Example

```js
<BlockDNDWrapper
    key={block.id}
    index={index}
    id={block.id}
    moveBlockDNDWrapper={moveBlockDNDWrapper}
    onDelete={(): any => deleteBlock(block.id)}
>
```
