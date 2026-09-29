"use client";

import { useTranslations } from "next-intl";
import { useState, type ChangeEvent, type FormEvent } from "react";

import type { Locale } from "@/content/site";
import { allowedAttachmentMimeTypes, consultationSubmissionSchema } from "@/lib/validation/consultation";

type RequesterType = "patient" | "physician";
type Urgency = "emergency" | "nonEmergency";
type ServiceType = "online" | "clinic";
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | "emergency" | "success";

type FormState = {
  requesterType: RequesterType | null;
  urgency: Urgency | null;
  service: ServiceType | null;
  common: {
    fullName: string;
    phone: string;
    whatsapp: string;
    email: string;
    country: string;
    preferredLanguage: string;
  };
  patient: {
    reason: string;
    shortDescription: string;
    relevantContext: string;
  };
  physician: {
    physicianName: string;
    specialty: string;
    institution: string;
    contactDetails: string;
    referralSummary: string;
    preferredRoute: string;
  };
  preferredTimes: string[];
  attachments: File[];
  consent: boolean;
};

const emptyPatient = () => ({ reason: "", shortDescription: "", relevantContext: "" });
const emptyPhysician = () => ({
  physicianName: "",
  specialty: "",
  institution: "",
  contactDetails: "",
  referralSummary: "",
  preferredRoute: "",
});

const createInitialState = (): FormState => ({
  requesterType: null,
  urgency: null,
  service: null,
  common: { fullName: "", phone: "", whatsapp: "", email: "", country: "", preferredLanguage: "" },
  patient: emptyPatient(),
  physician: emptyPhysician(),
  preferredTimes: [""],
  attachments: [],
  consent: false,
});

const stepKeys = ["requester", "urgency", "service", "details", "times", "attachments", "consent", "review"] as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s-]{7,}$/;

function isAllowedFile(file: File) {
  const extensionIsAllowed = /\.(pdf|jpe?g|png)$/i.test(file.name);
  return allowedAttachmentMimeTypes.includes(file.type as (typeof allowedAttachmentMimeTypes)[number]) || extensionIsAllowed;
}

