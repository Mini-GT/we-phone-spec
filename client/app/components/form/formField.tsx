import type { ChangeEvent } from "react"

type FormFieldProps = {
  label: string
  value: string
  required?: boolean
  onChange?: (value: string) => void
  onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  readOnly?: boolean
  name?: string
  labelStyle?: string
  inputStyle?: string
}

export function FormField({ 
  label, 
  value, 
  required = false, 
  onChange, 
  onChangeEvent,
  placeholder, 
  type = "text", 
  readOnly = false,
  name,
  labelStyle = "block text-sm font-medium mb-2 text-gray-700",
  inputStyle = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
}: FormFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeEvent) {
      onChangeEvent(e) // form-level handler (needs name)
    } else if (onChange) {
      onChange(e.target.value) // local handler (just value)
    }
  }

  return (
    <div>
      <label className={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputStyle}
        readOnly={readOnly}
        name={name}
      />
    </div>
  );
}