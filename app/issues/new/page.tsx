'use client'

import dynamic from "next/dynamic";
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/errorMessage";
import Spinner from "@/app/components/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
})

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter()
    const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="max-w-xl">
            {error && <Callout.Root color='red' className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        setIsSubmitting(true);
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setIsSubmitting(false);
                        setError('An unexpected error occurred.')
                    }
                })}>
                <TextField.Root radius="none" placeholder="Title of the Issue" {...register("title")} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => <SimpleMDE placeholder="Description of the Issue" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>
                    Create Issue {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage