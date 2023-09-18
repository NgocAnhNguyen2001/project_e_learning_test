# Navigator

This is where all the navigator pages are, each file's name represents a route pathname.

For example:

-> auth
---> login.tsx

means that _/navigator/auth/login_ is the path to fetch the page

**Any file that conains a name within [id].tsx means that this route is dynamic and the id can change and can be accessed.**

Available stand alone routes in navigator:

- _/navigator/my-courses_ (view navigator's own courses)
- _/navigator/reports_ (view courses reports)
- _/navigator/settings_ (view user settings)
