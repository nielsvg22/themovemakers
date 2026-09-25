import { formatSalary, formatDate, formatRelativeTime, generateSlug, truncate, getInitials, getStatusColor, getChannelLabel, getChannelIcon } from '@/lib/utils'

describe('Utility functions', () => {
  describe('formatSalary', () => {
    it('formats salary range correctly', () => {
      expect(formatSalary(4000, 5500, 'maand')).toBe('€ 4.000 - € 5.500 per maand')
    })

    it('handles only minimum salary', () => {
      expect(formatSalary(4000, null, 'maand')).toBe('€ 4.000+ per maand')
    })

    it('handles only maximum salary', () => {
      expect(formatSalary(null, 5500, 'maand')).toBe('Tot € 5.500 per maand')
    })

    it('returns Marktconform when both null', () => {
      expect(formatSalary(null, null, 'maand')).toBe('Marktconform')
    })
  })

  describe('formatDate', () => {
    it('formats date in Dutch locale', () => {
      const date = new Date('2024-01-15')
      expect(formatDate(date)).toContain('15 januari 2024')
    })
  })

  describe('generateSlug', () => {
    it('generates slug from text', () => {
      expect(generateSlug('Uitvoerder Bouw Utrecht')).toBe('uitvoerder-bouw-utrecht')
    })

    it('handles special characters', () => {
      expect(generateSlug('Projectleider (Senior) - Amsterdam!')).toBe('projectleider-senior-amsterdam')
    })

    it('handles multiple spaces', () => {
      expect(generateSlug('Senior   Projectleider')).toBe('senior-projectleider')
    })
  })

  describe('truncate', () => {
    it('truncates long text', () => {
      expect(truncate('Dit is een heel lange tekst die getruncated moet worden', 20)).toBe('Dit is een heel lan...')
    })

    it('returns original if shorter', () => {
      expect(truncate('Korte tekst', 20)).toBe('Korte tekst')
    })
  })

  describe('getInitials', () => {
    it('gets initials from name', () => {
      expect(getInitials('Sophie de Vries')).toBe('SV')
      expect(getInitials('Mark Jansen')).toBe('MJ')
    })
  })

  describe('getStatusColor', () => {
    it('returns correct color for vacancy statuses', () => {
      expect(getStatusColor('ACTIEF')).toBe('bg-green-100 text-green-700')
      expect(getStatusColor('CONCEPT')).toBe('bg-gray-100 text-gray-700')
      expect(getStatusColor('GEPAUZEERD')).toBe('bg-yellow-100 text-yellow-700')
    })

    it('returns correct color for application statuses', () => {
      expect(getStatusColor('NIEUW')).toBe('bg-blue-100 text-blue-700')
      expect(getStatusColor('GESPREK')).toBe('bg-purple-100 text-purple-700')
      expect(getStatusColor('GEPLAATST')).toBe('bg-green-100 text-green-700')
      expect(getStatusColor('AFGEWEZEN')).toBe('bg-red-100 text-red-700')
    })
  })

  describe('getChannelLabel', () => {
    it('returns correct labels', () => {
      expect(getChannelLabel('EIGEN_WEBSITE')).toBe('Eigen website')
      expect(getChannelLabel('GOOGLE_FOR_JOBS')).toBe('Google for Jobs')
      expect(getChannelLabel('LINKEDIN')).toBe('LinkedIn')
      expect(getChannelLabel('INDEED')).toBe('Indeed')
    })
  })

  describe('getChannelIcon', () => {
    it('returns correct icons', () => {
      expect(getChannelIcon('EIGEN_WEBSITE')).toBe('🌐')
      expect(getChannelIcon('LINKEDIN')).toBe('in')
      expect(getChannelIcon('INDEED')).toBe('i')
    })
  })
})