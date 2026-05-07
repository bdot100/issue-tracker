import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root radius="none" placeholder="Title of the Issue" />
            <TextArea placeholder="Description of the Issue" />

            <Button>
                Submit New Issue
            </Button>
        </div>
    )
}

export default NewIssuePage