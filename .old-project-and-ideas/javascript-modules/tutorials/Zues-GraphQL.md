# GraphQL Eazy-Code Maker

## Zeus GraphQL

```sh
zeus http://localhost:8000/graphql ./src --graphql=./src/zeus
```

## EsBuild

```sh
esbuild src/index.ts --outfile=outputFile.esm.js --bundle --loader:.ts=ts --format=esm
```

---

## Reusable **Query** (for JavaScript)

```js
import { Selector, Chain } from "./zeus";

const chain = Chain("http://127.0.0.1:8000/graphql");

const Response = Selector("Category")({
  name: true,
});

const GetCategoryByID = ({ id = "Some-GraphQL-ID" } = {}) =>
  chain("query")({
    categoryDetail: [{ id }, Response],
  });

export default GetCategoryByID;
```

## Reusable **Mutations** (for JavaScript)

```js
import { Selector, Chain } from "./zeus";

const chain = Chain("http://127.0.0.1:8000/graphql");

const onError = Selector("Error")({
  error: true,
});
const onSuccess = Selector("User")({
  username: true,
});

const createUser = ({ username = null, password = null, email = null } = {}) =>
  chain("mutation")({
    accountCreate: [
      /* User's <Input: Values> */
      {
        username,
        password,
        email,
      },
      /* Return <Schemas: Selectors> */
      {
        "...on Success": onSuccess,
        "...on Error": onError,
      },
    ],
  });

export default createUser;
```
