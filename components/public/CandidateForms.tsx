'use client'

import {
  applyToVacancy,
  requestKennismaking,
  submitContact,
  submitCvCheck,
  submitOpenSollicitatie,
  submitRecruitmentScan,
  subscribeJobAlert,
} from '@/app/actions/public'
import { ActionForm, CvUpload, Field, availabilityOptions, callOptions, experienceOptions, sectorOptions } from './forms'

/** "Laat je cv checken": compact, zodat de recruiter snel kan zien of iemand relevant is. */
export function CvCheckForm({ vacancySlug }: { vacancySlug?: string }) {
  return (
    <ActionForm
      action={submitCvCheck}
      hidden={{ vacancySlug }}
      submitLabel="Laat mijn cv checken →"
      successTitle="Bedankt, je cv is binnen."
      successText="We bekijken je profiel en nemen contact op als je achtergrond aansluit."
    >
      <div className="form-grid">
        <Field name="firstName" label="Voornaam" required autoComplete="given-name" />
        <Field name="lastName" label="Achternaam" required autoComplete="family-name" />
        <Field name="email" label="E-mailadres" type="email" required autoComplete="email" />
        <Field name="phone" label="Telefoonnummer" type="tel" required autoComplete="tel" />
        <Field name="city" label="Woonplaats" required autoComplete="address-level2" />
        <Field name="sector" label="Vakgebied" required options={sectorOptions} />
        <Field name="currentRole" label="Huidige functie" required />
        <Field name="yearsExperience" label="Jaren ervaring" required options={experienceOptions} />
        <CvUpload required />
        <Field name="motivation" label="Korte toelichting" textarea rows={3} full placeholder="Wat zoek je en wat maakt je ervaring relevant?" />
        <Field name="linkedin" label="LinkedIn (optioneel)" type="url" placeholder="https://linkedin.com/in/..." />
        <Field name="availability" label="Beschikbaarheid (optioneel)" options={availabilityOptions} />
      </div>
    </ActionForm>
  )
}

/** Korte telefonische kennismaking (15 min). Geen agenda: de recruiter belt terug om een moment af te stemmen. */
export function KennismakingForm() {
  return (
    <ActionForm
      action={requestKennismaking}
      submitLabel="Vraag een korte kennismaking aan →"
      successTitle="Bedankt voor je aanvraag."
      successText="We bekijken je gegevens en bellen je als er een goede match lijkt te zijn, om een moment voor een kort gesprek af te stemmen."
    >
      <div className="form-grid">
        <Field name="firstName" label="Voornaam" required autoComplete="given-name" />
        <Field name="lastName" label="Achternaam" required autoComplete="family-name" />
        <Field name="email" label="E-mailadres" type="email" required autoComplete="email" />
        <Field name="phone" label="Telefoonnummer" type="tel" required autoComplete="tel" />
        <Field name="sector" label="Vakgebied" required options={sectorOptions} />
        <Field name="currentRole" label="Huidige functie" required />
        <Field name="yearsExperience" label="Jaren ervaring" required options={experienceOptions} />
        <Field name="callPreference" label="Wanneer ben je het best bereikbaar?" required options={callOptions} />
        <Field name="motivation" label="Waar wil je het over hebben?" textarea rows={3} full />
        <CvUpload />
      </div>
    </ActionForm>
  )
}

/** Open sollicitatie als voorselectie: gewenste functie, vakgebied, ervaring, regio en cv. */
export function OpenSollicitatieForm({ onSuccess }: { onSuccess?: () => void }) {
  return (
    <ActionForm
      action={submitOpenSollicitatie}
      onSuccess={onSuccess}
      submitLabel="Verstuur open sollicitatie →"
      successTitle="Bedankt voor je open sollicitatie."
      successText="We bekijken eerst of je profiel aansluit op onze vacatures en opdrachtgevers, en nemen contact op als er iets passends is."
    >
      <p className="form-intro">Na je aanmelding bekijken we eerst of je profiel aansluit op onze vacatures en opdrachtgevers.</p>
      <div className="form-grid">
        <Field name="firstName" label="Voornaam" required autoComplete="given-name" />
        <Field name="lastName" label="Achternaam" required autoComplete="family-name" />
        <Field name="email" label="E-mailadres" type="email" required autoComplete="email" />
        <Field name="phone" label="Telefoonnummer" type="tel" autoComplete="tel" />
        <Field name="desiredRole" label="Gewenste functie" required />
        <Field name="sector" label="Vakgebied" required options={sectorOptions} />
        <Field name="yearsExperience" label="Werkervaring" required options={experienceOptions} />
        <Field name="city" label="Regio" required placeholder="Bijv. Gelderland" />
        <CvUpload required />
        <Field name="motivation" label="Vertel kort wat je zoekt" textarea rows={3} full />
      </div>
    </ActionForm>
  )
}

