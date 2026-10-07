import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo, renderSeoHead, validateSiteUrl } from '../seo/config'

const origin = validateSiteUrl(import.meta.env.VITE_SITE_URL)
const siteUrl = origin ? origin + import.meta.env.BASE_URL.slice(0, -1) : ''

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.head.querySelectorAll('[data-seo]').forEach(node => node.remove())
    document.head.insertAdjacentHTML('beforeend', renderSeoHead(getSeo(pathname, siteUrl)))
  }, [pathname])
  return null
}
