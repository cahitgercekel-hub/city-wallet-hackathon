## Remove Animations from Discover Header Weather + Clock Emojis

The ☔ and ⏰ emojis at the top of the Discover page currently float and spin. Make them static.

### Changes (`src/pages/Index.tsx`)

- Drop the `inline-block animate-[float_3s_ease-in-out_infinite]` class from the ☔ span.
- Drop the `inline-block animate-[tick_4s_linear_infinite] origin-center` class from the ⏰ span.
- Keep the `text-[18px]` sizing and `aria-hidden="true"`.
- Remove the inline `<style>` block defining the now-unused `@keyframes float` and `@keyframes tick`.

### Result

The weather and time emojis sit still in the header, matching the calm, static feel of the surrounding text.
