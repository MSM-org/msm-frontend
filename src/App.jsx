import { useEffect, useRef } from 'react'
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import home from './pages/public/designs/home.html?raw'
import homeTwo from './pages/public/designs/home-2.html?raw'
import about from './pages/public/designs/about.html?raw'
import contact from './pages/public/designs/contact.html?raw'
import services from './pages/public/designs/services.html?raw'
import projects from './pages/public/designs/projects.html?raw'
import hseQuality from './pages/public/designs/hse-quality.html?raw'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Seo from './components/Seo'

// Only trusted, local, script-free design exports are rendered here.
function DesignPage({ markup, title }) {
  const root = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    root.current.querySelectorAll('.filter-btn').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('bg-primary'))))
    root.current.querySelector('#rfqForm button[type="submit"]')?.setAttribute('aria-describedby', 'rfq-notice')
    const frame = requestAnimationFrame(() => {
      const target = location.hash && document.getElementById(location.hash.slice(1))
      if (target) target.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [location, title])
  function handleClick(event) {
    const button = event.target.closest('.filter-btn')
    if (button) {
      root.current.querySelectorAll('.filter-btn').forEach(item => {
        const active = item === button
        item.setAttribute('aria-pressed', String(active))
        item.classList.toggle('bg-primary', active)
        item.classList.toggle('text-on-primary', active)
        item.classList.toggle('bg-surface-container-lowest', !active)
        item.classList.toggle('text-on-surface-variant', !active)
      })
      root.current.querySelectorAll('.project-item').forEach(card => card.classList.toggle('hidden', button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter))
    }
    const href = event.target.closest('a')?.getAttribute('href')
    if (href?.startsWith('/') && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
      event.preventDefault()
      navigate(href)
    }
  }
  function handleFiles(event) {
    if (event.target.id !== 'fileUpload') return
    const files = [...event.target.files]
    const overLimit = files.reduce((total, file) => total + file.size, 0) > 25 * 1024 * 1024
    event.target.setCustomValidity(overLimit ? 'Please select files totaling 25 MB or less.' : '')
    event.target.reportValidity()
    const display = root.current.querySelector('#fileListDisplay')
    display.textContent = overLimit ? 'Files exceed the 25 MB limit.' : files.map(file => file.name).join(' • ')
    display.classList.remove('hidden')
    display.setAttribute('role', 'status')
  }
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    if (!form.reportValidity()) return
    const fields = [...form.querySelectorAll('input:not([type="file"]):not([type="checkbox"]), select, textarea')]
    const body = fields.map(field => {
      const label = form.querySelector(`label[for="${field.id}"]`)?.textContent.replace(/\s+/g, ' ').trim() || field.id
      return `${label}: ${field.id === 'phoneNum' ? '+971 ' : ''}${field.value}`
    }).join('\n\n')
    const files = [...(form.querySelector('#fileUpload')?.files || [])]
    const attachments = files.length ? `\n\nDrawings to attach manually: ${files.map(file => file.name).join(', ')}` : ''
    const subject = `RFQ — ${form.querySelector('#projectLocation').value}`
    window.location.href = `mailto:servicesmsmtechnical@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + attachments)}`
    const message = root.current.querySelector('#formSuccessMessage')
    message.classList.remove('hidden')
    message.setAttribute('role', 'status')
  }
  return <div id="page-content" ref={root} onClick={handleClick} onChange={handleFiles} onSubmit={handleSubmit} dangerouslySetInnerHTML={{ __html: markup }} />
}
function PublicLayout() {
  return <div className="design-page"><Seo /><Navbar /><Outlet /><Footer /></div>
}
function HomePage({ markup, title }) {
  const { hash } = useLocation()
  const destination = { '#services': '/services', '#projects': '/projects', '#standards': '/hse-quality' }[hash]
  return destination ? <Navigate to={destination} replace /> : <DesignPage markup={markup} title={title} />
}
export function AppRoutes() {
  return <Routes>
    <Route element={<PublicLayout />}>
    <Route path="/" element={<HomePage markup={home} title="Home" />} />
    <Route path="/home-1" element={<HomePage markup={home} title="Home" />} />
    <Route path="/home-2" element={<HomePage markup={homeTwo} title="Home 2" />} />
    <Route path="/about-us" element={<DesignPage markup={about} title="About Us" />} />
    <Route path="/services" element={<DesignPage markup={services} title="Services" />} />
    <Route path="/projects" element={<DesignPage markup={projects} title="Projects" />} />
    <Route path="/hse-quality" element={<DesignPage markup={hseQuality} title="HSE & Quality" />} />
    <Route path="/contact" element={<DesignPage markup={contact} title="Contact & RFQ" />} />
    <Route path="/request-a-quote" element={<DesignPage markup={contact} title="Contact & RFQ" />} />
    <Route path="*" element={<main id="page-content" className="not-found"><h1>Page not found</h1><p>The requested page is unavailable.</p><Link to="/">Return to Home</Link></main>} />
    </Route>
  </Routes>
}
function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>
}
export default App
