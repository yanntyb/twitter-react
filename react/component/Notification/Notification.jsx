import "./Notification.scss";

export const Notification = ({message, setNotification}) => {


    return (
        <div className="notification">
            {message}
        </div>
    )
}