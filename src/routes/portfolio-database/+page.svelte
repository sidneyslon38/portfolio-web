<script>
  import Card from '$lib/components/Data/Card.svelte';
  import CardGrid from '$lib/components/Data/CardGrid.svelte';
  import SearchInput from '$lib/components/Forms/SearchInput.svelte';
  import { base } from '$app/paths';

  let { data } = $props();
  let searchTerm = $state('');
  let currentPage = $state(1);
  const pageSize = 10;

  let sortedClips = $derived(
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
  );

  let totalPages = $derived(Math.max(1, Math.ceil(sortedClips.length / pageSize)));

  let paginatedClips = $derived(
    sortedClips.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  );

  // Reset to page 1 whenever the search term changes
  $effect(() => {
    searchTerm;
    currentPage = 1;
  });

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    // optional: scroll back to top of results when flipping pages
    document.querySelector('.clips-search')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<div class="container wide">

<div class="clips-search">

<div class="search-input">
  <SearchInput placeholder="Search for an article, publication date, or outlet..." bind:value={searchTerm} />
</div>
<div class="results-description">
  {#if searchTerm}
    <p>Showing {sortedClips.length} result{sortedClips.length === 1 ? '' : 's'} for "{searchTerm}"</p>
  {:else}
    <p>Results sorted by publication date</p>
  {/if}
</div>
  <CardGrid>
    {#each paginatedClips as clip (clip.title)}
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

  {#if totalPages > 1}
    <div class="pagination">
      <button
        class="page-btn"
        disabled={currentPage === 1}
        onclick={() => goToPage(currentPage - 1)}
      >
        &larr; Prev
      </button>

      <span class="page-indicator">Page {currentPage} of {totalPages}</span>

      <button
        class="page-btn"
        disabled={currentPage === totalPages}
        onclick={() => goToPage(currentPage + 1)}
      >
        Next &rarr;
      </button>
    </div>
  {/if}
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

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
  }

  .page-btn {
    background: transparent;
    border: 1px solid var(--color-light-gray);
    color: var(--color-white);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:hover:not(:disabled) {
      opacity: 0.7;
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .page-indicator {
    color: var(--color-light-gray);
    font-style: italic;
  }

</style>