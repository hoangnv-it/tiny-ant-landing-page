// Logic form đăng ký demo: kiểm tra SĐT, nguồn UTM, gửi tới VITE_LEAD_ENDPOINT.

/** Bỏ khoảng trắng/dấu chấm/gạch, đổi +84/84 thành 0. */
export function normalizePhone(raw: string): string {
  let p = raw.replace(/[\s.\-()]/g, '')
  if (p.startsWith('+84')) p = '0' + p.slice(3)
  else if (/^84\d{9}$/.test(p)) p = '0' + p.slice(2)
  return p
}

/** SĐT di động Việt Nam: 10 số, đầu 03/05/07/08/09. */
export function isValidPhone(raw: string): boolean {
  return /^0[35789]\d{8}$/.test(normalizePhone(raw))
}

export type Source = { utm_source?: string; utm_medium?: string; utm_campaign?: string }

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const
const UTM_STORE = 'tinyant-utm'

/**
 * UTM của lượt truy cập: lấy từ URL; nếu URL không có (đã chuyển trang) thì lấy bản đã lưu.
 * sessionStorage có thể bị chặn — luôn bọc try/catch.
 */
export function readSource(): Source {
  const params = new URLSearchParams(location.search)
  const fromUrl: Source = {}
  for (const k of UTM_KEYS) {
    const v = params.get(k)
    if (v) fromUrl[k] = v.slice(0, 200)
  }
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(UTM_STORE, JSON.stringify(fromUrl))
      return fromUrl
    }
    return JSON.parse(sessionStorage.getItem(UTM_STORE) ?? '{}') as Source
  } catch {
    return fromUrl
  }
}

export type LeadPayload = {
  phone: string
  name: string
  center: string
  website: string // honeypot
  turnstileToken: string
  source: Source
  position: string
  page: string
  createdAt: string
}

/**
 * Gửi lead. Content-Type text/plain là "simple request" nên không có preflight CORS —
 * Google Apps Script không trả lời được OPTIONS.
 */
export async function sendLead(payload: LeadPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT
  if (!endpoint) throw new Error('VITE_LEAD_ENDPOINT chưa được cấu hình')
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = (await res.json()) as { ok?: boolean; error?: string }
  if (!data.ok) throw new Error(data.error ?? 'Máy chủ từ chối')
}
