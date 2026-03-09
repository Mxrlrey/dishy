import React from 'react';

interface TableProps {
    headers: string[];
    children: React.ReactNode;
}

export default function Table({ headers, children }: TableProps) {
    return (
        <div className="overflow-x-auto shadow-sm border border-gray-200">
            <table className="min-w-full border-collapse bg-white text-left">
                <thead className="bg-[#f1f5f7] border-b border-gray-200">
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="border border-gray-200 px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-[#6c757d]"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {children}
                </tbody>
            </table>
        </div>
    );
}
