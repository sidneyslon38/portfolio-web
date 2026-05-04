import content from '$lib/data/content.yaml';

export const load = ({ params }) => {
  const clip = content.clips.find((c) => c.slug === params.slug);

  return {
    showHeader: true,
    showFooter: true,
    profile: content.profile,
    clip,
  };
};