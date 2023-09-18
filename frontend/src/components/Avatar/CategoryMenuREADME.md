# Catalog Menu

Display avatar catalog categories

![](./readme_img/2023-01-30-14-25-53.png)

```js
    CategoryMenuProps {
        typeOnChange: (index: number) => void;
        categoryOnChange: (index: number) => void;
        isLoading: boolean;
        categoryList:
            | { value: string; label: string; category: ItemCatalogType }[]
            | undefined;
        typeList: string[];
    }
```
