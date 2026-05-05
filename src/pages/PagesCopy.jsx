import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Screen from '../components/layout/Screen'
import Icon from '../components/Icon'
import { supabase } from '../lib/supabase'
import { toastSuccess, toastError } from '../lib/toast'

// ── Helpers ──────────────────────────────────────────────────────────────────

const F = ({ label, children, note }) => (
  <div className="field">
    <label>{label}</label>
    {children}
    {note && <div style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 2 }}>{note}</div>}
  </div>
)

const SectionCard = ({ title, children }) => (
  <div className="card" style={{ marginBottom: 12 }}>
    <div className="card-sub" style={{ marginBottom: 10 }}>{title}</div>
    {children}
  </div>
)

const Inp = ({ reg, ...rest }) => <input className="input" {...reg} {...rest} />
const Tex = ({ reg, minH = 70, ...rest }) => (
  <textarea className="input textarea" style={{ minHeight: minH }} {...reg} {...rest} />
)

// ── Per-page form components ──────────────────────────────────────────────────

const HomeForm = ({ register }) => (
  <>
    <SectionCard title="HERO">
      <F label="Headline"><Inp reg={register('hero.headline')} /></F>
      <F label="Body text"><Tex reg={register('hero.body')} /></F>
      <F label="Phone callout"><Inp reg={register('hero.phone_callout')} /></F>
      <F label="Languages line"><Inp reg={register('hero.languages')} /></F>
      <F label="Service area heading"><Inp reg={register('hero.service_area_heading')} /></F>
      <F label="Service area body"><Inp reg={register('hero.service_area_body')} /></F>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Primary button"><Inp reg={register('hero.primary_btn_label')} /></F>
        <F label="Secondary button"><Inp reg={register('hero.secondary_btn_label')} /></F>
      </div>
    </SectionCard>

    <SectionCard title="SETTLEMENTS SECTION">
      <F label="Heading"><Inp reg={register('settlements_section.heading')} /></F>
      <F label="Subheading"><Tex reg={register('settlements_section.subheading')} minH={50} /></F>
    </SectionCard>

    <SectionCard title="OUR APPROACH">
      <F label="Heading"><Inp reg={register('our_approach.heading')} /></F>
      <F label="Description"><Tex reg={register('our_approach.description')} /></F>
      <F label="Step 1 title"><Inp reg={register('our_approach.steps.0.title')} /></F>
      <F label="Step 1 description"><Tex reg={register('our_approach.steps.0.description')} minH={50} /></F>
      <F label="Step 2 title"><Inp reg={register('our_approach.steps.1.title')} /></F>
      <F label="Step 2 description"><Tex reg={register('our_approach.steps.1.description')} minH={50} /></F>
      <F label="Step 3 title"><Inp reg={register('our_approach.steps.2.title')} /></F>
      <F label="Step 3 description"><Tex reg={register('our_approach.steps.2.description')} minH={50} /></F>
      <F label="CTA button"><Inp reg={register('our_approach.cta_label')} /></F>
    </SectionCard>

    <SectionCard title="PRACTICE AREAS SECTION">
      <F label="Heading"><Inp reg={register('practice_areas_section.heading')} /></F>
      <F label="Subheading"><Tex reg={register('practice_areas_section.subheading')} /></F>
      <F label="CTA heading"><Inp reg={register('practice_areas_section.cta_heading')} /></F>
      <F label="CTA body"><Tex reg={register('practice_areas_section.cta_body')} minH={50} /></F>
      <F label="CTA button"><Inp reg={register('practice_areas_section.cta_label')} /></F>
    </SectionCard>

    <SectionCard title="PARTNERS SECTION">
      <F label="Heading"><Inp reg={register('partners_section.heading')} /></F>
      <F label="Subheading"><Tex reg={register('partners_section.subheading')} minH={50} /></F>
    </SectionCard>

    <SectionCard title="TESTIMONIALS SECTION">
      <F label="Heading"><Inp reg={register('testimonials_section.heading')} /></F>
      <F label="Subheading"><Tex reg={register('testimonials_section.subheading')} minH={50} /></F>
      <F label="View all button"><Inp reg={register('testimonials_section.view_all_label')} /></F>
    </SectionCard>

    <SectionCard title="CTA BAND">
      <F label="Heading"><Inp reg={register('cta.heading')} /></F>
      <F label="Body"><Tex reg={register('cta.body')} minH={50} /></F>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Primary button"><Inp reg={register('cta.primary_btn_label')} /></F>
        <F label="Phone button"><Inp reg={register('cta.phone_btn_label')} /></F>
      </div>
    </SectionCard>

    <SectionCard title="FAQ SECTION">
      <F label="Heading part 1"><Inp reg={register('faq_section.heading_part1')} /></F>
      <F label="Heading part 2"><Inp reg={register('faq_section.heading_part2')} /></F>
      <F label="Description"><Tex reg={register('faq_section.description')} minH={50} /></F>
      <F label="Secondary description"><Tex reg={register('faq_section.secondary_description')} minH={50} /></F>
      <F label="CTA button"><Inp reg={register('faq_section.cta_label')} /></F>
    </SectionCard>
  </>
)

