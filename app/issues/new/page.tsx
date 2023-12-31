'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
type IssuesForm = z.infer<typeof createIssueSchema>;
const newIssuePage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const {register, control, handleSubmit, formState : {errors}} = useForm<IssuesForm>({
    resolver: zodResolver(createIssueSchema)
  });
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form className='max-w-xl space-y-3' 
        onSubmit={handleSubmit(async (data) => {
          try {
            const resp = await axios.post('/api/issues', data);
            if(resp.status)
              router.push('/issues');
            else
              router.push('/');
          } catch (error) {
            setError('An unexpected error occured.');
            console.log(error);
          }
        })}>
          <TextField.Root>
              <TextField.Input placeholder='Title' {...register('title')}/>
          </TextField.Root>
          {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
          <Controller
            name='description'
            control={control}
            render={({field}) => <SimpleMDE placeholder='description' {...field} />}
          />
          {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
          <Button>Submit New Isuue</Button>
      </form>
    </div>
  )
}

export default newIssuePage