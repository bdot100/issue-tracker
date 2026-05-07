'use client'

import dynamic from "next/dynamic";
import { Button, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

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

    return (
        <form
            className='max-w-xl space-y-3'
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data);
                router.push('/issues');
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
    )
}

export default NewIssuePage