const AboutForm = ({ register }) => (
  <>
    <SectionCard title="HERO">
      <F label="Heading"><Inp reg={register('hero.heading')} /></F>
      <F label="Subheading"><Tex reg={register('hero.subheading')} /></F>
    </SectionCard>
    <SectionCard title="MISSION">
      <F label="Heading"><Inp reg={register('mission.heading')} /></F>
      <F label="Body"><Tex reg={register('mission.body')} /></F>
    </SectionCard>
    <SectionCard title="VISION">
      <F label="Heading"><Inp reg={register('vision.heading')} /></F>
      <F label="Body"><Tex reg={register('vision.body')} /></F>
    </SectionCard>
    <SectionCard title="TEAM SECTION">
      <F label="Heading"><Inp reg={register('team_section.heading')} /></F>
      <F label="Subheading"><Tex reg={register('team_section.subheading')} /></F>
      <F label="CTA intro"><Inp reg={register('team_section.cta_intro')} /></F>
      <F label="CTA button"><Inp reg={register('team_section.cta_label')} /></F>
    </SectionCard>
    <SectionCard title="BRAND POSITIONING">
      <F label="Heading"><Inp reg={register('brand_positioning.heading')} /></F>
      <F label="Description"><Tex reg={register('brand_positioning.description')} /></F>
      <F label="CTA button"><Inp reg={register('brand_positioning.cta_label')} /></F>
    </SectionCard>
  </>
)

const ServicesForm = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'service_card.services' })

  return (
    <>
      <SectionCard title="HERO">
        <F label="Heading"><Inp reg={register('hero.heading')} /></F>
        <F label="Subheading"><Tex reg={register('hero.subheading')} /></F>
      </SectionCard>
      <SectionCard title="SERVICE CARD">
        <F label="Label"><Inp reg={register('service_card.label')} /></F>
        <F label="Title"><Inp reg={register('service_card.title')} /></F>
        <F label="Description"><Tex reg={register('service_card.description')} /></F>
        <F label="Highlight text"><Inp reg={register('service_card.highlight')} /></F>
        <F label="Image URL"><Inp reg={register('service_card.image_url')} placeholder="/images/car-accident.png" /></F>
        <F label="Services heading"><Inp reg={register('service_card.services_heading')} /></F>
        <div className="field">
          <label>Services list</label>
          {fields.map((field, i) => (
            <div key={field.id} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <input className="input" style={{ flex: 1 }} {...register(`service_card.services.${i}`)} />
              <button type="button" className="btn btn-sm" onClick={() => remove(i)}>✕</button>
            </div>
          ))}
          <button type="button" className="btn btn-sm" style={{ marginTop: 4 }} onClick={() => append('')}>
            + Add service
          </button>
        </div>
        <F label="CTA button"><Inp reg={register('service_card.cta_label')} /></F>
      </SectionCard>
      <SectionCard title="BOTTOM CTA">
        <F label="Heading"><Inp reg={register('bottom_cta.heading')} /></F>
        <F label="Body"><Tex reg={register('bottom_cta.body')} minH={50} /></F>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <F label="Primary button"><Inp reg={register('bottom_cta.primary_btn_label')} /></F>
          <F label="Phone button"><Inp reg={register('bottom_cta.phone_btn_label')} /></F>
        </div>
      </SectionCard>
    </>
  )
}

