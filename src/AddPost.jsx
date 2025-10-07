import { useDispatch } from "react-redux";
import { useState } from "react";
import { addPost } from "./Components/Slice/postSlice";

export const AddPostForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { title, description, category, date, image };
        dispatch(addPost(newPost));
        setTitle("");
        setDescription("");
        setCategory("");
        setDate("");
        setImage("");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-gray-900 text-white p-6 rounded-xl shadow-xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-blue-400">
                    Add New Post
                </h2>

                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        required
                        className="w-full border border-gray-600 bg-gray-800 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter post description"
                        rows="3"
                        required
                        className="w-full border border-gray-600 bg-gray-800 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category"
                        required
                        className="w-full border border-gray-600 bg-gray-800 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full border border-gray-600 bg-gray-800 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Paste image link (optional)"
                        className="w-full border border-gray-600 bg-gray-800 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
};
