# Checkpoint Connector

Connectors between each checkpoint in the checkpoint map

![](./readmeIMG/2023-02-14-16-17-51.png)

## Props

```js
interface Props {
  direction: "vertical" | "horizontal";
  className?: string;
  connected?: boolean;
}
```

## Example

```js
<CheckpointConnector
  direction="vertical"
  className="col-span-1 row-span-4"
  connected={false}
/>
```
