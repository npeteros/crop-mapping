import React from 'react';
import { useForm } from '@inertiajs/react';

export default function PdfForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        address: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pdf.generate'), {
            onSuccess: () => {
                alert('PDF is being downloaded!');
            },
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="address">Address (Optional)</label>
                    <textarea
                        id="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    {errors.address && <span>{errors.address}</span>}
                </div>
                <button type="submit" disabled={processing}>
                    Generate PDF
                </button>
            </form>
        </div>
    );
}
