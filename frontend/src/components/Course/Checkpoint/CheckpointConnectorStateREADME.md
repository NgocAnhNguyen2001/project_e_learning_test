# Checkpoint Connector State

Connectors between each checkpoint in the checkpoint map

![](./readmeIMG/2023-02-14-16-10-59.png)

## Props

```js
interface Props {
  direction: "vertical" | "horizontal";
  className?: string;
  state?: EnrolledState | ExtendedEnrolledState;
}
```

## Example

```js
<CheckpointConnectorState
  direction="horizontal"
  className="self-center col-span-1 col-start-2 row-span-2 row-start-6 justify-self-center"
  state={childConnectedState}
/>
```