const ReviewsForm = ({ register }) => (
  <>
    <SectionCard title="HERO">
      <F label="Heading"><Inp reg={register('hero.heading')} /></F>
      <F label="Subheading"><Tex reg={register('hero.subheading')} /></F>
    </SectionCard>
    <SectionCard title="FILTERS">
      <F label="All reviews label"><Inp reg={register('filter_all_label')} /></F>
      <F label="No results message"><Inp reg={register('no_results_message')} /></F>
    </SectionCard>
    <SectionCard title="STATISTICS">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Avg rating value"><Inp reg={register('statistics.avg_rating_value')} /></F>
        <F label="Avg rating label"><Inp reg={register('statistics.avg_rating_label')} /></F>
        <F label="Satisfaction value"><Inp reg={register('statistics.satisfaction_value')} /></F>
        <F label="Satisfaction label"><Inp reg={register('statistics.satisfaction_label')} /></F>
      </div>
    </SectionCard>
    <SectionCard title="CTA">
      <F label="Heading"><Inp reg={register('cta.heading')} /></F>
      <F label="Body"><Tex reg={register('cta.body')} minH={50} /></F>
      <F label="CTA button"><Inp reg={register('cta.cta_label')} /></F>
    </SectionCard>
  </>
)

const ContactForm = ({ register }) => (
  <>
    <SectionCard title="HERO">
      <F label="Heading"><Inp reg={register('hero.heading')} /></F>
      <F label="Subheading"><Tex reg={register('hero.subheading')} /></F>
    </SectionCard>
    <SectionCard title="FORM">
      <F label="Heading"><Inp reg={register('form.heading')} /></F>
      <F label="Description"><Tex reg={register('form.description')} minH={50} /></F>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Name label"><Inp reg={register('form.fields.name_label')} /></F>
        <F label="Name placeholder"><Inp reg={register('form.fields.name_placeholder')} /></F>
        <F label="Email label"><Inp reg={register('form.fields.email_label')} /></F>
        <F label="Email placeholder"><Inp reg={register('form.fields.email_placeholder')} /></F>
        <F label="Phone label"><Inp reg={register('form.fields.phone_label')} /></F>
        <F label="Phone placeholder"><Inp reg={register('form.fields.phone_placeholder')} /></F>
        <F label="Message label"><Inp reg={register('form.fields.message_label')} /></F>
        <F label="Message placeholder"><Inp reg={register('form.fields.message_placeholder')} /></F>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Submit button"><Inp reg={register('form.submit_label')} /></F>
        <F label="Submit (sending)"><Inp reg={register('form.submit_label_sending')} /></F>
      </div>
      <F label="Success message"><Tex reg={register('form.success_message')} minH={50} /></F>
      <F label="Error message"><Tex reg={register('form.error_message')} minH={50} /></F>
    </SectionCard>
    <SectionCard title="CONTACT INFO SECTION">
      <F label="Heading"><Inp reg={register('contact_info_section.heading')} /></F>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Phone label"><Inp reg={register('contact_info_section.phone_label')} /></F>
        <F label="Phone help text"><Inp reg={register('contact_info_section.phone_help')} /></F>
        <F label="Email label"><Inp reg={register('contact_info_section.email_label')} /></F>
        <F label="Email help text"><Inp reg={register('contact_info_section.email_help')} /></F>
        <F label="Locations label"><Inp reg={register('contact_info_section.locations_label')} /></F>
        <F label="Locations help text"><Inp reg={register('contact_info_section.locations_help')} /></F>
        <F label="Office hours label"><Inp reg={register('contact_info_section.office_hours_label')} /></F>
      </div>
    </SectionCard>
    <SectionCard title="MAP SECTION">
      <F label="Heading"><Inp reg={register('map_section.heading')} /></F>
    </SectionCard>
  </>
)

// ── Site Settings (contact_info singleton) ────────────────────────────────────

