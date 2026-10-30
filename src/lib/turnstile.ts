// Cloudflare Turnstile, chế độ tự ẩn (appearance: interaction-only): chỉ hiện ô kiểm tra
// khi Cloudflare cần người dùng tương tác. Script chỉ tải khi form sắp được dùng.

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  reset: (id: string) => void
}
declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let scriptPromise: Promise<TurnstileApi> | null = null

function loadScript(): Promise<TurnstileApi> {
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SCRIPT_URL
    s.async = true
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')))
    s.onerror = () => {
      scriptPromise = null
      reject(new Error('Không tải được Turnstile'))
    }
    document.head.appendChild(s)
  })
  return scriptPromise
}

/** Một widget gắn với một phần tử; lấy token bằng getToken(), dùng xong gọi reset(). */
export function createTurnstile(siteKey: string) {
  let api: TurnstileApi | null = null
  let widgetId: string | null = null
  let token: string | null = null
  let waiters: ((t: string | null) => void)[] = []
  let mounting: Promise<void> | null = null

  const settle = (t: string | null) => {
    token = t
    waiters.forEach((w) => w(t))
    waiters = []
  }

  function mount(el: HTMLElement): Promise<void> {
    mounting ??= loadScript().then((ts) => {
      api = ts
      widgetId = ts.render(el, {
        sitekey: siteKey,
        appearance: 'interaction-only',
        language: 'vi',
        callback: (t: string) => settle(t),
        'expired-callback': () => (token = null),
        'error-callback': () => settle(null),
      })
    })
    return mounting
  }

  /** Chờ token tối đa `timeoutMs`; null nếu lỗi hoặc hết giờ. */
  async function getToken(el: HTMLElement, timeoutMs = 15000): Promise<string | null> {
    await mount(el)
    if (token) return token
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), timeoutMs)
      waiters.push((t) => {
        clearTimeout(timer)
        resolve(t)
      })
    })
  }

  /** Token chỉ dùng được một lần: xin token mới sau mỗi lần gửi. */
  function reset() {
    token = null
    if (api && widgetId) api.reset(widgetId)
  }

  return { mount, getToken, reset }
}
