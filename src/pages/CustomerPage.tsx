import { useState } from "react";
import CustomerForm from "../forms/CustomerForm.tsx";
import type { Customer } from "../types/Customer.ts";
import { customerData } from "../data/CustomerData.ts";

const CustomerPage = () => {
    const [customers, setCustomers] = useState<Customer[]>(customerData);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const onSubmit = (customer: Customer) => {
        if (editingCustomer) {
            setCustomers((prevCustomers) =>
                prevCustomers.map((c) => (c.id === customer.id ? customer : c))//spread operator
            );
        } else {
            setCustomers([...customers, customer]);
            setIsDialogOpen(false);
        }

        setEditingCustomer(null);
        setIsDialogOpen(false);
    };

    const onAddCustomerClicked = () => {
        setEditingCustomer(null);
        setIsDialogOpen(true);
    };

    const onCancel = () => {
        setEditingCustomer(null);
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        setCustomers((prevState) => prevState.filter((customer) => customer.id !== id));
    };

    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Customer List</h3>
            <button
                onClick={onAddCustomerClicked}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
            >
                Add Customer
            </button>

            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Address</th>
                    <th className="py-2 px-4 border">DOB</th>
                    <th className="py-2 px-4 border">Edit</th>
                    <th className="py-2 px-4 border">Delete</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border">{customer.id}</td>
                        <td className="py-2 px-4 border">{customer.name}</td>
                        <td className="py-2 px-4 border">{customer.address}</td>
                        <td className="py-2 px-4 border">{customer.dateOfBirth}</td>
                        <td className="py-2 px-4 border text-center">
                            <button
                                onClick={() => handleEdit(customer)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Edit
                            </button>
                        </td>
                        <td className="py-2 px-4 border text-center">
                            <button
                                onClick={() => handleDelete(customer.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">
                            {editingCustomer ? "Edit Customer" : "Add Customer"}
                        </h2>
                        <CustomerForm
                            onSubmit={onSubmit}
                            onCancel={onCancel}
                            initialData={editingCustomer !==null ? editingCustomer:undefined}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerPage;
