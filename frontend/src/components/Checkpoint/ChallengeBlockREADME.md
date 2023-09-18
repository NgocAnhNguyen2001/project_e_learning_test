# Challenge Block

Display uploaded challenge cards

![](./readmeIMG/2023-02-14-12-01-39.png)

## Props

```js
interface Props {
  submission: any;
  index: number;
  sdUrls?: any[];
  likes?: number;
  openModal?: (id: string) => void;
  checkAlreadyLiked: (id: string) => boolean;
  likeSubmission?: (id: string) => Promise<void>;
}
```

## Example

```js
<ChallengeBlock
  submission={submission}
  index={index}
  checkAlreadyLiked={checkAlreadyLiked}
  likeSubmission={likeSubmission}
  openModal={openModal}
  sdUrls={sdUrls}
  key={submission.id}
/>
```
