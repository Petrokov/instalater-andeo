type BrandLogoMarkProps = {
  className?: string
}

export function BrandLogoMark({ className = 'h-10 w-auto' }: BrandLogoMarkProps) {
  return (
    <span className={`inline-flex items-center justify-center gap-2.5 shrink-0 ${className}`}>
      <img
        src="/uploads/logo-krila/krila.svg"
        alt=""
        className="hidden h-[72%] w-auto object-contain sm:block"
        aria-hidden="true"
      />
      <img
        src="/uploads/logo-krila/petrokov-andeo.png"
        alt=""
        className="block h-full w-auto object-contain"
        aria-hidden="true"
      />
    </span>
  )
}
