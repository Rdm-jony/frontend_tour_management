/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import ButtonLoader from "@/components/shared/ButtonLoader";
import MaultiFileUploader from "@/components/MultiFileUploader";
import { IDivision } from "@/types/division.type";
import { ITourType } from "@/types/category.type";
import { FileMetadata } from "@/hooks/use-file-upload";
import useSWR from "swr";
import { ITour } from "@/types/tour.type";
import { addTour } from "@/utils/tour";
import { showToast } from "nextjs-toast-notify";

const formSchema = z.object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    location: z.string().min(2, "Location is required"),
    division: z.string().min(1, "Division is required"),
    tourType: z.string().min(1, "Tour type is required"),
    included: z.array(z.object({ value: z.string() })),
    excluded: z.array(z.object({ value: z.string() })),
    lat: z.string().min(1, "Latitude is required"),
    lng: z.string().min(1, "Longitude is required"),
    videoUrl: z.string().nonempty("Video url is required"),
    costForm: z
        .number({ message: "Cost must be a number" })
        .positive("Cost must be greater than 0"),
    minAge: z
        .number({ message: "Minimum age must be a number" })
        .positive("Minimum age must be greater than 0"),
    maxGuest: z
        .number({ message: "Max guest must be a number" })
        .int()
        .positive(),
    images: z
        .array(z.any())
        .min(4, "You must upload at least 4 images"),
});


type FormValues = z.infer<typeof formSchema>;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const AddTourForm = ({ setOpen }: { setOpen: (bool: boolean) => void }) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            division: "",
            tourType: "",
            included: [{ value: "" }],

            excluded: [{ value: "" }],

            videoUrl: "",
            lat: "",
            lng: "",
            costForm: 0,
            minAge: 0,
            maxGuest: 0,
        },
    });

    // field arrays with unique aliases
    const { fields: includeFields, append: includeAppend, remove: includeRemove } = useFieldArray({ control: form.control, name: "included" });
    const { fields: excludeFields, append: excludeAppend, remove: excludeRemove } = useFieldArray({ control: form.control, name: "excluded" });



    const urlDivision = `https://beckend-tour-management.vercel.app/api/v1/division`;
    const urlTourType = `https://beckend-tour-management.vercel.app/api/v1/tour/tour-types`;

    const { data: divisionsResponse } = useSWR(urlDivision, fetcher);
    const { data: tourTypeResponse } = useSWR(urlTourType, fetcher);

    const divisions = divisionsResponse?.data as IDivision[];
    const tourTypes = tourTypeResponse?.data as ITourType[];

    const onSubmit = async (values: FormValues) => {
        console.log(values);

        const { images, ...tourInfo } = values
        const formattedData = {
            ...tourInfo,
            included: values.included.map((item) => item.value),
            excluded: values.excluded.map((item) => item.value),
        };
        const formData = new FormData()
        formData.append("data", JSON.stringify(formattedData))
        if (images.length > 0) {
            images.forEach((file) => {
                if (file instanceof File) {
                    formData.append("files", file);
                }
            });
        }
        try {
            setLoading(true)
            const data = await addTour(formData)
            if (data.success) {
                showToast.success(data.message)
                setOpen(false)
            }
        } catch (error: any) {
            showToast.error(error.message || "Error add tour")
            console.error(error)
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md overflow-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Tour</h2>

            <Form {...form}>
                <div>
                    <FormLabel>Upload New Images</FormLabel>
                    <div className="mt-2">
                        <MaultiFileUploader
                            onChange={(files) => {
                                form.setValue("images", files);
                            }}
                        />
                        <FormMessage>{form.formState.errors.images?.message}</FormMessage>                    </div>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Upload New Images */}

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter tour title" {...field} />
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
                                    <Textarea placeholder="Describe the tour" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division</FormLabel>
                                    <FormControl>
                                        <select {...field} className="border rounded-md p-2 w-full">
                                            <option value="">Select Division</option>
                                            {divisions?.map((d) => (
                                                <option key={d._id} value={d._id}>
                                                    {d.name}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tourType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour Type</FormLabel>
                                    <FormControl>
                                        <select {...field} className="border rounded-md p-2 w-full">
                                            <option value="">Select Tour Type</option>
                                            {tourTypes?.map((t) => (
                                                <option key={t._id} value={t._id}>
                                                    {t.name}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-5">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter location" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxGuest"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Max Guest</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Max Guest"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value ? parseFloat(e.target.value) : 0)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>



                    <div className="flex gap-5">
                        <FormField
                            control={form.control}
                            name="costForm"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Price</FormLabel>
                                    <FormControl >
                                        <Input
                                            type="number"
                                            placeholder="Price"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value ? parseFloat(e.target.value) : 0)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="minAge"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Minimum age</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Minimum Age"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value ? parseFloat(e.target.value) : 0)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Video URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter YouTube video link" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Included Items */}
                    <div>
                        <FormLabel>Included</FormLabel>
                        <div className="space-y-2">
                            {includeFields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`included.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder="Add included item" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => includeRemove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => includeAppend({ value: "" })}
                            >
                                + Add Included Item
                            </Button>
                        </div>
                    </div>

                    {/* Excluded Items */}
                    <div>
                        <FormLabel>Excluded</FormLabel>
                        <div className="space-y-2">
                            {excludeFields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`excluded.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder="Add excluded item" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => excludeRemove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => excludeAppend({ value: "" })}
                            >
                                + Add Excluded Item
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="lat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            step="any"
                                            placeholder="Enter latitude"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lng"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            step="any"
                                            placeholder="Enter longitude"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    {loading ? <ButtonLoader /> : <Button type="submit" className="w-full  cursor-pointer">Update Tour</Button>}
                </form>
            </Form>
        </div>
    );
};

export default AddTourForm;
