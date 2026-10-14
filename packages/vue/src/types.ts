/** Option for the native WSelect control. */
export interface WSelectOption {
  label: string
  value: string
  disabled?: boolean
}

/** A tab has a stable value which is also used as the panel slot name. */
export interface WTabItem {
  label: string
  value: string
  disabled?: boolean
}
