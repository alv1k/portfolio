// Analytics & Tracking for portfolio.tiinservice.online

function getOrCreateVisitorId() {
  try {
    let vid = localStorage.getItem('portfolio_vid')
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
      localStorage.setItem('portfolio_vid', vid)
    }
    return vid
  } catch (e) {
    return 'v_anon_' + Math.random().toString(36).substring(2, 10)
  }
}

function getOrCreateSessionId() {
  try {
    let sid = sessionStorage.getItem('portfolio_sid')
    if (!sid) {
      sid = 's_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
      sessionStorage.setItem('portfolio_sid', sid)
    }
    return sid
  } catch (e) {
    return 's_anon_' + Math.random().toString(36).substring(2, 10)
  }
}

function getDeviceType() {
  const width = window.innerWidth
  if (width <= 768) return 'mobile'
  if (width <= 1024) return 'tablet'
  return 'desktop'
}

export function initTracker() {
  if (typeof window === 'undefined') return

  const visitorId = getOrCreateVisitorId()
  const sessionId = getOrCreateSessionId()
  const startTime = Date.now()

  let maxScrollPercent = 0
  let maxScrollPx = 0
  let lastReportedPercent = 0

  function getDurationSeconds() {
    return Math.round((Date.now() - startTime) / 1000)
  }

  // 1. Log Visit
  try {
    fetch('/api/portfolio/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        visitor_id: visitorId,
        page_url: window.location.href,
        path: window.location.pathname,
        referrer: document.referrer || '',
        user_agent: navigator.userAgent || '',
        device_type: getDeviceType(),
        screen_width: window.screen ? window.screen.width : window.innerWidth,
        screen_height: window.screen ? window.screen.height : window.innerHeight,
        language: navigator.language || '',
      }),
    }).catch(() => {})
  } catch (e) {}

  // 2. Track Scroll Depth
  function checkScroll() {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || 0
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    )

    const currentPx = Math.round(scrollY + windowHeight)
    if (currentPx > maxScrollPx) {
      maxScrollPx = currentPx
    }

    const currentPercent = docHeight > windowHeight
      ? Math.min(100, Math.round((currentPx / docHeight) * 100))
      : 100

    if (currentPercent > maxScrollPercent) {
      maxScrollPercent = currentPercent
    }

    // Report milestones (25%, 50%, 75%, 90%, 100%)
    if (maxScrollPercent >= lastReportedPercent + 15 || (maxScrollPercent === 100 && lastReportedPercent < 100)) {
      lastReportedPercent = maxScrollPercent
      sendScrollUpdate()
    }
  }

  let scrollTimeout = null
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null
        checkScroll()
      }, 200)
    }
  }, { passive: true })

  // Initial check
  setTimeout(checkScroll, 500)

  function sendScrollUpdate() {
    try {
      fetch('/api/portfolio/scroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          scroll_percent: maxScrollPercent,
          scroll_px: maxScrollPx,
          duration_seconds: getDurationSeconds(),
        }),
      }).catch(() => {})
    } catch (e) {}
  }

  // 3. Final Beacon on Exit
  function sendBeacon() {
    checkScroll()
    const payload = JSON.stringify({
      session_id: sessionId,
      scroll_percent: maxScrollPercent,
      scroll_px: maxScrollPx,
      duration_seconds: getDurationSeconds(),
    })

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/portfolio/beacon', payload)
    } else {
      fetch('/api/portfolio/beacon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendBeacon()
    }
  })

  window.addEventListener('pagehide', sendBeacon)
  window.addEventListener('beforeunload', sendBeacon)

  // 4. Track Clicks
  document.addEventListener('click', (e) => {
    try {
      const target = e.target.closest('a, button, input[type="submit"], input[type="button"], [role="button"], .project-card, .contact-card')
      if (!target) return

      const tag = target.tagName.toLowerCase()
      const elementId = target.id || ''
      const classes = typeof target.className === 'string' ? target.className : ''
      const text = (target.innerText || target.value || target.getAttribute('aria-label') || target.title || '').trim().substring(0, 100)
      const targetUrl = target.getAttribute('href') || target.getAttribute('data-href') || ''

      const scrollY = window.scrollY || window.pageYOffset || 0
      const windowHeight = window.innerHeight || 1
      const docHeight = document.documentElement.scrollHeight || 1
      const clickScrollPercent = Math.min(100, Math.round(((scrollY + windowHeight) / docHeight) * 100))

      fetch('/api/portfolio/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          visitor_id: visitorId,
          element_tag: tag,
          element_id: elementId,
          element_classes: classes.substring(0, 200),
          element_text: text,
          target_url: targetUrl.substring(0, 500),
          scroll_depth_percent: clickScrollPercent,
          x_coord: Math.round(e.clientX),
          y_coord: Math.round(e.clientY),
        }),
        keepalive: true,
      }).catch(() => {})
    } catch (err) {}
  }, { capture: true, passive: true })
}
