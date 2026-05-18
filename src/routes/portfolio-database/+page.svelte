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
            (clip.pubdate && clip.pubdate.toLowerCase().includes(q)) ||
            (clip.outlet && clip.outlet.toLowerCase().includes(q)) ||
            (clip.description && clip.description.toLowerCase().includes(q))
          );
        })
      : data.content.clips
    ).sort((a, b) => {
      const dateA = new Date(a.pubdate);
      const dateB = new Date(b.pubdate);
      return dateB - dateA; // most recent first
    })
    .slice(0, 10) // Show only top 10 most recent
  );
</script>

<div class="container wide">

<div class="clips-search">

<div class="search-input">
  <SearchInput placeholder="Search for an article, publication date, or outlet..." bind:value={searchTerm} />
</div>
<div class="results-description">
  {#if searchTerm}
    <p>Showing {filteredClips.length} results for "{searchTerm}"</p>
  {:else}
    <p>Showing 10 most recent results...</p>
  {/if}
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
    margin: var(--spacing-sm) auto;
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

  .results-description {
    margin-bottom: var(--spacing-lg);
    color: var(--color-light-gray);
    font-style: italic;
  }

</style>