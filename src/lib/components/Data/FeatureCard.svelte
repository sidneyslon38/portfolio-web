<!--
@component
Card.svelte — A card container with optional image, link, and footer actions.
-->
<script>
  import { asset } from '$app/paths';

  let { href = '', image = '', imageAlt = '', children, footer } = $props();

  // Resolve local images (those starting with /) using asset()
  // but not external URLs (http://, https://, //, data:)
  const resolvedImage = $derived(
    image && image.startsWith('/') && !image.startsWith('//')
      ? asset(image)
      : image
  );
</script>

{#snippet cardContent()}
  <div class="card-main">
    {#if image}
      <div class="card-image">
        <img src={resolvedImage} alt={imageAlt} />
      </div>
    {/if}
    <div class="card-body">
      {@render children()}
    </div>
  </div>
  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}
{/snippet}

{#if href}
  <a {href} class="card card-link">
    {@render cardContent()}
  </a>
{:else}
  <div class="card">
    {@render cardContent()}
  </div>
{/if}

<style lang="scss">
  .card {
    background: var(--color-black);
    border: none;
    border-radius: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  .card-main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
    min-width: 0;
  }

  .card-image {
    width: 100%;
    aspect-ratio: 1;
    flex: 0 0 auto;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-body {
    padding: var(--spacing-md, 1rem);
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    color: white;

    :global(h3) {
      font-size: 1.1rem;
      margin: 0 0 0.5rem;
      line-height: 1.3;
      color: white;
    }

    :global(p) {
      font-size: 0.9rem;
      margin: 0;
      line-height: 1.5;
      color: #ddd;
    }
  }

  .card-footer {
    border-top: 1px solid white;
    padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
    background: rgba(255, 255, 255, 0.1);
    margin-top: auto;
  }
</style>
