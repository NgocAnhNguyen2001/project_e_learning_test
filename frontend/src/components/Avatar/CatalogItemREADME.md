# Catalog Item

Display each catalog item in a card

![](./readme_img/2023-01-30-14-11-51.png)

```js
     CatalogItemProps {
        category: string;
        subcategory: string;
        asset: AvatarAssetCatelog | HairColourAvatarAsset | SkinColourAvatarAsset;
        catalogOnClick: (
            category: string,
            subcategory: string,
            asset: AvatarAssetCatelog | HairColourAvatarAsset | SkinColourAvatarAsset,
        ) => void;
}
```
