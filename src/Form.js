// Import necessary hooks and components from React and other libraries
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Form management and validation
import { yupResolver } from '@hookform/resolvers/yup'; // Integration with Yup for validation
import * as yup from 'yup'; // Yup for defining validation schemas
import Select from 'react-select'; // Dropdown component for selecting components

// Define validation schema using Yup
const schema = yup.object().shape({
    floating_email: yup.string().email('Invalid email format').required('Email is required'),
    floating_password: yup.string().min(4, 'Password must be at least 4 characters').max(15, 'Password cannot exceed 15 characters').required('Password is required'),
    floating_repeat_password: yup.string().oneOf([yup.ref('floating_password'), null], 'Passwords must match').required('Please confirm your password'),
    floating_first_name: yup.string().required('First name is required'),
    floating_last_name: yup.string().required('Last name is required'),
    component: yup.object().required('Please select a component'), // Validation for component selection
});

// Options for the component dropdown
const componentOptions = [
    { value: 'RAM', label: 'RAM' },
    { value: 'CPU', label: 'CPU' },
    { value: 'Motherboard', label: 'Motherboard' },
    { value: 'Storage', label: 'Storage' },
    { value: 'GPU', label: 'GPU' },
];

function Form() {
    // Initialize useForm hook from react-hook-form, including resolver for Yup schema
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // Using Yup resolver for form validation
    });
    
    // State to track selected component
    const [selectedComponent, setSelectedComponent] = useState(null);

    // Function to handle form submission
    const submitForm = (data) => {
        console.log(data); // Log form data to console on submission
    };

    // JSX structure of the form component
    return (
        //place the form in the center of the page
        <div className="flex justify-center items-center min-h-screen bg-purple-400">
            <div className="w-full sm:max-w-md p-6">
                <form className="max-w-md w-full bg-white p-6 rounded-lg shadow-md mt-2 mb-2" onSubmit={handleSubmit(submitForm)}>
                    {/* Heading for desktop screens */}
                    <h1 className="text-3xl sm:block font-bold hidden text-gray-900 text-center dark:text-black-900 mb-5 mt-2">Order Computer Components</h1>
                    {/* Heading for small screens */}
                    <h1 className="text-3xl sm:hidden font-bold text-gray-900 text-center dark:text-black-900 mb-5 mt-2">Order</h1>

                    {/* Input field for email */}
                    <div className="relative z-0 mb-5">
                        <input
                            type="email"
                            name="floating_email"
                            id="floating_email"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.floating_email ? 'border-red-500' : ''}`}
                            placeholder=" "
                            {...register('floating_email')} // Register input with react-hook-form
                        />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email address
                        </label>
                        {/* Display error message if email validation fails */}
                        {errors.floating_email && (
                            <span className="text-sm text-red-500">{errors.floating_email.message}</span>
                        )}
                    </div>

                    {/* Input field for password */}
                    <div className="relative z-0 mb-5">
                        <input
                            type="password"
                            name="floating_password"
                            id="floating_password"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.floating_password ? 'border-red-500' : ''}`}
                            placeholder=" "
                            {...register('floating_password')} // Register input with react-hook-form
                        />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Password
                        </label>
                        {/* Display error message if password validation fails */}
                        {errors.floating_password && (
                            <span className="text-sm text-red-500">{errors.floating_password.message}</span>
                        )}
                    </div>

                    {/* Input field for confirming password */}
                    <div className="relative z-0 mb-5">
                        <input
                            type="password"
                            name="floating_repeat_password"
                            id="floating_repeat_password"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.floating_repeat_password ? 'border-red-500' : ''}`}
                            placeholder=" "
                            {...register('floating_repeat_password')} // Register input with react-hook-form
                        />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Confirm password
                        </label>
                        {/* Display error message if password confirmation fails */}
                        {errors.floating_repeat_password && (
                            <span className="text-sm text-red-500">{errors.floating_repeat_password.message}</span>
                        )}
                    </div>

                    {/* Grid layout for first name and last name inputs */}
                    <div className="grid md:grid-cols-2 md:gap-6">
                        {/* Input field for first name */}
                        <div className="relative z-0 mb-5">
                            <input
                                type="text"
                                name="floating_first_name"
                                id="floating_first_name"
                                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.floating_first_name ? 'border-red-500' : ''}`}
                                placeholder=" "
                                {...register('floating_first_name')} // Register input with react-hook-form
                            />
                            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                First name
                            </label>
                            {/* Display error message if first name validation fails */}
                            {errors.floating_first_name && (
                                <span className="text-sm text-red-500">{errors.floating_first_name.message}</span>
                            )}
                        </div>

                        {/* Input field for last name */}
                        <div className="relative z-0 mb-5">
                            <input
                                type="text"
                                name="floating_last_name"
                                id="floating_last_name"
                                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.floating_last_name ? 'border-red-500' : ''}`}
                                placeholder=" "
                                {...register('floating_last_name')} // Register input with react-hook-form
                            />
                            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Last name
                            </label>
                            {/* Display error message if last name validation fails */}
                            {errors.floating_last_name && (
                                <span className="text-sm text-red-500">{errors.floating_last_name.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Select dropdown for choosing component */}
                    <div className="grid md:grid-cols-1 md:gap-6">
                        <label htmlFor="component" className="block mb-2 text-sm font-medium text-blue-400">
                            Choose Component:
                        </label>
                        {/* Using Controller from react-hook-form to integrate Select component */}
                        <Controller
                            name="component"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field} // Pass props to Select component
                                    options={componentOptions} // Options for dropdown
                                    className="basic-single"
                                    classNamePrefix="select"
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption); // Handle change in dropdown selection
                                        setSelectedComponent(selectedOption); // Update selected component state
                                    }}
                                />
                            )}
                        />
                        {/* Display error message if component selection fails */}
                        {errors.component && (
                            <span className="text-sm text-red-500">{errors.component.message}</span>
                        )}
                    </div>

                    {/* Display selected component message based on screen size */}
                    {selectedComponent && (
                        <>
                            {/* For small screens */}
                            <p className="text-sm text-green-500 mt-2 sm:hidden">
                                {selectedComponent.label} selected
                            </p>
                            
                            {/* For medium and larger screens */}
                            <p className="text-sm text-green-500 mt-2 hidden sm:block">
                                {selectedComponent.label} selected ready to be purchased!
                            </p>
                        </>
                    )}

                    {/* Submit button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form; // Export the Form component
