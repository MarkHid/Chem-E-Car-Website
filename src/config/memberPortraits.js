// Vite discovers portraits at development/build time; public URLs keep original filenames.
const portraitFiles = import.meta.glob('/public/images/members/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]/g, '');

const portraits = Object.keys(portraitFiles).sort().flatMap(path => {
  const filename = path.split('/').pop();
  if (!/\.(jpe?g|png|webp)$/i.test(filename)) return [];
  const stem = filename.replace(/\.[^.]+$/, '').replace(/^portrait[\s_-]+/i, '');
  return [{ key: normalize(stem), url: `/images/members/${filename}` }];
});

// Explicit aliases for roster names that differ from portrait filenames.
const portraitAliases = {
  [normalize('Chloe Elizabeth T.')]: 'Chloe Elizabeth Tan',
  [normalize('Raven Soetantyo')]: 'Raven Soetyonto',
  [normalize('Ethan J. Juwono')]: 'Jordan Juwono',
};

export function memberPortrait(member) {
  const name = normalize(member.name);
  const names = [name, normalize(portraitAliases[name] || member.name)];
  const match = portraits.find(portrait => names.includes(portrait.key))
    || portraits.find(portrait => portrait.key === normalize(member.role));
  return match?.url ?? null;
}
