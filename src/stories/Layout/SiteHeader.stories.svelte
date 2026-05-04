<!--
  SiteHeader.stories.svelte

  Stories for the SiteHeader component.
  SiteHeader displays the header background with the site name on the left and
  round icon links on the right.

  Props:
  - name: Site name text
  - email, github, linkedin: Contact links used for the round header icons
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SiteHeader from '$lib/components/Layout/SiteHeader.svelte';

  const { Story } = defineMeta({
    title: 'Layout/SiteHeader',
    component: SiteHeader,
    tags: ['autodocs'],
    parameters: {
      // Use fullscreen layout so the header spans the full story width
      layout: 'fullscreen',
    },
  });
</script>

<!-- Default: header with name and social icons -->
<Story
  name="Default"
  args={{
    name: 'Sidney Slon',
    email: 'lorem@example.com',
    github: 'loremipsum',
    linkedin: 'loremipsum',
  }}
/>
