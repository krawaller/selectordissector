
export type VirtualElement = {
  type: string
  attrs?: {
    [attrName: string]: string | null
  }
  children?: VirtualElement[],
  content?: string
}
