import { Validation } from '@/presentation/contracts'
import { ClientError } from '@/presentation/errors'
import { ValidationBuilder, ValidationComposite } from '@/presentation/validation'
import { faker } from '@faker-js/faker'

type ValidationInput = Partial<{
  name: string
  contact: {
    email: string
    [key: string]: unknown
  }
}>

const generateFakeInput = (): ValidationInput => ({
  name: faker.name.fullName(),
  contact: {
    email: faker.internet.email()
  }
})

describe('ValidationComposite', () => {
  let fakeInput: ValidationInput

  beforeEach(() => {
    fakeInput = generateFakeInput()
  })

  it('should throw ClientError if a required root attribute is not provided', () => {
    const fakeErrorInput: ValidationInput = {
      ...fakeInput,
      name: undefined
    }

    const validationSchema: Validation.Schema = {
      name: ValidationBuilder.of(fakeErrorInput.name).required().build(),
      contact: {
        email: ValidationBuilder.of(fakeErrorInput.contact?.email).required().build()
      }
    }

    const expectedError = new ClientError({
      name: ['This field must be required']
    })

    let result: ClientError | undefined

    const sut = new ValidationComposite(validationSchema)

    try {
      sut.execute()
    } catch (error) {
      result = error as ClientError
    }

    expect(result?.name).toBe(expectedError.name)
    expect(result?.data).toEqual(expectedError.data)
  })

  it('should throw ClientError if a required nested attribute is not provided', () => {
    const fakeErrorInput: ValidationInput = {
      ...fakeInput,
      contact: {
        email: undefined as unknown as string
      }
    }

    const validationSchema: Validation.Schema = {
      name: ValidationBuilder.of(fakeErrorInput.name).required().build(),
      contact: {
        email: ValidationBuilder.of(fakeErrorInput.contact?.email).required().build()
      }
    }

    const expectedError = new ClientError({
      contact: {
        email: ['This field must be required']
      }
    })

    let result: ClientError | undefined

    const sut = new ValidationComposite(validationSchema)

    try {
      sut.execute()
    } catch (error) {
      result = error as ClientError
    }

    expect(result?.name).toBe(expectedError.name)
    expect(result?.data).toEqual(expectedError.data)
  })

  it('should throw ClientError if many required attributes are not provided', () => {
    const fakeErrorInput: ValidationInput = {
      name: undefined,
      contact: {
        email: undefined as unknown as string
      }
    }

    const validationSchema: Validation.Schema = {
      name: ValidationBuilder.of(fakeErrorInput.name).required().isString().build(),
      contact: {
        email: ValidationBuilder.of(fakeErrorInput.contact?.email).required().build()
      }
    }

    const expectedError = new ClientError({
      name: ['This field must be required', 'This field must be a string'],
      contact: {
        email: ['This field must be required']
      }
    })

    let result: ClientError | undefined

    const sut = new ValidationComposite(validationSchema)

    try {
      sut.execute()
    } catch (error) {
      result = error as ClientError
    }

    expect(result?.name).toBe(expectedError.name)
    expect(result?.data).toEqual(expectedError.data)
  })

  it('should throw ClientError if optional attributes are provided with the wrong data.', () => {
    const fakeErrorInput: ValidationInput = {
      name: null as unknown as string
    }

    const validationSchema: Validation.Schema = {
      name: ValidationBuilder.of(fakeErrorInput.name).optional().isString().build(),
      contact: {
        email: ValidationBuilder.of(fakeErrorInput.contact?.email).optional().isString().build()
      }
    }

    const expectedError = new ClientError({
      name: ['This field must be a string']
    })

    let result: ClientError | undefined

    const sut = new ValidationComposite(validationSchema)

    try {
      sut.execute()
    } catch (error) {
      result = error as ClientError
    }

    expect(result?.name).toBe(expectedError.name)
    expect(result?.data).toEqual(expectedError.data)
  })

  it('should execute without errors if optional attributes are not sent', () => {
    const fakeErrorInput: ValidationInput = {
      name: undefined as unknown as string,
      contact: {
        email: undefined as unknown as string
      }
    }

    const validationSchema: Validation.Schema = {
      name: ValidationBuilder.of(fakeErrorInput.name).optional().isString().build(),
      contact: {
        email: ValidationBuilder.of(fakeErrorInput.contact?.email).optional().isString().build()
      }
    }

    const sut = new ValidationComposite(validationSchema)

    const result = sut.execute()

    expect(result).toBeUndefined()
  })

  it('should finish execution without errors when a valid input is provided', () => {
    const validationSchema: Validation.Schema = {
      name: ValidationBuilder.of(fakeInput.name).required().isString().build(),
      contact: {
        email: ValidationBuilder.of(fakeInput.contact?.email).optional().isString().build()
      }
    }
    const sut = new ValidationComposite(validationSchema)
    const result = sut.execute()

    expect(result).toBeUndefined()
  })
})
