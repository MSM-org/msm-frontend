export function normalizeBase(value = '/') {
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(value)) throw new Error('VITE_BASE_PATH must start and end with /, for example /msm-frontend/.')
  return value
}

export function withBase(path, base = '/') {
  return path.startsWith('/') && !path.startsWith('//') ? `${base.slice(0, -1)}${path}` : path
}

export function withoutBase(path, base = '/') {
  const prefix = base.slice(0, -1)
  return prefix && (path === prefix || path.startsWith(`${prefix}/`)) ? path.slice(prefix.length) || '/' : path
}

export function prefixMarkupPaths(markup, base = '/') {
  return markup.replace(/\b(href|src)="(\/[^" ]*)"/g, (_, attribute, path) => `${attribute}="${withBase(path, base)}"`)
}
