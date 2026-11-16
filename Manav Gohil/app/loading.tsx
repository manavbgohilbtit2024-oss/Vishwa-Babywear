import React from 'react'
import { RibbonFoldLoader } from '@/components/ui/ribbon-fold-loader'

export default function Loading() {
  return (
    <div className="flex min-h-[320px] h-[50vh] w-full items-center justify-center bg-[#fffaf6] text-[#382d2d]">
      <RibbonFoldLoader accent="#db6e78" />
    </div>
  )
}
