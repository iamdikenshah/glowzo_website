/**
 * Glowzo — Email notification on new Car Registration / Enquiry submission.
 *
 * Sends you (and any CC) a formatted, logo-branded email every time someone
 * submits the Google Form — whether from the form itself or from the website's
 * enquiry popup (which posts into the same form).
 *
 * ── SETUP (5 minutes) ──────────────────────────────────────────────
 * 1. Open your Google Form → ⋮ (top-right) → "Script editor".
 * 2. Delete any sample code, paste this whole file in, and Save.
 * 3. Edit the CONFIG block below — set your email + the logo source.
 * 4. In the left sidebar click "Triggers" (clock icon) → "Add Trigger":
 *        Function to run:  onEnquirySubmit
 *        Event source:     From form
 *        Event type:       On form submit
 *    Save and approve the permissions prompt.
 * 5. Run `sendTestEmail` once from the editor to confirm the email +
 *    logo look right, then submit a real test entry.
 *
 * ── LOGO ───────────────────────────────────────────────────────────
 * The logo is embedded inline (shows even when a client blocks remote
 * images). Pick ONE source in CONFIG:
 *   • LOGO_DRIVE_FILE_ID  (most reliable) — upload logo.jpeg to Google
 *     Drive, right-click → Share → "Anyone with the link (Viewer)",
 *     then copy the id from the link:
 *       https://drive.google.com/file/d/<THIS_IS_THE_ID>/view
 *   • LOGO_URL — a public URL to the image, e.g. your live site's
 *     https://glowzo.co.in/logo.jpeg (works once the site is deployed).
 * If neither resolves, the email is still sent, just without the logo.
 * ───────────────────────────────────────────────────────────────────
 */

var CONFIG = {
  // Where notifications are sent. Add more, comma-separated: 'a@x.com,b@y.com'
  RECIPIENT: 'shah.diken@gmail.com',
  // Optional CC (leave '' for none).
  CC: '',
  // Sender label shown in the inbox.
  SENDER_NAME: 'Glowzo Website',
  // Prefix for the email subject.
  SUBJECT_PREFIX: '🚗 New Car Registration',

  // ── Logo (pick one; Drive id is the most reliable) ──
  LOGO_DRIVE_FILE_ID: '',                       // e.g. '1AbCdEf...'
  LOGO_URL: 'https://glowzo.co.in/logo.jpeg',   // used only if the id is blank
};

// Order the fields appear in the email, regardless of the Google Form's
// question order. Matched against each question title (case-insensitive,
// substring). Anything not listed is appended in its original order.
var EMAIL_FIELD_ORDER = [
  'full name',
  'mobile',
  'society',
  'flat',
  'service start date',   // 5th
  'number of vehicle',
  'vehicle type',
  'vehicle registration',
  'vehicle / car name',
  'parking',
  'additional notes',
];

function orderRows(rows) {
  function rank(title) {
    var t = String(title).toLowerCase();
    for (var i = 0; i < EMAIL_FIELD_ORDER.length; i++) {
      if (t.indexOf(EMAIL_FIELD_ORDER[i]) !== -1) return i;
    }
    return EMAIL_FIELD_ORDER.length; // unknown → keep at the end
  }
  return rows
    .map(function (r, i) { return { r: r, i: i }; })
    .sort(function (a, b) {
      var ra = rank(a.r.q), rb = rank(b.r.q);
      return ra !== rb ? ra - rb : a.i - b.i;
    })
    .map(function (x) { return x.r; });
}

/**
 * Installable "On form submit" trigger handler.
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e
 */
function onEnquirySubmit(e) {
  if (!e || !e.response) return; // ignore manual runs

  var itemResponses = e.response.getItemResponses();
  var rows = [];
  var nameForSubject = '';
  var mobileForSubject = '';

  itemResponses.forEach(function (ir) {
    var title = ir.getItem().getTitle();
    var answer = ir.getResponse();
    if (Array.isArray(answer)) answer = answer.join(', ');
    if (answer === '' || answer == null) answer = '—';

    if (/full name/i.test(title)) nameForSubject = answer;
    if (/mobile/i.test(title)) mobileForSubject = answer;

    rows.push({ q: title, a: answer });
  });

  var submittedAt = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone() || 'Asia/Kolkata',
    'd MMM yyyy, h:mm a'
  );

  var subjectBits = [CONFIG.SUBJECT_PREFIX];
  if (nameForSubject) subjectBits.push('— ' + nameForSubject);
  if (mobileForSubject) subjectBits.push('(' + mobileForSubject + ')');

  sendEnquiryEmail(subjectBits.join(' '), orderRows(rows), submittedAt, mobileForSubject);
}

/** Sends the branded email, inlining the logo when available. */
function sendEnquiryEmail(subject, rows, submittedAt, mobile) {
  var logo = getLogoBlob();
  var htmlBody = buildHtmlEmail(rows, submittedAt, mobile, !!logo);
  var textBody = rows.map(function (r) { return r.q + ': ' + r.a; }).join('\n')
    + '\n\nSubmitted: ' + submittedAt;

  var options = { name: CONFIG.SENDER_NAME, htmlBody: htmlBody };
  if (CONFIG.CC) options.cc = CONFIG.CC;
  if (logo) options.inlineImages = { glowzoLogo: logo };

  MailApp.sendEmail(CONFIG.RECIPIENT, subject, textBody, options);
}

