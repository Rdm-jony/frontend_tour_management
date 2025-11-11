import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

export default function DialogComponent({children,open,setOpen}:{children:React.ReactNode,open:boolean,setOpen:(bool:boolean)=>void}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Frequently Asked Questions (FAQ)
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              {
                children
              }
            </DialogDescription>
            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Okay</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
