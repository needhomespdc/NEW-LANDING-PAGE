// One entry per form. `env` is the server-side environment variable holding that form's endpoint URL.
export const FORMS = {
  contact: { env: 'FORM_ENDPOINT_CONTACT', required: ['first', 'last', 'tel', 'email'] },
  partner: { env: 'FORM_ENDPOINT_PARTNER', required: ['first', 'last', 'tel', 'email'] },
  'data-deletion': { env: 'FORM_ENDPOINT_DATA_DELETION', required: ['name', 'tel', 'email', 'confirm'] },
  waitlist: { env: 'FORM_ENDPOINT_WAITLIST', required: ['email'] },
  deactivation: { env: 'FORM_ENDPOINT_DEACTIVATION', required: ['name', 'tel', 'email', 'confirm'] },
}
