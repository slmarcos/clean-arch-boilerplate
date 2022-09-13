import { Validator } from '@/presentation/contracts'

export interface Validation {
  execute: () => void
}

export namespace Validation {
  export type Schema = {
    [key: string]: Validator[] | Validation.Schema
  }
}
