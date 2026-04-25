## Issue
On `/account`:
- The floating "Save Changes" button uses `fixed left-0 right-0` against the viewport, so on wider preview/desktop screens it stretches past the 390px mobile shell.
- The Delete Account button currently sits at the end of the scrolling form (pushed by `mt-auto`), not pinned to the bottom of the mobile frame.

## Fix — `src/pages/Account.tsx`

Pin both buttons to the bottom of the mobile shell, stacked, full-width inside the shell, identical sizing.

1. Remove the `mt-auto` Delete Account button from inside `<main>` and move it into a new sticky bottom container.
2. Replace the existing `fixed bottom-24 left-0 right-0 ...` Save bar wrapper with that same container.
3. New container sits inside `MobileShell`'s inner 390px wrapper (which is `relative`), positioned `absolute bottom-0 left-0 right-0`, padded `px-4 pt-3 pb-5`, `bg-background`, `flex flex-col gap-2`. This guarantees both buttons match the mobile frame width.
4. Inside the container: Save Changes (only when `isDirty`, with `animate-fade-in`) on top, Delete Account always below — both `w-full py-3 rounded-xl ... font-semibold text-sm`.
5. Update `<main>`'s bottom padding so the form scroll doesn't get hidden behind the stack: `pb-40` when `isDirty`, `pb-24` otherwise.

Result: Delete Account is permanently anchored at the bottom of the screen at the same width as the form. When the user edits a field, Save Changes appears just above it at the exact same width, never bleeding past the mobile frame.
