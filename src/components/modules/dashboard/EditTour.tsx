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
import { showToast } from "nextjs-toast-notify";
import ButtonLoader from "@/components/shared/ButtonLoader";
import Image from "next/image";
import { CircleX } from "lucide-react";
import MaultiFileUploader from "@/components/MultiFileUploader";
import { ITour } from "@/types/tour.type";
import { IDivision } from "@/types/division.type";
import { ITourType } from "@/types/category.type";
import { FileMetadata } from "@/hooks/use-file-upload";
import useSWR from "swr";
import { updateTour } from "@/utils/tour";

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

});

type FormValues = z.infer<typeof formSchema>;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const EditTour = ({ tour, setOpen }: { tour: ITour, setOpen: (bool: boolean) => void }) => {
    const [uploadImages, setUploadImages] = useState<(File | FileMetadata)[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [tourImages, setTourImages] = useState<string[]>(tour?.images || []);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: tour?.title || "",
            description: tour?.description || "",
            location: tour?.location || "",
            division: tour?.division?._id || "",
            tourType: tour?.tourType?._id || "",
            included:
                tour?.included?.length
                    ? tour.included.map((item) => ({ value: item }))
                    : [{ value: "" }],

            excluded:
                tour?.excluded?.length
                    ? tour.excluded.map((item) => ({ value: item }))
                    : [{ value: "" }],

            videoUrl: tour?.videoUrl || "",
            lat: tour?.lat || "",
            lng: tour?.lng || "",
        },
    });

    // field arrays with unique aliases
    const { fields: includeFields, append: includeAppend, remove: includeRemove } = useFieldArray({ control: form.control, name: "included" });
    const { fields: excludeFields, append: excludeAppend, remove: excludeRemove } = useFieldArray({ control: form.control, name: "excluded" });

    const handleDeletedImage = (image: string) => {
        setDeletedImages((prev) => [...prev, image]);
        setTourImages((prev) => prev.filter((i) => i !== image));
    };

    const urlDivision = `http://localhost:5000/api/v1/division`;
    const urlTourType = `http://localhost:5000/api/v1/tour/tour-types`;

    const { data: divisionsResponse } = useSWR(urlDivision, fetcher);
    const { data: tourTypeResponse } = useSWR(urlTourType, fetcher);

    const divisions = divisionsResponse?.data as IDivision[];
    const tourTypes = tourTypeResponse?.data as ITourType[];

    const onSubmit = async (values: FormValues) => {
        if (!tour._id) {
            return showToast.error("tour id not found")
        }
        const formattedData = {
            ...values,
            deletedImages: deletedImages,
            included: values.included.map((item) => item.value),
            excluded: values.excluded.map((item) => item.value),
        };
        const formData = new FormData()
        formData.append("data", JSON.stringify(formattedData))
        if (uploadImages.length > 0) {
            uploadImages.forEach((file) => {
                if (file instanceof File) {
                    formData.append("files", file);
                }
            });
        }
        try {
            setLoading(true)
            const data = await updateTour(formData, tour._id as string)
            if (data.success) {
                showToast.success(data.message)
                setOpen(false)
            }
        } catch (error: any) {
            showToast.error(error.message || "Error updating tour")
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
                        <MaultiFileUploader onChange={setUploadImages} />
                    </div>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Upload New Images */}


                    {/* Existing Images */}
                    <div>
                        <FormLabel>Uploaded Images</FormLabel>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {tourImages?.map((t) => (
                                <div className="relative w-16 h-16" key={t}>
                                    <Image alt="tour" src={t} fill className="rounded-md object-cover" />
                                    <CircleX
                                        onClick={() => handleDeletedImage(t)}
                                        size={20}
                                        className="absolute top-0 right-0 text-red-600 bg-white rounded-full cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Text Fields */}
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

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
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
                                            step="any"
                                            placeholder="Enter latitude"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                                            step="any"
                                            placeholder="Enter longitude"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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

export default EditTour;
