<script>
  import Card from '$lib/components/Data/Card.svelte';
  import CardGrid from '$lib/components/Data/CardGrid.svelte';
  import SearchInput from '$lib/components/Forms/SearchInput.svelte';
  import { base } from '$app/paths';

  let { data } = $props();
  let searchTerm = $state('');
  let filteredClips = $derived(
    (searchTerm
      ? data.content.clips.filter((clip) => {
          const q = searchTerm.toLowerCase();
          return (
            (clip.title && clip.title.toLowerCase().includes(q)) ||
            (clip.pubdate && clip.pubdate.toLowerCase().includes(q))
          );
        })
      : data.content.clips
    ).sort((a, b) => {
      const dateA = new Date(a.pubdate);
      const dateB = new Date(b.pubdate);
      return dateB - dateA; // most recent first
    })
  );
</script>

<div class="container wide">

<div class="clips-search">

<div class="search-input">
  <SearchInput placeholder="Search for a headline or publication date..." bind:value={searchTerm} />
</div>
  <CardGrid>
    {#each filteredClips as clip (clip.title)}
      <Card
        href={`${base}/clips/${clip.slug}`}
        image={clip.image}
        imageAlt={clip.title}
      >
        <h3>{clip.title}</h3>
        <p>{clip.description}</p>
      </Card>
    {/each}
  </CardGrid>
</div>
</div>

<style lang="scss">

  :global(body),
  :global(html) {
    background-color: var(--color-background);
  }

  .search-input {
    margin: var(--spacing-lg) auto;
  }

  .clips-search {
    margin-top: var(--spacing-xl);
  }

  .clips-search h2 {
    margin-bottom: var(--spacing-lg);
    text-align: center;
    font-family: var(--font-serif);
    color: var(--color-white);
  }

</style>