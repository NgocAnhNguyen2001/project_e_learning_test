# Subtitle Preview

Subtitle title preview, delete and download vtt file

![](./readmeIMG/2023-02-20-04-31-10.png)

## Props

```js
interface Props {
  subtitle: Subtitles;
  currentBlocks: Blocks[];
  block: Blocks;
  courseId: string;
}
```

## Example

```js
<SubtitlePreview
  key={subtitle.id}
  block={block}
  courseId={courseId}
  currentBlocks={currentBlocks}
  subtitle={subtitle}
/>
```
