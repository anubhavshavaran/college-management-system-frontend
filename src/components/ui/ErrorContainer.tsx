type ErrorContainerProps = {
    title?: string;
    message: string;
}

function ErrorContainer({title = "Error", message}:ErrorContainerProps) {
    return (
        <div>
            <p>{title}</p>
            <p>{message}</p>
        </div>
    );
}

export default ErrorContainer;