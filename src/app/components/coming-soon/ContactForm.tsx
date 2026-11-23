"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  validateContactForm,
  type ContactFormValues,
  type ContactFieldErrors,
} from "@/lib/contact-validation";

const EMPTY_FORM: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  requirement: "",
};

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const trigger = triggerRef.current;
    dialog.showModal();
    dialog.querySelector<HTMLInputElement>("#contact-name")?.focus();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      trigger?.focus();
    };
  }, [isOpen]);

  function closeDialog() {
    setIsOpen(false);
  }

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
    setIsSuccess(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setMessage("");
    setIsSuccess(false);

    if (Object.keys(nextErrors).length > 0) return;

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: "" }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setMessage(result.error ?? "We couldn't send your message. Please try again.");
        return;
      }

      setValues(EMPTY_FORM);
      setErrors({});
      setIsSuccess(true);
      setMessage("Thanks for reaching out. Your message has been received.");
    } catch {
      setMessage("We couldn't send your message. Check your connection and try again.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="contact-trigger"
        onClick={() => {
          setMessage("");
          setIsSuccess(false);
          setIsOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        Contact Us
      </button>

      {isOpen && (
        <dialog
          ref={dialogRef}
          className="contact-dialog"
          aria-labelledby="contact-title"
          aria-describedby="contact-description"
          onCancel={(event) => {
            event.preventDefault();
            closeDialog();
          }}
        >
          <div className="contact-dialog-header">
            <div>
              <p className="contact-eyebrow">NORTH BRIDGE TECH</p>
              <h2 id="contact-title">Let’s talk</h2>
              <p id="contact-description" className="contact-description">
                Tell us a little about what you’re looking to build.
              </p>
            </div>
            <button
              type="button"
              className="contact-close-icon"
              onClick={closeDialog}
              aria-label="Close contact form"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-fields">
              <label className="contact-field" htmlFor="contact-name">
                <span>Full Name <span className="required-mark">*</span></span>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}
              </label>

              <label className="contact-field" htmlFor="contact-email">
                <span>Email Address <span className="required-mark">*</span></span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}
              </label>

              <label className="contact-field contact-field-wide" htmlFor="contact-phone">
                <span>Phone Number <span className="required-mark">*</span></span>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  maxLength={32}
                  placeholder="+1 415 555 0132"
                  value={values.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "contact-phone-error" : "contact-phone-hint"}
                  disabled={isSubmitting}
                />
                {errors.phone ? (
                  <span className="field-error" id="contact-phone-error">{errors.phone}</span>
                ) : (
                  <span className="field-hint" id="contact-phone-hint">Include your country code.</span>
                )}
              </label>

              <label className="contact-field contact-field-wide" htmlFor="contact-requirement">
                <span>Tell us about your requirement <span className="required-mark">*</span></span>
                <textarea
                  id="contact-requirement"
                  name="requirement"
                  rows={4}
                  required
                  maxLength={3000}
                  value={values.requirement}
                  onChange={(event) => updateField("requirement", event.target.value)}
                  aria-invalid={Boolean(errors.requirement)}
                  aria-describedby={errors.requirement ? "contact-requirement-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.requirement && <span className="field-error" id="contact-requirement-error">{errors.requirement}</span>}
              </label>
            </div>

            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="contact-form-footer">
              <p className={`contact-message${isSuccess ? " is-success" : ""}`} role="status" aria-live="polite">
                {message}
              </p>
              <div className="contact-form-actions">
                <button
                  type="button"
                  className="contact-secondary-button"
                  onClick={closeDialog}
                >
                  Close
                </button>
                <button type="submit" className="contact-submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </dialog>
      )}
    </>
  );
}
