# Dropzone Field

Media dropzone field

![](2023-02-16-05-58-40.png)

## Props

```js
interface Props {
  id?: string | number;
  className?: string;
  fieldName?: string;
  maxFiles?: number;
  maxSize?: number;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  setValue?: UseFormSetValue<FieldValues>;
  onChange?: any;
  existingFile?: string | null;
  setPreview?: React.Dispatch<React.SetStateAction<string | undefined>>;
  accept?: string;
  currentBlocks?: any;
  acceptOneFile?: boolean;
  resetEvent?: {
    filename: string | null;
  };
}
```

## Example

```js
<DropzoneField
  setValue={setValue}
  fieldName="thumbnail"
  size="full"
  variant="dark"
  setPreview={setPreview}
  className="navigator_tour_6"
/>
```
