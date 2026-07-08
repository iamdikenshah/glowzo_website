/**
 * Glowzo — Email notification on new Car Registration / Enquiry submission.
 *
 * Sends you (and any CC) a formatted email every time someone submits the
 * Google Form — whether from the form itself or from the website's /enquiry
 * page (which posts into the same form).
 *
 * ── SETUP (5 minutes) ──────────────────────────────────────────────
 * 1. Open your Google Form → ⋮ (top-right) → "Script editor".
 *    (Or go to https://script.google.com → New project.)
 * 2. Delete any sample code, paste this whole file in, and Save.
 * 3. Edit the CONFIG block below — set your email address(es).
 * 4. In the left sidebar click "Triggers" (clock icon) → "Add Trigger":
 *        Function to run:        onEnquirySubmit
 *        Deployment:             Head
 *        Event source:           From form
 *        Event type:             On form submit
 *    Save. Approve the permissions prompt (allows it to read responses
 *    and send mail as you).
 * 5. Submit a test entry — you should receive the email within seconds.
 *
 * Tip: run `sendTestEmail` once from the editor to verify mail works
 * before wiring the trigger.
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
};

/**
 * Installable "On form submit" trigger handler.
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e
 */
function onEnquirySubmit(e) {
  if (!e || !e.response) {
    // Allows manual runs / spreadsheet-bound fallback to still work.
    return;
  }

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
    "d MMM yyyy, h:mm a"
  );

  var subjectBits = [CONFIG.SUBJECT_PREFIX];
  if (nameForSubject) subjectBits.push('— ' + nameForSubject);
  if (mobileForSubject) subjectBits.push('(' + mobileForSubject + ')');
  var subject = subjectBits.join(' ');

  var htmlBody = buildHtmlEmail(rows, submittedAt, mobileForSubject);
  var textBody = rows.map(function (r) { return r.q + ': ' + r.a; }).join('\n')
    + '\n\nSubmitted: ' + submittedAt;

  var options = {
    name: CONFIG.SENDER_NAME,
    htmlBody: htmlBody,
  };
  if (CONFIG.CC) options.cc = CONFIG.CC;
  if (mobileForSubject) options.replyTo = undefined; // keep default

  MailApp.sendEmail(CONFIG.RECIPIENT, subject, textBody, options);
}

/** Builds a clean, mobile-friendly HTML email body. */
function buildHtmlEmail(rows, submittedAt, mobile) {
  var tableRows = rows.map(function (r) {
    return '<tr>'
      + '<td style="padding:10px 14px;border-bottom:1px solid #eef2f7;color:#64748b;'
      + 'font-size:13px;white-space:nowrap;vertical-align:top;">' + escapeHtml(r.q) + '</td>'
      + '<td style="padding:10px 14px;border-bottom:1px solid #eef2f7;color:#0f172a;'
      + 'font-size:14px;font-weight:600;">' + escapeHtml(r.a) + '</td>'
      + '</tr>';
  }).join('');

  var waLink = mobile
    ? '<a href="https://wa.me/91' + encodeURIComponent(String(mobile).replace(/\D/g, '').slice(-10))
      + '" style="display:inline-block;margin-top:16px;background:#25D366;color:#fff;'
      + 'text-decoration:none;padding:10px 18px;border-radius:9999px;font-size:14px;'
      + 'font-weight:600;">Message on WhatsApp</a>'
    : '';

  return ''
    + '<div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:24px;">'
    + '<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;'
    + 'border-radius:16px;overflow:hidden;">'
    + '<div style="background:linear-gradient(135deg,#0EA5E9,#06B6D4);padding:20px 24px;">'
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

/** Run manually once from the editor to confirm email delivery works. */
function sendTestEmail() {
  var rows = [
    { q: 'Full Name', a: 'Test User' },
    { q: 'Mobile Number', a: '9876543210' },
    { q: 'Society Name', a: 'Shivalik Residency' },
    { q: 'Vehicle Type', a: 'Sedan, SUV' },
  ];
  MailApp.sendEmail(CONFIG.RECIPIENT, CONFIG.SUBJECT_PREFIX + ' — Test',
    'This is a test.', { name: CONFIG.SENDER_NAME, htmlBody: buildHtmlEmail(rows, 'now', '9876543210') });
}
