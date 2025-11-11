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
import { useState } from "react"
import { showToast } from "nextjs-toast-notify"
import SingleFileUploader from "@/components/singleFileUploader"
import { addDivision } from "@/utils/division"
import ButtonLoader from "@/components/shared/ButtonLoader"

const formSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .optional(),
    file: z.any().refine((file) => file instanceof File, "Image is required")
})

type FormValues = z.infer<typeof formSchema>

const AddDivisionForm = ({ setOpen }: { setOpen: (bool: boolean) => void }) => {
    const [loading, setLoading] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            file: undefined
        },
    })

    const onSubmit = async (values: FormValues) => {
        const { file, ...divisionInfo } = values
        try {

            const formData = new FormData()
            formData.append("data", JSON.stringify(divisionInfo));
            if (file) {
                formData.append("file", file as File)
            }
            setLoading(true)
            const data = await addDivision(formData)
            if (data.success) {
                showToast.success(data.message)
                setOpen(false)
            }

        } catch (error: any) {
            showToast.error(error.message || "Error updating division")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add New Division</h2>
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

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write a short description..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        loading ? <ButtonLoader /> : <Button type="submit" className="w-full cursor-pointer">
                            Update Division
                        </Button>
                    }


                </form>
            </Form>
        </div>
    )
}

export default AddDivisionForm
