// ── Glowzo Car Registration / Enquiry form ──────────────────────────────
// Mirrors the Google Form so submissions land in the same responses sheet.
// Source: https://docs.google.com/forms/d/e/1FAIpQLSfyc0oy0AXf4EnU9n_FjksrDRwk0hvrmn8ynWMIx2t6nBIugQ/viewform
//
// To point this at a different Google Form, replace FORM_ID and the
// `entry` ids below (open the form → View source → search "entry.").

export const FORM_ID =
  '1FAIpQLSfyc0oy0AXf4EnU9n_FjksrDRwk0hvrmn8ynWMIx2t6nBIugQ';

export const FORM_ACTION = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

// Sentinel Google Forms uses for a choice field's free-text "Other" answer.
export const OTHER_VALUE = '__other_option__';

// Each field maps a local form key → the Google Form entry id + metadata.
export const FIELDS = {
  fullName:   { entry: 'entry.1581535213', label: 'Full Name',                   type: 'text',      required: true,  placeholder: 'e.g. Rahul Mehta',      autoComplete: 'name' },
  mobile:     { entry: 'entry.1478072052', label: 'Mobile Number',               type: 'tel',       required: true,  placeholder: '10-digit mobile number', autoComplete: 'tel', maxLength: 10 },
  society:    { entry: 'entry.575137707',  label: 'Society Name',                type: 'text',      required: true,  placeholder: 'e.g. Shivalik Residency' },
  flat:       { entry: 'entry.1182812709', label: 'Flat / House Number',         type: 'text',      required: true,  placeholder: 'e.g. B-402' },
  vehicles:   { entry: 'entry.1464088449', label: 'Number of Vehicles',          type: 'radio',     required: true,  options: ['1', '2', '3'] },
  vehicleType:{ entry: 'entry.810503756',  label: 'Vehicle Type',                type: 'checkbox',  required: true,  options: ['Hatchback', 'Sedan', 'SUV', 'Luxury'] },
  regNumber:  { entry: 'entry.374886168',  label: 'Vehicle Registration Number', type: 'text',      required: true,  placeholder: 'e.g. GJ01AB1234' },
  carName:    { entry: 'entry.184185632',  label: 'Vehicle / Car Name',          type: 'text',      required: true,  placeholder: 'e.g. Hyundai Creta' },
  parking:    { entry: 'entry.1631502197', label: 'Parking Location',            type: 'radio',     required: false, options: ['Basement', 'Ground Floor', 'Open Parking', 'Other'], hasOther: true },
  notes:      { entry: 'entry.243266148',  label: 'Additional Notes',            type: 'textarea',  required: false, placeholder: 'Any special requests, preferred timing, gate/parking instructions…' },
};

// Field render order for the UI.
export const FIELD_ORDER = [
  'fullName', 'mobile', 'society', 'flat',
  'vehicles', 'vehicleType', 'regNumber', 'carName',
  'parking', 'notes',
];

/**
 * Submits the enquiry to Google Forms.
 * Google's endpoint has no permissive CORS headers, so we send an opaque
 * `no-cors` POST — the row still reaches the sheet; we just can't read the
 * response, so success is optimistic once the request resolves.
 */
export async function submitEnquiry(values) {
  const body = new FormData();

  for (const key of FIELD_ORDER) {
    const field = FIELDS[key];
    const value = values[key];

    if (field.type === 'checkbox') {
      (value || []).forEach((v) => body.append(field.entry, v));
      continue;
    }

    if (field.hasOther && value === 'Other') {
      body.append(field.entry, OTHER_VALUE);
      body.append(`${field.entry}.other_option_response`, values[`${key}Other`] || '');
      continue;
    }

    if (value != null && value !== '') body.append(field.entry, value);
  }

  await fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body });
}
