import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SiteHeader from '$lib/components/Layout/SiteHeader.svelte';
import SiteFooter from '$lib/components/Layout/SiteFooter.svelte';

describe('SiteHeader', () => {
  it('renders the logo', () => {
    render(SiteHeader);
    expect(screen.getByText('Sidney Slon')).toBeTruthy();
  });

  it('renders header icons', () => {
    render(SiteHeader, {
      props: {
        email: 'lorem@example.com',
        github: 'loremipsum',
        linkedin: 'loremipsum',
      },
    });

    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('GitHub')).toBeTruthy();
    expect(screen.getByLabelText('LinkedIn')).toBeTruthy();
  });

  it('hides icons when no contact props are provided', () => {
    const { container } = render(SiteHeader, {
      props: { email: '', github: '', linkedin: '' },
    });
    const navList = container.querySelector('nav .nav-list');
    expect(navList?.children.length || 0).toBe(0);
  });
});

describe('SiteFooter', () => {
  it('renders contact links', () => {
    render(SiteFooter, {
      props: {
        email: 'lorem@example.com',
        github: 'loremipsum',
        linkedin: 'loremipsum',
      },
    });

    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('GitHub')).toBeTruthy();
    expect(screen.getByText('LinkedIn')).toBeTruthy();
  });
});
