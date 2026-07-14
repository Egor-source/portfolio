# Inputs

**Inputs** is a lightweight and extensible JavaScript and TypeScript library for handling user input. It provides a unified API for keyboard shortcuts, multi-step combinations, ordered sequences, gestures, and custom input sources, regardless of the runtime environment.

The library was designed as a foundation for complex applications where traditional `keydown` / `keyup` handlers quickly become difficult to maintain. Unlike most shortcut libraries, Inputs introduces scoped event handling, propagation control, provider-based architecture, and first-class SSR support.

---

## Highlights

- ⌨️ Keyboard shortcuts, combinations and sequences
- 🎯 Local and global scopes
- 🌳 Hierarchical scope resolution
- 🚫 Event propagation control
- 👆 Smart active element detection
- 👁️ Visibility-aware processing
- 🔌 Custom EventProvider support
- ⚡ SSR-safe lazy initialization
- 🧩 Fully typed TypeScript API

---

# Motivation

As applications grow, input handling often becomes fragmented across multiple components:

- numerous `keydown` listeners;
- duplicated focus checks;
- conflicting shortcuts;
- manual event cleanup;
- inconsistent behavior between modals, editors and global actions.

These issues become especially noticeable in dashboards, editors, design tools, games and large SPA applications.

Inputs was created to provide a single, maintainable input management layer.

---

# Architecture

The core of the library is the **InputsManager**.

It is responsible for:

- registering handlers;
- tracking active combinations;
- executing ordered sequences;
- resolving active scopes;
- propagating events;
- communicating with the underlying EventProvider.

The manager itself has no dependency on the browser.

Browser support is implemented separately through `DOMKeyboardEventProvider`, allowing the core architecture to remain platform independent.

This makes the library suitable for browsers, SSR, Canvas applications, game engines and completely custom environments.

---

# Scoped Event System

One of the key features of Inputs is its **Scope** system.

Each handler can belong to a specific element and scope.

Whenever an input event occurs, the manager automatically:

1. resolves the active element;
2. builds its parent hierarchy;
3. constructs the scope chain;
4. executes handlers from the most specific scope up to the global scope.

This allows independent interface sections to coexist without shortcut conflicts.

Typical examples include:

- text editors;
- modal dialogs;
- context menus;
- global application shortcuts.

Each component can safely reuse identical keyboard shortcuts without interfering with others.

---

# Provider-based Design

Inputs is built around the **EventProvider** abstraction.

The library itself never assumes where input events originate.

Providers can be implemented for virtually any environment:

- Browser DOM
- Canvas
- WebGL
- Game engines
- Test environments
- Server-side rendering

Implementing a custom provider is enough to integrate Inputs into entirely new platforms.

---

# SSR Support

Traditional keyboard shortcut libraries usually depend directly on browser APIs and therefore cannot safely run during server-side rendering.

Inputs solves this using `LazyEventProvider`.

Instead of creating the actual provider immediately, initialization is deferred until the runtime environment becomes available.

This makes the library suitable for modern SSR frameworks including:

- Next.js
- Nuxt
- Astro
- Remix
- any custom SSR solution

---

# Implementation

During development the following components were designed and implemented:

- InputsManager architecture
- sequence execution engine
- scoped event system
- event propagation mechanism
- active element resolution
- visibility tracking
- EventProvider abstraction
- DOM provider
- LazyEventProvider
- fully typed public API
- TypeScript support
- comprehensive documentation and examples

---

# Result

Inputs evolved beyond a simple keyboard shortcut library into a flexible input management platform.

Its modular architecture, provider abstraction and scoped event model make it suitable for both small projects and complex applications requiring advanced input handling across multiple interactive components.