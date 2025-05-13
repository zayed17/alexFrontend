import type { ReactNode } from "react"

interface PropertyGridProps {
  children: ReactNode
  className?: string
}

export default function PropertyGrid({ children, className = "" }: PropertyGridProps) {
  return <div className={`grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 ${className}`}>{children}</div>
}
