export function formatFileTypes(fileTypes: readonly string[]): string {
  return fileTypes.map((fileType) => fileType.replace('application/', '').toUpperCase()).join(', ');
}
