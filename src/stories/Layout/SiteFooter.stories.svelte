<!--
  SiteFooter.stories.svelte

  Stories for the SiteFooter component.
  SiteFooter displays the footer contact icons and copyright at the bottom of every page.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SiteFooter from '$lib/components/Layout/SiteFooter.svelte';

  const { Story } = defineMeta({
    title: 'Layout/SiteFooter',
    component: SiteFooter,
    tags: ['autodocs'],
    parameters: {
      // Use fullscreen layout so the footer spans the full story width
      layout: 'fullscreen',
    },
  });
</script>

<!-- Default: the footer with contact icons -->
<Story
  name="Default"
  args={{
    email: 'lorem@example.com',
    github: 'loremipsum',
    linkedin: 'loremipsum',
  }}
/>
