// Lokale ontwikkeldata: testaccounts (wachtwoord admin123) plus de demo-inhoud.
// Niet gebruiken in productie; daar maakt bootstrap-admin.ts het admin-account aan.
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'
import { seedDemo } from './demo-data'

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })

async function main() {
  console.log('🌱 Seeding database...')
  const passwordHash = await hash('admin123', 12)
  const users = [
    { email: 'niels@themovemaker.nl', name: 'Niels van Gortel', role: 'ADMIN' as const },
    { email: 'mark@themovemaker.nl', name: 'Mark de Jong', role: 'RECRUITER' as const },
    { email: 'lisa@themovemaker.nl', name: 'Lisa Bakker', role: 'RECRUITER' as const },
  ]
  for (const u of users) {
    await prisma.user.upsert({ where: { email: u.email }, update: {}, create: { ...u, passwordHash } })
  }

  const result = await seedDemo(prisma)
  console.log('✅ Database seeded successfully!', result)
  console.log('\n📧 Admin login: niels@themovemaker.nl / admin123')
  console.log('📧 Recruiter login: mark@themovemaker.nl / admin123')
  console.log('📧 Recruiter login: lisa@themovemaker.nl / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
