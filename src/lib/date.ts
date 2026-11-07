/** Ngày ISO sang kiểu Việt Nam: 2026-11-07 -> 07/11/2026 */
export const viDate = (iso: string) => iso.split('-').reverse().join('/')
