export default function InputLabel({ value, className = '', children, ...props }: any) {
    return (
        <label {...props} className={`block font-semibold text-sm text-gray-700 mb-1 ` + className}>
            {value ? value : children}
        </label>
    );
}
