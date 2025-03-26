export function pageSelector(peerPage: number, length: number) {
  return peerPage && peerPage !== 0 ? Math.ceil(length / peerPage) : length
}
