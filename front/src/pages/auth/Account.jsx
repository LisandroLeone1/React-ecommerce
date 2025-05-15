import { useAuth } from "../../context/AuthContext";


const Account = () => {
    const { user, logout} = useAuth(); 


    return (
        <div>
            <ul>
                <li>{user.username}</li>
                <li>{user.first_name}</li>
                <li>{user.last_name}</li>
                <li>{user.email}</li>
                <li>{user.address}</li>
                <li>{user.phone_number}</li>
                <li>{user.birth_date}</li>
            </ul>
        </div>
    )
}

export default Account;