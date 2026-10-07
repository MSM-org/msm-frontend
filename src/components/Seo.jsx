import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo, renderSeoHead, validateSiteUrl } from '../seo/config'

const origin = validateSiteUrl(import.meta.env.VITE_SITE_URL)

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.head.querySelectorAll('[data-seo]').forEach(node => node.remove())
    document.head.insertAdjacentHTML('beforeend', renderSeoHead(getSeo(pathname, origin)))
  }, [pathname])
  return null
}
