import { h, render } from "preact";

// Signals
import {
  signal,
  computed,
  effect,
  batch,
  useSignalEffect,
  useSignal,
  useComputed,
} from "@preact/signals";

// Hooks
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";

export default {
  // Preact Core
  h,
  render,

  // Hooks
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,

  // Signals
  signals: {
    signal,
    computed,
    effect,
    batch,
    useSignalEffect,
    useSignal,
    useComputed,
  },
};
