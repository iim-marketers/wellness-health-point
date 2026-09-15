import Link from "next/link";

import { TERMS_PATH } from "@/lib/policies/terms";

/**
 * The "I agree to the Terms of Service" tick box shown above each form's submit
 * button. Forms keep the submit button disabled until it is checked.
 */
export default function TermsConsent({
  id,
  checked,
  onCheckedChange,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-2.5 text-[0.9rem] text-ink">
      <input
        id={id}
        name={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="mt-px size-4.5 shrink-0 cursor-pointer accent-primary"
      />
      <label htmlFor={id} className="cursor-pointer leading-snug">
        I have read and agree to the{" "}
        <Link
          href={TERMS_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline-offset-2 hover:underline"
        >
          Terms of Service
        </Link>
        .
      </label>
    </div>
  );
}
