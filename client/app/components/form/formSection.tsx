type FormSectionProps = {
  title: string
  children: React.ReactNode
  gridStyle?: string 
}

export function FormSection({ 
  title, 
  children, 
  gridStyle = "grid-cols-1" 
}: FormSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">
        {title}
      </h2>
      <div className={`grid ${gridStyle} gap-6`}>
        {children}
      </div>
    </section>
  )
}