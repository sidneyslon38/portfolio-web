<script>
  import Kicker from '$lib/components/Article/Kicker.svelte';
  import Headline from '$lib/components/Article/Headline.svelte';
  import Image from '$lib/components/Media/Image.svelte';
  import Pubdate from '$lib/components/Article/Pubdate.svelte';
  import { base } from '$app/paths'; 

  let { data } = $props();
</script>

{#if data.clip}
<div class="container wide">
  <section class="clip-hero">
    <div class="clip-copy">
      <div class="kicker-line">
        <p class="kicker-prefix">Published on</p>
        <Kicker text={data.clip.outlet} href={data.clip.url} />
      </div>
      <Headline text={data.clip.title} />
      <Pubdate date={data.clip.pubdate} />
      <p class="description">{data.clip.description}</p>
      
      <div class="clip-skills">
        <h3>Skills Used</h3>
        <ul>
          {#each data.clip.skills as skill}
            <li>{skill}</li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="clip-photo-wrap">
      <Image src={data.clip.image} alt={data.clip.imageAlt} size="full" />
    </div>
  </section>

  <a href={`${base}/`} class="back-button">
    <img src={`${base}/portfolio_graphics/subway_doors_1.gif`} alt="Home" />
    Back to home
  </a>
</div>

{:else}
<div class="container wide">
  <p>Clip not found</p>
  <a href={`${base}/`} class="back-button">
    <img src={`${base}/portfolio_graphics/subway_doors_1.gif`} alt="Home" />
    Back to home
  </a>
</div>
{/if}

<style lang="scss">
  @use '$lib/styles' as *;

  :global(body),
  :global(html) {
    background-color: var(--color-background);
  }

  .clip-hero {
    background: var(--color-black);
    border-top: none;
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-md) var(--spacing-sm);
    display: grid;
    gap: var(--spacing-md);

    @include tablet {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: stretch;
    }
  }

  .clip-copy {
    display: flex;
    flex-direction: column;
  }

  .kicker-line {
    display: flex;
    align-items: baseline;
    margin-bottom: var(--spacing-sm);
    gap: 0.5rem;
  }

  .kicker-prefix {
    display: inline;
    color: var(--color-light-gray);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    margin: 0;
  }

  .clip-copy :global(.kicker) {
    color: var(--color-light-gray);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    margin: 0;
    display: inline;
  }

  .clip-copy :global(.kicker a) {
    color: var(--color-light-gray);
    text-decoration: underline;
  }

  .clip-copy :global(.headline) {
    color: var(--color-white);
    margin-bottom: var(--spacing-xs);
  }

  .clip-copy :global(.pubdate) {
    color: var(--color-light-gray);
    margin-bottom: var(--spacing-sm);
  }

  .description {
    color: var(--color-white);
    font-size: var(--font-size-base);
    line-height: var(--leading-normal);
    margin-bottom: var(--spacing-md);
  }

  .clip-skills {
    margin-top: var(--spacing-lg);
    color: var(--color-white);

    h3 {
      color: var(--color-white);
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-sm);
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
    }

    li {
      text-transform: capitalize;
      color: var(--color-light-gray);
      font-size: var(--font-size-sm);
    }
  }

  .clip-photo-wrap {
    width: fit-content;
    max-width: 384px;
    image-rendering: pixelated;
    image-rendering: crisp-edges;

    @include tablet {
      justify-self: end;
    }
  }

  .clip-photo-wrap :global(.image-figure) {
    margin: 0;
  }

  .clip-photo-wrap :global(.image) {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    aspect-ratio: auto;
    object-fit: contain;
    margin: 0;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--color-dark-background);
    color: var(--color-white);
    border: none;
    border-radius: 5px;
    font-family: var(--font-sans);
    font-size: var(--font-size-md);
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
    gap: var(--spacing-sm);

    &:hover {
      background-color: var(--color-medium-gray);
    }

    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
  }

</style>