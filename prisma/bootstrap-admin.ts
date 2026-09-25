// Maakt bij een deploy het eerste admin-account aan als ADMIN_EMAIL en ADMIN_PASSWORD gezet zijn.
// Een bestaand account wordt nooit aangepast, dus het wachtwoord later wijzigen blijft behouden.
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.log('ℹ️  ADMIN_EMAIL/ADMIN_PASSWORD niet gezet: geen admin aangemaakt.')
    return
  }
  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD moet minstens 12 tekens lang zijn.')
  }

  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })
  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      console.log(`✅ Admin ${email} bestaat al.`)
      return
    }
    await prisma.user.create({
      data: {
        email,
        name: process.env.ADMIN_NAME || 'Administrator',
        passwordHash: await hash(password, 12),
        role: 'ADMIN',
      },
    })
    console.log(`✅ Admin ${email} aangemaakt.`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
