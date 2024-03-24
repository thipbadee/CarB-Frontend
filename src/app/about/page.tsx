export default function About() {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-pink-100">
            <div className="text-3xl text-pink-800 font-bold mb-8">Meet the Team</div>
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4 text-xl text-pink-900">Thipbadee Ngamsukkasemsri</div>
                <div className="bg-white rounded-lg shadow-md p-4 text-xl text-pink-900">Amphikapha Thathong</div>
                <div className="bg-white rounded-lg shadow-md p-4 text-xl text-pink-900">Jirameth Wannasiwaporn</div>
            </div>
        </main>
    );
}