/** Solliciteren op een vacature: kort en overzichtelijk; LinkedIn en toelichting zijn optioneel. */
export function ApplyForm({ vacancySlug, vacancyTitle }: { vacancySlug: string; vacancyTitle: string }) {
  return (
    <ActionForm
      action={applyToVacancy}
      hidden={{ vacancySlug }}
      submitLabel="Verstuur sollicitatie →"
      successTitle="Bedankt voor je sollicitatie."
      successText={`We hebben je sollicitatie voor ${vacancyTitle} ontvangen.`}
    >
      <div className="form-grid">
        <Field name="firstName" label="Voornaam" required autoComplete="given-name" />
        <Field name="lastName" label="Achternaam" required autoComplete="family-name" />
        <Field name="email" label="E-mailadres" type="email" required autoComplete="email" />
        <Field name="phone" label="Telefoonnummer" type="tel" required autoComplete="tel" />
        <Field name="city" label="Woonplaats (optioneel)" autoComplete="address-level2" />
        <Field name="linkedin" label="LinkedIn-profiel (optioneel)" type="url" placeholder="https://linkedin.com/in/..." />
        <CvUpload required />
        <Field name="motivation" label="Motivatie of toelichting (optioneel)" textarea rows={4} full placeholder="Waarom spreekt deze functie je aan?" />
        <label className="consent full">
          <input type="checkbox" name="consent" required />
          <span>Ik geef The Move Maker toestemming mijn gegevens te gebruiken voor deze sollicitatie. Zie de <a href="/privacy" target="_blank">privacyverklaring</a>.</span>
        </label>
      </div>
    </ActionForm>
  )
}

export function ScanForm({ rows = 4, onSuccess }: { rows?: number; onSuccess?: () => void }) {
  return (
    <ActionForm
      action={submitRecruitmentScan}
      onSuccess={onSuccess}
      submitLabel="Verstuur aanvraag →"
      successTitle="Bedankt voor je aanvraag."
      successText="We kijken naar je vacature en nemen binnen twee werkdagen contact met je op."
    >
      <div className="form-grid">
        <Field name="companyName" label="Bedrijfsnaam" required autoComplete="organization" />
        <Field name="name" label="Naam" required autoComplete="name" />
        <Field name="email" label="E-mailadres" type="email" required autoComplete="email" />
        <Field name="phone" label="Telefoonnummer" type="tel" autoComplete="tel" />
        <Field name="vacancyTitle" label="Functietitel" required />
        <Field name="location" label="Locatie" />
        <Field name="challenge" label="Waar loopt u tegenaan?" textarea rows={rows} full />
      </div>
    </ActionForm>
  )
}

export function ContactForm() {
  return (
    <ActionForm
      action={submitContact}
      submitLabel="Verstuur bericht →"
      successTitle="Bedankt voor je bericht."
      successText="We reageren binnen één werkdag."
    >
      <div className="form-grid">
        <Field name="name" label="Naam" required autoComplete="name" />
        <Field name="email" label="E-mailadres" type="email" required autoComplete="email" />
        <Field name="phone" label="Telefoonnummer" type="tel" autoComplete="tel" />
        <Field name="vacancyTitle" label="Onderwerp" options={['Ik zoek een baan', 'Ik zoek personeel', 'Recruitment marketing', 'Overig']} />
        <Field name="challenge" label="Bericht" required textarea rows={5} full />
      </div>
    </ActionForm>
  )
}

export function JobAlertForm({ sectors, sector, compact }: { sectors: string[]; sector?: string; compact?: boolean }) {
  return (
    <ActionForm
      action={subscribeJobAlert}
      successTitle="Vacature-alert ingesteld."
      successText="Je ontvangt nieuwe vacatures in je inbox."
      className={compact ? 'alert-inline' : undefined}
      actions={(pending) => (
        <button className={`btn btn-sm ${compact ? 'btn-dark' : 'btn-primary'}`} style={compact ? undefined : { width: '100%' }} type="submit" disabled={pending}>
          {pending ? 'Bezig…' : 'Houd mij op de hoogte →'}
        </button>
      )}
    >
      {sector ? (
        <input type="hidden" name="sector" value={sector} />
      ) : (
        <select className="form-control" name="sector" aria-label="Vakgebied" defaultValue={sectors[0]}>
          {sectors.map((s) => <option key={s}>{s}</option>)}
        </select>
      )}
      <input className="form-control" name="email" type="email" required placeholder="E-mailadres" aria-label="E-mailadres" style={compact ? { width: 220 } : undefined} />
    </ActionForm>
  )
}
