# Psycript

> `Python` style functions.

## Install

```sh
npm install psycript
```

## Usage

```js
import psycript from "psycript";

console.log(psycript);
```

---

<br /><br />

## **String**

> Transform the string to different **`Cases`**.

## Set A Value

```js
const value = psycript.str("I'm Twisted !!!");
```

## **Transform** The Value

---

- **Lower**: `value.lower;`
- **Upper**: `value.upper;`
- **Title**: `value.title;`
- **Pascal**: `value.pascal;`
- **Camel**: `value.camel;`
- **Slug**: `value.slug;`
- **Snake**: `value.snake;`
- **Cut**: (Integer) `value.cut(size);`

---

<br /><br />

## **Dict**

> Python style **`Dict = Object(JSON)`**.

```js
const kwargs = {
  ID: "graphql_id",
  name: "johndoe",
};
const dict = Dict(kwargs);
```

## Class **Methods**

---

- **Keys**: `dict.keys();`
- **Values**: `dict.values();`
- **Items**: `dict.items();`
- **Dict**: `dict.dict();`
- **forDict**: `dict.forDict((key, value) => { console.log(key, value); });`
- **forList**: `dict.forList((item) => { console.log(item); });`

---

<br /><br />

## **Fields**

---

#### Core

- **Integer**: `psycript.fields.int(text);`
- **Decimal**: `psycript.fields.decimal(text);`
- **Letters**: `psycript.fields.letters(text);`
- **Alphanum**: `psycript.fields.alphanum(text);`
- **Slug**: `psycript.fields.slug(text);`

#### User Related

- **Zipcode**: `psycript.fields.zipcode(text);`
- **Username**: `psycript.fields.username(text);`
- **Email**: `psycript.fields.email(text);`
- **Phone**: `psycript.fields.phone(text);`

#### Tags

- **,Tags**: `psycript.fields.tags(text);` comma tags.
- **#Tags**: `psycript.fields.hashtags(text);`
- **@Tags**: `psycript.fields.attags(text);`

---

<br /><br />

## **`"IS"`** Value **Check**

> Check if the value is of certain **`Type`**.

### Set A Value

```js
const value = "AnyValue";
```

### **Check** IF The Value (**Is**...)

---

- **Function**: `psycript.is.function(value);`
- **Dict**: `psycript.is.dict(value);`
- **Str**: `psycript.is.str(value);`
- **Number**: `psycript.is.number(value);`
- **List**: `psycript.is.list(value);`
- **Null**: `psycript.is.null(value);`
- **Undefined**: `psycript.is.undefined(value);`
- **None**: (Null or Undefined) `psycript.is.none(value);`
- **Bool**: `psycript.is.bool(value);`
- **Date**: `psycript.is.date(value);`
- **Regex**: `psycript.is.regex(value);`

---

<br /><br />

## **Storage**

> Manage Browser's **`Storage`**

### Storage **Session**

- **set**: `psycript.session.set(key)`
- **get**: `psycript.session.get(key)`
- **del**: `psycript.session.del(key)`
- **clear**: `psycript.session.clear(key)`

### Storage **Local**

- **set**: `psycript.local.set(key)`
- **get**: `psycript.local.get(key)`
- **del**: `psycript.local.del(key)`
- **clear**: `psycript.local.clear(key)`

---

<br /><br />

## **Random**

> Create **`Random`** Values.

### Create A Value

```js
psycript.random.lowercase(10);
```

### Create A **Random** String

---

- **LowerCase**: `psycript.random.lowercase(size)`
- **UpperCase**: `psycript.random.uppercase(size)`
- **Letters**: `psycript.random.letters(size)`
- **Alphanum**: `psycript.random.alphanum(size)`
- **Digits**: `psycript.random.digits(size)`
- **Hexdigits**: `psycript.random.hexdigits(size)`
- **All**: `psycript.random.all(size)`

---

<br /><br />

## **Lorem**

> Create Random **`Lorem`** Strings.

### Create A Value

```js
psycript.random.word(10);
```

### Create A **Sentence** Random **Lorem**

---

- **Word**: `psycript.lorem.word(size)`
- **W**: `psycript.lorem.w(size)`

### Create A **Word** Random **Lorem**

---

- **Sentence**: `psycript.lorem.sentence(size)`
- **S**: `psycript.lorem.sentence(size)`
