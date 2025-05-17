import React, { useState } from "react";

export type CustomerFormData = {
    name: string;
    address: string;
    dateOfBirth: string;
};

type CustomerFormProps = {
    initialData?: CustomerFormData| null;
    onSubmit: (data: { name: string; dateOfBirth: string; address: string; id: number }) => void;
    onCancel: () => void;
};

const validate = (form: CustomerFormData) => {
    const errors: Partial<CustomerFormData> = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.address.trim()) errors.address = "Address is required.";
    if (!form.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
    return errors;
};

function initialForm(): CustomerFormData {
    return { name: "", address: "", dateOfBirth: "" };
}

const CustomerForm = ({ initialData, onSubmit, onCancel }:CustomerFormProps) => {
    const [form, setForm] = useState<CustomerFormData>(
        initialData || initialForm()
    );
    const [errors, setErrors] = useState<Partial<CustomerFormData>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        const validationErrors = validate(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit({
                name: form.name,
                dateOfBirth: form.dateOfBirth,
                address: form.address,
                id: Date.now(),
            });
            setForm(initialForm());
            setErrors({});
            alert("Customer added successfully!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto p-8 bg-white border border-gray-200 rounded-3xl shadow-lg transition-all"
        >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {initialData ? "Edit Customer" : "Add New Customer"}
            </h2>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        name="name"
                        className={`w-full px-4 py-2 rounded-lg border outline-none transition duration-200 ${
                            errors.name ? "border-red-400" : "border-gray-300 focus:border-blue-500"
                        }`}
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    {submitted && errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        name="address"
                        className={`w-full px-4 py-2 rounded-lg border outline-none transition duration-200 ${
                            errors.address ? "border-red-400" : "border-gray-300 focus:border-blue-500"
                        }`}
                        placeholder="Enter address"
                        value={form.address}
                        onChange={handleChange}
                    />
                    {submitted && errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        className={`w-full px-4 py-2 rounded-lg border outline-none transition duration-200 ${
                            errors.dateOfBirth ? "border-red-400" : "border-gray-300 focus:border-blue-500"
                        }`}
                        value={form.dateOfBirth}
                        onChange={handleChange}
                    />
                    {submitted && errors.dateOfBirth && (
                        <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                    {initialData ? "Update" : "Save"}
                </button>
            </div>
        </form>
    );
};

export default CustomerForm;
