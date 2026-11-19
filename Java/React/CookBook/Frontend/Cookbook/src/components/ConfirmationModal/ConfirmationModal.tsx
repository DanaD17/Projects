import "./ConfirmationModal.scss"

interface ConfirmationModalProps {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({
    title,
    message,
    confirmText="Continue",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}: ConfirmationModalProps){
    return (
        <div className="confirmation-overlay"
            onMouseDown={(event) => {
                    if(event.target === event.currentTarget){
                        onCancel();
                    }    
                }}
           >     
        
            <div className="confirmation-modal"
                role="dialog"
                aria-modal = "true"
                aria-labelledby="confirmation-title"
                aria-describedby="confirmation-message">

                <div className="confirmation-modal__decoration">
                    ❦
                </div>

                <h2 id="confirmation-title"
                    className="confirmation-modal__title">
                    {title}
                </h2>

                <p id="confirmation-message"
                    className="confirmation-modal__message">
                    {message}
                </p>

                <div className="confirmation-modal__actions">

                    <button type="button"
                            className="confirmation-modal__button cancel"
                            onClick={onCancel}>
                        {cancelText}
                    </button>

                    <button type="button"
                            className="confirmation-modal__button confirm"
                            onClick={onConfirm}>
                        {confirmText}
                    </button>

                </div>

            </div>
        </div>
    )
}