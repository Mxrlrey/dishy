interface AlertProps {
    type: 'success' | 'error';
    message: string;
}

export default function Alert({ type, message }: AlertProps) {
    const styles = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700'
    };

    return (
        <div className={`mb-4 border px-4 py-3 rounded-[1px] shadow-sm ${styles[type]}`}>
            <i className={`fa ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
            {message}
        </div>
    );
}
