import { Link } from "react-router-dom";

const Breadcrumbs = ({ categorie, genero }) => {
    return (
        <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <span>{'>'}</span>
            {genero ? (
                <>
                    <Link to={`/${categorie}`} className="hover:underline capitalize">
                        {decodeURIComponent(categorie)}
                    </Link>
                    <span>{'>'}</span>
                    <span className="font-bold text-sm capitalize">
                        {decodeURIComponent(genero)}
                    </span>
                </>
            ) : (
                <span className="font-bold text-sm capitalize">
                    {decodeURIComponent(categorie)}
                </span>
            )}
        </div>
    );
};

export default Breadcrumbs;