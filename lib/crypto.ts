import 'server-only'
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

// Versleuteling van gevoelige instellingen (zoals API-sleutels) in de database.
// De sleutel is afgeleid van NEXTAUTH_SECRET, dus zonder die omgevingsvariabele niet te lezen.
function key() {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('NEXTAUTH_SECRET ontbreekt')
  return createHash('sha256').update(`app-settings:${secret}`).digest()
}

export function encrypt(plain: string) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key(), iv)
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return ['v1', iv.toString('base64'), cipher.getAuthTag().toString('base64'), data.toString('base64')].join(':')
}

export function decrypt(value: string) {
  const [version, iv, tag, data] = value.split(':')
  if (version !== 'v1') throw new Error('Onbekend formaat')
  const decipher = createDecipheriv('aes-256-gcm', key(), Buffer.from(iv, 'base64'))
  decipher.setAuthTag(Buffer.from(tag, 'base64'))
  return Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString('utf8')
}
