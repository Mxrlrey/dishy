interface DataFieldProps {
    label: string;
    value: React.ReactNode;
    className?: string;
    valueClassName?: string;
}

export default function DataField({ label, value, className = "", valueClassName = "" }: DataFieldProps) {
    return (
        <div className={className}>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {label}
            </label>
            <div className={`mt-1 text-sm font-bold text-gray-800 ${valueClassName}`}>
                {value || <span className="text-gray-300 font-normal italic">Não informado</span>}
            </div>
        </div>
    );
}