const SiteSettingsForm = () => {
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm()
  const { fields: officeFields, append: addOffice, remove: removeOffice } = useFieldArray({ control, name: 'offices' })

  useEffect(() => {
    supabase.from('contact_info').select('*').eq('id', 'singleton').single()
      .then(({ data }) => {
        if (data) {
          reset({
            phone: data.phone,
            email: data.email,
            office_hours: data.office_hours,
            offices: data.offices ?? [],
            facebook: data.social_links?.facebook ?? '',
            instagram: data.social_links?.instagram ?? '',
            linkedin: data.social_links?.linkedin ?? '',
            tiktok: data.social_links?.tiktok ?? '',
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [reset])

  const onSubmit = async (values) => {
    try {
      const { error } = await supabase.from('contact_info').upsert({
        id: 'singleton',
        phone: values.phone,
        email: values.email,
        office_hours: values.office_hours,
        offices: values.offices,
        social_links: {
          facebook: values.facebook,
          instagram: values.instagram,
          linkedin: values.linkedin,
          tiktok: values.tiktok,
        },
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toastSuccess('Site settings saved')
    } catch (err) {
      toastError(err.message)
    }
  }

  if (loading) return <div className="card-sub" style={{ padding: 20 }}>Loading…</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save'}
        </button>
      </div>

      <SectionCard title="CONTACT">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <F label="Phone"><Inp reg={register('phone')} /></F>
          <F label="Email"><Inp reg={register('email')} /></F>
        </div>
        <F label="Office hours"><Inp reg={register('office_hours')} /></F>
      </SectionCard>

      <SectionCard title="SOCIAL LINKS">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <F label="Facebook URL"><Inp reg={register('facebook')} /></F>
          <F label="Instagram URL"><Inp reg={register('instagram')} /></F>
          <F label="LinkedIn URL"><Inp reg={register('linkedin')} /></F>
          <F label="TikTok URL"><Inp reg={register('tiktok')} /></F>
        </div>
      </SectionCard>

      <SectionCard title="OFFICES">
        {officeFields.map((field, i) => (
          <div key={field.id} className="card" style={{ marginBottom: 10, background: 'var(--paper-2)', border: '1px dashed var(--line-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div className="card-sub">Office {i + 1}</div>
              <button type="button" className="btn btn-sm" onClick={() => removeOffice(i)}>Remove</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <F label="Key (slug)"><Inp reg={register(`offices.${i}.key`)} placeholder="carrollton" /></F>
              <F label="Name"><Inp reg={register(`offices.${i}.name`)} placeholder="Carrollton" /></F>
              <F label="Phone"><Inp reg={register(`offices.${i}.phone`)} /></F>
              <F label="Email"><Inp reg={register(`offices.${i}.email`)} /></F>
            </div>
            <F label="Address (HTML ok: use &lt;br/&gt; for line breaks)">
              <Tex reg={register(`offices.${i}.address`)} minH={50} />
            </F>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <F label="Latitude"><Inp reg={register(`offices.${i}.latitude`)} type="number" step="any" /></F>
              <F label="Longitude"><Inp reg={register(`offices.${i}.longitude`)} type="number" step="any" /></F>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn"
          onClick={() => addOffice({ key: '', name: '', address: '', latitude: '', longitude: '', phone: '', email: '' })}
        >
          <Icon name="plus" size={14} /> Add office
        </button>
      </SectionCard>
    </form>
  )
}

// ── Page editor (loads + saves a pages row) ────────────────────────────────────

const PAGE_FORMS = {
  home: HomeForm,
  about: AboutForm,
  services: ServicesForm,
  reviews: ReviewsForm,
  contact: ContactForm,
}

const PAGE_LABELS = { home: 'Home', about: 'About', services: 'Services', reviews: 'Reviews', contact: 'Contact' }

const PageEditor = ({ slug }) => {
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm()

  useEffect(() => {
    setLoading(true)
    supabase.from('pages').select('content').eq('slug', slug).single()
      .then(({ data }) => {
        if (data?.content) reset(data.content)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug, reset])

  const onSubmit = async (values) => {
    try {
      const { error } = await supabase.from('pages').upsert({ slug, content: values, updated_at: new Date().toISOString() })
      if (error) throw error
      toastSuccess(`${PAGE_LABELS[slug]} page saved`)
    } catch (err) {
      toastError(err.message)
    }
  }

  if (loading) return <div className="card-sub" style={{ padding: 20 }}>Loading…</div>

  const FormComponent = PAGE_FORMS[slug]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save'}
        </button>
      </div>
      <FormComponent register={register} control={control} />
    </form>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

const SURFACES = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
  { id: 'settings', label: 'Site Settings' },
]

const PagesCopy = () => {
  const [active, setActive] = useState('home')

  return (
    <Screen title="Pages & Copy">
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 18 }}>
        <div className="card" style={{ padding: 12, alignSelf: 'start' }}>
          <div className="card-sub" style={{ marginBottom: 8 }}>SURFACES</div>
          {SURFACES.map((s) => (
            <div
              key={s.id}
              style={{
                padding: '8px 10px',
                borderRadius: 5,
                background: active === s.id ? 'var(--highlight)' : 'transparent',
                fontWeight: active === s.id ? 600 : 400,
                fontSize: 14,
                cursor: 'pointer',
              }}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </div>
          ))}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div className="f-hand" style={{ fontSize: 24 }}>
                {SURFACES.find(s => s.id === active)?.label}
              </div>
              <div className="card-sub">
                {active === 'settings' ? 'Phone, email, offices, social links' : `Editable copy for the ${active} page`}
              </div>
            </div>
          </div>

          {active === 'settings' ? (
            <SiteSettingsForm key="settings" />
          ) : (
            <PageEditor key={active} slug={active} />
          )}
        </div>
      </div>
    </Screen>
  )
}

export default PagesCopy
