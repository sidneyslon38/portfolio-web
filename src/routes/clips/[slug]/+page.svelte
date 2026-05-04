<script>
  import Kicker from '$lib/components/Article/Kicker.svelte';
  import Headline from '$lib/components/Article/Headline.svelte';
  import Image from '$lib/components/Media/Image.svelte';
  import Pubdate from '$lib/components/Article/Pubdate.svelte';
  import { base } from '$app/paths'; 

  let { data } = $props();
</script>

<div class="container">
<div class="clip-detail">
<div class="clip-header">
  <Kicker text="{data.clip.outlet}" href="{data.clip.url}" />
  </div>
  <Headline text={data.clip.title} />
  <Pubdate date={data.clip.pubdate} />
  <Image src={data.clip.image} alt={data.clip.title} />

  <p>{data.clip.description}</p>
  <div class="clip-skills">
  <h3>Skills Used</h3>
  <ul>
    {#each data.clip.skills as skill}
      <ul>{skill}</ul>
    {/each}
  </ul>
  </div>
</div>
</div>

<style lang="scss">

:global(body),
:global(html) {
    background-color: #647086;
  }

.clip-header {
    margin-bottom: var(--spacing-sm);
    color: var(--color-medium-gray);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
}

.clip-detail {
  margin: var(--spacing-xl) auto;
  max-width: 800px;
  background-color: #f3f7ff;
  border-radius: 25px;
  border: 10px solid #909090;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md);
}

.clip-skills {
  margin-top: var(--spacing-lg);
  text-transform: capitalize;
}

</style>