# Enrolled Courses

Preview of enrolled courses and number of completed courses and allow users to go to each course theyre enrolled to.

![](./readmeIMG/2023-02-22-11-07-45.png)

## Props

```js
interface Props {
  courseCount: CountCourseQuery | undefined;
  enrolledCourse: EnrolledCourse[] | null | undefined;
  setDisplayTab: (value: "MAIN" | "FRIENDS" | "JOURNAL" | "COURSES") => void;
}
```

## Example

```js
<EnrolledCourses
  courseCount={courseCount}
  enrolledCourse={
    userResponse.data?.child
      .enrolledCourses as EnrolledCourse[]
  }
  setDisplayTab={setDisplayTab}
/>
```
