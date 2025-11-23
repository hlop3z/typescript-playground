# ✅ Preact Lifecycle Hooks Example (with Custom Hooks)

```js
// hooks/useLifecycleHooks.js
import { useEffect, useRef } from "preact/hooks";

/**
 * useLifecycleHooks - A reusable lifecycle hook for Preact
 *
 * @param {Object} hooks
 * @param {Function=} hooks.onCreated   - Called once when component is mounted
 * @param {Function=} hooks.onUpdated   - Called when dependencies change (or always if deps not specified)
 * @param {Function|AsyncFunction=} hooks.onRemoved   - Called on component unmount, supports async
 * @param {Array=} deps                - Dependency array to control updates
 */
export function useLifecycleHooks(
  { onCreated, onUpdated, onRemoved },
  deps = undefined
) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      onCreated?.();
      isFirstRender.current = false;
    } else {
      onUpdated?.();
    }

    return () => {
      const maybePromise = onRemoved?.();
      if (maybePromise instanceof Promise) {
        maybePromise.catch(console.error); // Optional: handle unhandled promise
      }
    };
  }, deps);
}
```

---

## 🚀 Example Usage with Async Cleanup + Deps

```jsx
// components/LifecycleDemo.js
import { h } from "preact";
import { useState } from "preact/hooks";
import { useLifecycleHooks } from "../hooks/useLifecycleHooks";

export function LifecycleDemo() {
  const [count, setCount] = useState(0);

  useLifecycleHooks(
    {
      onCreated: () => console.log("✅ Component created"),
      onUpdated: () => console.log("🔄 Count changed"),
      onRemoved: async () => {
        console.log("❌ Cleaning up...");
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("🧹 Async cleanup done");
      },
    },
    [count]
  ); // Only trigger `onUpdated` when `count` changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

---

### 🔁 Behavior Summary

| Lifecycle Phase | Method Called | Controlled by                     |
| --------------- | ------------- | --------------------------------- |
| Mount           | `onCreated()` | Once on init                      |
| Update          | `onUpdated()` | On deps change (like `useEffect`) |
| Unmount         | `onRemoved()` | On removal (supports async)       |
