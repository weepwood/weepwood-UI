# Design System

## Relationship with Tauri Desktop Kit

TDK currently has three reusable primitives (button, badge, switch) and CSS tokens. Their semantic values and interaction patterns informed this initial library. Here we use a `--wu-*` namespace, avoid app-level layout resets, and expose an independent package API.

## Tokens

Load `@weepwood/tokens/styles.css` once in an application.

- Surface: `--wu-canvas`, `--wu-surface`, `--wu-surface-hover`
- Text: `--wu-text`, `--wu-text-muted`
- Interaction: `--wu-accent`, `--wu-focus`, `--wu-danger`
- Spacing: `--wu-space-1` through `--wu-space-6`
- Geometry: `--wu-radius-*`, `--wu-control-height`

The default theme is Light. Set `data-theme="dark"` on the document root (or a scoped wrapper) to switch the semantic values.

Density is independent from theme. Set `data-density="compact"` or `data-density="comfortable"`.

## Component conventions

- Prefix exported components with `W` to prevent collisions with application UI.
- `defineModel` controls two-way value bindings; consumers use `v-model`.
- Always use real buttons and inputs for native keyboard behavior.
- Ensure disabled controls cannot be activated.
- Include at least one default Story and relevant variant Stories.
- Do not import Tauri APIs from `packages/vue`.
- No browser globals at module evaluation time in the component library.

## Future themes

Light and Dark ship now. Fluent Mica/Glass and additional style themes will be implemented only after contrast, readability, and performance tests.
