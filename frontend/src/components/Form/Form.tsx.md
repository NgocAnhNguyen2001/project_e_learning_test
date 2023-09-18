# Form Wrapper

Form wrapper to simplify the usage of a html-element form

## Props

```js
interface Props {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
}
```
