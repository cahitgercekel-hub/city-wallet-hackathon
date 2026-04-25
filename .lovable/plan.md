## Issue
On `/account`, the floating "Save Changes" button (`fixed bottom-24`) overlaps the "Delete Account" button at the bottom of the form when the user has unsaved edits.

## Fix — `src/pages/Account.tsx`
Increase the main content's bottom padding when the Save bar is visible so the Delete Account button is pushed above the floating Save bar.

- Change `<main className="px-4 pb-28 ...">` to use a dynamic class:
  - `pb-28` when not dirty (current spacing for the bottom nav).
  - `pb-44` when `isDirty` (adds room for the floating Save Changes bar above the bottom nav).

That's a one-line change. No layout/style changes to the Save or Delete buttons themselves — they remain in their current positions, just no longer overlap.
