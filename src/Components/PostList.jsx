export const PostCard = () => {
    return (
        <>
            <div className="border h-fit rounded-lg py-3 px-3">
                <div id="postImage" className="overflow-hidden border rounded-lg">
                    <img src="https://www.blogtyrant.com/wp-content/uploads/2016/06/bestof.png" alt="" className="h-full" />
                </div>

                <div id="postTitle" className="mt-3">laskjf</div>

                <div id="postDescription" className="my-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sint eos repudiandae facilis sequi, obcaecati non totam ea alias iste, cupiditate nam. Optio sapiente maxime quaerat. Rerum nostrum deserunt iure!
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div id="category">Education</div>
                    <div id="date">7-10-2025</div>
                </div>
            </div>

        </>
    )
}


export function PostList() {
    return (
        <>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 sm:px-6 lg:px-8 py-4">

                {/* post card */}
                <PostCard />
            </div>
        </>
    )
}