type FormFieldProps = {
  label: string
  value: string
  required?: boolean
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  readOnly?: boolean
}

export function FormField({ label, value, required = false, onChange, placeholder, type = "text", readOnly = false }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        readOnly={readOnly}
      />
    </div>
  );
}