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
import { useState } from "react"
import { showToast } from "nextjs-toast-notify"
import { FileMetadata } from "@/hooks/use-file-upload"
import SingleFileUploader from "@/components/singleFileUploader"
import ButtonLoader from "@/components/shared/ButtonLoader"
import { addTourType } from "@/utils/tourType"

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    file: z
        .any()
        .refine((file) => file instanceof File, "Image is required")
});


type FormValues = z.infer<typeof formSchema>

const AddTourTypeForm = ({setOpen}:{setOpen:(bool:boolean)=>void}) => {
    const [loading, setLoading] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            file: undefined
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {

            const formData = new FormData()
            formData.append("data", JSON.stringify({"name":values.name}));
            if (values.file) {
                formData.append("file", values.file as File)
            }
            setLoading(true)
            const data = await addTourType(formData)
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
            <h2 className="text-2xl font-semibold mb-6 text-center">Add TourType</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <SingleFileUploader
                                        onChange={(file) => field.onChange(file)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                            Add TourType
                        </Button>
                    }


                </form>
            </Form>
        </div>
    )
}

export default AddTourTypeForm