/** Returns the logo as a Blob (Drive id preferred, else URL), or null. */
function getLogoBlob() {
  try {
    if (CONFIG.LOGO_DRIVE_FILE_ID) {
      return DriveApp.getFileById(CONFIG.LOGO_DRIVE_FILE_ID).getBlob().setName('logo');
    }
    if (CONFIG.LOGO_URL) {
      var resp = UrlFetchApp.fetch(CONFIG.LOGO_URL, { muteHttpExceptions: true });
      if (resp.getResponseCode() === 200) return resp.getBlob().setName('logo');
    }
  } catch (err) {
    // Fall through — send without a logo rather than failing the notification.
  }
  return null;
}

/** Builds a wa.me link (with prefilled message) to the customer's number, or ''. */
function waUrl(mobile) {
  var digits = String(mobile == null ? '' : mobile).replace(/\D/g, '');
  if (digits.length < 10) return '';
  var ten = digits.slice(-10); // last 10 digits, in case a country code is included
  var text = 'Hi, thanks for registering with Glowzo! Regarding your car wash booking —';
  return 'https://wa.me/91' + ten + '?text=' + encodeURIComponent(text);
}

/** Builds a clean, mobile-friendly HTML email body. */
function buildHtmlEmail(rows, submittedAt, mobile, hasLogo) {
  var wa = waUrl(mobile);

  var tableRows = rows.map(function (r) {
    var valueHtml = escapeHtml(r.a);
    // Make the customer's mobile number tap-to-WhatsApp (+ tap-to-call).
    if (/mobile/i.test(r.q)) {
      var rowWa = waUrl(r.a);
      var digits = String(r.a).replace(/\D/g, '');
      if (rowWa) {
        valueHtml = '<a href="' + rowWa + '" style="color:#0f172a;text-decoration:none;font-weight:600;">'
          + escapeHtml(r.a) + '</a>'
          + ' &nbsp;<a href="' + rowWa + '" style="color:#25D366;text-decoration:none;font-size:12px;font-weight:600;">WhatsApp ›</a>'
          + ' &nbsp;<a href="tel:+91' + digits.slice(-10) + '" style="color:#0284c7;text-decoration:none;font-size:12px;font-weight:600;">Call ›</a>';
      }
    }
    return '<tr>'
      + '<td style="padding:10px 14px;border-bottom:1px solid #eef2f7;color:#64748b;'
      + 'font-size:13px;white-space:nowrap;vertical-align:top;">' + escapeHtml(r.q) + '</td>'
      + '<td style="padding:10px 14px;border-bottom:1px solid #eef2f7;color:#0f172a;'
      + 'font-size:14px;font-weight:600;white-space:pre-line;">' + valueHtml + '</td>'
      + '</tr>';
  }).join('');

  var logoBand = hasLogo
    ? '<div style="background:#fff;padding:16px 24px;text-align:center;border-bottom:1px solid #eef2f7;">'
      + '<img src="cid:glowzoLogo" alt="Glowzo" width="140" '
      + 'style="display:inline-block;width:140px;max-width:60%;height:auto;">'
      + '</div>'
    : '';

  var waLink = wa
    ? '<a href="' + wa + '" style="display:inline-block;margin-top:16px;background:#25D366;'
      + 'color:#fff;text-decoration:none;padding:11px 20px;border-radius:9999px;font-size:14px;'
      + 'font-weight:600;">Message ' + escapeHtml(String(mobile)) + ' on WhatsApp</a>'
    : '';

  return ''
    + '<div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:24px;">'
    + '<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;'
    + 'border-radius:16px;overflow:hidden;">'
    + logoBand
    + '<div style="background:linear-gradient(135deg,#0EA5E9,#06B6D4);padding:18px 24px;">'
    + '<h1 style="margin:0;color:#fff;font-size:18px;">New Car Registration</h1>'
    + '<p style="margin:4px 0 0;color:rgba(255,255,255,.9);font-size:13px;">'
    + 'via glowzo.co.in — ' + escapeHtml(submittedAt) + '</p>'
    + '</div>'
    + '<table style="width:100%;border-collapse:collapse;">' + tableRows + '</table>'
    + '<div style="padding:16px 24px 24px;">' + waLink + '</div>'
    + '</div>'
    + '<p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px;">'
    + 'Automated notification from your Glowzo enquiry form.</p>'
    + '</div>';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Run manually once from the editor to confirm email + logo delivery. */
function sendTestEmail() {
  var rows = [
    { q: 'Full Name', a: 'Test User' },
    { q: 'Mobile Number', a: '9876543210' },
    { q: 'Society Name', a: 'Shivalik Residency' },
    { q: 'Service start date', a: '2026-07-15' },
    { q: 'Vehicle Type', a: 'Sedan, SUV' },
    { q: 'Additional Notes', a: 'Vehicles:\n1) Sedan · GJ01AB1234 · Hyundai Creta' },
  ];
  sendEnquiryEmail(CONFIG.SUBJECT_PREFIX + ' — Test', orderRows(rows), 'now (test)', '9876543210');
}
