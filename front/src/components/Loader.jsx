const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <i className="bi bi-arrow-repeat animate-spin text-4xl text-gray-500"></i>
            <p className="text-gray-500 text-sm">Cargando contenido...</p>
        </div>
    );
};

export default Loader;