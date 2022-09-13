export interface Validator {
  readonly value: unknown

  execute: () => Error | undefined
}
