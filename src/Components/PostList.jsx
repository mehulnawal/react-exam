import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPost, filterPost, sortPost, addPost, updatePost } from "./Slice/postSlice";
import { Pencil, Trash2 } from "lucide-react";

export const PostCard = ({ post, onEdit, onDelete }) => {
    return (
        <div className="group border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl overflow-hidden relative flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

            <div className="absolute top-4 right-4 flex gap-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={() => onEdit(post)}
                    className="backdrop-blur-sm text-blue-600 dark:text-blue-400 p-2.5 rounded-full shadow-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all duration-200 hover:scale-110"
                    aria-label="Edit Post"
                >
                    <Pencil size={18} />
                </button>

                <button
                    className="backdrop-blur-sm text-red-500 dark:text-red-400 p-2.5 rounded-full shadow-lg hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition-all duration-200 hover:scale-110"
                    onClick={() => onDelete(post.id)}
                    aria-label="Delete Post"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="overflow-hidden relative" style={{ height: "220px" }}>
                <img
                    src={post.image || "https://via.placeholder.com/400x220?text=No+Image"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
            </div>

            <div className="p-5 flex flex-col flex-1 relative z-20">
                <div
                    className="font-bold text-xl line-clamp-2 mb-3 group-hover:text-indigo-300 dark:group-hover:text-indigo-400 transition-colors duration-200 drop-shadow-lg"
                    title={post.title}
                >
                    {post.title}
                </div>

                <div
                    className="flex-1 text-sm leading-relaxed line-clamp-3 mb-4 drop-shadow-md"
                    title={post.description}
                >
                    {post.description}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100/30 dark:border-gray-700/50">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md text-white">
                        {post.category}
                    </div>
                    <div className="text-xs font-medium">{post.date}</div>
                </div>
            </div>
        </div>
    );
};


export function PostList() {
    const dispatch = useDispatch();
    const { postList } = useSelector((state) => state.postSlice);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(fetchPost());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { title, description, category, date, image };

        if (editId) {
            dispatch(updatePost({ id: editId, updatedPost: postData }));
            setEditId(null);
        } else {
            dispatch(addPost(postData));
        }

        setTitle("");
        setDescription("");
        setCategory("");
        setDate("");
        setImage("");
    };

    const handleEdit = (post) => {
        setEditId(post.id);
        setTitle(post.title);
        setDescription(post.description);
        setCategory(post.category);
        setDate(post.date);
        setImage(post.image);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePost(id));
        }
    };

    const handleFiltering = useCallback(
        (e) => {
            dispatch(filterPost(e.target.value));
        },
        [dispatch]
    );

    const handleSorting = useCallback(
        (e) => {
            dispatch(sortPost(e.target.value));
        },
        [dispatch]
    );

    return (
        <div className="bg-gradient-to-br min-h-screen max-h-fit">
            <div className="container mx-auto py-5 px-4 dark:bg-gray-900 dark:text-white min-h-screen max-h-fit">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    <div className="xl:col-span-4 dark:bg-gray-900 dark:text-white dark:shadow-lg dark:border dark:border-indigo-700 dark:rounded-3xl dark:p-6 dark:transition-shadow dark:duration-300">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <h2 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 text-center mb-6">
                                {editId ? "Edit Post" : "Create Post"}
                            </h2>

                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5 placeholder:dark:text-gray-400"
                            />

                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                required
                                className="w-full border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5 resize-none placeholder:dark:text-gray-400"
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="w-full border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5 placeholder:dark:text-gray-400"
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                <option value="REACT">REACT</option>
                                <option value="CSS">CSS</option>
                                <option value="FIREBASE">FIREBASE</option>
                                <option value="MERN">MERN</option>
                                <option value="REACT UI">REACT UI</option>
                            </select>


                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="w-full border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5 placeholder:dark:text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5 placeholder:dark:text-gray-400"
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl bg-indigo-600 font-bold text-white dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
                                >
                                    {editId ? "Save Changes" : "Publish Post"}
                                </button>
                                {editId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditId(null);
                                            setTitle("");
                                            setDescription("");
                                            setCategory("");
                                            setDate("");
                                            setImage("");
                                        }}
                                        className="flex-1 py-3 rounded-xl bg-gray-300 dark:bg-gray-700 dark:text-white transition-colors hover:bg-gray-400 dark:hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="xl:col-span-8">

                        <div className="mb-8 p-5 rounded-2xl bg-gray-800 border border-gray-700 shadow-xl flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center gap-3 flex-1">
                                <label className="font-semibold text-gray-300 text-sm">📁 Filter:</label>
                                <select
                                    onChange={handleFiltering}
                                    className="flex-1 border border-gray-600 rounded-lg px-3 py-2.5 bg-gray-700 text-white placeholder-gray-400"
                                >
                                    <option value="">All Categories</option>
                                    <option value="REACT">React</option>
                                    <option value="CSS">CSS</option>
                                    <option value="FIREBASE">Firebase</option>
                                    <option value="MERN">MERN</option>
                                    <option value="REACT UI">React UI</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3 flex-1">
                                <label className="font-semibold text-gray-300 text-sm">🔄 Sort:</label>
                                <select
                                    onChange={handleSorting}
                                    className="flex-1 border border-gray-600 rounded-lg px-3 py-2.5 bg-gray-700 text-white placeholder-gray-400"
                                >
                                    <option value="">Default</option>
                                    <option value="title-asc">Title (A-Z)</option>
                                    <option value="title-desc">Title (Z-A)</option>
                                </select>
                            </div>
                        </div>


                        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {postList.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
