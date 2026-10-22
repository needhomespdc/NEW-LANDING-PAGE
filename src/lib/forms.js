// One entry per form. `env` is the server-side environment variable holding that form's endpoint URL.
export const FORMS = {
  contact: {
    env: 'FORM_ENDPOINT_CONTACT',
    required: ['first', 'last', 'tel', 'email'],
    fields: { first: 'firstName', last: 'lastName', tel: 'phone', email: 'email', message: 'message' },
  },
  partner: {
    env: 'FORM_ENDPOINT_PARTNER',
    required: ['first', 'last', 'tel', 'email'],
    fields: { first: 'firstName', last: 'lastName', tel: 'phone', email: 'email', message: 'message' },
  },
  'data-deletion': {
    env: 'FORM_ENDPOINT_DATA_DELETION',
    required: ['name', 'email', 'confirm'],
    fields: { name: 'fullName', email: 'email', details: 'details', confirm: 'confirm' },
  },
  waitlist: { env: 'FORM_ENDPOINT_WAITLIST', required: ['email'], fields: { email: 'email' } },
  deactivation: {
    env: 'FORM_ENDPOINT_DEACTIVATION',
    required: ['name', 'email', 'confirm'],
    fields: { name: 'fullName', email: 'email', details: 'details', confirm: 'confirm' },
  },
}
