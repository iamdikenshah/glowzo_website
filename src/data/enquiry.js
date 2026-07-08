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

// Google Form entry ids per question.
export const ENTRY = {
  fullName: 'entry.1581535213',
  mobile: 'entry.1478072052',
  society: 'entry.575137707',
  flat: 'entry.1182812709',
  serviceStartDate: 'entry.1819831795', // "Service start date" (Date question)
  vehicleCount: 'entry.1464088449', // "Number Of Vehicle" (1/2/3)
  vehicleType: 'entry.810503756',   // "Vehicle Type" (checkboxes)
  regNumber: 'entry.374886168',     // single text
  carName: 'entry.184185632',       // single text
  parking: 'entry.1631502197',
  notes: 'entry.243266148',
};

export const VEHICLE_TYPES = ['Hatchback', 'Sedan', 'SUV', 'Luxury'];
export const MAX_VEHICLES = 3;

// Simple (static) fields rendered by the generic renderer in EnquiryForm.
export const FIELDS = {
  fullName: { entry: ENTRY.fullName, label: 'Full Name',           type: 'text',     required: true,  placeholder: 'e.g. Rahul Mehta',       autoComplete: 'name' },
  mobile:   { entry: ENTRY.mobile,   label: 'Mobile Number',        type: 'tel',      required: true,  placeholder: '10-digit mobile number', autoComplete: 'tel', maxLength: 10 },
  society:  { entry: ENTRY.society,  label: 'Society Name',         type: 'text',     required: true,  placeholder: 'e.g. Shivalik Residency' },
  flat:     { entry: ENTRY.flat,     label: 'Flat / House Number',  type: 'text',     required: true,  placeholder: 'e.g. B-402' },
  serviceStartDate: { entry: ENTRY.serviceStartDate, label: 'Service Start Date', type: 'date', required: true },
  parking:  { entry: ENTRY.parking,  label: 'Parking Location',     type: 'radio',    required: false, options: ['Basement', 'Ground Floor', 'Open Parking', 'Other'], hasOther: true },
  notes:    { entry: ENTRY.notes,    label: 'Additional Notes',     type: 'textarea', required: false, placeholder: 'Any special requests, preferred timing, gate/parking instructions…' },
};

export const STATIC_FIELD_ORDER = ['fullName', 'mobile', 'society', 'flat', 'serviceStartDate', 'parking', 'notes'];

export const emptyVehicle = () => ({ type: '', reg: '', name: '' });

/**
 * Submits the enquiry to Google Forms.
 *
 * The Google Form has single fields for registration number / car name and a
 * multi-select "Vehicle Type", so we map the per-vehicle list like this:
 *   • Number Of Vehicle  → count
 *   • Vehicle Type       → each distinct type (checkboxes)
 *   • Registration No.   → comma list of all reg numbers
 *   • Car Name           → comma list of all car names
 *   • Additional Notes   → a structured, unambiguous per-vehicle breakdown
 *                          (so it's always clear which car is which), followed
 *                          by the visitor's own notes.
 *
 * Google's endpoint has no permissive CORS headers, so we send an opaque
 * `no-cors` POST — the row still reaches the sheet; success is optimistic
 * once the request resolves.
 */
export async function submitEnquiry(values) {
  const body = new FormData();
  const { vehicles = [] } = values;

  body.append(ENTRY.fullName, values.fullName || '');
  body.append(ENTRY.mobile, values.mobile || '');
  body.append(ENTRY.society, values.society || '');
  body.append(ENTRY.flat, values.flat || '');

  // Service start date → Google "Date" question (year/month/day parts).
  if (values.serviceStartDate) {
    const [y, m, d] = values.serviceStartDate.split('-');
    body.append(`${ENTRY.serviceStartDate}_year`, y);
    body.append(`${ENTRY.serviceStartDate}_month`, String(Number(m)));
    body.append(`${ENTRY.serviceStartDate}_day`, String(Number(d)));
  }

  // Parking (with "Other" free-text handling).
  if (values.parking === 'Other') {
    body.append(ENTRY.parking, OTHER_VALUE);
    body.append(`${ENTRY.parking}.other_option_response`, values.parkingOther || '');
  } else if (values.parking) {
    body.append(ENTRY.parking, values.parking);
  }

  // Vehicles.
  body.append(ENTRY.vehicleCount, String(vehicles.length || 1));

  const distinctTypes = [...new Set(vehicles.map((v) => v.type).filter(Boolean))];
  distinctTypes.forEach((t) => body.append(ENTRY.vehicleType, t));

  body.append(ENTRY.regNumber, vehicles.map((v) => v.reg).filter(Boolean).join(', '));
  body.append(ENTRY.carName, vehicles.map((v) => v.name).filter(Boolean).join(', '));

  // Per-vehicle breakdown + user notes → Additional Notes.
  const breakdown = vehicles
    .map((v, i) => `${i + 1}) ${v.type || '—'} · ${v.reg || '—'} · ${v.name || '—'}`)
    .join('\n');
  const notes = [breakdown && `Vehicles:\n${breakdown}`, values.notes]
    .filter(Boolean)
    .join('\n\n');
  body.append(ENTRY.notes, notes);

  await fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body });
}
