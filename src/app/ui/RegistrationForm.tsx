import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        sex: '',
        height: '',
        weight: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Dispatch action to store user data
        dispatch({ type: 'REGISTER_USER', payload: formData });
        // Clear form data
        setFormData({
            name: '',
            email: '',
            dob: '',
            sex: '',
            height: '',
            weight: '',
        });
    };

    return (
        <>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
                <span className="text font-semibold pb-8 text-black">Fill the form with test data, so that the dashboard is displayed
                    correctly.
                    <p className="text-pink">**(The data is not sent anywhere and is stored only locally in cookies)</p>
                </span>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
                       className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                       className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"/>
                <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange}
                       className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"/>
                <select name="sex" value={formData.sex} onChange={handleChange}
                        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black">
                    <option value="">Select Sex</option>
                    <option value="He">Male</option>
                    <option value="She">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="number" name="height" placeholder="Height" value={formData.height} onChange={handleChange}
                       className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"/>
                <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange}
                       className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"/>
                <button type="submit"
                        className="block w-full px-4 py-2 text-white bg-blue rounded-md hover:bg-light_blue focus:outline-none focus:bg-blue-600">Register
                </button>
            </form>
        </>
    );
};

export default RegistrationForm;
