import path from 'path'
import { addAlias } from 'module-alias'

const setupModuleAlias = (): void => {
  const aliasPath = path.join(__dirname, '..', '..')
  addAlias('@', aliasPath)
}

setupModuleAlias()
