<script>
  import Profile from '$lib/components/Portfolio/Profile.svelte';
  import FeatureCard from '$lib/components/Data/FeatureCard.svelte';
  import CardGrid from '$lib/components/Data/CardGrid.svelte';
  import { base } from '$app/paths';

  let { data } = $props();
  
  let highlightedClips = $derived(
    data.content.clips
      .filter((clip) => clip.highlight)
      .sort((a, b) => {
        const dateA = new Date(a.pubdate);
        const dateB = new Date(b.pubdate);
        return dateB - dateA;
      })
  );
</script>

<div class="container wide">
  <Profile
    name={data.content.profile.name}
    tagline={data.content.profile.tagline}
    photo={data.content.profile.photo}
    photoAlt={data.content.profile.photoAlt}
    email={data.content.profile.email}
    github={data.content.profile.github}
    linkedin={data.content.profile.linkedin}
    bio={data.content.profile.bio}
  />

<div class="featured-clips">
<h1>Featured Work</h1>

  <CardGrid>
    {#each highlightedClips as clip (clip.title)}
      <FeatureCard
        href={`${base}/clips/${clip.slug}`}
        image={clip.image}
        imageAlt={clip.title}
      >
        <h3>{clip.title}</h3>
        <p>{clip.description}</p>
      </FeatureCard>
    {/each}
  </CardGrid>
</div>

<button class="portfolio-button">
  <a href={`${base}/portfolio-database`}>To view my entire portfolio</a>
  <p>➭</p>
</button>

</div>

<style lang="scss">

  :global(body),
  :global(html) {
    background-color: var(--color-background);
  }

  .featured-clips {
    margin: var(--spacing-xl) auto;
    margin-top: var(--spacing-lg);
  
    h1 {
        font-size: var(--font-size-display);
        margin-bottom: var(--spacing-lg);
        color: var(--color-white);
        text-align: center;
        font-family: 'Stack Sans Notch', sans-serif;
        font-weight: 600;
        font-size: var(--font-size-5xl);
      }
  }

  .featured-clips :global(.card-grid) {
    grid-template-columns: repeat(3, 1fr);
  }

  .portfolio-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin: var(--spacing-lg) 0 var(--spacing-lg) auto;
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--color-dark-background);
    color: var(--color-white);
    border: none;
    border-radius: 5px;
    font-family: var(--font-sans);
    font-size: var(--font-size-md);
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    a {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      background-color: var(--color-medium-gray);
    }

    p {
      display: inline-block;
      margin: 0;
      font-size: var(--font-size-display);
    }
  }


</style>