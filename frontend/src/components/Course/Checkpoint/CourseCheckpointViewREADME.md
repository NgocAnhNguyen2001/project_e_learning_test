# Course Checkpoint View

Display course checkpoint details

![](./readmeIMG/2023-02-15-15-43-15.png)

## Props

```js
interface Props {
  text: string;
  data: Checkpoint;
  parentConnectedState?: EnrolledState;
  childConnectedState: EnrolledState;
  subCheckpointsLength?: number;
  state: EnrolledState | ExtendedEnrolledState;
}
```

## Example

```js
<CourseCheckpointView
  {...{
    text,
    data,
    parentConnectedState,
    childConnectedState,
    state,
    subCheckpointsLength,
  }}
/>
```
