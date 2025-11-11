/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IDivision } from "@/types/division.type"
import { useState } from "react"
import { showToast } from "nextjs-toast-notify"
import { FileMetadata } from "@/hooks/use-file-upload"
import SingleFileUploader from "@/components/singleFileUploader"
import { updateDivision } from "@/utils/division"
import ButtonLoader from "@/components/shared/ButtonLoader"
import { ITourType } from "@/types/category.type"
import { updateTourType } from "@/utils/tourType"

// ✅ 1. Validation Schema
const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
})

type FormValues = z.infer<typeof formSchema>

const EditTourType = ({ tourType, setOpen }: { tourType: ITourType, setOpen: (bool: boolean) => void }) => {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<(File | FileMetadata) | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: tourType?.name || "",
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            if (!tourType._id) {
                showToast.error("division id not found")
            }

            const formData = new FormData()
            formData.append("data", JSON.stringify(values));
            if (image) {
                formData.append("file", image as File)
            }
            setLoading(true)
            const data = await updateTourType(formData, tourType._id as string)
            if (data.success) {
                showToast.success(data.message)
                setOpen(false)
            }

        } catch (error: any) {
            showToast.error(error.message || "Error updating tourType")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // ✅ 4. UI Form
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit TourType</h2>
            <SingleFileUploader onChange={setImage} defaultImage={tourType.image} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter division name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {
                        loading ? <ButtonLoader /> : <Button type="submit" className="w-full cursor-pointer">
                            Update TourType
                        </Button>
                    }


                </form>
            </Form>
        </div>
    )
}

export default EditTourType
