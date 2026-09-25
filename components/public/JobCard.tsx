import Link from 'next/link'
import type { Job } from '@/lib/data/site'

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/vacatures/${job.slug}`} className="job-card">
      <div className="job-thumb"><img src={job.img} alt={job.title} /></div>
      <div>
        <h3>{job.title}</h3>
        {job.company && <div className="company">{job.company}</div>}
        <div className="job-meta">
          <span>⌂ {job.city}</span>
          <span>{job.salary}</span>
          <span>◷ {job.hours}</span>
          <span>○ {job.type}</span>
        </div>
      </div>
      <div className="job-action">→</div>
    </Link>
  )
}
