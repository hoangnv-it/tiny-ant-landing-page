/// <reference types="vite/client" />

// Ảnh xử lý qua vite-imagetools với ?responsive (as=picture)
type ResponsivePicture = {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

declare module '*?responsive' {
  const picture: ResponsivePicture
  export default picture
}

declare module '*&responsive' {
  const picture: ResponsivePicture
  export default picture
}

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY: string
  readonly VITE_LEAD_ENDPOINT: string
  readonly VITE_CLARITY_ID?: string
}
