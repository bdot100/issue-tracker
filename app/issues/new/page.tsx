'use client'

import dynamic from "next/dynamic";
import { Button, Callout, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
})

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, handleSubmit, control } = useForm<IssueForm>();
    const [error, setError] = useState('');

    return (
        <div className="max-w-xl">
            {error && <Callout.Root color='red' className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setError('An unexpected error occurred.')
                    }
                })}>
                <TextField.Root radius="none" placeholder="Title of the Issue" {...register("title")} />
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => <SimpleMDE placeholder="Description of the Issue" {...field} />}
                />

                <Button>
                    Create Issue
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage