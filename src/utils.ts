export function normalizeCountryName(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize('NFD')
      // biome-ignore lint/suspicious/noMisleadingCharacterClass:
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/,.*/g, '')
      .replace(/\(.*\)/g, '')
      .replace(/-/g, '')
      // .replace(/^iles?/g, '')
      // .replace(/^sainte?/g, '')
      .replace(/ du /g, '')
      .replace(/d'/g, '')
      .replace(/[ \-]et[ \-]/g, '')
      .replace(/pp/g, 'p')
      .replace(/ll/g, 'l')

      .replace(/herzegovine/, '')

      .replace(/ /g, '')
  );
}