export function RemoteConsultationPrototype({ locale }: Readonly<{ locale: Locale }>) {
  const t = useTranslations("content");
  const [step, setStep] = useState<Step>(0);
  const [state, setState] = useState<FormState>(createInitialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearErrors = () => setErrors({});

  const updateCommon = (field: keyof FormState["common"], value: string) => {
    setState((current) => ({ ...current, common: { ...current.common, [field]: value } }));
    clearErrors();
  };

  const updatePatient = (field: keyof FormState["patient"], value: string) => {
    setState((current) => ({ ...current, patient: { ...current.patient, [field]: value } }));
    clearErrors();
  };

  const updatePhysician = (field: keyof FormState["physician"], value: string) => {
    setState((current) => ({ ...current, physician: { ...current.physician, [field]: value } }));
    clearErrors();
  };

  const validateStep = (currentStep: Step) => {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 0 && !state.requesterType) nextErrors.requester = t("consultationPage.requester.error");
    if (currentStep === 1 && !state.urgency) nextErrors.urgency = t("consultationPage.urgency.error");
    if (currentStep === 2 && !state.service) nextErrors.service = t("consultationPage.service.error");

    if (currentStep === 3) {
      if (state.common.email && !emailPattern.test(state.common.email)) nextErrors.email = t("consultationPage.errors.email");
      if (state.common.phone && !phonePattern.test(state.common.phone)) nextErrors.phone = t("consultationPage.errors.phone");
    }

    if (currentStep === 5 && errors.attachments) nextErrors.attachments = errors.attachments;
    if (currentStep === 6 && !state.consent) nextErrors.consent = t("consultationPage.consent.error");

    if (currentStep === 7) {
      const branch = consultationSubmissionSchema.safeParse({
        requesterType: state.requesterType,
        urgency: state.urgency,
        service: state.urgency === "nonEmergency" ? state.service : undefined,
        attachmentCount: state.attachments.length,
      });

      if (!branch.success || !state.consent) nextErrors.review = t("consultationPage.reviewStep.validation");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;

    if (step === 1 && state.urgency === "emergency") {
      setStep("emergency");
      return;
    }

    if (typeof step === "number" && step < 7) setStep((step + 1) as Step);
  };

  const goBack = () => {
    if (typeof step === "number" && step > 0) {
      setErrors({});
      setStep((step - 1) as Step);
    }
  };

  const resetPrototype = () => {
    setState(createInitialState());
    setErrors({});
    setStep(0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 7 && validateStep(7)) setStep("success");
    else goNext();
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const acceptedFiles = selectedFiles.filter(isAllowedFile);
    const tooMany = state.attachments.length + acceptedFiles.length > 3;
    const limitedFiles = acceptedFiles.slice(0, Math.max(0, 3 - state.attachments.length));
    const hasInvalidFiles = acceptedFiles.length !== selectedFiles.length;

    setState((current) => ({ ...current, attachments: [...current.attachments, ...limitedFiles] }));
    setErrors(
      hasInvalidFiles || tooMany
        ? { attachments: hasInvalidFiles ? t("consultationPage.attachments.invalidType") : t("consultationPage.attachments.maximum") }
        : {},
    );
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    setState((current) => ({ ...current, attachments: current.attachments.filter((_, fileIndex) => fileIndex !== index) }));
    clearErrors();
  };

  const updatePreferredTime = (index: number, value: string) => {
    setState((current) => ({
      ...current,
      preferredTimes: current.preferredTimes.map((time, timeIndex) => (timeIndex === index ? value : time)),
    }));
    clearErrors();
  };

  const addPreferredTime = () => {
    if (state.preferredTimes.length < 3) setState((current) => ({ ...current, preferredTimes: [...current.preferredTimes, ""] }));
  };

  const removePreferredTime = (index: number) => {
    setState((current) => ({
      ...current,
      preferredTimes: current.preferredTimes.length === 1 ? [""] : current.preferredTimes.filter((_, timeIndex) => timeIndex !== index),
    }));
  };

  const selectRequester = (requesterType: RequesterType) => {
    setState((current) => ({
      ...current,
      requesterType,
      patient: requesterType === "patient" ? current.patient : emptyPatient(),
      physician: requesterType === "physician" ? current.physician : emptyPhysician(),
    }));
    clearErrors();
  };

  const selectUrgency = (urgency: Urgency) => {
    setState((current) => ({ ...current, urgency, service: urgency === "emergency" ? null : current.service }));
    clearErrors();
  };

  const stepNumber = typeof step === "number" ? step + 1 : null;

  return (
    <main className="consultation-page" data-consultation-prototype data-locale={locale}>
      <section className="consultation-hero" aria-labelledby="consultation-title">
        <div className="site-container">
          <p className="eyebrow">{t("consultationPage.eyebrow")}</p>
          <h1 id="consultation-title">{t("consultationPage.title")}</h1>
          <p className="consultation-hero__description">{t("consultationPage.description")}</p>
        </div>
      </section>

      <div className="site-container consultation-shell">
        {stepNumber ? (
          <nav className="consultation-progress" aria-label={t("consultationPage.review")}>
            <p>{t("consultationPage.stepLabel", { current: stepNumber, total: stepKeys.length })}</p>
            <ol>
              {stepKeys.map((key, index) => (
                <li className={index + 1 === stepNumber ? "is-current" : index + 1 < stepNumber ? "is-complete" : ""} key={key}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span>{t(`consultationPage.steps.${key}`)}</span>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {step === "emergency" ? (
          <EmergencyState onReset={resetPrototype} t={t} />
        ) : step === "success" ? (
          <SuccessState onReset={resetPrototype} t={t} />
        ) : (
          <form className="consultation-form" onSubmit={handleSubmit} noValidate>
            {step === 0 ? <RequesterStep value={state.requesterType} onSelect={selectRequester} t={t} error={errors.requester} /> : null}
            {step === 1 ? <UrgencyStep value={state.urgency} onSelect={selectUrgency} t={t} error={errors.urgency} /> : null}
            {step === 2 ? <ServiceStep value={state.service} onSelect={(service) => { setState((current) => ({ ...current, service })); clearErrors(); }} t={t} error={errors.service} /> : null}
            {step === 3 ? <DetailsStep state={state} updateCommon={updateCommon} updatePatient={updatePatient} updatePhysician={updatePhysician} t={t} errors={errors} /> : null}
            {step === 4 ? <TimesStep times={state.preferredTimes} update={updatePreferredTime} add={addPreferredTime} remove={removePreferredTime} t={t} /> : null}
            {step === 5 ? <AttachmentsStep files={state.attachments} onFiles={handleFiles} onRemove={removeFile} t={t} error={errors.attachments} /> : null}
            {step === 6 ? <ConsentStep checked={state.consent} onChange={(consent) => { setState((current) => ({ ...current, consent })); clearErrors(); }} t={t} error={errors.consent} /> : null}
            {step === 7 ? <ReviewStep state={state} onEdit={setStep} t={t} error={errors.review} /> : null}

            <div className="consultation-actions">
              {step > 0 ? <button className="button button--quiet" onClick={goBack} type="button">{t("consultationPage.back")}</button> : null}
              <button className="button button--primary" type="submit">
                {step === 7 ? t("consultationPage.reviewStep.submit") : t("consultationPage.next")}
              </button>
              <button className="text-link consultation-reset" onClick={resetPrototype} type="button">{t("consultationPage.reset")}</button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

function ChoiceCard({ name, value, checked, title, description, onChange }: Readonly<{ name: string; value: string; checked: boolean; title: string; description: string; onChange: () => void }>) {
  return (
    <label className={`consultation-choice${checked ? " is-selected" : ""}`}>
      <input checked={checked} name={name} onChange={onChange} type="radio" value={value} />
      <span className="consultation-choice__copy"><strong>{title}</strong><span>{description}</span></span>
    </label>
  );
}

function StepFrame({ id, eyebrow, heading, intro, children, error }: Readonly<{ id: string; eyebrow: string; heading: string; intro: string; children: React.ReactNode; error?: string }>) {
  return (
    <section className="consultation-step" data-consultation-step={id} aria-labelledby={`${id}-heading`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-heading`}>{heading}</h2>
      <p className="consultation-step__intro">{intro}</p>
      {error ? <p className="consultation-error" role="alert">{error}</p> : null}
      {children}
    </section>
  );
}

function RequesterStep({ value, onSelect, t, error }: Readonly<{ value: RequesterType | null; onSelect: (value: RequesterType) => void; t: ReturnType<typeof useTranslations>; error?: string }>) {
  return (
    <StepFrame id="requester" eyebrow={t("consultationPage.steps.requester")} heading={t("consultationPage.requester.heading")} intro={t("consultationPage.requester.intro")} error={error}>
      <fieldset className="consultation-choice-grid">
        <legend className="sr-only">{t("consultationPage.requester.heading")}</legend>
        <ChoiceCard name="requesterType" value="patient" checked={value === "patient"} title={t("consultationPage.requester.patient")} description={t("consultationPage.requester.patientDescription")} onChange={() => onSelect("patient")} />
        <ChoiceCard name="requesterType" value="physician" checked={value === "physician"} title={t("consultationPage.requester.physician")} description={t("consultationPage.requester.physicianDescription")} onChange={() => onSelect("physician")} />
      </fieldset>
    </StepFrame>
  );
}

function UrgencyStep({ value, onSelect, t, error }: Readonly<{ value: Urgency | null; onSelect: (value: Urgency) => void; t: ReturnType<typeof useTranslations>; error?: string }>) {
  return (
    <StepFrame id="urgency" eyebrow={t("consultationPage.steps.urgency")} heading={t("consultationPage.urgency.heading")} intro={t("consultationPage.urgency.intro")} error={error}>
      <fieldset className="consultation-choice-grid">
        <legend className="sr-only">{t("consultationPage.urgency.heading")}</legend>
        <ChoiceCard name="urgency" value="emergency" checked={value === "emergency"} title={t("consultationPage.urgency.emergency")} description={t("consultationPage.urgency.emergencyDescription")} onChange={() => onSelect("emergency")} />
        <ChoiceCard name="urgency" value="nonEmergency" checked={value === "nonEmergency"} title={t("consultationPage.urgency.nonEmergency")} description={t("consultationPage.urgency.nonEmergencyDescription")} onChange={() => onSelect("nonEmergency")} />
      </fieldset>
    </StepFrame>
  );
}

function ServiceStep({ value, onSelect, t, error }: Readonly<{ value: ServiceType | null; onSelect: (value: ServiceType) => void; t: ReturnType<typeof useTranslations>; error?: string }>) {
  return (
    <StepFrame id="service" eyebrow={t("consultationPage.steps.service")} heading={t("consultationPage.service.heading")} intro={t("consultationPage.service.intro")} error={error}>
      <fieldset className="consultation-choice-grid">
        <legend className="sr-only">{t("consultationPage.service.heading")}</legend>
        <ChoiceCard name="service" value="online" checked={value === "online"} title={t("consultationPage.service.online")} description={t("consultationPage.service.onlineDescription")} onChange={() => onSelect("online")} />
        <ChoiceCard name="service" value="clinic" checked={value === "clinic"} title={t("consultationPage.service.clinic")} description={t("consultationPage.service.clinicDescription")} onChange={() => onSelect("clinic")} />
      </fieldset>
    </StepFrame>
  );
}

function Field({ id, label, value, onChange, type = "text", optional = true, error }: Readonly<{ id: string; label: string; value: string; onChange: (value: string) => void; type?: string; optional?: boolean; error?: string }>) {
  return (
    <div className="consultation-field">
      <label htmlFor={id}>{label} <span className="consultation-field__status">{optional ? "Optional" : "Required"}</span></label>
      <input aria-invalid={Boolean(error)} id={id} onChange={(event) => onChange(event.target.value)} type={type} value={value} />
      {error ? <p className="consultation-error" role="alert">{error}</p> : null}
    </div>
  );
}

function TextField({ id, label, value, onChange, optional = true }: Readonly<{ id: string; label: string; value: string; onChange: (value: string) => void; optional?: boolean }>) {
  return (
    <div className="consultation-field consultation-field--wide">
      <label htmlFor={id}>{label} <span className="consultation-field__status">{optional ? "Optional" : "Required"}</span></label>
      <textarea id={id} onChange={(event) => onChange(event.target.value)} rows={4} value={value} />
    </div>
  );
}

function DetailsStep({ state, updateCommon, updatePatient, updatePhysician, t, errors }: Readonly<{ state: FormState; updateCommon: (field: keyof FormState["common"], value: string) => void; updatePatient: (field: keyof FormState["patient"], value: string) => void; updatePhysician: (field: keyof FormState["physician"], value: string) => void; t: ReturnType<typeof useTranslations>; errors: Record<string, string> }>) {
  return (
    <StepFrame id="details" eyebrow={t("consultationPage.steps.details")} heading={state.requesterType === "physician" ? t("consultationPage.physician.heading") : t("consultationPage.patient.heading")} intro={t("consultationPage.common.intro")}>
      <div className="consultation-form-section">
        <h3>{t("consultationPage.common.heading")}</h3>
        <div className="consultation-field-grid">
          <Field id="full-name" label={t("consultationPage.common.fullName")} onChange={(value) => updateCommon("fullName", value)} value={state.common.fullName} />
          <Field error={errors.phone} id="phone" label={t("consultationPage.common.phone")} onChange={(value) => updateCommon("phone", value)} value={state.common.phone} />
          <Field id="whatsapp" label={t("consultationPage.common.whatsapp")} onChange={(value) => updateCommon("whatsapp", value)} value={state.common.whatsapp} />
          <Field error={errors.email} id="email" label={t("consultationPage.common.email")} onChange={(value) => updateCommon("email", value)} value={state.common.email} type="email" />
          <Field id="country" label={t("consultationPage.common.country")} onChange={(value) => updateCommon("country", value)} value={state.common.country} />
          <Field id="preferred-language" label={t("consultationPage.common.preferredLanguage")} onChange={(value) => updateCommon("preferredLanguage", value)} value={state.common.preferredLanguage} />
        </div>
      </div>

      {state.requesterType === "physician" ? (
        <div className="consultation-form-section">
          <h3>{t("consultationPage.physician.heading")}</h3>
          <div className="consultation-field-grid">
            <Field id="physician-name" label={t("consultationPage.physician.physicianName")} onChange={(value) => updatePhysician("physicianName", value)} value={state.physician.physicianName} />
            <Field id="specialty" label={t("consultationPage.physician.specialty")} onChange={(value) => updatePhysician("specialty", value)} value={state.physician.specialty} />
            <Field id="institution" label={t("consultationPage.physician.institution")} onChange={(value) => updatePhysician("institution", value)} value={state.physician.institution} />
            <Field id="physician-contact" label={t("consultationPage.physician.contactDetails")} onChange={(value) => updatePhysician("contactDetails", value)} value={state.physician.contactDetails} />
            <TextField id="referral-summary" label={t("consultationPage.physician.referralSummary")} onChange={(value) => updatePhysician("referralSummary", value)} value={state.physician.referralSummary} />
            <Field id="preferred-route" label={t("consultationPage.physician.preferredRoute")} onChange={(value) => updatePhysician("preferredRoute", value)} value={state.physician.preferredRoute} />
          </div>
          <p className="consultation-step__note">{t("consultationPage.physician.note")}</p>
        </div>
      ) : (
        <div className="consultation-form-section">
          <h3>{t("consultationPage.patient.heading")}</h3>
          <div className="consultation-field-grid">
            <Field id="reason" label={t("consultationPage.patient.reason")} onChange={(value) => updatePatient("reason", value)} value={state.patient.reason} />
            <TextField id="short-description" label={t("consultationPage.patient.shortDescription")} onChange={(value) => updatePatient("shortDescription", value)} value={state.patient.shortDescription} />
            <TextField id="relevant-context" label={t("consultationPage.patient.relevantContext")} onChange={(value) => updatePatient("relevantContext", value)} value={state.patient.relevantContext} />
          </div>
          <p className="consultation-step__note">{t("consultationPage.patient.note")}</p>
        </div>
      )}
    </StepFrame>
  );
}

function TimesStep({ times, update, add, remove, t }: Readonly<{ times: string[]; update: (index: number, value: string) => void; add: () => void; remove: (index: number) => void; t: ReturnType<typeof useTranslations> }>) {
  return (
    <StepFrame id="times" eyebrow={t("consultationPage.steps.times")} heading={t("consultationPage.times.heading")} intro={t("consultationPage.times.intro")}>
      <div className="consultation-times-list">
        {times.map((time, index) => (
          <div className="consultation-time-row" key={`time-${index}`}>
            <label htmlFor={`preferred-time-${index}`}>{t("consultationPage.times.fieldLabel", { number: index + 1 })} <span className="consultation-field__status">{t("consultationPage.optional")}</span></label>
            <div className="consultation-time-row__controls">
              <input id={`preferred-time-${index}`} onChange={(event) => update(index, event.target.value)} type="datetime-local" value={time} />
              {times.length > 1 ? <button className="button button--quiet" onClick={() => remove(index)} type="button">{t("consultationPage.times.remove", { number: index + 1 })}</button> : null}
            </div>
          </div>
        ))}
      </div>
      <div className="consultation-inline-actions">
        <button className="button button--quiet" disabled={times.length >= 3} onClick={add} type="button">{t("consultationPage.times.add")}</button>
        {times.length >= 3 ? <p className="consultation-review-note">{t("consultationPage.times.maximum")}</p> : null}
      </div>
      <p className="consultation-step__note">{t("consultationPage.times.notConfirmed")}</p>
    </StepFrame>
  );
}

function AttachmentsStep({ files, onFiles, onRemove, t, error }: Readonly<{ files: File[]; onFiles: (event: ChangeEvent<HTMLInputElement>) => void; onRemove: (index: number) => void; t: ReturnType<typeof useTranslations>; error?: string }>) {
  return (
    <StepFrame id="attachments" eyebrow={t("consultationPage.steps.attachments")} heading={t("consultationPage.attachments.heading")} intro={t("consultationPage.attachments.intro")} error={error}>
      <div className="consultation-upload">
        <label className="button button--quiet" htmlFor="consultation-files">{t("consultationPage.attachments.choose")}</label>
        <input accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" id="consultation-files" multiple onChange={onFiles} type="file" />
        <p>{t("consultationPage.attachments.types")}</p>
      </div>
      <div className="consultation-file-list" aria-live="polite">
        <h3>{t("consultationPage.attachments.selected")}</h3>
        {files.length ? (
          <ul>
            {files.map((file, index) => <li key={`${file.name}-${index}`}><span>{file.name}</span><button className="text-link" onClick={() => onRemove(index)} type="button">{t("consultationPage.attachments.remove", { name: file.name })}</button></li>)}
          </ul>
        ) : <p>{t("consultationPage.attachments.none")}</p>}
      </div>
    </StepFrame>
  );
}

function ConsentStep({ checked, onChange, t, error }: Readonly<{ checked: boolean; onChange: (checked: boolean) => void; t: ReturnType<typeof useTranslations>; error?: string }>) {
  return (
    <StepFrame id="consent" eyebrow={t("consultationPage.steps.consent")} heading={t("consultationPage.consent.heading")} intro={t("consultationPage.consent.intro")} error={error}>
      <div className="consultation-consent-panel">
        <p>{t("consultationPage.consent.placeholder")}</p>
        <label className="consultation-checkbox"><input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" /> <span>{t("consultationPage.consent.checkbox")}</span></label>
      </div>
    </StepFrame>
  );
}

function ReviewStep({ state, onEdit, t, error }: Readonly<{ state: FormState; onEdit: (step: Step) => void; t: ReturnType<typeof useTranslations>; error?: string }>) {
  const commonValues = Object.entries(state.common).filter(([, value]) => value);
  const requesterValues = state.requesterType === "patient" ? Object.entries(state.patient).filter(([, value]) => value) : Object.entries(state.physician).filter(([, value]) => value);

  return (
    <StepFrame id="review" eyebrow={t("consultationPage.steps.review")} heading={t("consultationPage.reviewStep.heading")} intro={t("consultationPage.reviewStep.intro")} error={error}>
      <div className="consultation-review">
        <ReviewGroup label={t("consultationPage.reviewStep.requester")} value={state.requesterType === "patient" ? t("consultationPage.requester.patient") : t("consultationPage.requester.physician")} onEdit={() => onEdit(0)} editLabel={t("consultationPage.edit")} />
        <ReviewGroup label={t("consultationPage.reviewStep.urgency")} value={state.urgency === "emergency" ? t("consultationPage.urgency.emergency") : t("consultationPage.urgency.nonEmergency")} onEdit={() => onEdit(1)} editLabel={t("consultationPage.edit")} />
        <ReviewGroup label={t("consultationPage.reviewStep.service")} value={state.service === "online" ? t("consultationPage.service.online") : state.service === "clinic" ? t("consultationPage.service.clinic") : t("consultationPage.reviewStep.noValue")} onEdit={() => onEdit(2)} editLabel={t("consultationPage.edit")} />
        <ReviewList label={t("consultationPage.reviewStep.common")} values={commonValues} onEdit={() => onEdit(3)} editLabel={t("consultationPage.edit")} emptyLabel={t("consultationPage.reviewStep.noValue")} />
        <ReviewList label={t("consultationPage.reviewStep.requesterDetails")} values={requesterValues} onEdit={() => onEdit(3)} editLabel={t("consultationPage.edit")} emptyLabel={t("consultationPage.reviewStep.noValue")} />
        <ReviewList label={t("consultationPage.reviewStep.times")} values={state.preferredTimes.filter(Boolean).map((value, index) => [`${index + 1}`, value])} onEdit={() => onEdit(4)} editLabel={t("consultationPage.edit")} emptyLabel={t("consultationPage.reviewStep.noTimes")} />
        <ReviewList label={t("consultationPage.reviewStep.attachments")} values={state.attachments.map((file, index) => [`${index + 1}`, file.name])} onEdit={() => onEdit(5)} editLabel={t("consultationPage.edit")} emptyLabel={t("consultationPage.reviewStep.noAttachments")} />
        <ReviewGroup label={t("consultationPage.reviewStep.consent")} value={state.consent ? t("consultationPage.reviewStep.consentGiven") : t("consultationPage.reviewStep.noValue")} onEdit={() => onEdit(6)} editLabel={t("consultationPage.edit")} />
      </div>
      <p className="consultation-final-notice">{t("consultationPage.reviewStep.notConfirmation")}</p>
    </StepFrame>
  );
}

function ReviewGroup({ label, value, onEdit, editLabel }: Readonly<{ label: string; value: string; onEdit: () => void; editLabel: string }>) {
  return <div className="consultation-review-group"><div><dt>{label}</dt><dd>{value}</dd></div><button className="text-link" onClick={onEdit} type="button">{editLabel}</button></div>;
}

function ReviewList({ label, values, onEdit, editLabel, emptyLabel }: Readonly<{ label: string; values: [string, string][]; onEdit: () => void; editLabel: string; emptyLabel: string }>) {
  return <div className="consultation-review-group"><div><dt>{label}</dt>{values.length ? <ul>{values.map(([key, value]) => <li key={`${key}-${value}`}><strong>{key}</strong><span>{value}</span></li>)}</ul> : <dd>{emptyLabel}</dd>}</div><button className="text-link" onClick={onEdit} type="button">{editLabel}</button></div>;
}

function EmergencyState({ onReset, t }: Readonly<{ onReset: () => void; t: ReturnType<typeof useTranslations> }>) {
  return (
    <section className="consultation-terminal consultation-terminal--emergency" data-consultation-emergency aria-labelledby="emergency-heading">
      <h2 id="emergency-heading">{t("consultationPage.emergency.heading")}</h2>
      <p>{t("consultationPage.emergency.body")}</p>
      <p>{t("consultationPage.emergency.local")}</p>
      <p>{t("consultationPage.emergency.hospital")}</p>
      <p className="consultation-terminal__note">{t("consultationPage.emergency.stop")}</p>
      <button className="button button--primary" onClick={onReset} type="button">{t("consultationPage.emergency.reset")}</button>
    </section>
  );
}

function SuccessState({ onReset, t }: Readonly<{ onReset: () => void; t: ReturnType<typeof useTranslations> }>) {
  return (
    <section className="consultation-terminal consultation-terminal--success" data-consultation-success aria-labelledby="success-heading">
      <h2 id="success-heading">{t("consultationPage.success.heading")}</h2>
      <p>{t("consultationPage.success.received")}</p>
      <ul className="consultation-confirmation-list">
        <li>{t("consultationPage.success.review")}</li>
        <li>{t("consultationPage.success.appointment")}</li>
        <li>{t("consultationPage.success.payment")}</li>
        <li>{t("consultationPage.success.diagnosis")}</li>
        <li>{t("consultationPage.success.decision")}</li>
      </ul>
      <button className="button button--primary" onClick={onReset} type="button">{t("consultationPage.success.reset")}</button>
    </section>
  );
}
