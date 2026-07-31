type FormFieldProps = {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormField({ label, id, className, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-sm border border-border bg-cream-50 px-4 py-2.5 font-sans text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:border-ember-600 focus-visible:ring-2 focus-visible:ring-ember-600/20 ${className ?? ""}`}
        {...props}
      />
    </div>
  );
}
