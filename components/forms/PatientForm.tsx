'use client'
 
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { UserFormValidation } from '@/lib/Validation'
import { Form } from '@/components/ui/form'
import CustomFormField from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton'

export enum FormFieldTypes {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})
 
const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email:'',
      phone:''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    
    setIsLoading(true)

    try {
      // const userData = { name, email, phone }

      // const user = await createUser(userData)

      // if(user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error)
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ name, email, phone })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>Get started with appointments.</p>
        </section>
        <CustomFormField 
          fieldType = {FormFieldTypes.INPUT}
          control={form.control}
          name='name'
          label='Full Name'
          placeholder='Christian Santanas'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />
        <CustomFormField 
          fieldType = {FormFieldTypes.INPUT}
          control={form.control}
          name='email'
          label='Email'
          placeholder='info@majoissolutions.com'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'
        />
        <CustomFormField 
          fieldType = {FormFieldTypes.PHONE_INPUT}
          control={form.control}
          name='phone'
          label='Phone number'
          placeholder='+1 (437) 388-2358'
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm