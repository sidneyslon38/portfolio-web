<!--
@component
Profile.svelte — A personal portfolio profile card.

Displays a headshot, name, tagline, contact links, and an optional
"now / next" bio section. Intended as the hero block of a portfolio page.

USAGE EXAMPLE:
<Profile
  name="Jane Smith"
  tagline="Data journalist covering housing and inequality"
  photo="/photos/jane-smith.jpg"
  email="jane@example.com"
  github="janesmith"
  linkedin="janesmith"
  bio="Currently reporting on evictions for The City.

Next, I'm exploring machine learning tools for document analysis."
/>
-->
<script>
  import Image from '$lib/components/Media/Image.svelte';
  import ProfileBio from './ProfileBio.svelte';

  let { name, tagline, photo, photoAlt, bio } = $props();
</script>

<section class="profile">
  <div class="profile-hero">
    <div class="hero-copy">
      <h1>{name}</h1>
      {#if tagline}
        <p class="tagline">{tagline}</p>
      {/if}

      <div class="bio">
        <ProfileBio text={bio} />
      </div>
    </div>

    {#if photo}
      <div class="hero-photo-wrap">
        <Image src={photo} alt={photoAlt ?? name} size="full" />
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  @use '$lib/styles' as *;

  .profile {
    background-color: #f3f7ff;
    border-radius: 25px;
    border: 10px solid #909090;
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-md);
  }

  .profile-hero {
    display: grid;
    gap: var(--spacing-md);

    @include tablet {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: stretch;
    }
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: clamp(3.25rem, 7vw, 4.25rem);
    line-height: var(--leading-tight);
    margin: 0;
    letter-spacing: var(--letter-spacing-tight);
    margin-bottom: var(--spacing-xxs);

    @include mobile {
      font-size: var(--font-size-display);
    }
  }

  .tagline {
    margin-top: var(--spacing-sm);
    font-size: var(--font-size-xl);
    color: var(--color-text);
    line-height: var(--leading-caption);
    max-width: 42rem;
  }

  .bio {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .hero-photo-wrap {
    width: fit-content;
    max-width: 384px;
    image-rendering: pixelated;        /* Chrome, Edge, Safari */
    image-rendering: crisp-edges;      /* Firefox fallback */

    @include tablet {
      justify-self: end;
    }
  }

  .hero-photo-wrap :global(.image-figure) {
    margin: 0;
  }

  .hero-photo-wrap :global(.image) {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    aspect-ratio: auto;
    object-fit: contain;
    margin: 0;
  }

</style>
