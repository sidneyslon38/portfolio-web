<!--
@component
SiteHeader.svelte — NYCity News Service Style Header
-->
<script>
  import { base } from '$app/paths';
  import IconEmail from '$lib/components/Icons/IconEmail.svelte';
  import IconGitHub from '$lib/components/Icons/IconGitHub.svelte';
  import IconLinkedIn from '$lib/components/Icons/IconLinkedIn.svelte';

  let {
    name = 'Sidney Slon',
    email = '',
    github = '',
    linkedin = '',
  } = $props();

  let contacts = $derived(
    [
      email ? { href: `mailto:${email}`, icon: IconEmail, label: 'Email' } : null,
      github ? { href: `https://github.com/${github}`, icon: IconGitHub, label: 'GitHub' } : null,
      linkedin ? { href: `https://linkedin.com/in/${linkedin}`, icon: IconLinkedIn, label: 'LinkedIn' } : null,
    ].filter(Boolean)
  );
</script>

<header class="site-header">
  <!-- Compact masthead with logo left and nav right -->
  <div class="header-wrapper">
    <div class="header-bg" style:background-image={`url('${base}/portfolio_graphics/header_port.png')`} aria-hidden="true"></div>
    <div class="header-overlay-sides" aria-hidden="true">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <!-- Solid color overlay with cutout windows (edit shapes below) -->
    <svg
      class="header-overlay"
      viewBox="0 0 1200 128"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <mask id="header-cutout-mask">
          <rect width="1200" height="128" fill="white" />
          <!-- Symmetric rectangular windows aligned to container margins -->
          <rect x="24" y="30" width="220" height="68" rx="8" fill="black" />
          <rect x="956" y="30" width="220" height="68" rx="8" fill="black" />
        </mask>
      </defs>
      <rect
        width="1200"
        height="128"
        fill="#b7b7b7"
        mask="url(#header-cutout-mask)"
      />
      <!-- Window borders -->
      <rect
        x="24"
        y="30"
        width="220"
        height="68"
        rx="8"
        fill="none"
        stroke="#909090"
        stroke-width="2"
      />
      <rect
        x="956"
        y="30"
        width="220"
        height="68"
        rx="8"
        fill="none"
        stroke="#909090"
        stroke-width="2"
      />
    </svg>
    <img src={encodeURI(`${base}/portfolio_graphics/subway_doors_1.gif`)} alt="" class="header-gif" aria-hidden="true" />

    <div class="masthead">
      <a class="site-name" href={`${base}/`}>{name}</a>

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
    </div>
  </div>
</header>

<style lang="scss">
  @use '../../styles' as *;

  .site-header {
    border-bottom: 0px solid var(--color-accent);
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  /* Header wrapper sized to design artboard */
  .header-wrapper {
    position: relative;
    width: 100%;
    height: 128px;
  }

  .header-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw; /* tile across viewport */
    height: 128px;
    /* allow the header PNG to tile horizontally to fill wide viewports */
    background-size: auto 100%;
    background-position: center top;
    background-repeat: repeat-x;
    image-rendering: pixelated;        /* Chrome, Edge, Safari */
    image-rendering: crisp-edges;      /* Firefox fallback */
    z-index: 0;
    pointer-events: none;
  }

  .header-gif {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 128px;
    height: 128px;
    image-rendering: pixelated;
    pointer-events: none;
    z-index: 2;
  }

  .header-overlay {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: var(--max-width-wide);
    height: 128px;
    z-index: 1;
    pointer-events: none;
  }

  /* Extend gray overlay beyond centered cutout area to viewport edges */
  .header-overlay-sides {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 128px;
    z-index: 1;
    pointer-events: none;
  }

  .header-overlay-sides .left,
  .header-overlay-sides .right {
    position: absolute;
    top: 0;
    height: 128px;
    background: #b7b7b7;
    width: max(0px, calc((100vw - var(--max-width-wide)) / 2));
  }

  .header-overlay-sides .left {
    left: 0;
  }

  .header-overlay-sides .right {
    right: 0;
  }

  /* Compact Masthead - Mobile: centered */
  .masthead {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    gap: var(--spacing-md);
    padding: 0 var(--spacing-md);
    max-width: var(--max-width-wide);
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    z-index: 3;
  }

  .site-name {
    width: 220px;
    text-align: center;
    margin-right: auto;
    color: var(--color-white);
    text-decoration: none;
    font-family: var(--font-serif);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-tight);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }

  .main-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
  }

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--spacing-sm);
  }

  .icon-link {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--color-white);
    border: 1px solid var(--color-white);
    color: #647086;
    text-decoration: none;
    cursor: pointer;
    padding: 0;
    opacity: 0.7;
    transition: var(--transition-opacity), var(--transition-color);
  }

  .icon-link:hover {
    opacity: 1;
  }

  @include desktop {
    .masthead {
      padding: var(--font-size-xs) var(--spacing-md);
    }

    .site-name {
      font-size: var(--font-size-3xl);
    }

    .nav-list {
      gap: var(--spacing-sm);
    }

    .icon-link {
      width: 2.75rem;
      height: 2.75rem;
    }
  }
</style>
