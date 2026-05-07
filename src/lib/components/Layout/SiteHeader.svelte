<!--
@component
SiteHeader.svelte — Minimal site header
-->
<script>
  import { base } from '$app/paths';
  import IconEmail from '$lib/components/Icons/IconEmail.svelte';
  import IconResume from '$lib/components/Icons/IconResume.svelte';

  let {
    name = 'Sidney Slon',
    email = '',
    resume = '',
  } = $props();

  let contacts = $derived(
    [
      email ? { href: `mailto:${email}`, icon: IconEmail, label: 'Email' } : null,
      resume ? { href: `${base}/SSlon_Resume_May2026.pdf`, icon: IconResume, label: 'Resume' } : null,
    ].filter(Boolean)
  );
</script>

<header class="site-header">
  <div class="header-wrapper">
    <a class="site-name" href={`${base}/`}>{name}</a>

    {#if contacts.length > 0}
      <nav class="main-nav" aria-label="Header contact links">
        <ul class="nav-list">
          {#each contacts as contact (contact.label)}
            {@const Icon = contact.icon}
            <li>
              <a
                href={contact.href}
                class="icon-link"
                target={contact.label !== 'Email' ? '_blank' : undefined}
                rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                aria-label={contact.label}
              >
                <Icon />
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    {/if}
  </div>
</header>

<style lang="scss">
  @use '../../styles' as *;

  .site-header {
    background-color: var(--color-dark-background);
    border-bottom: 1px solid #333;
  }

  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 var(--spacing-md);
    max-width: var(--max-width-wide);
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  .site-name {
    color: var(--color-white);
    text-decoration: none;
    font-family: 'Stack Sans Notch', sans-serif;
    font-size: var(--font-size-lg);
    font-weight: 600;
    letter-spacing: var(--letter-spacing-tight);
  }

  .main-nav {
    display: flex;
    align-items: center;
  }

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--spacing-sm);
  }

  .icon-link {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    text-decoration: none;
    cursor: pointer;
    padding: 0;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }

  .icon-link:hover {
    opacity: 1;
  }
</style>
